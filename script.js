const intro = document.getElementById("intro");
const universe = document.getElementById("universe");
const letterScene = document.getElementById("letterScene");

intro.addEventListener("click", () => {
    intro.classList.add("hidden");
    setTimeout(()=> universe.classList.remove("hidden"),1500);
});

document.getElementById("toLetter").addEventListener("click", ()=>{
    universe.classList.add("hidden");
    setTimeout(()=> letterScene.classList.remove("hidden"),1500);
});