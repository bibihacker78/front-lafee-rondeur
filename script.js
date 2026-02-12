/*function stickyNav() {
    var headerHeight = document.querySelector("#carousel").offsetHeight / 2;
    var navbar = document.querySelector("#header");
    var scrollValue = window.scrollY;

    if (scrollValue >= headerHeight) {
        navbar.classList.add("header-sticky");
    } else {
        navbar.classList.remove("header-sticky");
    }
    console.log(scrollValue);
}

// Appel initial pour définir l'état au chargement
stickyNav();

// Ajout de l'écouteur d'événement de défilement
window.addEventListener("scroll", stickyNav); */

document.addEventListener('DOMContentLoaded', function() {
    function stickyNav() {
        var carousel = document.querySelector("#carousel");
        if (!carousel) {
            console.error("Carousel element not found");
            return;
        }
        var headerHeight = carousel.offsetHeight / 2;
        var navbar = document.querySelector("#header");
        var scrollValue = window.scrollY;

        if (scrollValue >= headerHeight) {
            navbar.classList.add("header-sticky");
        } else {
            navbar.classList.remove("header-sticky");
        }
    }

    stickyNav();
    window.addEventListener("scroll", stickyNav);
});