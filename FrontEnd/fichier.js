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
        let btnTous = document.createElement("button");
        btnTous.innerHTML = "Tous";
        btnTous.classList.add("btns");
        divBtnFiltres.appendChild(btnTous); 
        console.log(btnTous);
        for (const categorie of categories) {
            const btn = document.createElement("button");
            btn.textContent = categorie.name;
            btn.classList.add("btns");
            btn.setAttribute("data-category", categorie.id);
            divBtnFiltres.appendChild(btn);
        }
        
        /* gestion du filtrage des boutons : ne fonctionne pas encore
        
        const btns = document.querySelectorAll(".btns");

        btns.forEach (btn => {
            btn.addEventListener ("click", function () {
                const categoryId = btn.dataset.category;
                console.log(categoryId);
                const projectsFiltres = projects.filter (function (project) {
                    return project.categoryId === parseInt(categoryId);
                });
                console.log(projectsFiltres);
            });
        });

        */

    })
    .catch(error => {
        console.error ("Erreur de fetch pour les boutons", error);
    });


    /*
// gestion du filtrage des boutons : en Test (ne fonctionne pas actuellement)
const btns = document.querySelectorAll(".btns");

btns.forEach (btn => {
    btn.addEventListener ("click", function () {
        const categoryId = btn.dataset.category;
        console.log(categoryId);
        const projectsFiltres = projects.filter (function (project) {
            return project.categoryId === parseInt(categoryId);
        });
        console.log(projectsFiltres);
    });
});

*/