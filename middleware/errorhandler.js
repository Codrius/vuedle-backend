function user(error) {
    console.log("Error creating new user: ", error.message);
    let errors = { email: "", username: "", password: "" }

    if (error.code === 11000) {
        errors.email = "Email already exists";
        return errors;
    }

    if (error.message.includes("user validation failed")) {
        Object.values(error.errors).forEach(({ properties }) => {
            errors[properties.path] = properties.message;
        })
    }

    return errors;
}

module.exports = { user };