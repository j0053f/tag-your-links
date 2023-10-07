const {
  getData,
  tmpStoreLinkpreview,
  storeLinkpreview,
  addUser,
  checkUserExistance,
} = require("./data");

describe("data leyer", () => {
  test("checkUserExistance", () => {
    const x = checkUserExistance("admin", "password");
    expect(x).toBe(true);
  });

  test("user is existance problem", () => {
    expect(() => addUser("admin", "password")).toThrow(Error);
  });
  it("admin, password is already exists!", () => {
    const e = {
      user: {
        admin: { linkpreview: {}, linkpreviewId: [], tag: {}, tagId: [] },
      },
      userId: ["admin"],
      userInfo: { admin: { password: "password", username: "admin" } },
    };
    expect(getData()).toEqual(e);
  });
  it("should have ali as user", async () => {
    addUser("ali", "password");

    const e = {
      user: {
        admin: { linkpreview: {}, linkpreviewId: [], tag: {}, tagId: [] },
        ali: { linkpreview: {}, linkpreviewId: [], tag: {}, tagId: [] },
      },
      userId: ["admin", "ali"],
      userInfo: {
        admin: { username: "admin", password: "password" },
        ali: { username: "ali", password: "password" },
      },
    };

    expect(getData()).toEqual(e);
  });

  test("storeLinkpreview", async () => {
    const { id, data } = await tmpStoreLinkpreview("https://yahoo.com");
    storeLinkpreview("admin", id, []);
    adminUserData = getData("admin");
    expect(data).toEqual({
      success: true,
      title:
        "Yahoo | Mail, Weather, Search, Politics, News, Finance, Sports & Videos",
      description:
        "Latest news coverage, email, free stock quotes, live scores and video are just the beginning. Discover more every day at Yahoo!",
      image:
        "a38dfc294e232c091b72b640695d66383e6373a25a5c5e32f6879b2c118dd6cd.png",
      sitename: undefined,
      ogUrl: "http://www.yahoo.com",
      type: "website",
      domain: "yahoo.com",
      favicon: undefined,
    });
    expect(adminUserData).toEqual({
      linkpreview: {
        [id]: {
          success: true,
          title:
            "Yahoo | Mail, Weather, Search, Politics, News, Finance, Sports & Videos",
          description:
            "Latest news coverage, email, free stock quotes, live scores and video are just the beginning. Discover more every day at Yahoo!",
          image:
            "a38dfc294e232c091b72b640695d66383e6373a25a5c5e32f6879b2c118dd6cd.png",
          sitename: undefined,
          ogUrl: "http://www.yahoo.com",
          type: "website",
          domain: "yahoo.com",
          favicon: undefined,
        },
      },
      linkpreviewId: [id],
      tag: { [id]: [] },
      tagId: [],
    });
  });
});
