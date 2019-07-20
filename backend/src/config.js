import 'dotenv/config';

const env = process.env;

export default {
  currEnv: env.NODE_ENV || 'development',
  port: env.PORT || 4000,
  secret: env.AUTH_SECRET,
  db: env.MONGO_URI
};
