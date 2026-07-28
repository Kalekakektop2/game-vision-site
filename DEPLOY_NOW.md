# Один раз: обновить Netlify-сайт (2 минуты)

Уже сделано автоматически:
- Кнопки «Скачать бета» → GitHub Release `Viewing.exe`
- Прокси `/.netlify/functions/analyze` (ключ только на сервере)
- Репо: https://github.com/Kalekakektop2/game-vision-site
- Release: https://github.com/Kalekakektop2/Viewing-application/releases/latest

## Что сделать тебе

### 1) Залить сайт на Netlify
1. Открой https://app.netlify.com  
2. Найди сайт `symphonious-cobbler-d99370`  
3. **Deploys** → перетащи папку  
   `C:\Users\Admin\game-vision-site`  
   или zip с рабочего стола: `game-vision-site-DEPLOY.zip`

### 2) Ключ Gemini (секрет)
1. Site configuration → **Environment variables**  
2. Add:  
   - `GEMINI_API_KEY` = твой ключ из Google AI Studio  
   - `GEMINI_MODEL` = `gemini-flash-latest` (опционально)  
3. **Trigger deploy** / Redeploy  

Без шага 2 скачивание exe работает, но AI в exe ответит ошибкой «Server misconfigured».

## Проверка
- Сайт → «Скачать бета» → качается `Viewing.exe`  
- Запуск exe → трей → Alt+E → ответ AI  
