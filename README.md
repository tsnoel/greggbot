# greggbot

## Requirements

### Software
- node.js
- npm
- nodemon (optional)

### You also may need these if your computer doesn't have them:
- The impact font (ttf-mscorefonts-install)
- Stuff canvas.js needs to produce png files

### You'll also need a config.json file. It looks like this.
```json
{
    "prefix": "String",
    "greeting": "String",
    "activity": "String (optional)",
    "token": "String (get this from discord)"
}
```

## Install & Run

In the cloned repo, run `npm i`

If you have nodemon, run `nodemon index.js --config nodemon.json`
Otherwise, just run `node index.js`
