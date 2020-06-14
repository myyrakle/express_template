// if(env_val === 'dev') {
//   var RedisStore      = require('connect-redis')(session);
//   var redis           = require('redis');

//   const redisClient = redis.createClient(6379,"localhost");
//   redisClient.auth('svsv');       // redis.conf password (requirepass)
//   var redisConfig = {
//     "host": "localhost",
//     "port": 6379,
//     "prefix": "session:",
//     "db": 0,
//     "client": redisClient
//   };

//   const cryptoRandomString = require('crypto-random-string');

//   const redis_session = session({
//     secret : cryptoRandomString({length: 50}),
//     resave : false,
//     store  : new RedisStore(redisConfig),
//     saveUninitialized:false,
//     cookie : {
//         maxAge : 1000 * 60 * 60
//     }
//   });

//   app.use(redis_session);
// }
