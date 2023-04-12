import {AUTH_URL, request} from "./request-service";
import Moment from "moment";

const GITLAB_APPLICATION_ID = '';
const GITLAB_SECRET = '';
const REDIRECT_URI = 'http://localhost:3333';

const AuthProvider = (url, oAuthParams) => {
  const body = Object.keys(oAuthParams).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(oAuthParams[key]);
  }).join('&');

  return request(`${AUTH_URL}${url}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  }).then(( {access_token, expires_in} ) => {
    localStorage.setItem('token', access_token);
    localStorage.setItem('token_expires', (new Date()).getTime() + expires_in);
    return access_token;
  });
};

export const credentialAuthHandler = (params) => {
  const { username, password } = params;
  const oAuthParams = {
    grant_type: "password",
    username,
    password
  };

  return AuthProvider('token', oAuthParams);
};

export const OAuthHandler = () => {
  const oAuthParams = {
    response_type: "code",
    state: ["api"],
    client_id: GITLAB_APPLICATION_ID,
    client_secret: GITLAB_SECRET,
    redirect_uri: REDIRECT_URI,
  };

  return AuthProvider('authorize', oAuthParams);
};

export const tokenInfo = () => {
  const oAuthParams = {
    access_token: localStorage.getItem('token'),
  };

  const body = Object.keys(oAuthParams).map((key) => {
    return encodeURIComponent(key) + '=' + encodeURIComponent(oAuthParams[key]);
  }).join('&');

  return request(`${AUTH_URL}token/info`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8'
    },
    body
  }).then(info => {
    console.log(info);
    return info;
  });
};
