// ============================================================
// Словарь переводов (i18n) — RU / EN
// ============================================================
// Текст ищется по data-i18n="ключ" в HTML и подставляется автоматически.
// Демо-панель и AI-ответы тоже переведены.
// ============================================================

const translations = {
    ru: {
        // Навбар
        'nav.demo': 'Демо',
        'nav.features': 'Возможности',
        'nav.how': 'Как работает',
        'nav.pricing': 'Цены',
        'nav.login': 'Войти',
        'nav.profile': 'Личный кабинет',
        'nav.download': 'Скачать бета',

        // Языковой переключатель
        'lang.label': 'RU',

        // Hero
        'hero.badge': 'AI Powered • Beta 0.9 уже доступна',
        'hero.title1': 'Видишь предмет —',
        'hero.title2': 'узнай всё мгновенно',
        'hero.subtitle': 'AI-ассистент, который анализирует экран прямо во время игры. Выдели любой предмет, босса или локацию — и получи ответ без единого Alt-Tab.',
        'hero.cta1': 'Скачать бета',
        'hero.cta2': 'Смотреть демо',
        'hero.os': 'Windows 10/11 • Бесплатно в период бета-тестирования',

        // Демо
        'demo.label': 'ЖИВОЕ ДЕМО',
        'demo.title': 'Попробуй прямо сейчас',
        'demo.subtitle': 'Кликни по любому предмету в игровом окне — AI выделит его и расскажет всё, что нужно знать. Переключай режим и задавай свои вопросы.',
        'demo.scene': 'Eldoria Online — Подземелье Теней',
        'demo.hint': '👆 Нажми на предмет, чтобы AI его проанализировал',
        'demo.analyzing': 'Анализ...',
        'demo.detected': 'Обнаружено',
        'demo.waiting': '— ожидание выделения —',
        'demo.mode.brief': 'Кратко',
        'demo.mode.detailed': 'Расширенно',
        'demo.aiTitle': 'Ответ AI',
        'demo.aiWaiting': 'Выдели предмет в игровом окне, чтобы получить анализ...',
        'demo.inputPlaceholder': 'Спроси что-нибудь об этом предмете...',
        'demo.noSelection': 'Сначала выдели предмет в игровом окне!',
        'demo.noData': 'По этому предмету пока нет точных данных. Попробуй спросить «где найти?», «характеристики» или «сколько стоит?» — я знаю ответы на эти вопросы.',

        // Возможности
        'features.label': 'ПОЧЕМУ GAME-VISION',
        'features.title': 'Технология, меняющая игру',
        'features.f1.title': 'Без разрыва погружения',
        'features.f1.desc': 'Никакого Alt-Tab и сворачивания игры. Анализ появляется поверх экрана за доли секунды — ты не выходишь из боя и не теряешь фокус.',
        'features.f2.title': 'Поддержка любых игр',
        'features.f2.desc': 'MMORPG, шутеры, стратегии, сурвайвалы. AI распознаёт предметы, врагов, интерфейс и локации в десятках популярных тайтлов.',
        'features.f3.title': 'Контекстные запросы',
        'features.f3.desc': 'Задавай свои вопросы текстом: «где крафтить?», «слабые стороны босса?», «лучшая сборка?». AI отвечает с учётом того, что видит на экране.',

        // Как работает
        'how.label': '3 ШАГА',
        'how.title': 'Как это работает',
        'how.step1.title': 'Назначь хоткей',
        'how.step1.desc': 'Привяжи удобную комбинацию клавиш. Одно нажатие — и оверлей готов к работе прямо поверх игры.',
        'how.step2.title': 'Выдели область',
        'how.step2.desc': 'Зажми и протяни рамку по предмету, боссу или элементу интерфейса. Снимок отправляется на анализ.',
        'how.step3.title': 'Получи ответ',
        'how.step3.desc': 'AI мгновенно печатает всё, что знает о выделенном объекте. Кратко или подробно — решаешь ты.',

        // Цены
        'pricing.label': 'ТАРИФЫ',
        'pricing.title': 'Простые и честные цены',
        'pricing.subtitle': 'Один тариф — без скрытых платежей и автопродления.',
        'pricing.plan.name': 'Доступ на 1 месяц',
        'pricing.plan.desc': 'Полный доступ к Game-Vision AI на 30 дней. Без ограничений.',
        'pricing.plan.price': '450 ₽',
        'pricing.plan.usd': '/ $5',
        'pricing.plan.cta': 'Купить подписку',
        'pricing.plan.cta.loggedIn': 'Перейти к оплате',
        'pricing.feature1': 'Безлимитный AI-анализ предметов',
        'pricing.feature2': 'Поддержка всех игр',
        'pricing.feature3': 'Кастомные промпты',
        'pricing.feature4': 'Приоритетная поддержка',

        // Модалки авторизации
        'auth.login.title': 'Вход в аккаунт',
        'auth.login.subtitle': 'Рады видеть тебя снова, игрок!',
        'auth.register.title': 'Создание аккаунта',
        'auth.register.subtitle': 'Присоединяйся к Game-Vision за минуту',
        'auth.email': 'Email',
        'auth.password': 'Пароль',
        'auth.passwordHint': 'Минимум 6 символов',
        'auth.loginBtn': 'Войти',
        'auth.registerBtn': 'Зарегистрироваться',
        'auth.toRegister': 'Нет аккаунта? Зарегистрироваться',
        'auth.toLogin': 'Уже есть аккаунт? Войти',
        'auth.google': 'Войти через Google',
        'auth.or': 'или',
        'auth.loading': 'Загрузка...',

        // Профиль
        'profile.title': 'Личный кабинет',
        'profile.welcome': 'Привет, игрок!',
        'profile.email': 'Email:',
        'profile.subscription': 'Подписка',
        'profile.status': 'Статус',
        'profile.statusActive': 'Активна',
        'profile.statusExpired': 'Истекла',
        'profile.statusInactive': 'Не приобретена',
        'profile.purchased': 'Куплено',
        'profile.expires': 'Истекает',
        'profile.left': 'Осталось',
        'profile.days': 'дн.',
        'profile.renew': 'Продлить подписку',
        'profile.logout': 'Выйти из аккаунта',
        'profile.notSet': '—',
        'profile.back': 'На главную',
        'profile.protected': 'Этот раздел доступен только авторизованным пользователям',

        // Сообщения
        'msg.loginSuccess': 'Вход выполнен успешно!',
        'msg.registerSuccess': 'Аккаунт создан! Проверь почту для подтверждения.',
        'msg.logoutSuccess': 'Вы вышли из аккаунта.',
        'msg.subActivated': 'Подписка активирована на 30 дней!',
        'msg.loginRequired': 'Войди в аккаунт, чтобы продолжить',
        'msg.error': 'Произошла ошибка. Попробуйте снова.',

        // Футер
        'footer.copyright': '© 2026 Game-Vision Analyzer. Бета-версия. Сделано для геймеров.',

        // Демо: быстрые вопросы
        'demo.q.where': 'где найти?',
        'demo.q.stats': 'характеристики',
        'demo.q.price': 'сколько стоит?',

        // Демо: предметы
        'item.potion.name': 'Зелье Великой Маны',
        'item.potion.brief': 'Эпическое зелье, восстанавливающее 500 единиц маны мгновенно. Идеально для магов и жрецов в длительных боях.',
        'item.potion.detailed': 'Зелье Великой Маны — эпический расходный материал, восстанавливающий 500 единиц маны мгновенно и дополнительно 100 единиц в течение 10 секунд.\n\n• Восстановление: 500 + 100 (10с)\n• Откат: 60 сек\n• Уровень: 35+\n\nГде найти: выпадает из элитных мобов в Подземелье Теней, крафтится Алхимией (уровень 40) из Синих кристаллов и Лунной пыли. Также продаётся у торговца Эльдрин в городе Дейбрейк за 240 золотых.\n\nСовет: стакается до 20 штук. Эффективнее использовать перед фазой бурста, а не после.',
        'item.sword.name': 'Клинок Рассвета',
        'item.sword.brief': 'Легендарный двуручный меч. Наносит 420–580 урона и поджигает цель, нанося дополнительно 40 урона в секунду.',
        'item.sword.detailed': 'Клинок Рассвета — легендарный двуручный меч, выкованный из осколков павшей звезды.\n\n• Урон: 420–580\n• Скорость: 1.4\n• DPS: ~357\n• Бонус: +85 Силы, +40 Крит. удар\n• Эффект: «Пламя Рассвета» — поджигает цель, 40 ед. урона/сек на 5 сек\n\nГде найти: выпадает с босса «Пепельный Лорд» в рейде Огненная Цитадель (шанс 4%). Альтернатива — квест «Последний Луч» после репутации Exalted с Орденом Рассвета.\n\nСборка: сочетается с сетом «Пылающее Сердце» (+15% урона огнём) и кольцом «Око Дракона».',
        'item.golem.name': 'Древний Голем Теней',
        'item.golem.brief': 'Мини-босс 52 уровня. Уязвим к магии света. Главная угроза — АОЕ-удар по земле, который оглушает на 3 секунды.',
        'item.golem.detailed': 'Древний Голем Теней — элитный мини-босс 52 уровня, охраняющий сундуки в Подземелье Теней.\n\n• Здоровье: 180 000\n• Уровень: 52 (элита)\n• Слабость: Свет (+50% урона)\n• Сопротивление: Физический урон (−30%)\n\nАтаки:\n1. «Удар Тени» — АОЕ по земле, оглушение 3 сек. Отбегай от красного круга!\n2. «Каменный кулак» — одиночный удар по танку, ~8к урона.\n3. «Буря осколков» (30% HP) — призывает 4 адда, добивай быстро.\n\nТактика: танк держит агро, ДД бьют с расстояния. На 30% HP фокус на аддах. Награда: 5к опыта, шанс легендарного лута.',
        'item.chest.name': 'Зашифрованный Сундук',
        'item.chest.brief': 'Редкий сундук с эпическим лутом. Требует Ключ Теней или Взлом (уровень 45). Внутри — золото и шанс легендарного предмета.',
        'item.chest.detailed': 'Зашифрованный Сундук — редкий интерактивный объект в Подземелье Теней.\n\n• Редкость: Редкий\n• Требование: Ключ Теней или Взлом 45+\n\nСодержимое:\n• Золото: 150–400\n• Шанс эпического предмета: 60%\n• Шанс легендарного предмета: 5%\n\nКак открыть: Ключ Теней (дроп с Голема), Взлом (навык 45+), или Сила (шанс порчи 30%).\n\nСовет: всегда открывай ключом или взломом. После открытия спавнится через 30 минут.',

        // Теги предметов
        'tag.Расходник': 'Расходник', 'tag.Эпический': 'Эпический', 'tag.Мана': 'Мана',
        'tag.Оружие': 'Оружие', 'tag.Легендарный': 'Легендарный',
        'tag.Босс': 'Босс', 'tag.Элитный': 'Элитный',
        'tag.Объект': 'Объект', 'tag.Редкий': 'Редкий', 'tag.Требует ключ': 'Требует ключ',
        'tag.Двуручный меч': 'Двуручный меч', 'tag.Уровень 52': 'Уровень 52',

        // Демо: ответы на вопросы (RU)
        'item.potion.qaWhere': 'Выпадает в Подземелье Теней, крафтится Алхимией (40 ур.) или покупается у Эльдрин в Дейбрейке за 240з.',
        'item.potion.qaStats': 'Восстановление: 500 маны + 100 за 10 сек. Откат 60 сек. Требует 35 уровень.',
        'item.potion.qaPrice': '240 золотых у NPC. На аукционе цена варьируется 180–300з в зависимости от сервера.',

        'item.sword.qaWhere': 'Дроп с «Пепельного Лорда» в Огненной Цитадели (4%) или квест «Последний Луч» при репутации Exalted.',
        'item.sword.qaStats': 'Урон 420–580, DPS ~357, +85 Силы, +40 Крит, эффект поджога 40/сек.',
        'item.sword.qaPrice': 'Предмет привязан при получении — продаже не подлежит.',

        'item.golem.qaWhere': 'Подземелье Теней, третья комната. Спавн каждые 25 минут.',
        'item.golem.qaStats': 'HP: 180к. Слабость к Свету (+50%), сопротивление к физике (−30%). АОЕ-оглушение, призыв аддов на 30%.',
        'item.golem.qaPrice': 'Босс не продаётся. Награда: опыт, лут, ключ от сундука.',

        'item.chest.qaWhere': 'Подземелье Теней, возле босса Голема. Спавн 30 мин.',
        'item.chest.qaStats': 'Нужен Ключ Теней или Взлом 45+. Лут: золото, шанс эпика 60%, легендарки 5%.',
        'item.chest.qaPrice': 'Содержимое: 150–400 золота + предметы. Ключ Теней стоит ~500з на аукционе.',
    },

    en: {
        // Nav
        'nav.demo': 'Demo',
        'nav.features': 'Features',
        'nav.how': 'How it works',
        'nav.pricing': 'Pricing',
        'nav.login': 'Log in',
        'nav.profile': 'Dashboard',
        'nav.download': 'Download beta',

        'lang.label': 'EN',

        // Hero
        'hero.badge': 'AI Powered • Beta 0.9 available now',
        'hero.title1': 'See an item —',
        'hero.title2': 'know it instantly',
        'hero.subtitle': 'An AI assistant that analyzes your screen right during the game. Select any item, boss or location — and get an answer without a single Alt-Tab.',
        'hero.cta1': 'Download beta',
        'hero.cta2': 'Watch demo',
        'hero.os': 'Windows 10/11 • Free during beta testing',

        // Demo
        'demo.label': 'LIVE DEMO',
        'demo.title': 'Try it right now',
        'demo.subtitle': 'Click any item in the game window — the AI will highlight it and tell you everything you need to know. Switch modes and ask your own questions.',
        'demo.scene': 'Eldoria Online — Shadow Dungeon',
        'demo.hint': '👆 Click an item for the AI to analyze it',
        'demo.analyzing': 'Analyzing...',
        'demo.detected': 'Detected',
        'demo.waiting': '— awaiting selection —',
        'demo.mode.brief': 'Brief',
        'demo.mode.detailed': 'Detailed',
        'demo.aiTitle': 'AI Response',
        'demo.aiWaiting': 'Select an item in the game window to get an analysis...',
        'demo.inputPlaceholder': 'Ask something about this item...',
        'demo.noSelection': 'Select an item in the game window first!',
        'demo.noData': 'No exact data on this item yet. Try asking "where to find?", "stats" or "how much?" — I know the answers to these.',

        // Features
        'features.label': 'WHY GAME-VISION',
        'features.title': 'Game-changing technology',
        'features.f1.title': 'No immersion break',
        'features.f1.desc': 'No Alt-Tab, no minimizing. The analysis appears over your screen in a split second — you never leave the fight or lose focus.',
        'features.f2.title': 'Multi-game support',
        'features.f2.desc': 'MMORPGs, shooters, strategies, survival. The AI recognizes items, enemies, UI and locations across dozens of popular titles.',
        'features.f3.title': 'Context-aware prompts',
        'features.f3.desc': 'Ask your own questions in text: "how to craft?", "boss weak points?", "best build?". The AI answers based on what it sees on screen.',

        // How
        'how.label': '3 STEPS',
        'how.title': 'How it works',
        'how.step1.title': 'Bind a hotkey',
        'how.step1.desc': 'Assign a convenient key combo. One press — and the overlay is ready, right over your game.',
        'how.step2.title': 'Select an area',
        'how.step2.desc': 'Hold and drag a frame over an item, boss or UI element. The snapshot is sent for analysis.',
        'how.step3.title': 'Get the answer',
        'how.step3.desc': 'The AI instantly prints everything it knows about the selected object. Brief or detailed — your choice.',

        // Pricing
        'pricing.label': 'PRICING',
        'pricing.title': 'Simple and honest pricing',
        'pricing.subtitle': 'One plan — no hidden fees or auto-renewal.',
        'pricing.plan.name': '1-month access',
        'pricing.plan.desc': 'Full access to Game-Vision AI for 30 days. No limits.',
        'pricing.plan.price': '$5',
        'pricing.plan.usd': '/ ~450 ₽',
        'pricing.plan.cta': 'Buy subscription',
        'pricing.plan.cta.loggedIn': 'Proceed to payment',
        'pricing.feature1': 'Unlimited AI item analysis',
        'pricing.feature2': 'All games supported',
        'pricing.feature3': 'Custom prompts',
        'pricing.feature4': 'Priority support',

        // Auth modals
        'auth.login.title': 'Log in to your account',
        'auth.login.subtitle': 'Good to see you again, player!',
        'auth.register.title': 'Create an account',
        'auth.register.subtitle': 'Join Game-Vision in a minute',
        'auth.email': 'Email',
        'auth.password': 'Password',
        'auth.passwordHint': 'At least 6 characters',
        'auth.loginBtn': 'Log in',
        'auth.registerBtn': 'Sign up',
        'auth.toRegister': 'No account? Sign up',
        'auth.toLogin': 'Already have an account? Log in',
        'auth.google': 'Continue with Google',
        'auth.or': 'or',
        'auth.loading': 'Loading...',

        // Profile
        'profile.title': 'Dashboard',
        'profile.welcome': 'Hello, player!',
        'profile.email': 'Email:',
        'profile.subscription': 'Subscription',
        'profile.status': 'Status',
        'profile.statusActive': 'Active',
        'profile.statusExpired': 'Expired',
        'profile.statusInactive': 'Not purchased',
        'profile.purchased': 'Purchased',
        'profile.expires': 'Expires',
        'profile.left': 'Left',
        'profile.days': 'days',
        'profile.renew': 'Renew subscription',
        'profile.logout': 'Log out',
        'profile.notSet': '—',
        'profile.back': 'Back to home',
        'profile.protected': 'This section is available to authorized users only',

        // Messages
        'msg.loginSuccess': 'Logged in successfully!',
        'msg.registerSuccess': 'Account created! Check your email to confirm.',
        'msg.logoutSuccess': 'You have logged out.',
        'msg.subActivated': 'Subscription activated for 30 days!',
        'msg.loginRequired': 'Log in to your account to continue',
        'msg.error': 'An error occurred. Please try again.',

        'footer.copyright': '© 2026 Game-Vision Analyzer. Beta version. Made for gamers.',

        // Demo quick questions
        'demo.q.where': 'where to find?',
        'demo.q.stats': 'stats',
        'demo.q.price': 'how much?',

        // Demo items
        'item.potion.name': 'Greater Mana Potion',
        'item.potion.brief': 'An epic potion that instantly restores 500 mana. Perfect for mages and priests in long fights.',
        'item.potion.detailed': 'Greater Mana Potion — an epic consumable that instantly restores 500 mana and an additional 100 over 10 seconds.\n\n• Restore: 500 + 100 (10s)\n• Cooldown: 60 sec\n• Level: 35+\n\nWhere to find: drops from elite mobs in the Shadow Dungeon, crafted via Alchemy (level 40) from Blue Crystals and Moon Dust. Also sold by vendor Eldrin in Daybreak City for 240 gold.\n\nTip: stacks up to 20. Best used before a burst phase, not after.',
        'item.sword.name': 'Blade of Dawn',
        'item.sword.brief': 'A legendary two-handed sword. Deals 420–580 damage and ignites the target for an extra 40 damage per second.',
        'item.sword.detailed': 'Blade of Dawn — a legendary two-handed sword forged from the shards of a fallen star.\n\n• Damage: 420–580\n• Speed: 1.4\n• DPS: ~357\n• Bonus: +85 Strength, +40 Crit\n• Effect: "Dawnflame" — ignites target, 40 dmg/sec for 5 sec\n\nWhere to find: drops from boss "Ashen Lord" in the Fire Citadel raid (4% chance). Alternative — the quest "Last Ray" after Exalted reputation with the Order of Dawn.\n\nBuild: pairs well with the "Blazing Heart" set (+15% fire damage) and the "Dragon Eye" ring.',
        'item.golem.name': 'Ancient Shadow Golem',
        'item.golem.brief': 'Level 52 mini-boss. Vulnerable to light magic. Main threat — a ground AOE slam that stuns for 3 seconds.',
        'item.golem.detailed': 'Ancient Shadow Golem — an elite level 52 mini-boss guarding chests in the Shadow Dungeon.\n\n• Health: 180,000\n• Level: 52 (elite)\n• Weakness: Light (+50% damage)\n• Resistance: Physical (−30%)\n\nAttacks:\n1. "Shadow Slam" — ground AOE, 3-sec stun. Run from the red circle!\n2. "Stone Fist" — single-target tank hit, ~8k damage.\n3. "Shard Storm" (30% HP) — summons 4 adds, burn them fast.\n\nTactics: tank holds aggro, DPS hits from range. At 30% HP focus the adds. Reward: 5k XP, chance for legendary loot.',
        'item.chest.name': 'Encrypted Chest',
        'item.chest.brief': 'A rare chest with epic loot. Requires a Shadow Key or Lockpicking (level 45). Contains gold and a chance for a legendary item.',
        'item.chest.detailed': 'Encrypted Chest — a rare interactive object in the Shadow Dungeon.\n\n• Rarity: Rare\n• Requires: Shadow Key or Lockpicking 45+\n\nContents:\n• Gold: 150–400\n• Epic item chance: 60%\n• Legendary item chance: 5%\n\nHow to open: Shadow Key (drop from the Golem), Lockpicking (skill 45+), or Force (30% loot-destruction chance).\n\nTip: always open with a key or lockpicking. Respawns 30 minutes after opening.',

        // Tags
        'tag.Расходник': 'Consumable', 'tag.Эпический': 'Epic', 'tag.Мана': 'Mana',
        'tag.Оружие': 'Weapon', 'tag.Легендарный': 'Legendary',
        'tag.Босс': 'Boss', 'tag.Элитный': 'Elite',
        'tag.Объект': 'Object', 'tag.Редкий': 'Rare', 'tag.Требует ключ': 'Needs key',
        'tag.Двуручный меч': 'Two-handed sword', 'tag.Уровень 52': 'Level 52',

        // Demo: Q&A answers (EN)
        'item.potion.qaWhere': 'Drops in the Shadow Dungeon, crafted via Alchemy (lvl 40) or bought from Eldrin in Daybreak for 240g.',
        'item.potion.qaStats': 'Restore: 500 mana + 100 over 10 sec. Cooldown 60 sec. Requires level 35.',
        'item.potion.qaPrice': '240 gold from NPC. Auction house price ranges 180–300g depending on the server.',

        'item.sword.qaWhere': 'Drop from "Ashen Lord" in the Fire Citadel (4%) or the "Last Ray" quest at Exalted reputation.',
        'item.sword.qaStats': 'Damage 420–580, DPS ~357, +85 Strength, +40 Crit, ignite effect 40/sec.',
        'item.sword.qaPrice': 'Soulbound on pickup — cannot be sold.',

        'item.golem.qaWhere': 'Shadow Dungeon, third room. Spawns every 25 minutes.',
        'item.golem.qaStats': 'HP: 180k. Weak to Light (+50%), resistant to physical (−30%). AOE stun, summons adds at 30%.',
        'item.golem.qaPrice': 'Boss is not sellable. Reward: XP, loot, chest key.',

        'item.chest.qaWhere': 'Shadow Dungeon, near the Golem boss. Respawns in 30 min.',
        'item.chest.qaStats': 'Needs Shadow Key or Lockpicking 45+. Loot: gold, 60% epic chance, 5% legendary.',
        'item.chest.qaPrice': 'Contents: 150–400 gold + items. Shadow Key costs ~500g at the auction house.',
    }
};

