// import axiosInstance from "axiosInstance";
import axiosInstance from "../interceptor/AxiosInterCeptor";

const base_url = "http://localhost:8080/profile/";

export const getUserProfile = async(userId) => {
    try{
      const res = await axiosInstance.get(`profile/getPro/${userId}`);
      return res.data;
    }catch(err) {
        throw err;
    }
}

export const updateProfile = async (id, formData) => {
  try {
    const res = await axiosInstance.put(`/profile/update/${id}`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return res.data;
  } catch (err) {
    console.error("Backend error:", err.response?.data || err.message);
    throw err;
  }
};

export const getAllProfiles = async () => {
  try{
     const response = await axiosInstance.get(`/profile/getAll`)
     return response.data;
  }catch(err){
    throw err;
  }
}

export const addExperience = async(id,data) => {
  try{
    const res = await axiosInstance.post(`/profile/addExp/${id}`, data);
    return res.data;
  }catch(err){
    throw err
  }
}