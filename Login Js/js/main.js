const btnRegister = document.querySelector(".register");

const saveData = JSON.parse(localStorage.getItem("localData")) || [];

function register(e) {
  e.preventDefault();

  const userName = document.getElementById("name");
  const userEmail = document.getElementById("email");
  const userPassword = document.getElementById("password");

  if (!userName.value) {
    document.getElementById("error_name").textContent = "Please enter a name.";
} else {
    document.getElementById("error_name").textContent = "";
}

if (!userEmail.value) {
    document.getElementById("error_email").textContent = "Please enter an email address.";
} else {
    document.getElementById("error_email").textContent = "";
}

if (!userPassword.value) {
    document.getElementById("error_password").textContent = "Please enter a password.";
} else {
    document.getElementById("error_password").textContent = "";
}

if (!userName.value || !userEmail.value || !userPassword.value) {
    return;
}



  const isNameValid = validateInput(userName, "name");
  const isEmailValid = validateInput(userEmail, "email");
  const isPasswordValid = validateInput(userPassword, "password");

  if (isNameValid && isEmailValid && isPasswordValid) {
    const userInfo = {
      name: userName.value,
      email: userEmail.value,
      password: userPassword.value,
    };

    saveData.push(userInfo);
    localStorage.setItem("localData", JSON.stringify(saveData));

    window.location.href = "login.html";
  }
}

console.log(saveData);

btnRegister.addEventListener("click", register);

function validateInput(input, type) {
  const regexPatterns = {
    name: /^[a-z]{3,8}[0-9]{2}$/i,
    email: /^[a-z1-9]+@(gmail|yahoo)\.com$/i,
    password: /^[a-z0-9]{3,8}$/i,
  };

  const errorMessages = {
    name: "Invalid name. Please enter a name with 3 to 8 letters followed by 2 digits.",
    email: "Invalid email. Please enter a valid Gmail or Yahoo email address.",
    password:
      "Invalid password. Please enter a password with 3 to 8 alphanumeric characters.",
  };

  const isValid = regexPatterns[type].test(input.value);
  const errorDanger = document.getElementById(`error_${type}`);

  if (isValid) {
    errorDanger.textContent = "";
  } else {
    errorDanger.textContent = errorMessages[type];
  }

  return isValid;
}

