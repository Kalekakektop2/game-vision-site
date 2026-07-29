# Game-Vision — сайт

Публичный URL: https://symphonious-cobbler-d99370.netlify.app/

## Скачать бета

Кнопки ведут на GitHub Release:

https://github.com/Kalekakektop2/game-vision-site/releases/latest/download/Viewing.exe

## API-прокси (ключ не в exe)

- Function: `/.netlify/functions/analyze`
- Секрет: **Netlify → Site settings → Environment variables → `GEMINI_API_KEY`**
- Опционально: `GEMINI_MODEL=gemini-flash-latest`

После добавления переменной — Redeploy.

## Деплой

```bash
npx netlify-cli login
npx netlify-cli link   # выбрать symphonious-cobbler-d99370
npx netlify-cli env:set GEMINI_API_KEY "ваш_ключ"
npx netlify-cli deploy --prod
```

Или: Netlify Dashboard → Deploys → drag & drop этой папки.
