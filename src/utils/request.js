import axios from "axios";
import { authorization } from "./crypto/authorization.js";
import {
  domain,
  authorizationDoamin,
  isDeubg,
  fsGroupUrl,
  applicationName,
  versionNum,
  environment,
  prefix,
} from "./config.js";
import { showToast, formatDateUTC } from "./pageInteractive.js";

const request = function (requestParam) {
//   console.log("requestParam=>",requestParam);

  /* 
    logicType: 业务类型 erp
    requestMethod:请求方法  GET、POST
    requestPath:请求path
    requestData:请求 data 数据
    requestType:请求类型  authorization、logic、pushMToFsGroup
    requestType:
        authorization: 授权,
        logic: 逻辑接口, 需要获取 uc_uid
        pushMToFsGroup:飞书报告接口
   */
  let url;
  let headers;
  // `timeout` 指定请求超时的毫秒数。
  // 如果请求时间超过 `timeout` 的值，则请求会被中断
  let timeout = 60000; // 默认值是 `0` (永不超时) 设置为 1 分钟超时
  let responseType = "json"; // 默认值
  let userAgentTb = `${applicationName}/${versionNum} ${
    isDeubg ? "test" : "pro"
  } ${environment}`;
  let _date = formatDateUTC();

  headers = {
    "Content-Type": "application/json",
    "user-agent-tb": userAgentTb,
    "TB-Date": _date,
    authorization: authorization(_date, requestParam.requestPath.requestPath),
  };

  if (requestParam.requestType == "authorization") {
    url = `${authorizationDoamin}${requestParam.requestPath}`;
  }
  if (requestParam.requestType == "pushMToFsGroup") {
    url = `${requestParam.requestPath}`;
  }
  if (requestParam.requestType == "logic") {
    url = `${domain}${requestParam.requestPath}`;
    //注入 uc_uid
    // let info = store.userInfor;
    // console.log(info);
    // data.uc_uid = info.uc_uid;
    // data.prj_id = data.prj_id || info.pur_last_operate_prj_id;
  }
  axios.defaults.headers.common["user-agent-tb"] = userAgentTb;
  return new Promise((re, rj) => {
    axios({
      method:requestParam.requestMethod,
      url,
      headers,
      data:requestParam.requestData,
      timeout,
      responseType,
    })
      .then((response) => {
        if (response.status == 200) {
          re(response.data);
        } else {
          showToast({ type: "error", text: "获取失败" });
          rj(err);
        }
      })
      .catch((err) => {
        showToast({ type: "error", text: `${err.message}` });
        rj(err);
      });
  });
};

export default request;
