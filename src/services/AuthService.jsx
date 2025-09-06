import axios from "axios";

const base_url = "http://localhost:8080/auth";

const loginUser = async(login) => {
    try{
        const response = await axios.post(`${base_url}/login`, login);
        return response.data;
    }catch(error){
        console.log("Error while calling login API ", error);
        throw error;
    }
}

const navigateToLogin = (navigate) => {
     localStorage.removeItem("token");
     localStorage.removeItem("user");
     navigate("/login");
}

export default loginUser