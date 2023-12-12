let modale = null;

const stopPropagation = function (e) {
    e.stopPropagation()
};

const ouvertureModale = function (e) {
    e.preventDefault();
    const modale = document.getElementById("modale_galerie");
    if (modale) {
        modale.classList.remove("hidden");
        modale.setAttribute("aria-hidden", false);
        modale.setAttribute("aria-modal", true);
        modale.addEventListener("click", fermetureModale);
        modale.querySelector("#bouton_fermeture_modale_galerie").addEventListener("click", fermetureModale);
        modale.querySelector(".js_modale_stop").addEventListener("click", stopPropagation);
    };
};

const fermetureModale = function (e) {
    e.preventDefault()
    const modale = document.getElementById("modale_galerie");
    modale.classList.add("hidden");
    modale.setAttribute("aria-hidden", true);
    modale.removeAttribute("aria-modal");
    modale.removeEventListener("click", fermetureModale);
    modale.querySelector("#bouton_fermeture_modale_galerie").removeEventListener("click", fermetureModale);
    modale.querySelector(".js_modale_stop").removeEventListener("click", stopPropagation);
};

document.querySelectorAll(".js_modale").forEach(a => {
    a.addEventListener("click", ouvertureModale);
});

window.addEventListener("keydown", function (e) {
    if (e.key === "Escape" || e.key === "Esc") {
        fermetureModale(e);
    };
});

// ajout de la fonction de suppression des projets via la boite modale galerie


    
   
        



 // récupération de tous les éléments ayant la classe .div_projet_modale_galerie
// let projetModaleGalerieListe = document.querySelectorAll(".div_projet_modale_galerie");

//quels sont les paramètres js d'un event liés à un eventlistener 
// à partir de ce paramètre, comment récupérer l'élément html d'origine 