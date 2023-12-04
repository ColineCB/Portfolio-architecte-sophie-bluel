const apiUrl = "http://localhost:5678/api/users/login";

// Création de l'événement click pour déclencher la vérification des champs du formulaire
document.getElementById("loginButton").addEventListener("click", function(event) {
    event.preventDefault();
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    console.log(email, password);

    /* Vérification basique du formulaire */ 
    if (!email || !password) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
    }

    fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        console.log(response);
        if (!response.ok) {
            throw new Error("La requête a échoué");
        }
        return response.json();
    })
    .then(data => {
        localStorage.setItem('token', data.token);
        window.location.href = "index.html";
    })
    .catch(error => {
        console.error('Problème', error);
        alert("Utilisateur mot de passe incorrect");
    });

});