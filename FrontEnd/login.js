const apiUrl = "http://localhost:5678/users/login";

// Création de l'événement click pour déclencher la vérification des champs du formulaire
document.getElementById("loginButton").addEventListener("click", function() {
    let email = document.getElementById("email").value;
    let password = document.getElementById("password").value;
    let token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTY1MTg3NDkzOSwiZXhwIjoxNjUxOTYxMzM5fQ.JGN1p8YIfR-M-5eQ-Ypy6Ima5cKA4VbfL2xMr2MgHm4"
    if (email === "exemple@email.com" && password === "mot de passe") {
        fetch(apiUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
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