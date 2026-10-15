/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BASE_PATH?: string;
  readonly VITE_APP_BARTER_BRIDGE_URL?: string;
  readonly VITE_APP_DIAGNOSTIC_LIQUIDITY_URL?: string;
  readonly VITE_APP_HORIZON_SCRAPE_URL?: string;
  readonly VITE_APP_PARAMETRIC_PULSE_URL?: string;
  readonly VITE_APP_SACRIFICIAL_PATHWAYS_URL?: string;
  readonly VITE_APP_HUB_URL?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
