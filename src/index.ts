import * as path from 'path';
import * as fs from 'fs';
import { Plugin } from 'vite';
import * as dotenv from 'dotenv';

interface Options {
  path: string;
  key: string;
}

export default function vitePluginDefineProcessEnv(
  option: Partial<Options> = { path: '', key: 'process.env' },
): Plugin {
  return {
    name: 'vite-plugin-define-process-env',
    config(config, { command, mode }) {
      const filepath = path.resolve(process.cwd(), option.path as string);
      let files: string[] = [];
      if (fs.existsSync(filepath)) {
        files = fs.readdirSync(filepath);
      }
      const envs = files
        .filter((filename, index, arr) => [
          '.env',
          '.env.local',
          `.env.${mode}`,
          `.env.${mode}.local`
        ].includes(filename))
        .sort((a, b) => a.length - b.length)
        .reduce((prev, filename, index, arr) => ({
          ...prev,
          ...dotenv.config({
            path: path.resolve(filepath, filename),
          }).parsed,
        }), {});

      return {
        define: {
          [option.key as string]: envs,
        },
      };
    },
  };
}
