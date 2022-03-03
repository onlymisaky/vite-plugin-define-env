# vite-plugin-define-env

## 介绍

Vue-cli 项目迁移到 vite 时，需要将原有的环境变量前缀从 `VUE_APP_` 修改为 `VITE_` ，同时将业务代码中的 `process.env.VUE_APP_XXX` 修改为 `import.meta.env.VITE_XXX` 。如果你不想手动完成这一工作，可以尝试使用本插件，不需要修改任何业务代码即可轻松完成环境变量的迁移和使用。

同时，如果你不喜欢 `vite` 将环境变量定义到 `import.meta.env` 这一方式，你也可以使用本插件来代替 `define` 这一配置项。

## 安装

```bash
npm i vite-plugin-define-env -D

yarn add vite-plugin-define-env -D
```

## 使用
```ts
// vite.config.ts
import { defineConfig } from "vite";
import defineEnv from "vite-plugin-define-env";

export default defineConfig({
  ...
  plugins: [defineEnv()]
});
```

## 配置项

```ts
interface Options {
  path: string; // .env 文件所在的目录，默认为跟目录
  key: string; // 要定义的环境变量名称，默认为 process.env
}
```
