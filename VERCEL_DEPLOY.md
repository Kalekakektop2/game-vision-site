# Деплой на Vercel (сайт + API)

## Зачем Vercel
Netlify отдавал **404** на AI-прокси (function не была задеплоена).  
На Vercel endpoint: **`/api/analyze`** — стабильный serverless.

## Один раз в браузере

1. Зайди на https://vercel.com → Login (через GitHub **Kalekakektop2**).
2. **Add New Project** → Import  
   `Kalekakektop2/game-vision-site`
3. Framework: **Other** / no build command  
   Output: leave empty (static root)
4. **Environment Variables** (Production + Preview):
   - `GEMINI_API_KEY` = твой ключ Google AI Studio  
   - `GEMINI_MODEL` = `gemini-flash-latest`
5. **Deploy**

URL будет вида:
- `https://game-vision-site.vercel.app`  
- API: `https://game-vision-site.vercel.app/api/analyze`

## CLI (если уже `vercel login`)

```bash
cd game-vision-site
npx vercel login
npx vercel --prod
npx vercel env add GEMINI_API_KEY
```

## После деплоя
1. Проверка:  
   `POST https://<твой>.vercel.app/api/analyze`  
2. Пересобери Viewing.exe (backend URL уже `.../api/analyze`)  
3. Кнопки «Скачать бета» могут остаться на GitHub Release (как сейчас)

## Netlify
Можно оставить старый Netlify как зеркало лендинга, но **AI backend** лучше на Vercel.
