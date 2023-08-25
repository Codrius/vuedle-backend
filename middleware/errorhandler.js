function user(error) {
    console.log("Error: ", error.message);
    let errors = { email: "", username: "", password: "" }

    // If trying to log in to an email that doesn't exist, return error
    if (error.message.includes("Email does not exist")) {
        errors.email = "Email does not exist";
    }

    // If log in password does not match email, return error
    if (error.message.includes("Email and password do not match")) {
        errors.password = "Email and password do not match";
    }

    // If the specified email a user is trying to create already exists, return error
    if (error.code === 11000) {
        errors.email = "Email already exists";
    }

    // If the user did not specify an email for registration, return error
    if (error.message.includes("Please enter an email")) {
        errors.email = "Please enter an email";
    }

    // If the user did not specify an email for registration, return error
    if (error.message.includes("Please enter a username")) {
        errors.username = "Please enter a username";
    }

    // If the user did not specify an email for registration, return error
    if (error.message.includes("Please enter a password")) {
        errors.password = "Please enter a password";
    }

    // If the user entered an invalid email, return error
    if (error.message.includes("Please enter a valid email")) {
        errors.email = "Please enter a valid email";
    }

    // If the username is > 12 characters, return error
    if (error.message.includes("Maximum username length is 12 characters")) {
        errors.username = "Maximum username length is 12 characters";
    }

    // If the username is > 12 characters, return error
    if (error.message.includes("Minimum password length is 6 characters")) {
        errors.password = "Minimum password length is 6 characters";
    }

    return errors;
}

module.exports = { user };