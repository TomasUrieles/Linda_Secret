

document.addEventListener("DOMContentLoaded", function () {

    const intro = document.getElementById("intro");
    const universe = document.getElementById("universe");
    const letterScene = document.getElementById("letterScene");
    const toLetterBtn = document.getElementById("toLetter");

    intro.addEventListener("click", () => {
        intro.classList.add("hidden");

        setTimeout(() => {
            universe.classList.remove("hidden");
        }, 1500);
    });

    toLetterBtn.addEventListener("click", () => {
        universe.classList.add("hidden");

        setTimeout(() => {
            letterScene.classList.remove("hidden");
        }, 1500);
    });

});