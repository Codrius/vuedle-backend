function user(error) {
    console.log("Error: ", error.message);
    let errors = { email: "", username: "", password: "" }

    // If trying to log in to an email that doesn't exist, return error
    if (error.message.includes("Email does not exist")) {
        errors.email = "Email does not exist";
        return errors;
    }

    // If log in password does not match email, return error
    if (error.message.includes("Email and password do not match")) {
        errors.password = "Email and password do not match";
        return errors;
    }

    // If the specified email a user is trying to create already exists, return error
    if (error.code === 11000) {
        errors.email = "Email already exists";
        return errors;
    }

    // If the user did not specify an email for registration, return error
    if (error.message.includes("Please enter an email")) {
        errors.email = "Please enter an email";
        return errors;
    }

    // If the user did not specify an email for registration, return error
    if (error.message.includes("Please enter a username")) {
        errors.username = "Please enter a username";
        return errors;
    }

    // If the user did not specify an email for registration, return error
    if (error.message.includes("Please enter a password")) {
        errors.password = "Please enter a password";
        return errors;
    }

    // If the user entered an invalid email, return error
    if (error.message.includes("Please enter a valid email")) {
        errors.email = "Please enter a valid email";
        return errors;
    }

    // If the username is > 12 characters, return error
    if (error.message.includes("Maximum username length is 12 characters")) {
        errors.username = "Maximum username length is 12 characters";
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