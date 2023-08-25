const axios = require("axios");
const fs = require("fs");
const path = require("path");
const router = require("express").Router();
router.get("/storeimage", async (req, res) => {
  const imageUrl = req.query.url;
  try {
    const response = await axios.get(imageUrl, { responseType: "arraybuffer" });

    const filename = Date.now() + path.basename(imageUrl);
    const imagePath = path.join(__dirname, "..", "images", filename);

    fs.writeFileSync(imagePath, response.data);
    res.send({ imagePath: path.join("images", filename) });
  } catch (error) {}
});

module.exports = router;
