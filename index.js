require("dotenv").config();
const express = require("express");
const morgan = require("morgan");

const internalLinkpreviewRouter = require("./routes/linkpreview-internal");
const storeImageRouter = require("./routes/storeimage-internal");
const linkpreviewRouter = require("./routes/linkpreview");

const app = express();

app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));

app.use("/", linkpreviewRouter);
app.use("/internal", storeImageRouter);
app.use("/internal", internalLinkpreviewRouter);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
