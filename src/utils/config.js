// console.log("sssssssss=>",import.meta.env);
let { 
  VITE_APPLICATIONNAME,
  VITE_AUTHORIZATIONDOAMIN,
  VITE_DOMAIN,
  VITE_ENVIRONMENT,
  VITE_FSAPPID,
  VITE_FSGROUPURL,
  VITE_IMGURL,
  VITE_MODE_NAME,
  VITE_MPACCESSKEYID,
  VITE_MPACCESSKEYSECRET,
  VITE_PREFIX,
  VITE_VERSIONNUM,
} = import.meta.env
let isDeubg = '';
if(VITE_MODE_NAME=='test'){
  isDeubg = true
}
if(VITE_MODE_NAME=='prod'){
  isDeubg = false
}
// console.log("VITE_MODE_NAME=>",VITE_MODE_NAME,isDeubg);

let domain = VITE_DOMAIN;
let authorizationDoamin = VITE_AUTHORIZATIONDOAMIN;
let prefix  = VITE_PREFIX;
let applicationName = VITE_APPLICATIONNAME;
let versionNum = VITE_VERSIONNUM ;
let environment = VITE_ENVIRONMENT ;
let mpAccessKeyId = VITE_MPACCESSKEYID ;
let mpAccessKeySecret= VITE_MPACCESSKEYSECRET ;
let fsAppId= VITE_FSAPPID ;
let fsGroupUrl = VITE_FSGROUPURL;
let imgUrl= VITE_IMGURL ;
export {
  isDeubg,
  domain,
  prefix,
  mpAccessKeyId,
  mpAccessKeySecret,
  fsAppId,
  fsGroupUrl,
  imgUrl,
  authorizationDoamin,
  applicationName,
  versionNum,
  environment,
};