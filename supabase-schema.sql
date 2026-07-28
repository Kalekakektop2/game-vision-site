-- ============================================================
-- Game-Vision Analyzer: Схема базы данных для Supabase
-- Выполни этот скрипт в Supabase → SQL Editor
-- ============================================================

-- 1. Таблица подписок
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id              UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id         UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    status          TEXT NOT NULL DEFAULT 'inactive'
                    CHECK (status IN ('active', 'expired', 'inactive')),
    purchased_at    TIMESTAMPTZ,
    expires_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT now()
);

-- Индекс для быстрого поиска по пользователю
CREATE INDEX IF NOT EXISTS idx_subscriptions_user_id ON public.subscriptions(user_id);

-- Комментарии к колонкам
COMMENT ON COLUMN public.subscriptions.status IS 'Статус: active=активна, expired=истекла, inactive=не приобретена';
COMMENT ON COLUMN public.subscriptions.purchased_at IS 'Дата покупки подписки';
COMMENT ON COLUMN public.subscriptions.expires_at IS 'Дата окончания (покупка + 30 дней)';

-- ============================================================
-- 2. Row Level Security (RLS) — безопасность на уровне строк
-- ============================================================

-- Включаем RLS
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;

-- Политика SELECT: пользователь видит ТОЛЬКО свою подписку
DROP POLICY IF EXISTS "Пользователь видит свою подписку" ON public.subscriptions;
CREATE POLICY "Пользователь видит свою подписку"
    ON public.subscriptions FOR SELECT
    USING (auth.uid() = user_id);

-- Политика INSERT: пользователь может создать свою подписку
DROP POLICY IF EXISTS "Пользователь создаёт свою подписку" ON public.subscriptions;
CREATE POLICY "Пользователь создаёт свою подписку"
    ON public.subscriptions FOR INSERT
    WITH CHECK (auth.uid() = user_id);

-- Политика UPDATE: пользователь может обновить свою подписку
DROP POLICY IF EXISTS "Пользователь обновляет свою подписку" ON public.subscriptions;
CREATE POLICY "Пользователь обновляет свою подписку"
    ON public.subscriptions FOR UPDATE
    USING (auth.uid() = user_id);

-- Политика DELETE: пользователь может удалить свою подписку
DROP POLICY IF EXISTS "Пользователь удаляет свою подписку" ON public.subscriptions;
CREATE POLICY "Пользователь удаляет свою подписку"
    ON public.subscriptions FOR DELETE
    USING (auth.uid() = user_id);

-- ============================================================
-- 3. Триггер: автоматическое создание подписки при регистрации
-- ============================================================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.subscriptions (user_id, status)
    VALUES (NEW.id, 'inactive');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- Готово! Теперь:
-- ✅ Каждый новый пользователь получает запись в subscriptions (status='inactive')
-- ✅ RLS гарантирует, что юзер видит только свою запись
-- ✅ При покупке подписки обновляются purchased_at, expires_at и status
-- ============================================================
