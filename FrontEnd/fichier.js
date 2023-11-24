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

            figure.classList.add("figure");
            figure.setAttribute("data-categoryId", project.categoryId);

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

// affichage dynamique du bouton "Tous" et des trois boutons dans la divBtnFiltres
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
        btnTous.classList.add("tous");
        divBtnFiltres.appendChild(btnTous); 
        for (const categorie of categories) {
            const btn = document.createElement("button");
            btn.textContent = categorie.name;
            btn.classList.add("btns");
            btn.setAttribute("data-categoryId", categorie.id);
            divBtnFiltres.appendChild(btn);
        }
        
        // gestion du filtrage des boutons
        const boutons = document.querySelectorAll(".btns");
        const figures = document.querySelectorAll(".figure");

        boutons.forEach (bouton => {
            bouton.addEventListener ("click", () => {
            const isTousBtn = bouton.classList.contains("tous");
            if (isTousBtn) {
                figures.forEach (figure => {
                    figure.classList.remove("hidden");
                });
            } else {
                const clickCategoryId = bouton.getAttribute("data-categoryId");
                figures.forEach (figure => {
                    const figureCategoryId = figure.getAttribute("data-categoryId");
                    if (figureCategoryId === clickCategoryId) {
                        figure.classList.remove("hidden");
                    } else {
                        figure.classList.add("hidden");
                    }
                });
            } 
            });
        });

    })
    .catch(error => {
        console.error ("Erreur de fetch pour les boutons", error);
    });
