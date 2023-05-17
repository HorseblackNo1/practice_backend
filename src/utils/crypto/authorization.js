import CryptoJS from 'crypto-js';
import { mpAccessKeyId, mpAccessKeySecret, } from '../config.js'


function authorization(date, path) {
  const accessKeyID = mpAccessKeyId;
  const accessKeySecret = mpAccessKeySecret;
  const contentType = 'application/json';
  const stringToSign = `${path}\n${contentType}\n${date}`;
  const signature = signString(stringToSign, accessKeySecret);
  const authorization = `TB ${accessKeyID}:${signature}`;

  return authorization;
};

function signString(source, secret) {
  const hash = CryptoJS.HmacSHA256(source, secret);
  const signature = hash.toString(CryptoJS.enc.Base64);

  return signature;
}

export {
  authorization
}