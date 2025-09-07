import axiosInstance from "../interceptor/AxiosInterCeptor";

export const postJob = async(data) => {
     try{
      const res = await axiosInstance.post(`/jobs/post`, data);
       return res.data;
     }catch(err) {
        throw err;
     }
}

export const getAllJobs = async() => {
    try{
      const res = await axiosInstance.get(`/jobs/allJobs`);
      return res.data;
    }catch(err) {
        throw err;
    }
}

export const getJobById = async(jobId) => {
    try{
      const res = await axiosInstance.get(`/jobs/get/${jobId}`);
      return res.data;
    }catch(err) {
        throw err;
    }
}

export const applyJob = async(id,data) => {
  try{
     const res = await axiosInstance.post(`/jobs/apply/${id}`,data)
     return res.data;
  }catch(err){
    throw err;
  }
}

export const getJobPostedBy = async(id) => {
  try{
     const res = await axiosInstance.get(`/jobs/PostedBy/${id}`)
     return res.data;
  }catch(err){
    throw err;
  }
}

export const changeStatus = async(data) => {
     try{
     const res = await axiosInstance.post(`/jobs/changeAppStatus`,data)
     return res.data;
  }catch(err){
    throw err;
  }
}

