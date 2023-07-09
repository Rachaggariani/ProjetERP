import axios from "axios";

export const  addRoleApi = async (role) => {
    try {
      const apiResponse = await axios.post("/roles/add", role);
      return apiResponse
    } catch (error) {
     return error
    }
}