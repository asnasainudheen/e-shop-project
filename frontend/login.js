const API = "http://localhost:5000";

function showLogin() {

    document.getElementById(
        "loginForm"
    ).style.display = "block";

    document.getElementById(
        "registerForm"
    ).style.display = "none";
}

function showRegister() {

    document.getElementById(
        "loginForm"
    ).style.display = "none";

    document.getElementById(
        "registerForm"
    ).style.display = "block";
}

async function registerUser() {

    const name =
        document.getElementById("name").value;

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    try {

        const response =
            await fetch(
                `${API}/users/register`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        name,
                        email,
                        password
                    })
                }
            );

        const data =
            await response.json();

        alert(data.message);

        if (
            data.message ===
            "User Registered"
        ) {

            showLogin();

            document.getElementById(
                "loginEmail"
            ).value = email;

            document.getElementById(
                "loginPassword"
            ).value = "";
        }

    }
    catch (error) {

        console.log(error);

        alert(
            "Registration Failed"
        );
    }
}

async function loginUser() {

    const email =
        document.getElementById(
            "loginEmail"
        ).value;

    const password =
        document.getElementById(
            "loginPassword"
        ).value;

    try {

        const response =
            await fetch(
                `${API}/users/login`,
                {
                    method: "POST",

                    headers: {
                        "Content-Type":
                            "application/json"
                    },

                    body: JSON.stringify({
                        email,
                        password
                    })
                }
            );

        const data =
            await response.json();

        if (
            data.message ===
            "Login Successful"
        ) {

            localStorage.setItem(
                "userEmail",
                email
            );

            if (data.user) {

                localStorage.setItem(
                    "userId",
                    data.user.id
                );

                localStorage.setItem(
                    "userName",
                    data.user.name
                );
            }

            window.location.href =
                "store.html";
        }
        else {

            alert(
                data.message
            );
        }

    }
    catch (error) {

        console.log(error);

        alert(
            "Login Failed"
        );
    }
}
function togglePassword(inputId, icon){

    const input = document.getElementById(inputId);

    if(input.type === "password"){
        input.type = "text";
        icon.textContent = "🙈";
    }
    else{
        input.type = "password";
        icon.textContent = "👁️";
    }
}