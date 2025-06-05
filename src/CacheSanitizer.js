var client = require("./RedisClient");


async function sanitizeCache(timeStamp) {
    try {
        let keys = await client.keys("*");

        keys.forEach(async (key) => {
            var keyValue = JSON.parse(key);
            var from = parseInt(keyValue.from);
            var to = parseInt(keyValue.to);
            if (from <= timeStamp && timeStamp <= to) {
                await client.del(key);
            }
        })
    } catch (error) {
        console.log(error);
    }
}


async function sanitizeCacheMultiple(timeStamps) {
    try {
        let keys = await client.keys("*");

        keys.forEach(async (key) => {
            var keyValue = JSON.parse(key);
            var from = parseInt(keyValue.from);
            var to = parseInt(keyValue.to);
            timeStamps.forEach(async (timeStamp) => {
                if (from <= timeStamp && timeStamp <= to) {
                    await client.del(key);
                }
            })
        })
    } catch (error) {
        console.log(error);
    }
}


module.exports = { sanitizeCache, sanitizeCacheMultiple };