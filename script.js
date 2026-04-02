const startBtn = document.getElementById("startBtn");
const intro = document.getElementById("intro");
const universe = document.getElementById("universe");

startBtn.addEventListener("click", () => {
    intro.classList.add("hidden");

    setTimeout(() => {
        universe.classList.remove("hidden");
    }, 1500);
});