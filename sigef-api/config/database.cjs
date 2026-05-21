const path = require("path");
const fs = require("fs");

const configPath = path.resolve(__dirname, "..", "src", "core", "config", "database.json");
const raw = fs.readFileSync(configPath, "utf8");
const parsed = JSON.parse(raw);

function toSequelizeCliShape(name) {
  const c = parsed[name] || {};
  const options = c.options || {};
  return {
    username: c.username || null,
    password: c.password || null,
    database: c.database || null,
    host: options.host || null,
    port: options.port || null,
    dialect: options.dialect || process.env.DB_DIALECT || "mysql",
    logging: options.logging || false,
  };
}

module.exports = {
  development: toSequelizeCliShape("development"),
  test: toSequelizeCliShape("test"),
  production: toSequelizeCliShape("production"),
};
