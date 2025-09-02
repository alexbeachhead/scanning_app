export interface BaseResponse {
  process: boolean;
  code: number;
  message?: string;
}

export interface ILoginVerificationResponse extends BaseResponse {
  message?: string;
}

export interface IValidateReject {
  rejectValue: { message: string };
}

export interface TokenInfo {
  tokeninfo: {
    access_token: string; //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXRvZCI6ImFjY2VzcyIsInVpZCI6MjY4Niwic2NvcGVzIjp7InVzZXJpbmZvIjp7ImFuY2VzdG9yIjoiMTA3NSJ9fSwiZXhwIjoxNzQyMjIzMzIyfQ.TprkxDL9g";
    refresh_token: string; //"eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJtZXRvZCI6InJlZnJlc2giLCJ1aWQiOjI2ODYsInNjb3BlcyI6eyJ1c2VyaW5mbyI6eyJhbmNlc3RvciI6IjEwNzUifX0sImV4cCI6MTc0NDgxMTcyMn0.QSD5iBm1ptWG4KpAhEXqeQnT_9ntdNyTOvf5ggOBQMw";
  };
}

export interface IBalanceFullInfo {
  total: number;
  totalPositive: string;
  balanceReal: number;
  dutyToPvz: number;
  dutyToPvzKz: number;
  dutyToWay: number;
  toPvzIds: string;
}
export interface IUserInfo {
  active: string; // 1 or 0
  name: string; // Имя
  surname: string; // Фамилия
  patronymic: string; // Отчество
  email: string; // Email
  address: string; // Адрес
  phone: string; // +78888888888
  company: string; // Компания
  avatar: string; // URL
  site: string; // URL
  __nodeChanged: string; // 1730967288
  accessiblePrices: string; // "{\"priceonly_1.price\":false,\"sku-base.price\":false,\"priceonly.price\":false,\"deliveryArea.rate\":false}",
  defaultPrice: string; // JSON
  resetHashPassword: string; //"$2y$10$yV5.g/kLl3GwMJbyPtqZRuEEw1HGnHWM058ws3AEDCTRrRvRslY.u",
  verification: string; // 1 or 0
  user_blocked: string; //""
  sessionid: string; //"6rhpiku63i79rr8vnfini3nsc5,6rhpiku63i79rr8vnfini3nsc5,6rhpiku63i79rr8vnfini3nsc5,6rhpiku63i79rr8vnfini3nsc5,g2p4gonjpde4jb3kgv9n45g983"
  use_default_address_main: string; //""
  id: number; //2686
  ancestor: string; //"1075"
  userRate: string;
  balanceFullInfo: IBalanceFullInfo;
}

export interface ILoginResponse extends BaseResponse, TokenInfo {
  userInfo: IUserInfo;
}

export enum PlatformSelection {
  IOS = "ios",
  ANDROID = "android",
}

export interface IRegisterBody {
  name: string;
  surname: string;
  login: string;
  phone: string;
  password: string;
}
