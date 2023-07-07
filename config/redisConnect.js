const redis = require("redis");

const client = redis.createClient({
  password: process.env.PASSWORD_REDIS,
  socket: {
      host: process.env.HOST_REDIS,
      port: process.env.PORT_REDIS
  }
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
