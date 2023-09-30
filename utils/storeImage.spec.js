const { storeImage } = require("./storeImage");
describe("storeImage", () => {
  it("should ", async () => {
    const url =
      "https://s.yimg.com/cv/apiv2/social/images/yahoo_default_logo.png";

    const imagesDir = "./images";
    const path = await storeImage(url, imagesDir);
    expect(path).toBe(
      "a38dfc294e232c091b72b640695d66383e6373a25a5c5e32f6879b2c118dd6cd.png"
    );
  });
});
