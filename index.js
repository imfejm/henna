//navigace na klik a krizek z ham
const tlacitko = document.querySelector("#ham");
const rozbal = document.querySelector("#menu");
const odkazy = rozbal.querySelectorAll("a");

tlacitko.addEventListener("click", () => {
  rozbal.classList.toggle("hidden");

  document.querySelector("#cara1").classList.toggle("caraA");
  document.querySelector("#cara2").classList.toggle("caraB");
  document.querySelector("#cara3").classList.toggle("caraC");
});
// Zavření menu po kliknutí na jakýkoli odkaz
odkazy.forEach((link) => {
  link.addEventListener("click", () => {
    rozbal.classList.add("hidden"); // Skryje menu

    // Vrátí čáry do původní polohy (křížek zpět na hamburger)
    document.querySelector("#cara1").classList.remove("caraA");
    document.querySelector("#cara2").classList.remove("caraB");
    document.querySelector("#cara3").classList.remove("caraC");
  });
});

//logo a nazev do titulku při skrolovani

if (window.innerWidth <= 800) {
  const logo = document.querySelector(".logo");
  const logoS = document.querySelector(".logoS");
  const titleS = document.querySelector(".titleS");

  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      logo?.classList.add("hidden");       // schovej velké logo
      logoS?.classList.add("visible");     // ukaž malé logo
      titleS?.classList.add("visible");    // ukaž název
    } else {
      logo?.classList.remove("hidden");
      logoS?.classList.remove("visible");
      titleS?.classList.remove("visible");
    }
  });
}
//linka při skrolování
const line = document.querySelector('.line');
const wrapper = document.querySelector('.timeline');

function updateLineHeight() {
  const rect = wrapper.getBoundingClientRect();
  const windowHeight = window.innerHeight;

  if (rect.top < windowHeight && rect.bottom > 0) {
    const visibleHeight = Math.min(windowHeight, rect.bottom) - Math.max(0, rect.top);
    const totalHeight = rect.height;

    if (totalHeight > 0) {
      const percentVisible = visibleHeight / totalHeight;
      const height = percentVisible * 100;
      line.style.height = `${height}%`;
    }
  } else if (rect.top >= windowHeight) {
    line.style.height = `0%`;
  } else if (rect.bottom <= 0) {
    line.style.height = `100%`;
  }
}

window.addEventListener('scroll', updateLineHeight);
window.addEventListener('resize', updateLineHeight);
updateLineHeight(); // inicializace

//test
//const height = percentVisible * 100;
//console.log("Výška linky:", height);
//line.style.height = `${height}%`;