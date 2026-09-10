import Cookies from 'js-cookie';

export const PASSWORD_KEY = 'password'

export const getPassword = (): string => process.env.NEXT_PUBLIC_PASSWORD || '';

export const userHasPrevLogin = (): boolean => 
    process.env.NEXT_PUBLIC_WEBSITE_SKIP_PASSWORD === "true" ||
        Cookies.get(PASSWORD_KEY) === getPassword();
