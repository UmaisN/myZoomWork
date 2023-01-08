const env = process.env.NODE_ENV || "production";

//insert your API Key & Secret for each environment, keep this file local and never push it to a public repo for security purposes.
const config = {
  development: {
    APIKey: "sJ6V1zLdiXFWJ4vJPKhzDOzqt1Hx8GzPCDzp",
    APISecret: "Dee5TvIIJocPQQoDlCoTvypc4pgWulUiSNYS",
  },
  production: {
    APIKey: "sJ6V1zLdiXFWJ4vJPKhzDOzqt1Hx8GzPCDzp",
    APISecret: "Dee5TvIIJocPQQoDlCoTvypc4pgWulUiSNYS",
  },
};

module.exports = config[env];
