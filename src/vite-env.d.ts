/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_USE_PRISMIC?: string;
  readonly VITE_PRISMIC_REPOSITORY_NAME?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
