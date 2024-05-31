const onSubmit = () => {
    const registerForm = document.getElementById("registerForm");

    if(form.checkValidity()) {
        // create a use in the database
        const firstName = document.getElementById("firstName");
        const lastName = document.getElementById("lastName");
        const bio = document.getElementById("bio");
        const email = document.getElementById("email");
        const password = document.getElementById("password");
    } else {
        console.lof("Form Not Valid");
    };

    form.classList.add('was-validated');
}