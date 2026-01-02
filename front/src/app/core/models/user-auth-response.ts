export interface IUserAuthResponse {
    errorMessage: string,
    isAuthSuccessful: boolean,
    refreshToken: string,
    token: string
}