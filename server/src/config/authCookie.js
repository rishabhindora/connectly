const AUTH_COOKIE_NAME = "connectly_token";

const AUTH_COOKIE_MAX_AGE = 7 * 24 * 60 * 60 * 1000;

const authCookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: AUTH_COOKIE_MAX_AGE,
  path: "/"
};

module.exports = {
  AUTH_COOKIE_NAME,
  AUTH_COOKIE_MAX_AGE,
  authCookieOptions
};