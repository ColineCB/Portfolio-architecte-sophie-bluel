const gallery = document.querySelector(".gallery");
const apiUrl = "http://localhost:5678/api/works";

fetch (apiUrl)
    .then (response => {
        if (!response.ok) {
            throw new Error ('La requête a échoué');
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
        console.error ('Erreur de fetch', error);
    });