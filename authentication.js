const logger = require('./public/utils/logger.cjs');

// basic authentication for each request 
function authen(req, res, next) {
  logger().info("authorization :" + req.headers.authorization);
  logger().info("refresh_token :" + req.headers.refresh_token);
  logger().info("claims_token :" + req.headers.claims_token);
  let authheader = req.headers.authorization ?? 'Basic YWRtaW46cGFzc3dvcmQ='; // todo

  if (!authheader) {
    logger().info("user not authorized 1....");
    let err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }

  let auth = new Buffer.from(authheader.split(' ')[1], 'base64').toString().split(':');
  let user = auth[0];
  let pass = auth[1];

  // todo
  if (user == 'admin' && pass == 'password') {
    logger().info("user authorized....");
    next();
  } else {
    logger().info("user not authorized 2....");
    let err = new Error('You are not authenticated!');
    res.setHeader('WWW-Authenticate', 'Basic');
    err.status = 401;
    return next(err);
  }
}

exports.authentication = { authen };
