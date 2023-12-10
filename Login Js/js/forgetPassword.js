const sumbit = document.querySelector(".sumbit");
const emailForget = document.getElementById("email");
const email_error= document.querySelector(".email_error");

function forgetPassword(e) {
  e.preventDefault();

  if (!emailForget.value) {
    document.getElementById("error_forget").textContent =
      "Please enter an email address.";
    return;
  }

  const isEmailValid = validateInputForget(emailForget, "forget");

  if (isEmailValid) {
    const userInfo = {
      email: emailForget.value,
    };

    function displaySuccessMessage() {
        email_error.classList.replace("text-danger", "text-success");
      email_error.textContent = "Password reset instructions sent to your email. 😊";

      setTimeout(function () {
        email_error.textContent = "";
      }, 10000);

    }

    function displayErrorMessage() {
      email_error.textContent = "";
      email_error.classList.replace("text-success", "text-danger");
      email_error.textContent =
        "Invalid email. Please try again. 😔";

        setTimeout(function () {
            email_error.textContent = "";
          }, 10000);
    }

    if (localStorage.getItem("localData") !== null) {
      const localData = JSON.parse(localStorage.getItem("localData"));

      for (let i = 0; i < localData.length; i++) {
        if (
          localData[i].email === userInfo.email 
        ) {
          displaySuccessMessage();
          clearData();
          return;
        }
      }

      displayErrorMessage();
    }
  }
}

sumbit.addEventListener("click", forgetPassword);

function validateInputForget(input) {
  const regexPatterns = {
    email: /^[a-z1-9]+@(gmail|yahoo)\.com$/i,
  };

  const errorMessages = {
    email: "Invalid email. Please enter a valid Gmail or Yahoo email address.",
  };

  const isValid = regexPatterns["email"].test(input.value);
  const errorDanger = document.getElementById(`error_forget`);

  if (isValid) {
    errorDanger.textContent = "";
  } else {
    errorDanger.textContent = errorMessages["email"];
  }

  return isValid;
}

function clearData() {
  emailForget.value = "";
}
