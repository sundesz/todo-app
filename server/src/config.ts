import dotenv from 'dotenv';
dotenv.config();

let DATABASE_URL: string;

switch (process.env.NODE_ENV) {
  case 'production':
    DATABASE_URL = process.env.DATABASE_URL_PRODUCTION as string;
    break;
  case 'development':
    DATABASE_URL = process.env.DATABASE_URL as string;
    break;
  case 'test':
    DATABASE_URL = process.env.DATABASE_URL_TEST as string;
}

const PORT = process.env.PORT || 3001;
const SECRET_KEY = process.env.SECRET_KEY as string;
const SALT = process.env.SALT as string;
const COOKIE_EXPIRE_TIME = 7200 as number; // 2hours

export { DATABASE_URL, PORT, SECRET_KEY, SALT, COOKIE_EXPIRE_TIME };
