import { base_url } from "./base_url"
import { commonApi } from "./commonApi"

//register user
export const registerApi = async (userData) => {
    return await commonApi("POST", `${base_url}/user/register`, userData, "")
}
//login user
export const loginApi = async (data) => {
    return await commonApi("POST", `${base_url}/user/login`, data, "")
}
//add project
export const addProjectApi= async(data,reqHeader)=>{
    return await commonApi('POST',`${base_url}/project/add`,data,reqHeader)
}