// ============================================================
// Авторизация: регистрация, вход, выход, состояние сессии
// ============================================================
// Зависимости: js/config.js (window.sb), js/i18n.js (window.t)
// ============================================================

(function () {
    'use strict';

    // Текущий пользователь и подписка
    let currentUser = null;
    let currentSession = null;

    // ============================================================
    // Управление UI сессии
    // ============================================================

    /**
     * Обновляет шапку в зависимости от состояния авторизации.
     * Вызывается при входе/выходе и при загрузке страницы.
     */
    function updateAuthUI() {
        const loginBtn = document.getElementById('navLogin');
        const profileLink = document.getElementById('navProfile');
        if (!loginBtn || !profileLink) return;

        if (currentUser) {
            // Авторизован → показываем «Личный кабинет»
            loginBtn.classList.add('hidden');
            profileLink.classList.remove('hidden');

            // Иконка-аватар с первой буквой email
            const avatar = profileLink.querySelector('.user-avatar');
            if (avatar) {
                avatar.textContent = (currentUser.email || '?')[0].toUpperCase();
            }
        } else {
            // Не авторизован → показываем «Войти»
            loginBtn.classList.remove('hidden');
            profileLink.classList.add('hidden');
        }

        // Обновить CTA на карточке тарифа (если есть на странице)
        updatePricingCTA();
    }

    /**
     * Обновляет текст кнопки на карточке тарифа
     * в зависимости от авторизации.
     */
    function updatePricingCTA() {
        const cta = document.querySelector('[data-pricing-cta]');
        if (!cta) return;
        const key = currentUser ? 'pricing.plan.cta.loggedIn' : 'pricing.plan.cta';
        cta.textContent = t(key);
    }

    // ============================================================
    // Модалки
    // ============================================================

    function openModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.remove('hidden');
            document.body.style.overflow = 'hidden';
            // Фокус на первый input
            setTimeout(() => {
                const firstInput = modal.querySelector('input');
                if (firstInput) firstInput.focus();
            }, 100);
        }
    }

    function closeModal(id) {
        const modal = document.getElementById(id);
        if (modal) {
            modal.classList.add('hidden');
            document.body.style.overflow = '';
        }
    }

    function switchAuthModal(from, to) {
        closeModal(from);
        openModal(to);
    }

    // ============================================================
    // Регистрация
    // ============================================================

    async function handleRegister(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('[name="email"]').value.trim();
        const password = form.querySelector('[name="password"]').value;
        const btn = form.querySelector('button[type="submit"]');
        const errorEl = document.getElementById('registerError');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = t('auth.loading');

        try {
            if (!window.sb) {
                // === ДЕМО-РЕЖИМ: фейковая регистрация ===
                if (!email || !password) throw new Error(currentLang() === 'ru' ? 'Заполни email и пароль' : 'Fill in email and password');
                if (!/\S+@\S+\.\S+/.test(email)) throw new Error(currentLang() === 'ru' ? 'Некорректный email' : 'Invalid email');
                if (password.length < 6) throw new Error(t('auth.passwordHint'));
                await new Promise(r => setTimeout(r, 800));
                currentUser = { email, id: 'demo-user', aud: 'authenticated' };
                currentSession = { access_token: 'demo', user: currentUser };
                localStorage.setItem('gv-demo-user', JSON.stringify(currentUser)); // сохраняем сессию
                closeModal('registerModal');
                showToast(t('msg.loginSuccess') + ' (Demo)', 'success');
                updateAuthUI();
                form.reset();
                return;
            }
            const { data, error } = await sb.auth.signUp({
                email,
                password,
            });
            if (error) throw error;

            // Если session сразу вернулась (email confirmation off)
            if (data.session) {
                currentUser = data.user;
                currentSession = data.session;
                closeModal('registerModal');
                showToast(t('msg.loginSuccess'), 'success');
                updateAuthUI();
            } else {
                // Требуется подтверждение email
                closeModal('registerModal');
                showToast(t('msg.registerSuccess'), 'success');
            }
            form.reset();
        } catch (err) {
            showAuthError(errorEl, err);
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }

    // ============================================================
    // Вход
    // ============================================================

    async function handleLogin(e) {
        e.preventDefault();
        const form = e.target;
        const email = form.querySelector('[name="email"]').value.trim();
        const password = form.querySelector('[name="password"]').value;
        const btn = form.querySelector('button[type="submit"]');
        const errorEl = document.getElementById('loginError');
        const originalText = btn.textContent;
        btn.disabled = true;
        btn.textContent = t('auth.loading');

        try {
            if (!window.sb) {
                // === ДЕМО-РЕЖИМ: фейковый вход без Supabase ===
                if (!email || !password) throw new Error(currentLang() === 'ru' ? 'Заполни email и пароль' : 'Fill in email and password');
                if (!/\S+@\S+\.\S+/.test(email)) throw new Error(currentLang() === 'ru' ? 'Некорректный email' : 'Invalid email');
                await new Promise(r => setTimeout(r, 800)); // имитация загрузки
                currentUser = { email, id: 'demo-user', aud: 'authenticated' };
                currentSession = { access_token: 'demo', user: currentUser };
                localStorage.setItem('gv-demo-user', JSON.stringify(currentUser)); // сохраняем сессию
                closeModal('loginModal');
                showToast(t('msg.loginSuccess') + ' (Demo)', 'success');
                updateAuthUI();
                form.reset();
                return;
            }
            const { data, error } = await sb.auth.signInWithPassword({
                email,
                password,
            });
            if (error) throw error;

            currentUser = data.user;
            currentSession = data.session;
            closeModal('loginModal');
            showToast(t('msg.loginSuccess'), 'success');
            updateAuthUI();
            form.reset();
        } catch (err) {
            showAuthError(errorEl, err);
        } finally {
            btn.disabled = false;
            btn.textContent = originalText;
        }
    }

    // ============================================================
    // Выход
    // ============================================================

    async function handleLogout() {
        try {
            if (window.sb) await sb.auth.signOut();
        } catch (e) {
            console.warn(e);
        }
        localStorage.removeItem('gv-demo-user'); // чистим демо-сессию
        currentUser = null;
        currentSession = null;
        showToast(t('msg.logoutSuccess'), 'info');
        updateAuthUI();
        // Редирект на главную, если мы в профиле
        if (window.location.pathname.includes('profile.html')) {
            window.location.href = 'index.html';
        }
    }

    // ============================================================
    // Защищённые действия
    // ============================================================

    /**
     * Если пользователь не авторизован — открывает модалку входа.
     * Возвращает true, если можно продолжать действие.
     */
    function requireAuth(callback) {
        if (currentUser) {
            callback();
            return;
        }
        showToast(t('msg.loginRequired'), 'warn');
        openModal('loginModal');
    }

    // ============================================================
    // Инициализация сессии и слушатели
    // ============================================================

    async function initAuth() {

        // === Слушатели кликов и форм — ВСЕГДА навешиваются (даже без Supabase) ===

        // Кнопка «Войти» в шапке — всегда открывает модалку
        const navLogin = document.getElementById('navLogin');
        if (navLogin) navLogin.addEventListener('click', () => openModal('loginModal'));

        // Слушатели форм входа/регистрации
        const loginForm = document.getElementById('loginForm');
        const registerForm = document.getElementById('registerForm');
        if (loginForm) loginForm.addEventListener('submit', handleLogin);
        if (registerForm) registerForm.addEventListener('submit', handleRegister);

        // Кнопки выхода
        const logoutBtn = document.getElementById('logoutBtn');
        if (logoutBtn) logoutBtn.addEventListener('click', handleLogout);

        // Кнопка покупки тарифа (проверяет авторизацию)
        const pricingCta = document.querySelector('[data-pricing-cta]');
        if (pricingCta) {
            pricingCta.addEventListener('click', () => {
                requireAuth(() => {
                    // Авторизован → запускаем покупку
                    if (typeof handleBuySubscription === 'function') {
                        handleBuySubscription();
                    }
                });
            });
        }

        // Закрытие модалок по клику на фон / Esc / крестику
        document.querySelectorAll('[data-modal-close]').forEach(el => {
            el.addEventListener('click', (e) => {
                const modal = e.target.closest('.auth-modal');
                if (modal) closeModal(modal.id);
            });
        });
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                document.querySelectorAll('.auth-modal:not(.hidden)').forEach(m => closeModal(m.id));
            }
        });

        // === Supabase-специфичная логика — только если ключи настроены ===

        if (window.sb) {
            // Восстановление сессии
            const { data: { session } } = await sb.auth.getSession();
            if (session) {
                currentSession = session;
                currentUser = session.user;
                updateAuthUI();
            }

            // Слушатель изменений авторизации
            sb.auth.onAuthStateChange((event, session) => {
                currentSession = session;
                currentUser = session ? session.user : null;
                updateAuthUI();
            });
        } else {
            console.warn('[Auth] Supabase не настроен — авторизация отключена (демо-режим)');
            // Восстановление демо-сессии из localStorage
            const demoUser = localStorage.getItem('gv-demo-user');
            if (demoUser) {
                try {
                    currentUser = JSON.parse(demoUser);
                    currentSession = { access_token: 'demo', user: currentUser };
                    updateAuthUI();
                } catch (e) { localStorage.removeItem('gv-demo-user'); }
            }
        }
    }

    // ============================================================
    // Вспомогательные функции
    // ============================================================

    function showAuthError(errorEl, err) {
        if (!errorEl) return;
        const msg = err.message || String(err);
        // Человекочитаемые сообщения для типичных ошибок
        let friendly = msg;
        if (/invalid login credentials/i.test(msg)) {
            friendly = currentLang() === 'ru'
                ? 'Неверный email или пароль'
                : 'Invalid email or password';
        } else if (/already registered/i.test(msg)) {
            friendly = currentLang() === 'ru'
                ? 'Пользователь с таким email уже зарегистрирован'
                : 'A user with this email is already registered';
        } else if (/weak password|should be at least/i.test(msg)) {
            friendly = currentLang() === 'ru'
                ? 'Пароль слишком слабый (минимум 6 символов)'
                : 'Password is too weak (at least 6 characters)';
        }
        errorEl.textContent = friendly;
        errorEl.classList.remove('hidden');
        setTimeout(() => errorEl.classList.add('hidden'), 5000);
    }

    // Глобальный доступ к toast (определён в subscription.js, но с запасом)
    function showToast(msg, type) {
        if (typeof window.showToast === 'function') {
            window.showToast(msg, type);
        }
    }

    // Публичный API
    window.gvAuth = {
        getUser: () => currentUser,
        getSession: () => currentSession,
        isLoggedIn: () => !!currentUser,
        requireAuth,
        logout: handleLogout,
        openLoginModal: () => openModal('loginModal'),
        openRegisterModal: () => openModal('registerModal'),
        switchToRegister: () => switchAuthModal('loginModal', 'registerModal'),
        switchToLogin: () => switchAuthModal('registerModal', 'loginModal'),
    };

    // Запуск
    document.addEventListener('DOMContentLoaded', initAuth);
})();
