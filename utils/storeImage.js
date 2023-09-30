const axios = require("axios");
const crypto = require("crypto-js");
const path = require("path");
const fs = require("fs");

function generateUniqueName(url) {
  const hash = crypto.SHA256(url).toString(crypto.enc.Hex);
  return hash;
}

function getFileExtension(url) {
  const urlObj = new URL(url);
  const s = urlObj.pathname.split(".");
  return s[s.length - 1];
}
/* 
https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png
*/

async function storeImage(url, imagesDir) {
  const uniqueName = generateUniqueName(url);
  const fileExtension = getFileExtension(url);
  const fileName = `${uniqueName}.${fileExtension}`;

  const p = path.join(imagesDir, fileName);

  const exists = await fs.promises
    .access(p, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

  if (!exists) {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    await fs.promises.writeFile(p, response.data);
  }
  return fileName;
}

module.exports = { storeImage };
