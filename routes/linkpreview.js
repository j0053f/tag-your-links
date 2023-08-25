const router = require("express").Router();
const axios = require("axios");

router.get("/linkpreview", async (req, res) => {
  const baseUrl = `http://localhost:4000/api/internal`;
  const url = req.query.url;

  try {
    const response1 = await axios.get(`${baseUrl}/linkpreview/?url=${url}`);
    console.log("body" + response1.data);
    const { image } = response1.data;
    const response2 = await axios.get(`${baseUrl}/storeimage/?url=${image}`);
    res.json({ ...response1.data, image: response2.data.imagePath });
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
