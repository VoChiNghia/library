const redis = require("redis");
const client = redis.createClient({
  socket: {
    host: process.env.HOST_REDIS, // Redis container hostname
    port: process.env.PORT_REDIS, // Redis container port
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

module.exports = { redisConnections, client };
