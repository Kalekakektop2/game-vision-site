// ============================================================
// Интерактивное демо: кликабельные предметы, AI-анализ, эффект печати
// ============================================================
// Зависимости: js/i18n.js (window.t, window.currentLang)
// ============================================================

(function () {
    'use strict';

    // ============================================================
    // Данные о предметах (теги берутся из словаря i18n)
    // ============================================================

    const ITEMS = {
        potion: {
            tags: ['tag.Расходник', 'tag.Эпический', 'tag.Мана'],
            qa: {
                // Ключевые слова → ключи переводов
                'где|where':   'item.potion.qaWhere',
                'характер|stats': 'item.potion.qaStats',
                'стоит|how much|цена|price': 'item.potion.qaPrice',
            }
        },
        sword: {
            tags: ['tag.Оружие', 'tag.Легендарный', 'tag.Двуручный меч'],
            qa: {
                'где|where': 'item.sword.qaWhere',
                'характер|stats': 'item.sword.qaStats',
                'стоит|how much|цена|price': 'item.sword.qaPrice',
            }
        },
        golem: {
            tags: ['tag.Босс', 'tag.Элитный', 'tag.Уровень 52'],
            qa: {
                'где|where': 'item.golem.qaWhere',
                'характер|stats|слабост|weak': 'item.golem.qaStats',
                'стоит|how much|цена|price|наград|reward': 'item.golem.qaPrice',
            }
        },

        chest: {
            tags: ['tag.Объект', 'tag.Редкий', 'tag.Требует ключ'],
            qa: {
                'где|where': 'item.chest.qaWhere',
                'характер|stats|содерж|content': 'item.chest.qaStats',
                'стоит|how much|цена|price': 'item.chest.qaPrice',
            }
        }
    };

    // Текущее состояние демо
    let currentItemId = null;
    let currentMode = 'brief';
    let typingTimer = null;

    // Ссылки на DOM (кэшируем)
    let selectionBox, selectionLabel, gameScene, itemName, itemTags,
        aiResponse, hintLabel, userQuestion;

    function cacheDOM() {
        selectionBox = document.getElementById('selectionBox');
        selectionLabel = document.getElementById('selectionLabel');
        gameScene = document.getElementById('gameScene');
        itemName = document.getElementById('itemName');
        itemTags = document.getElementById('itemTags');
        aiResponse = document.getElementById('aiResponse');
        hintLabel = def('hintLabel');
        userQuestion = document.getElementById('userQuestion');
    }

    function def(id) { return document.getElementById(id); }

    // ============================================================
    // Выбор предмета
    // ============================================================

    function selectItem(element, itemId) {
        currentItemId = itemId;
        const itemData = ITEMS[itemId];
        if (!itemData) return;

        // Подсветка активного предмета
        document.querySelectorAll('.game-item').forEach(i => i.classList.remove('active'));
        element.classList.add('active');

        // Позиционирование рамки выделения
        const sceneRect = gameScene.getBoundingClientRect();
        const itemRect = element.getBoundingClientRect();
        const padding = 6;

        selectionBox.style.width = (itemRect.width + padding * 2) + 'px';
        selectionBox.style.height = (itemRect.height + padding * 2) + 'px';
        selectionBox.style.left = (itemRect.left - sceneRect.left - padding) + 'px';
        selectionBox.style.top = (itemRect.top - sceneRect.top - padding) + 'px';
        selectionBox.classList.add('visible');
        selectionLabel.textContent = t('demo.analyzing');

        // Сканирующая линия
        const oldScan = gameScene.querySelector('.scan-line');
        if (oldScan) oldScan.remove();
        const scan = document.createElement('div');
        scan.className = 'scan-line';
        selectionBox.appendChild(scan);

        if (hintLabel) hintLabel.style.opacity = '0';

        // Обновление панели
        setTimeout(() => {
            const nameKey = `item.${itemId}.name`;
            itemName.textContent = t(nameKey);
            selectionLabel.textContent = '✓ ' + t(nameKey);
            itemTags.innerHTML = itemData.tags.map(tagKey =>
                `<span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-medium">${t(tagKey)}</span>`
            ).join('');
            renderResponse();
        }, 700);
    }

    // ============================================================
    // Отрисовка ответа AI (с учётом режима и языка)
    // ============================================================

    function renderResponse(customText) {
        clearInterval(typingTimer);
        aiResponse.innerHTML = '';
        const span = document.createElement('span');
        span.className = 'typing-cursor';
        aiResponse.appendChild(span);

        let text;
        if (customText !== undefined) {
            text = customText;
        } else if (currentItemId) {
            const modeKey = `item.${currentItemId}.${currentMode}`;
            text = t(modeKey);
        } else {
            text = t('demo.aiWaiting');
            span.textContent = text;
            return;
        }

        let i = 0;
        typingTimer = setInterval(() => {
            if (i < text.length) {
                const char = text[i];
                if (char === '\n') {
                    span.innerHTML += '<br>';
                } else {
                    span.innerHTML += char;
                }
                i++;
            } else {
                clearInterval(typingTimer);
                span.classList.remove('typing-cursor');
            }
        }, currentMode === 'brief' ? 12 : 6);
    }

    // ============================================================
    // Переключатель режима Кратко / Расширенно
    // ============================================================

    function setMode(mode) {
        currentMode = mode;
        document.querySelectorAll('.mode-btn').forEach(btn => {
            const isActive = btn.dataset.mode === mode;
            btn.classList.toggle('active', isActive);
            btn.classList.toggle('text-gray-400', !isActive);
        });
        if (currentItemId) renderResponse();
    }

    // ============================================================
    // Кастомный вопрос пользователя
    // ============================================================

    function quickAsk(q) {
        userQuestion.value = q;
        askQuestion();
    }

    function askQuestion() {
        const q = userQuestion.value.trim().toLowerCase();
        if (!q) return;

        if (!currentItemId) {
            flashHint(t('demo.noSelection'));
            return;
        }

        const itemData = ITEMS[currentItemId];
        let answer = t('demo.noData');

        // Поиск совпадения по ключевым словам
        for (const keywords in itemData.qa) {
            const regex = new RegExp(keywords, 'i');
            if (regex.test(q)) {
                answer = t(itemData.qa[keywords]);
                break;
            }
        }

        renderResponse(answer);
        userQuestion.value = '';
    }

    function flashHint(msg) {
        if (!hintLabel) return;
        const original = t('demo.hint');
        hintLabel.textContent = '⚠️ ' + msg;
        hintLabel.style.opacity = '1';
        hintLabel.style.borderColor = 'rgba(255, 46, 154, 0.5)';
        hintLabel.style.color = '#ff2e9a';
        setTimeout(() => {
            hintLabel.textContent = original;
            hintLabel.style.borderColor = '';
            hintLabel.style.color = '';
            if (currentItemId) hintLabel.style.opacity = '0';
        }, 2500);
    }

    // ============================================================
    // Обновление демо при смене языка
    // ============================================================

    function refreshDemo() {
        if (!gameScene) return; // демо есть только на index.html

        // Обновить имя и теги текущего предмета
        if (currentItemId) {
            const itemData = ITEMS[currentItemId];
            const nameKey = `item.${currentItemId}.name`;
            itemName.textContent = t(nameKey);
            if (selectionLabel) selectionLabel.textContent = '✓ ' + t(nameKey);
            if (itemTags) {
                itemTags.innerHTML = itemData.tags.map(tagKey =>
                    `<span class="text-[10px] px-2 py-0.5 rounded-full bg-cyan-400/10 border border-cyan-400/30 text-cyan-300 font-medium">${t(tagKey)}</span>`
                ).join('');
            }
            // Перерисовать ответ в новом языке
            renderResponse();
        } else {
            if (aiResponse) {
                aiResponse.innerHTML = `<span class="text-gray-600">${t('demo.aiWaiting')}</span>`;
            }
            if (itemName) itemName.textContent = t('demo.waiting');
        }

        // Обновить плейсхолдер инпута
        if (userQuestion) userQuestion.placeholder = t('demo.inputPlaceholder');

        // Обновить кнопки быстрых вопросов
        document.querySelectorAll('[data-quick-ask]').forEach(btn => {
            const qKey = btn.dataset.quickAsk;
            const qMap = { where: 'demo.q.where', stats: 'demo.q.stats', price: 'demo.q.price' };
            if (qMap[qKey]) btn.textContent = t(qMap[qKey]);
        });
    }

    // ============================================================
    // Инициализация
    // ============================================================

    function initDemo() {
        cacheDOM();
        if (!gameScene) return; // демо есть только на index.html

        // Клики по предметам
        document.querySelectorAll('.game-item').forEach(item => {
            item.addEventListener('click', (e) => {
                e.stopPropagation();
                selectItem(item, item.dataset.item);
            });
        });

        // Enter в поле вопроса
        if (userQuestion) {
            userQuestion.addEventListener('keydown', (e) => {
                if (e.key === 'Enter') askQuestion();
            });
        }

        // Обновление при смене языка
        document.addEventListener('langchange', refreshDemo);

        // Начальное состояние
        refreshDemo();
    }

    // Глобальный API
    window.setMode = setMode;
    window.askQuestion = askQuestion;
    window.quickAsk = quickAsk;
    window.refreshDemo = refreshDemo;

    document.addEventListener('DOMContentLoaded', initDemo);
})();
