require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const internalLinkpreviewRouter = require("./routes/linkpreview-internal");
const storeImageRouter = require("./routes/storeimage-internal");
const linkpreviewRouter = require("./routes/linkpreview");
const getImageRouter = require("./routes/getImage");
const app = express();

app.use(cors());
app.use(express.urlencoded({ extended: false }));

app.use(morgan("tiny"));

app.use("/api", linkpreviewRouter);
app.use("/api", getImageRouter);

app.use("/api/internal", storeImageRouter);
app.use("/api/internal", internalLinkpreviewRouter);
const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server listening on PORT: ${PORT}`));
