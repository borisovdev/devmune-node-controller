import { DotenvConfigOptions } from "dotenv";
import path from "path";

const productionConfig: DotenvConfigOptions = {
  path: path.resolve(process.cwd(), ".env.prod")
}

const developmentConfig: DotenvConfigOptions = {
  path: path.resolve(process.cwd(), ".env.dev")
}

const defaultConfig: DotenvConfigOptions = {}

export const getEnvConfig = (env: string|undefined = process.env.NODE_ENV): DotenvConfigOptions => {
  switch (env) {
    case "production":
      return productionConfig;
  
    case "development":
      return developmentConfig;
  
    default:
      return defaultConfig;
  }
}
