const router = require("express").Router();
const path = require("path");
const { getLinkPreview } = require("../utils/getLinkPreview");
const { storeImage } = require("../utils/storeImage");
const { validateUrl } = require("../utils/linkPreview");

router.get("/linkpreview", async (req, res) => {
  const baseUrl = `http://localhost:4000/api/internal`;
  const url = req.query?.url;

  if (!url) {
    res.status(400).json({ success: false, message: "please provide URL" });
  }
  if (!validateUrl(url)) {
    res.status(400).json({ success: false, message: "Invalid URL" });
  }

  try {
    const data = await getLinkPreview(url);
    console.log(data);
    const image = await storeImage(
      data.image,
      path.join(__dirname, "../images")
    );
    res.json({ ...data, image });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
