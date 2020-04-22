require("./env");
const application = require("./dist");

module.exports = application;

if (require.main === module) {
  const config = {
    rest: {
      port: process.env.APP_PORT,
      host: "0.0.0.0",
      openApiSpec: {
        setServersFromRequest: true
      }
    }
  };
  application.main(config).catch(err => {
    console.error("Cannot start the application.", err);
    process.exit(1);
  });
}
