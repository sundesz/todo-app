import dotenv from 'dotenv';
dotenv.config();

let DB_NAME: string;
let DB_USER: string;
let DB_PASSWORD: string;
let DB_HOST: string;

switch (process.env.NODE_ENV) {
  case 'production':
    DB_NAME = process.env.DB_NAME_PRODUCTION as string;
    DB_USER = process.env.DB_USER_PRODUCTION as string;
    DB_PASSWORD = process.env.DB_PASSWORD_PRODUCTION as string;
    DB_HOST = process.env.DB_HOST_PRODUCTION as string;
    break;
  case 'development':
    DB_NAME = process.env.DB_NAME_DEVELOPMENT as string;
    DB_USER = process.env.DB_USER_DEVELOPMENT as string;
    DB_PASSWORD = process.env.DB_PASSWORD_DEVELOPMENT as string;
    DB_HOST = process.env.DB_HOST_DEVELOPMENT as string;
    break;
  case 'test':
    DB_NAME = process.env.DB_NAME_TEST as string;
    DB_USER = process.env.DB_USER_TEST as string;
    DB_PASSWORD = process.env.DB_PASSWORD_TEST as string;
    DB_HOST = process.env.DB_HOST_TEST as string;
}

const DB_DRIVER = process.env.DB_DRIVER;

const PORT = process.env.PORT || 3001;
const SALT = process.env.SALT as string;

const COOKIE_NAME_FOR_REFRESH_TOKEN = 'refresh_token';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET as string;
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET as string;
const COOKIE_EXPIRE_TIME = (process.env.COOKIE_EXPIRE_TIME ||
  2 * 60 * 60) as number; // 2hours

//REFRESH_TOKEN_SECRET = long time (hours / days)
const REFRESH_TOKEN_EXPIRE_TIME = (process.env.REFRESH_TOKEN_EXPIRE_TIME ||
  24 * 60 * 60) as number; // 1 day

//ACCESS_TOKEN_SECRET = short time (15min / 1 hour)
const ACCESS_TOKEN_EXPIRE_TIME = (process.env.ACCESS_TOKEN_EXPIRE_TIME ||
  15 * 60) as number; // 15 min

export {
  PORT,
  REFRESH_TOKEN_SECRET,
  REFRESH_TOKEN_EXPIRE_TIME,
  ACCESS_TOKEN_SECRET,
  ACCESS_TOKEN_EXPIRE_TIME,
  COOKIE_EXPIRE_TIME,
  SALT,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_DRIVER,
  DB_NAME,
  COOKIE_NAME_FOR_REFRESH_TOKEN,
};
