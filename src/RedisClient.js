var redis = require("redis");

var client = redis.createClient();
client.connect();

module.exports = client;