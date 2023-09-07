const axios = require("axios");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();

function genFilenameFromURL(imageURL) {
  const urlObj = new URL(imageURL);
  const segments = urlObj.pathname.split("/");
  const filename = segments[segments.length - 1];
  return filename;
}

router.get("/storeimage", async (req, res) => {
  const imageURL = req.query.url;
  const filename = genFilenameFromURL(imageURL);
  try {
    const response = await axios.get(imageURL, { responseType: "arraybuffer" });

    const uniqueFilename = Date.now() + filename;
    const imagePath = path.join(__dirname, "..", "images", uniqueFilename);

    fs.writeFileSync(imagePath, response.data);
    res.send({ imagePath: path.join("images", uniqueFilename) });
  } catch (error) {}
});

module.exports = router;
