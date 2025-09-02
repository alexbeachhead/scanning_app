declare module '@env' {
  export const API_URL: string;
  export const API_URL_DEV: string;
  export const API_BASE: string;
  export const API_KEY: string;
  export const API_HOST: string;
  export const API_URL_STORE: string;
  export const API_URL_USER: string;

  // OpenAI (Paid)
  export const OPENAI_API_KEY: string;
  export const OPENAI_MODEL: string;
  export const OPENAI_MAX_TOKENS: string;

  // FREE AI Options
  export const GOOGLE_API_KEY: string; // FREE tier available
  export const AI_PROVIDER: string; // 'free' | 'openai'
}
