import axios from "axios";

//API endPoints
export const signIn = (user) => axios.post("/auth/login",user);

export const forgotPass = async(email) => {
    try {
      const result = await axios.post("/auth/forgetPassword",email);
      // console.log("result api",result);
      return result;
    } catch (error) {
      // console.log("error api",error);
      return false;
    }
  }

  export const verifyOtp = async(otp,id) => {
    try {
        const otpCode ={otp:otp,id:id}
      const result = await axios.post("/auth/VerifyOTp",otpCode);
      // console.log("result api",result);
      return result;
    } catch (error) {
      // console.log("error api",error);
      return false;
    }
  }

  export const resetPass = async(id,password) => {
    try {
      const result = await axios.post("/auth/changePassword",{id,password});
    //   console.log("result api",result);
      return result;
    } catch (error) {
    //   console.log("error api",error);
      return false;
    }
  }

  export const  addRoleApi = async (role) => {
    try {
      const apiResponse = await axios.post("/roles/add", role);
      return apiResponse
    } catch (error) {
     return error
    }
}

export const  addCategorieApi = async (role) => {
  try {
    const apiResponse = await axios.post("/categories/add", role);
    return apiResponse
  } catch (error) {
   return error
  }
}