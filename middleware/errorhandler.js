function user(error) {
    console.log("Error creating new user: ", error.message);
    let errors = { email: "", username: "", password: "" }

    // If trying to log in to an email that doesn't exist, return error
    if (error.message === "Email does not exist") {
        errors.email = error.message;
        return errors;
    }

    // If log in password does not match email, return error
    if (error.message === "Email and password do not match") {
        errors.password = error.message;
        return errors;
    }

    // If the specified email a user is trying to create already exists, return error
    if (error.code === 11000) {
        errors.email = "Email already exists";
        return errors;
    }

    // If any other problem with user creation exists, return error
    if (error.message.includes("user validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }


}

module.exports = { user };