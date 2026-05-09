window.login = function () {

    const email =
        document.getElementById("email").value;

    const password =
        document.getElementById("password").value;

    auth.signInWithEmailAndPassword(email, password)

        .then(() => {

            window.location.href = "admin.html";
        })

        .catch(() => {

            document.getElementById("error")
                .innerText = "Invalid Login!";
        });
};