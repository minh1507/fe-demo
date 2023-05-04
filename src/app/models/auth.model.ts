export interface login{
  username: string;
  accessToken: string;
  refreshToken: string;
  isSuccess: boolean
  role: string
}

export interface register{
  isSuccess: boolean,
  mes: string
}