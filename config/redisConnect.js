const redis = require("redis");
const client = redis.createClient({
  socket: {
    host: "redis", // Redis container hostname
    port: 6379, // Redis container port
  },
});

const redisConnections = async () => {
  try {
    await client.connect();
    console.log("connected redis");
  } catch (error) {
    console.log(error);
  }
};

module.exports = { redisConnections,client };
