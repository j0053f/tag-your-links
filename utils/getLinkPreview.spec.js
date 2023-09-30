const { getLinkPreview } = require("./getLinkPreview");
describe("getLinkPreview", () => {
  it("should resolve with success: true", async () => {
    const { success } = await getLinkPreview("https://yahoo.com");
    expect(success).toEqual(true);
  });
  it("throw Error", async () => {
    try {
      await getLinkPreview("http://www.dsfadaf.com/");
      fail("the function should throw error");
    } catch (error) {
      console.log(error.name);
    }
  });
});
