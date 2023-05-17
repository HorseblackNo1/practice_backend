import  request from '@/utils/request'

const userLogin  = (data)=>{
    console.log("data=>",data)
    return request(
        {   
            logicType:'erp',
            requestMethod:'POST',
            requestPath:`/mock/62931eb9a4d920002f10efc7/example/test/Login`,
            requestData:data,
            requestType:'authorization',

        }
    )
}
const getuserInfo = (data)=>{
    return request(
        {   
            logicType:'erp',
            requestMethod:'GET',
            requestPath:`/mock/62931eb9a4d920002f10efc7/example/test/userInfo`,
            requestData:data,
            requestType:'authorization',

        }
    )
}
export {
    userLogin,
    getuserInfo
}