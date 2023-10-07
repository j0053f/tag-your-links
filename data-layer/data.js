const { getLinkPreview } = require("../utils/getLinkPreview");
const { storeImage } = require("../utils/storeImage");
const path = require("path");

/**
 * @typedef {Object} TLinkpreview
 * @property {boolean} success
 * @property {string} title
 * @property {string} description
 * @property {string} image
 * @property {string} sitename
 * @property {string} ogUrl
 * @property {string} type
 * @property {string} domain
 * @property {string} favicon
 */

/**
 * @typedef {Object} TData
 * @property {Object.<string, TLinkpreview>} linkpreview
 * @property {Object.<string, string[]>} tag
 * @property {string[]} linkpreviewId
 * @property {string[]} tagId
 */

/**
 * @typedef {Object} TUser
 * @property {string} name
 * @property {string} password
 */

/**
 * @typedef {Object} TUserData
 * @property {Object.<string, TData>} user
 * @property {Object.<string, TUser>} userInfo
 * @property {string[]} userId
 */
/** @type {TUserData} */
const data = {
  user: { admin: { linkpreview: {}, linkpreviewId: [], tag: {}, tagId: [] } },
  userId: ["admin"],
  userInfo: { admin: { username: "admin", password: "password" } },
};

/** @type {Object.<string, TLinkpreview>} */
const tmpLinkpreview = {};

function generateUniqueId() {
  const timestamp = new Date().getTime();
  const randomNum = Math.floor(Math.random() * 10000);

  const uniqueId = `${timestamp}-${randomNum}`;
  return uniqueId;
}
function getData(username) {
  if (!username) return data;
  return data.user[username];
}

async function tmpStoreLinkpreview(url) {
  const linkpreview = await getLinkPreview(url);
  const image = await storeImage(
    linkpreview.image,
    path.join(__dirname, "../images")
  );

  const data = { ...linkpreview, image };
  const id = generateUniqueId();
  tmpLinkpreview[id] = data;
  return { data, id };
}

function storeLinkpreview(username, id, tags) {
  const linkpreview = tmpLinkpreview[id];
  // add linkpreview
  if (!data.user[username].linkpreview) data.user[username].linkpreview = {};
  data.user[username].linkpreview[id] = linkpreview;
  // push linkpreview-id
  data.user[username].linkpreviewId.push(id);
  //push tags
  data.user[username].tag[id] = tags;
  //add new tags to tag list
  data.user[username].tagId = [
    ...new Set(data.user[username].tagId.concat(tags)),
  ];

  //remove linkpreview from the tmp
  delete tmpLinkpreview[id];

  return data;
}

function addUser(username, password) {
  if (!data.userId.includes(username)) {
    data.userId.push(username);
    data.userInfo[username] = { username, password };
    data.user[username] = {
      linkpreview: {},
      linkpreviewId: [],
      tag: {},
      tagId: [],
    };
    return true;
  }
  throw new Error("user previouslly exists!");
}

function checkUserExistance(username, password) {
  if (
    data.userId.includes(username) &&
    data.userInfo[username].password === password
  )
    return true;
  return false;
}

module.exports = {
  getData,
  tmpStoreLinkpreview,
  storeLinkpreview,
  addUser,
  checkUserExistance,
};
