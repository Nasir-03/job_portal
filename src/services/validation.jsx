// Email validation regex
export const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Password: 8-15 chars, upper/lowercase, number, special char
export const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

 export const validateUserForm = ({ name, email, password, termsAccepted }) =>{
    const errors = {};
    if (name.length == 0){
        errors.name = "Name is required";
    }

    if (!email || !emailRegex.test(email)) {
  errors.email = "Invalid email address";
}

    if (!password || !passwordRegex.test(password)){
        errors.password = "Password must be 8-15 characters long and include uppercase, lowercase, number, and special character";
    }

    if (!termsAccepted) {
        errors.terms = "please accept the terms and conditions";
    }

    return errors;
}


export const validLogin = (email, password) => {
  const errors = {};

  if (!email || email.trim().length === 0) {
    errors.email = "Email is required";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    errors.email = "Invalid email format";
  }

  if (!password || password.trim().length === 0) {
    errors.password = "Password is required";
  } else if (password.length < 8 || password.length > 15) {
    errors.password = "Password must be 8-15 characters long";
  }

  return errors;
};



export default {validateUserForm, validLogin};