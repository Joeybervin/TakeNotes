const inputValidation = (value, oldValue, password) => {
    const whiteSpace = /\s/
    const validCharsRegex = /^[A-Za-z-]+$/;
    const emailRegex = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g ;
    const urlRegex = /^(http(s):\/\/.)[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)$/ ;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*._?\-&])[A-Za-z\d@$!%*._?\-&#]{8,25}$/ ;

    // Check for white spaces in value
    if ( whiteSpace.test(value) ) return false
    // Check if value is longer than 30 characters and not a password
    else if ( value.length > 30 && !password) return false
    // Check if value is the same as oldValue
    else if (value === oldValue) return true 
    // Check if value is empty and not the same as oldValue and is a password
    else if (value.trim() === "" && value !== oldValue && password) return true
    // Check if value is empty and not the same as oldValue and not a password
    else if (value.trim() === "" && value !== oldValue) return false 
    // Check if oldValue is an email and not a password, then validate new value using emailRegex
    else if (emailRegex.test(oldValue) && !password) {
        if (!emailRegex.test(value)) return false
    }
    // Check if oldValue is a URL and not a password, then validate new value using urlRegex
    else if (urlRegex.test(oldValue) && !password) {
        if (!urlRegex.test(value)) return false
    }
    // Check if value is not a URL, email, or password, then validate using validCharsRegex
    else if (!urlRegex.test(value) && !emailRegex.test(value) && !password) {
        if (!validCharsRegex.test(value)) return false
    }
    // check if the password is at leat 1 lowercase chars, 1 uppercase chars, 1 number, 1 special characters, between 8 and 30 characters
    if (password) {
        if (!passwordRegex.test(password)) return false
    }
    // Check if value does not pass the validCharsRegex and is not a password
    else if (!validCharsRegex.test(value) && !password) return false
    // Return true if all conditions pass
    else return true
}

module.exports = { inputValidation }