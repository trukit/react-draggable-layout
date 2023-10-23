import typescript from "@rollup/plugin-typescript";
import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import dts from "rollup-plugin-dts";
import external from 'rollup-plugin-peer-deps-external';

import { readFileSync } from 'node:fs';

const packageFile = readFileSync(new URL('./package.json', import.meta.url),  {
  encoding: 'utf-8',
});
const pkg = JSON.parse(packageFile);

const input = "lib/index.ts";

const jslibOptions = {
  input,
  output: [
    {
      name: 'react-dragger-layout',
      file: pkg.main,
      format: "umd",
      globals: {
        'react/jsx-runtime': 'jsxRuntime'
      }
    },
    {
      file: pkg.module,
      format: "esm",
      globals: {
        'react/jsx-runtime': 'jsxRuntime'
      }
    },
  ],
  plugins: [
    external(),
    resolve(),
    commonjs(),
    typescript({
      tsconfig: './tsconfig.lib.json',
    }),
  ],
};

const typeOptions = {
  input,
  output: [
    {
      file: pkg.types,
      format: "esm",
    },
  ],
  plugins: [dts()],
};

export default [jslibOptions, typeOptions];
