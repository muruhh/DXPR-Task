window.onload = () => {
    setTimeout(() => {
        document.querySelector(".loader").style.display = "none";
        document.querySelector(".loader").classList.add("loader-bottom");
    }, 1500);
}