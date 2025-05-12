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
//get home project
export const getHomeProjectApi=async()=>{
    return await commonApi('GET',`${base_url}/project/homeproject`,"","")
}
//get all project
export const getAllProjectApi=async(searchKey,reqHeader)=>{
    return await commonApi('GET',`${base_url}/project/allproject?search=${searchKey}`,"",reqHeader)
}
//get user project
export const getUserProjectApi=async(reqHeader)=>{
    return await commonApi('GET',`${base_url}/project/userproject`,"",reqHeader)
}