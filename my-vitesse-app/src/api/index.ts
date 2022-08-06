import requests from "./request";

//获取数据库信息
export const reqPersonInformation = () => requests.get(`/managePerson`)

export const postPersonInformation = (data: Object) => requests.post(`/managePerson`, data)

export const reqRegister = (data: Object) => requests.post(`/register`, data)

export const reqLogin = (data: Object) => requests.post('/login', data)

export const reqDeleteInfo = (data: Object) => requests.post('/deleteInfo', data)

export const reqQrINFO = () => requests.get('/QrCode')