import 'dotenv/config';
import pkg from 'env-var';
const { get } = pkg;

export const envs = {
  HOST: get('PORT').required().asInt(),
};
