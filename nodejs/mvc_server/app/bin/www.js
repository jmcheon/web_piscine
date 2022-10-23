const app = require("../app");
const logger = require("../src/config/logger");
const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  logger.info(`${PORT} server`);
});
