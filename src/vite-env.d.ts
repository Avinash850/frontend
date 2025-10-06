/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  // add more envs here if needed in future
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
