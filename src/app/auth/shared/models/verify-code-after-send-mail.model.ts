export interface VerifyCodeAfterSendMailModel { 
    code : string;
    token : string;
    recaptchaResponse: string;
}