let FS = require('fs');

// read the index.html from build folder
let data = FS.readFileSync('./build/index.html', 'utf8');

function insertContent(fullContent, beforeWhat, newContent) {
  // get the position before which newContent has to be added
  const position = fullContent.indexOf(beforeWhat);

  // since splice can be used on arrays only
  let fullContentCopy = fullContent.split('');
  fullContentCopy.splice(position, 0, newContent);

  return fullContentCopy.join('');
}

// will add the <meta> tags needed for cordova app

const defaultSrc = `default-src 'self' * data: gap: https://ssl.gstatic.com 'unsafe-eval' 'unsafe-inline'`;
const styleSrc = `style-src 'self' https://fonts.googleapis.com 'unsafe-inline'`;
const mediaSrc = `media-src *`;
const imgSrc = `img-src 'self' * data: content:`;
const fontSrc = `font-src 'self' https://fonts.gstatic.com data:`;
const scriptSrc = `script-src 'unsafe-inline' 'self' https://connect.facebook.net; object-src 'self'`;
const afterAddingMeta = insertContent(
  data,
  '<link',
  `<meta http-equiv="Content-Security-Policy" content= "${defaultSrc};${styleSrc};${fontSrc};${mediaSrc};${imgSrc};${fontSrc};${scriptSrc} >` +
    `<meta name="format-detection" content="telephone=no">` +
    `<meta name="msapplication-tap-highlight" content="no">`
);

// will add <script> pointing to cordova.js
const afterAddingScript = insertContent(
  afterAddingMeta,
  '<script',
  `<script type="text/javascript" src="cordova.js"></script>`
);

// updates the index.html file
FS.writeFile('./build/index.html', afterAddingScript, 'utf8', err => {
  if (err) {
    throw err;
  }
});
