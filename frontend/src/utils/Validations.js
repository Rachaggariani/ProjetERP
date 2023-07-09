export const loginValidation = (values) =>{
const errors = {}

const email_pattern = /^[^\s@]+@[^\s@]+\.[^\s@]{2,6}$/;

if(!values.email){
errors.email = "Email is required"
}else if(!email_pattern.test(values.email)){
    errors.email = "Email is invalid"
}

if(values.password === ""){
    errors.password = "Password is required"
    }

    return errors;
}