# Починить сломанный сайт (1 минута)

## Почему сломалось
На Netlify залился `index.html`, но **не залились** `css/` и `js/` → страница без стилей и скриптов.

## Что сделать сейчас

1. Открой: https://app.netlify.com → сайт **symphonious-cobbler-d99370**
2. **Deploys** → **Drag and drop**
3. Перетащи **всю папку**:
   ```
   C:\Users\Admin\game-vision-site
   ```
   (не zip с вложенной папкой, не только index.html)
4. Дождись **Published**
5. Открой сайт с Ctrl+F5

## Проверка
После деплоя должны открываться:
- https://symphonious-cobbler-d99370.netlify.app/styles.css
- https://symphonious-cobbler-d99370.netlify.app/demo.js

Если 200 — сайт живой.
