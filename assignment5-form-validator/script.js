let users = [];

// Username Validation
function validateUsername() {
    let username = document.getElementById("username").value;
    let msg = document.getElementById("username-msg");

    let pattern = /^[a-zA-Z0-9._-]{5,15}$/;

    if (username === "") {
        msg.textContent = "";
        return false;
    }

    if (pattern.test(username)) {
        msg.textContent = "✅ Username is valid";
        msg.className = "msg success";
        return true;
    } else {
        msg.textContent = "❌ Username must be 5-15 characters";
        msg.className = "msg error";
        return false;
    }
}

// Password Validation
function validatePassword() {
    let password = document.getElementById("password").value;

    let hasUpper = /[A-Z]/.test(password);
    let hasLower = /[a-z]/.test(password);
    let hasNumber = /[0-9]/.test(password);
    let hasSpecial = /[!@#$%^&*]/.test(password);
    let hasLength = password.length >= 8;

    document.getElementById("upper").textContent =
        hasUpper ? "✅ Uppercase Letter" : "❌ Uppercase Letter";

    document.getElementById("lower").textContent =
        hasLower ? "✅ Lowercase Letter" : "❌ Lowercase Letter";

    document.getElementById("number").textContent =
        hasNumber ? "✅ Number" : "❌ Number";

    document.getElementById("special").textContent =
        hasSpecial ? "✅ Special Character" : "❌ Special Character";

    document.getElementById("length").textContent =
        hasLength ? "✅ Minimum 8 Characters" : "❌ Minimum 8 Characters";

    let msg = document.getElementById("password-msg");

    if (hasUpper && hasLower && hasNumber && hasSpecial && hasLength) {
        msg.textContent = "✅ Strong Password";
        msg.className = "msg success";
        return true;
    } else {
        msg.textContent = "❌ Password requirements not met";
        msg.className = "msg error";
        return false;
    }
}

// Show Password
function togglePassword() {
    let password = document.getElementById("password");

    if (password.type === "password") {
        password.type = "text";
    } else {
        password.type = "password";
    }
}

// Phone Validation
function validatePhone() {
    let phone = document.getElementById("phone").value;
    let msg = document.getElementById("phone-msg");

    let pattern = /^(\+234|0)[789][01][0-9]{8}$/;

    if (phone === "") {
        msg.textContent = "";
        return false;
    }

    if (pattern.test(phone)) {
        msg.textContent = "✅ Valid Nigerian phone number";
        msg.className = "msg success";
        return true;
    } else {
        msg.textContent = "❌ Invalid Nigerian phone number";
        msg.className = "msg error";
        return false;
    }
}

// Register User
function submitForm() {

    let usernameValid = validateUsername();
    let passwordValid = validatePassword();
    let phoneValid = validatePhone();

    let formMsg = document.getElementById("form-msg");

    if (usernameValid && passwordValid && phoneValid) {

        let user = {
            username: document.getElementById("username").value,
            phone: document.getElementById("phone").value
        };

        users.push(user);

        console.log("Registered Users:", users);

        formMsg.textContent = "🎉 Registration Successful!";
        formMsg.className = "msg success";

        setTimeout(() => {

            document.getElementById("username").value = "";
            document.getElementById("password").value = "";
            document.getElementById("phone").value = "";

            document.getElementById("username-msg").textContent = "";
            document.getElementById("password-msg").textContent = "";
            document.getElementById("phone-msg").textContent = "";
            document.getElementById("form-msg").textContent = "";

            document.getElementById("upper").textContent = "❌ Uppercase Letter";
            document.getElementById("lower").textContent = "❌ Lowercase Letter";
            document.getElementById("number").textContent = "❌ Number";
            document.getElementById("special").textContent = "❌ Special Character";
            document.getElementById("length").textContent = "❌ Minimum 8 Characters";

        }, 2000);

    } else {
        formMsg.textContent = "❌ Please fix all errors";
        formMsg.className = "msg error";
    }
}