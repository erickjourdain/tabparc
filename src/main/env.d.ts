/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly MAIN_VITE_DB_PATH: string
  readonly MAIN_VITE_CRM_SERVER: string
  readonly MAIN_VITE_CRM_DB: string
  readonly MAIN_VITE_CRM_USER: string
  readonly MAIN_VITE_CRM_PWD: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
