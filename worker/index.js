const keys = require("./keys");
const redis = require("redis");

const redisClient = redis.createClient({
  host: keys.redisHost,
  port: keys.redisPort,
  retry_strategy: () => 1000
});

const subscription = redisClient.duplicate();

function fib(index) {
  return index < 2 ? 1 : fib(index - 1) + fib(index - 2)
}

subscription.on('message', (channel, message) => {
  const index = parseInt(message);
  redisClient.hset('values', message, fib(index));
});

subscription.subscribe('insert')
