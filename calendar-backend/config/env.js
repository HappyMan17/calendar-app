import 'dotenv/config';
import { get } from 'env-var';

export const envs = {
  HOST: get('PORT').required().asInt(),
};
