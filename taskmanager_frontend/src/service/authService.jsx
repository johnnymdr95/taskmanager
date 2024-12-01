import {apiClient} from "./api";

export const signUpService = (email, password) => {return apiClient.post('/api/auth/signup', { email, password });}

export const executeJwtAuthenticationService = (email, password) => {
    return apiClient.post('/api/auth/login', { email, password });
};