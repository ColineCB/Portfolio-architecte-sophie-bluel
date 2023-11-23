const gallery = document.querySelector(".gallery");
const apiUrl = "http://localhost:5678/api/works";

// affichage dynamique des projets
fetch (apiUrl)
    .then (response => {
        if (!response.ok) {
            throw new Error ("La requête a échoué");
        }
        return response.json();
    })
    .then (projects => {
        console.log(projects);
        for (const index in projects) {
            let project = projects[index];
            let figure = document.createElement("figure");
            gallery.appendChild(figure);

            let img = document.createElement("img");
            img.src = project.imageUrl;
            figure.appendChild(img);

            let figcaption = document.createElement("figcaption");
            figcaption.textContent = project.title;
            figure.appendChild(figcaption);
        }
    })
    .catch(error => {
        console.error ('Erreur de fetch pour les projets', error);
    });


const apiCategories = "http://localhost:5678/api/categories";

// Création d'une div pour placer les boutons des filtres
let divBtnFiltres = document.createElement("div");
divBtnFiltres.classList.add("div-Btn-Filtres");
let titreH2 = document.querySelector(".titre-mes-projets");
if (titreH2) {
    titreH2.parentNode.insertBefore(divBtnFiltres, titreH2.nextSibling);
} else {
    console.error("Titre h2 non trouvé");
};

// affichage dynamique des trois boutons dans la divBtnFiltres
fetch (apiCategories)
    .then (response => {
        if (!response.ok) {
            throw new Error ("La requête a échoué");
        }
        return response.json();
    })
    .then (categories => {
        console.log(categories);
        for (const categorie of categories) {
            const btn = document.createElement("button");
            btn.textContent = categorie.name;
            divBtnFiltres.appendChild(btn);
        }
    })
    .catch(error => {
        console.error ("Erreur de fetch pour les boutons", error);
    });

// Création du quatrième bouton "Tous", situé en premier dans la liste des quatre boutons
let btnTous = document.createElement("button");
divBtnFiltres.appendChild(btnTous); 