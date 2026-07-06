const webpush = require("web-push");
const env = require("./env");

webpush.setVapidDetails(
  env.webPushEmail,
  env.webPushPublicKey,
  env.webPushPrivateKey
);

module.exports = webpush;