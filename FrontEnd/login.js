const apiUrl = "http://localhost:5678/users/login";

// Création de l'événement click pour déclencher la vérification des champs du formulaire
document.getElementById("loginButton").addEventListener("click", function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;

    /* Vérification basique du formulaire */ 
    if (!email || !password) {
        alert("Veuillez remplir tous les champs du formulaire.");
        return;
    }

    if (email === "exemple@email.com" && password === "mot de passe") {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password })
        })
        .then(response => {
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
            console.error('Erreur lors de la validation du formulaire', error);
            alert("Erreur lors de la validation du formulaire");
        });
    } else {
        alert("Email ou mot de passe incorrect !");
    }
});