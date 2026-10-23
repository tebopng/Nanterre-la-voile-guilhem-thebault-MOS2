/* =========================================================
   Programme : affiche le programme du jour choisi
   Sans JavaScript, tous les jours restent affichés.
   ========================================================= */

const onglets = document.querySelectorAll(".jour-onglet");
const panneaux = document.querySelectorAll(".jour-panneau");

function afficherJour(onglet, mettreAJourAdresse) {
  onglets.forEach(function (o) {
    const actif = o === onglet;
    o.setAttribute("aria-selected", actif ? "true" : "false");
    o.tabIndex = actif ? 0 : -1;
  });
  panneaux.forEach(function (p) {
    p.hidden = p.id !== onglet.getAttribute("aria-controls");
  });
  /* Ajoute ?jour=2027-06-12 à l'adresse, comme sur le site de la Route du Rhum */
  if (mettreAJourAdresse) {
    const url = new URL(window.location);
    url.searchParams.set("jour", onglet.dataset.date);
    history.replaceState(null, "", url);
  }
}

onglets.forEach(function (onglet, i) {
  onglet.addEventListener("click", function () {
    afficherJour(onglet, true);
  });
  /* Flèches gauche / droite au clavier */
  onglet.addEventListener("keydown", function (e) {
    let cible = null;
    if (e.key === "ArrowRight") cible = onglets[(i + 1) % onglets.length];
    if (e.key === "ArrowLeft") cible = onglets[(i - 1 + onglets.length) % onglets.length];
    if (cible) {
      e.preventDefault();
      cible.focus();
      afficherJour(cible, true);
    }
  });
});

/* Au chargement : jour indiqué dans l'adresse, sinon le premier jour */
const jourDemande = new URLSearchParams(window.location.search).get("jour");
let ongletDepart = onglets[0];
onglets.forEach(function (o) {
  if (o.dataset.date === jourDemande) ongletDepart = o;
});
afficherJour(ongletDepart, false);