// ============================================================
// Логика переключения языка
// ============================================================

const SUPPORTED_LANGS = ['ru', 'en'];
let currentLang = localStorage.getItem('gv-lang') || 'ru';

/**
 * Применяет перевод ко всем элементам с data-i18n.
 * @param {string} lang - 'ru' или 'en'
 */
function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) lang = 'ru';
    currentLang = lang;
    localStorage.setItem('gv-lang', lang);
    document.documentElement.lang = lang;

    const dict = translations[lang];

    // Текстовые элементы
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (dict[key] !== undefined) {
            el.textContent = dict[key];
        }
    });

    // Placeholder'ы
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (dict[key] !== undefined) {
            el.placeholder = dict[key];
        }
    });

    // Обновить активное состояние переключателя
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.lang === lang);
    });

    // Обновить демо, если оно есть на странице
    if (typeof refreshDemo === 'function') refreshDemo();

    // Обновить профиль, если он есть на странице
    if (typeof refreshProfile === 'function') refreshProfile();

    // Уведомление для других скриптов
    document.dispatchEvent(new CustomEvent('langchange', { detail: { lang } }));
}

/**
 * Получить перевод по ключу.
 * @param {string} key
 * @returns {string}
 */
function t(key) {
    return (translations[currentLang] && translations[currentLang][key]) || key;
}

/**
 * Переключатель RU/EN.
 */
function toggleLanguage() {
    setLanguage(currentLang === 'ru' ? 'en' : 'ru');
}

// Глобальный доступ
window.translations = translations;
window.setLanguage = setLanguage;
window.t = t;
window.toggleLanguage = toggleLanguage;
window.currentLang = () => currentLang;

// Применить сохранённый язык при загрузке
document.addEventListener('DOMContentLoaded', () => setLanguage(currentLang));
