// ============================================================
// Конфигурация Supabase
// ============================================================
// ВСТАВЬ СВОИ КЛЮЧИ из Supabase → Project Settings → API
// Project URL и anon public ключ
// ============================================================

const SUPABASE_URL = 'https://PLACEHOLDER.supabase.co';
const SUPABASE_ANON_KEY = 'PLACEHOLDER_ANON_KEY';

// Инициализация клиента Supabase
// Если ключи не вставлены — клиент не создаётся, сайт работает в демо-режиме
const sb = (SUPABASE_URL.includes('PLACEHOLDER') || SUPABASE_ANON_KEY.includes('PLACEHOLDER'))
    ? null
    : window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

if (!sb) {
    console.warn(
        '%c[Game-Vision]%c Supabase не настроен. Авторизация и подписки отключены. Демо работает.',
        'color:#00f0ff;font-weight:bold', 'color:#8a8a9a'
    );
}

window.sb = sb;