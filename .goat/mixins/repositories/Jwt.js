const jwt = require("jsonwebtoken");
const Auth = require("./Auth");
module.exports = (() => {
  /**
   *
   * Formats the response object
   *
   * @param {*} param0
   *
   */
  const response = ({ decoded, error }) => [error, decoded];
  /**
   *
   * Given a JWT token an a secret verifies that
   * the signature and the exp dates are valid
   *
   * @param {Object} param
   * @param {string} param.token JWT token
   * @param {string} param.secret Secret for signing the token
   * @param {Object} param.options Options for the decoding
   * @returns {boolean}
   *
   */
  const verify = ({ token, secret, options }) => {
    if (!token) {
      return response({
        error: new Error("Token not present")
      });
    }
    try {
      const decoded = jwt.verify(token, secret, options);
      return response({ decoded });
    } catch (e) {
      return response({ error: e });
    }
  };
  /**
   *
   * Given a Express req object, extracts the possible
   * tokens to authenticate the user
   *
   * @param {*} req
   *
   */
  const getTokenFromRequest = req => {
    const headers = req.headers;
    const authHeader = headers["authorization"]
      ? headers["authorization"].split(" ")[1]
      : undefined;
    const urlToken = req.query.token;
    return headers["x-jwt-token"] || authHeader || urlToken;
  };
  /**
   *
   * Extracts the secret key from the ENV variables
   *
   * @returns {String}
   *
   */
  const getScretFromEnv = () => {
    return process.env.JWT_SECRET_BUFFER
      ? Buffer.from(process.env.JWT_SECRET_BUFFER, "base64")
      : process.env.JWT_SECRET;
  };
  /**
   *
   * Sign a payload using JWT
   *
   * @param {*} param0
   */
  const sign = ({ payload, secret, options }) => {
    return jwt.sign(payload, secret, options);
  };
  /**
   *
   * Given the express APP, it defined a middleware
   * to process the JWT token for LB apps
   *
   * @param {*} app
   */
  const expressMiddleware = app => {
    app
      .remotes()
      .phases.addBefore("invoke", "options-from-request")
      .use(async (ctx, next) => {
        const token = getTokenFromRequest(ctx.req);
        const secret = getScretFromEnv();
        const [tokenError, decoded] = verify({ token, secret });
        const anonymos = {
          data: { email: "ANONYMOUS", name: "ANONYMOUS" },
          _id: null
        };
        ctx.args.options = ctx.args.options || {};
        ctx.args.options.token = token;
        ctx.args.options.validToken = tokenError ? false : true;
        ctx.args.options.user = tokenError
          ? anonymos
          : await Auth.getUserById(decoded.user._id, app);
        next();
      });
  };

  return Object.freeze({
    expressMiddleware,
    sign,
    verify,
    getTokenFromRequest,
    getScretFromEnv
  });
})();
