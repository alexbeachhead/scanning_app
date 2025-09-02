declare module "@env" {
  export const { API_URL_USER }: Record<string, string>;
  export const { API_URL_STORE }: Record<string, string>;
  export const { CHAT_API_URL }: Record<string, string>;
  export const { CHAT_WS_PROVIDER }: Record<string, string>;
  export const { PAYMENT_WS_PROVIDER }: Record<string, string>;
}

declare module "*.svg" {
  import { FC } from "react";
  import { SvgProps } from "react-native-svg";

  const content: FC<SvgProps>;

  export default content;
}
