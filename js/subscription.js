// ============================================================
// Подписки: статус, покупка, продление, счётчик дней
// ============================================================
// Зависимости: js/config.js (window.sb), js/auth.js (window.gvAuth)
// ============================================================

(function () {
    'use strict';

    const SUBSCRIPTION_DURATION_DAYS = 30;
    const SUBSCRIPTION_PRICE_USD = 5;
    const SUBSCRIPTION_PRICE_RUB = 450; // пример: $5 ≈ 450 ₽

    let currentSubscription = null; // { status, purchased_at, expires_at }

    // ============================================================
    // Toast-уведомления (глобально)
    // ============================================================

    /**
     * Показывает всплывающее уведомление.
     * @param {string} msg - Текст
     * @param {'success'|'error'|'warn'|'info'} type
     */
    window.showToast = function (msg, type = 'info') {
        const colors = {
            success: { bg: 'rgba(45, 255, 136, 0.15)', border: '#2dff88', text: '#2dff88' },
            error:   { bg: 'rgba(255, 46, 154, 0.15)', border: '#ff2e9a', text: '#ff2e9a' },
            warn:    { bg: 'rgba(255, 159, 10, 0.15)', border: '#ff9f0a', text: '#ff9f0a' },
            info:    { bg: 'rgba(0, 240, 255, 0.15)',  border: '#00f0ff', text: '#00f0ff' },
        };
        const c = colors[type] || colors.info;

        let container = document.getElementById('toastContainer');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toastContainer';
            container.style.cssText = 'position:fixed;top:90px;right:20px;z-index:9999;display:flex;flex-direction:column;gap:10px;';
            document.body.appendChild(container);
        }

        const toast = document.createElement('div');
        toast.style.cssText = `background:${c.bg};border:1px solid ${c.border};color:${c.text};padding:14px 20px;border-radius:12px;backdrop-filter:blur(10px);font-weight:600;font-size:14px;max-width:340px;box-shadow:0 8px 30px rgba(0,0,0,0.4);transform:translateX(120%);transition:transform 0.4s cubic-bezier(0.34,1.56,0.64,1);`;
        toast.textContent = msg;
        container.appendChild(toast);

        requestAnimationFrame(() => { toast.style.transform = 'translateX(0)'; });

        setTimeout(() => {
            toast.style.transform = 'translateX(120%)';
            setTimeout(() => toast.remove(), 400);
        }, 4000);
    };

    // ============================================================
    // Получение подписки пользователя
    // ============================================================

    /**
     * Загружает подписку текущего пользователя из БД.
     */
    async function fetchSubscription() {
        const user = window.gvAuth ? window.gvAuth.getUser() : null;
        if (!user || !window.sb) {
            currentSubscription = null;
            return null;
        }

        try {
            const { data, error } = await sb
                .from('subscriptions')
                .select('*')
                .eq('user_id', user.id)
                .maybeSingle();

            if (error) throw error;

            if (data) {
                // Автоматически проверяем, не истекла ли подписка
                currentSubscription = autoExpire(data);
            } else {
                currentSubscription = null;
            }
        } catch (err) {
            console.error('[Subscription] Ошибка загрузки:', err);
            currentSubscription = null;
        }
        return currentSubscription;
    }

    /**
     * Если подписка просрочена по времени — помечает её как expired.
     * Также обновляет статус в БД.
     */
    function autoExpire(sub) {
        if (sub.status === 'active' && sub.expires_at) {
            const expires = new Date(sub.expires_at);
            if (expires < new Date()) {
                sub.status = 'expired';
                // Асинхронно обновляем в БД (без блокировки)
                if (window.sb) {
                    sb.from('subscriptions')
                        .update({ status: 'expired' })
                        .eq('id', sub.id)
                        .then(({ error }) => {
                            if (error) console.warn('[Subscription] Не удалось обновить expired-статус:', error);
                        });
                }
            }
        }
        return sub;
    }

    // ============================================================
    // Покупка / Продление подписки
    // ============================================================

    /**
     * Симуляция покупки подписки.
     * В реальном проекте здесь был бы вызов платёжного шлюза (Stripe, ЮKassa).
     * Сейчас — имитация успешной оплаты с обновлением БД.
     */
    async function handleBuySubscription() {
        const user = window.gvAuth.getUser();
        if (!user) {
            window.gvAuth.openLoginModal();
            return;
        }

        window.showToast(currentLang() === 'ru' ? 'Обработка платежа...' : 'Processing payment...', 'info');

        const now = new Date();
        const expires = new Date(now.getTime() + SUBSCRIPTION_DURATION_DAYS * 24 * 60 * 60 * 1000);

        const payload = {
            user_id: user.id,
            status: 'active',
            purchased_at: now.toISOString(),
            expires_at: expires.toISOString(),
        };

        // === ДЕМО-РЕЖИМ: без Supabase — храним подписку в памяти ===
        if (!window.sb) {
            await new Promise(r => setTimeout(r, 1000)); // имитация оплаты
            currentSubscription = { ...payload, id: 'demo-sub' };
            window.showToast(t('msg.subActivated') + ' (Demo)', 'success');
            if (typeof refreshProfile === 'function') refreshProfile();
            return;
        }

        // === РЕАЛЬНЫЙ РЕЖИМ: запись в Supabase ===
        try {
            const { data: existing } = await sb
                .from('subscriptions')
                .select('id')
                .eq('user_id', user.id)
                .maybeSingle();

            if (existing) {
                const { error } = await sb
                    .from('subscriptions')
                    .update(payload)
                    .eq('id', existing.id);
                if (error) throw error;
            } else {
                const { error } = await sb.from('subscriptions').insert(payload);
                if (error) throw error;
            }

            await fetchSubscription();
            window.showToast(t('msg.subActivated'), 'success');
            if (typeof refreshProfile === 'function') refreshProfile();
        } catch (err) {
            console.error('[Subscription] Ошибка покупки:', err);
            window.showToast(t('msg.error'), 'error');
        }
    }

    // ============================================================
    // Вычисление оставшихся дней
    // ============================================================

    /**
     * @returns {number|null} Кол-во дней до окончания или null
     */
    function getDaysLeft() {
        if (!currentSubscription || !currentSubscription.expires_at) return null;
        const ms = new Date(currentSubscription.expires_at) - new Date();
        return Math.max(0, Math.ceil(ms / (1000 * 60 * 60 * 24)));
    }

    /**
     * Возвращает локализованный статус подписки.
     */
    function getStatusLabel() {
        if (!currentSubscription || currentSubscription.status === 'inactive') {
            return t('profile.statusInactive');
        }
        if (currentSubscription.status === 'active') return t('profile.statusActive');
        if (currentSubscription.status === 'expired') return t('profile.statusExpired');
        return t('profile.statusInactive');
    }

    /**
     * Форматирует дату в локализованном виде.
     */
    function formatDate(dateStr) {
        if (!dateStr) return t('profile.notSet');
        const d = new Date(dateStr);
        return d.toLocaleDateString(currentLang() === 'ru' ? 'ru-RU' : 'en-US', {
            day: '2-digit', month: '2-digit', year: 'numeric'
        });
    }

    // ============================================================
    // Публичный API
    // ============================================================

    window.gvSub = {
        fetch: fetchSubscription,
        buy: handleBuySubscription,
        getData: () => currentSubscription,
        getDaysLeft,
        getStatusLabel,
        formatDate,
        isActive: () => currentSubscription && currentSubscription.status === 'active',
        PRICE_USD: SUBSCRIPTION_PRICE_USD,
        PRICE_RUB: SUBSCRIPTION_PRICE_RUB,
        DURATION_DAYS: SUBSCRIPTION_DURATION_DAYS,
    };

    // Глобальные функции для onclick в HTML
    window.handleBuySubscription = handleBuySubscription;
})();
