import { IUserInfo } from "../../api/types/auth";

export interface IAuthState {
  loading: boolean;
  isAuthorized: boolean | null;

  loginVerificationThunkSuccess: boolean;
  loginVerificationThunkErrors: string[] | null;

  loginThunkSuccess: boolean;
  loginThunkErrors: string[] | null;
  loginThunkData: IUserInfo | null;

  forgotPasswordThunkSuccess: boolean;
  forgotPasswordThunkErrors: string[] | null;

  registerThunkSuccess: boolean;
  registerThunkErrors: string[] | null;
}
