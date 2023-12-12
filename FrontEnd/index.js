const galerie = document.querySelector(".galerie");
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
        for (let project of projects) {

            // création des figures de la galerie : chaque figure contient une image et une figcaption 
            let figure = document.createElement("figure");
            galerie.appendChild(figure);
            figure.classList.add("figure");
            figure.setAttribute("data-id", project.id);
            figure.setAttribute("data-categoryId", project.categoryId);

            let img = document.createElement("img");
            img.src = project.imageUrl;
            figure.appendChild(img);

            let figcaption = document.createElement("figcaption");
            figcaption.textContent = project.title;
            figure.appendChild(figcaption);

            // création div pour chaque images de la boîte modale galerie
            let projetModaleGalerie = document.createElement("div");
            projetModaleGalerie.setAttribute("data-id", project.id);
            projetModaleGalerie.classList.add("div_projet_modale_galerie");
            let boiteProjetModale = document.getElementById ("boite_projets_modale");
            boiteProjetModale.appendChild(projetModaleGalerie);

            // copie de l'élément img pour la boîte modale galerie
            let imgCopy = img.cloneNode(true);
            imgCopy.classList.add("images_modale"); 
            projetModaleGalerie.appendChild(imgCopy);

            // création du bouton de suppression des projets de la boîte modale galerie
            let boutonSuppression = document.createElement("button");
            boutonSuppression.setAttribute("data-id", project.id);
            boutonSuppression.classList.add("bouton_suppression");
            projetModaleGalerie.appendChild(boutonSuppression);
            
            // fonction de suppression des projets
            function supprimerProjet(id) {
                const divASupprimer = document.getElementById(`boite_projets_modale${id}`);
                if (divASupprimer) {
                    divASupprimer.classList.add("hidden");
                }
            }

            // suppression des projets au clique sur les boutonSuppression
            boutonSuppression.addEventListener("click", function(e) {
                if (e.target.classList.contains("bouton_suppression")) {
                    const id = e.target.getAttribute("data-id");
                    const apiSuppression = `http://localhost:5678/api/works/${id}`;
                    const token = localStorage.getItem('token');

                    fetch(apiSuppression, {
                        method: 'DELETE',
                        headers: { 
                            'Authorization': `Bearer ${token}`
                        },
                    })
                    .then(response => {
                        if (!response.ok) {
                            throw new Error("La requête a échoué");
                        }
                        return response.json();
                    })
                    .then(data => {
                        supprimerProjet(id);
                        
                    })
                    .catch(error => {
                        console.error('Erreur de fetch pour la suppression des projets', error);
                    });
                }
            });

        }
    })
    .catch(error => {
        console.error ('Erreur de fetch pour les projets', error);
    });


const apiCategories = "http://localhost:5678/api/categories";

// Création d'une div pour placer les boutons des filtres
let divBtnFiltres = document.createElement("div");
divBtnFiltres.setAttribute("id", "div_Btn_Filtres");
let titreH2 = document.querySelector(".mes_projets_mode_edition");
if (titreH2) {
    titreH2.parentNode.insertBefore(divBtnFiltres, titreH2.nextSibling);
} else {
    console.error("div non trouvée");

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
        categories.unshift({
            "id":0,
            "name": "Tous"
        })
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
                const btnCategorieId = bouton.getAttribute("data-categoryId");
                if (btnCategorieId == "0") {
                    figures.forEach (figure => {
                        figure.classList.remove("hidden");
                    });
                    return
                } 
                    
                const clickCategoryId = bouton.getAttribute("data-categoryId");
                figures.forEach (figure => {
                    const figureCategoryId = figure.getAttribute("data-categoryId");
                    figure.classList.remove("hidden");
                    if (figureCategoryId !== clickCategoryId) {
                        figure.classList.add("hidden");
                    }
                });
            
            });
        });

    })
    .catch(error => {
        console.error ("Erreur de fetch pour les boutons", error);
    });

// gestion de la connexion => présence du token

document.addEventListener("DOMContentLoaded", (event) => {
    const bandeauEdition = document.getElementById("bandeau_edition");
    const boutonEdition = document.getElementById("bouton_edition");
    const divBtnFiltres = document.getElementById("div_Btn_Filtres");
    const boutonLogin = document.getElementById("bouton_login");
    const boutonLogout = document.getElementById("bouton_logout");

    if (localStorage.getItem('token') !== null) {
        bandeauEdition.classList.remove("hidden");
        boutonEdition.classList.remove("hidden");
        divBtnFiltres.classList.add("visibility_hidden");
        boutonLogin.classList.add("hidden");
        boutonLogout.classList.remove("hidden");
    }
    /* gestion de la déconnexion */
    bouton_logout.addEventListener ("click", () => {
        localStorage.removeItem("token");
    });
});