import { config } from "dotenv";
import {get} from "env-var";

export const envs = {
    PORT: get('PORT').required(true).asPortNumber(),
    PUBLIC_PATH: get('PUBLIC_PATH').required(true).asString()
}