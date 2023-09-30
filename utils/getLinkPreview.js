const axios = require("axios");
const {
  getTitle,
  getDescription,
  getImage,
  getSitename,
  getOgUrl,
  getType,
  getDomain,
  getFavicon,
} = require("./linkPreview");
const cheerio = require("cheerio");

async function getLinkPreview(url) {
  const response = await axios.get(url);

  const html = cheerio.load(response.data);
  const title = getTitle(html);
  const description = getDescription(html);
  const image = getImage(url, html);
  const sitename = getSitename(html);
  const ogUrl = getOgUrl(html);
  const type = getType(html);
  const domain = getDomain(url);
  const favicon = getFavicon(url, html);

  const result = {
    success: true,
    title,
    description,
    image,
    sitename,
    ogUrl,
    type,
    domain,
    favicon,
  };
  return result;
}

module.exports = { getLinkPreview };
