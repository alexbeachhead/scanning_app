import { Response } from "src/types/types";
import {
  BaseResponse,
  ILoginResponse,
  ILoginVerificationResponse,
  IRegisterBody,
  PlatformSelection,
} from "./types/auth";

import { api, handleApiCall } from "./base";

export class AuthApi {
  static async loginVerification(
    login: string
  ): Promise<Response<ILoginVerificationResponse, any>> {
    return handleApiCall<ILoginVerificationResponse>(api.post("/loginVerification", { login }));
  }

  static async login(login: string, password: string): Promise<Response<ILoginResponse, any>> {
    return handleApiCall<ILoginResponse>(api.post("/login", { login, password }));
  }

  static async logout({ refreshToken }: { refreshToken: string }): Promise<Response<any, any>> {
    return handleApiCall<any>(api.post("/logout", { refreshToken }));
  }

  static async forgotPassword(
    email: string,
    platform: PlatformSelection
  ): Promise<Response<BaseResponse, any>> {
    return handleApiCall<BaseResponse>(api.post("/forgotPassword", { email, platform }));
  }

  static async register(body: IRegisterBody): Promise<Response<BaseResponse, any>> {
    return handleApiCall<BaseResponse>(api.post("/registration", body));
  }
}
