# Game-Vision вЂ” СЃР°Р№С‚

РџСѓР±Р»РёС‡РЅС‹Р№ URL: https://symphonious-cobbler-d99370.netlify.app/

## РЎРєР°С‡Р°С‚СЊ Р±РµС‚Р°

РљРЅРѕРїРєРё РІРµРґСѓС‚ РЅР° GitHub Release:

https://github.com/Kalekakektop2/game-vision-site/releases/latest/download/Viewing.exe

## API-РїСЂРѕРєСЃРё (РєР»СЋС‡ РЅРµ РІ exe)

- Function: `/.netlify/functions/analyze`
- РЎРµРєСЂРµС‚: **Netlify в†’ Site settings в†’ Environment variables в†’ `GEMINI_API_KEY`**
- РћРїС†РёРѕРЅР°Р»СЊРЅРѕ: `GEMINI_MODEL=gemini-flash-latest`

РџРѕСЃР»Рµ РґРѕР±Р°РІР»РµРЅРёСЏ РїРµСЂРµРјРµРЅРЅРѕР№ вЂ” Redeploy.

## Р”РµРїР»РѕР№

```bash
npx netlify-cli login
npx netlify-cli link   # РІС‹Р±СЂР°С‚СЊ symphonious-cobbler-d99370
npx netlify-cli env:set GEMINI_API_KEY "РІР°С€_РєР»СЋС‡"
npx netlify-cli deploy --prod
```

РР»Рё: Netlify Dashboard в†’ Deploys в†’ drag & drop СЌС‚РѕР№ РїР°РїРєРё.

