const router = require("express").Router();
const path = require("path");
const { validateUrl } = require("../utils/linkPreview");

const {
  tmpStoreLinkpreview,
  storeLinkpreview,
  checkUserExistance,
  addUser,
  getData,
} = require("../data-layer/data");

const authenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).send("Unauthorized. Please provide credentials.");
  }

  const [, base64Credentials] = authHeader.split(" ");
  const credentials = Buffer.from(base64Credentials, "base64").toString(
    "utf-8"
  );
  const [username, password] = credentials.split(":");
  console.log(username, password);
  if (checkUserExistance(username, password)) {
    req.username = username;
    next(); // Authentication succeeded, continue to the next middleware/route handler
  } else {
    return res.status(401).send("Unauthorized. Invalid credentials.");
  }
};

router.get("/linkpreview", async (req, res) => {
  const url = req.query?.url;

  if (!url) {
    res.status(400).json({ success: false, message: "please provide URL" });
  }
  if (!validateUrl(url)) {
    res.status(400).json({ success: false, message: "Invalid URL" });
  }

  try {
    const { data, id } = await tmpStoreLinkpreview(url);
    res.json({ data, id });
  } catch (err) {
    // res.status(400).json({ success: false, message: "Invalid URL" });
  }
});

router.get("/linkpreview/:username", authenticate, (req, res) => {
  const username = req.username;
  const data = getData(username);
  res.json(data);
});

router.post("/linkpreview", authenticate, (req, res) => {
  const { id, tags } = req.body;
  const username = req.username;

  storeLinkpreview(username, id, tags);
  res.json(id);
});

router.post("/user", (req, res) => {
  const { username, password } = req.body;
  console.log(username, password);
  if (addUser(username, password)) {
    res.status(200).json({ message: "Registration successful" });
  } else {
    res.status(400).json({ message: "username already exists" });
  }
});
module.exports = router;
