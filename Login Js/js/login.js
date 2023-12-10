const btnLogin = document.querySelector(".log-in");
const error_login = document.querySelector(".error_login");
const userEmail_login = document.getElementById("email");
const userPassword_login = document.getElementById("password");

function login(e) {
  e.preventDefault();

  if (!userEmail_login.value) {
    document.getElementById("errorlogin_email").textContent =
      "Please enter an email address.";
  } else {
    document.getElementById("errorlogin_email").textContent = "";
  }

  if (!userPassword_login.value) {
    document.getElementById("errorlogin_password").textContent =
      "Please enter a password.";
  } else {
    document.getElementById("errorlogin_password").textContent = "";
  }

  if (!userEmail_login.value || !userPassword_login.value) {
    return;
  }
  const isEmailValid = validateInputLogin(userEmail_login, "email");
  const isPasswordValid = validateInputLogin(userPassword_login, "password");

  if (isEmailValid && isPasswordValid) {
    const userInfo = {
      email: userEmail_login.value,
      password: userPassword_login.value,
    };

    function displaySuccessMessage() {
      error_login.classList.replace("text-danger", "text-success");
      error_login.textContent = "Thanks for logging in with us! 😊";

      setTimeout(function () {
        error_login.textContent = "";
      }, 8000);
    }

    function displayErrorMessage() {
      error_login.textContent = "";
      error_login.classList.replace("text-success", "text-danger");
      error_login.textContent =
        "Invalid email or password. Please try again. 😔";

      setTimeout(function () {
        error_login.textContent = "";
      }, 8000);
    }

    if (localStorage.getItem("localData") !== null) {
      const localData = JSON.parse(localStorage.getItem("localData"));

      for (let i = 0; i < localData.length; i++) {
        if (
          localData[i].email === userInfo.email &&
          localData[i].password === userInfo.password
        ) {
          displaySuccessMessage();
          clearData();
          return;
        }
      }

      displayErrorMessage();
    } else {
      displayErrorMessage();
    }
  }
}

btnLogin.addEventListener("click", login);

function validateInputLogin(input, type) {
  const regexPatterns = {
    email: /^[a-z1-9]+@(gmail|yahoo)\.com$/i,
    password: /^[a-z0-9]{3,8}$/i,
  };

  const errorMessages = {
    email: "Invalid email. Please enter a valid Gmail or Yahoo email address.",
    password:
      "Invalid password. Please enter a password with 3 to 8 alphanumeric characters.",
  };

  const isValid = regexPatterns[type].test(input.value);
  const errorDanger = document.getElementById(`errorlogin_${type}`);

  if (isValid) {
    errorDanger.textContent = "";
  } else {
    errorDanger.textContent = errorMessages[type];
  }

  return isValid;
}

function clearData() {
  userEmail_login.value = "";
  userPassword_login.value = "";
}
