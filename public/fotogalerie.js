document.addEventListener("DOMContentLoaded", () => {
  const tlacitko = document.querySelector("#ham");
  const rozbal = document.querySelector("#menu");
  const odkazy = rozbal.querySelectorAll("a");

  const logo = document.querySelector(".logo"); // velké logo
  const logoS = document.querySelector(".logoS"); // malé logo
  const titleS = document.querySelector(".titleS"); // název v malé verzi

  // Funkce pro skrytí/zobrazení loga podle scrollu
  function onScroll() {
    const scrollTop = window.scrollY;

    if (window.innerWidth <= 800) {
      if (scrollTop > 50) {
        logo?.classList.add("hidden");
        logoS?.classList.add("visible");
        titleS?.classList.add("visible");
      } else {
        logo?.classList.remove("hidden");
        logoS?.classList.remove("visible");
        titleS?.classList.remove("visible");
      }
    } else {
      // Pro jistotu resetuj pro desktop
      logo?.classList.remove("hidden");
      logoS?.classList.remove("visible");
      titleS?.classList.remove("visible");
    }
  }

  // Hamburger menu
  tlacitko?.addEventListener("click", () => {
    rozbal.classList.toggle("hidden");

    document.querySelector("#cara1")?.classList.toggle("caraA");
    document.querySelector("#cara2")?.classList.toggle("caraB");
    document.querySelector("#cara3")?.classList.toggle("caraC");
  });

  // Zavření menu po kliknutí na odkaz
  odkazy.forEach((link) => {
    link.addEventListener("click", () => {
      rozbal.classList.add("hidden");
      document.querySelector("#cara1")?.classList.remove("caraA");
      document.querySelector("#cara2")?.classList.remove("caraB");
      document.querySelector("#cara3")?.classList.remove("caraC");
    });
  });

  // Inicializace scroll detekce
  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onScroll);
  onScroll(); // Spustí hned po načtení
});
