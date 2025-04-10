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

// Výběr potřebných prvků z DOMu
const line = document.querySelector('.line');            // Čára v časové ose
const wrapper = document.querySelector('.timeline');     // Celý blok časové osy
const dots = document.querySelectorAll('.dot');          // Všechny tečky na ose

// Prvky pro logo a název (pro mobilní zobrazení)
const logo = document.querySelector(".logo");            // Velké logo
const logoS = document.querySelector(".logoS");          // Malé logo
const titleS = document.querySelector(".titleS");        // Textový název

// Funkce, která se spouští při scrollování i při změně velikosti okna
function onScroll() {
  // Informace o pozici a velikosti časové osy
  const rect = wrapper.getBoundingClientRect();
  const windowHeight = window.innerHeight;
  const scrollTop = window.scrollY || window.pageYOffset;
  const elementTop = scrollTop + rect.top;     // Horní pozice časové osy na stránce
  const elementBottom = scrollTop + rect.bottom; // Spodní pozice časové osy
  const totalScroll = elementBottom - elementTop;
  const currentScroll = scrollTop + windowHeight - elementTop;

  // Výpočet výšky čáry jako procento
  const lineHeight = Math.min(currentScroll / totalScroll, 1) * 100;

  // Nastavení výšky čáry jen pokud je viditelná v okně
  if (rect.top < windowHeight && rect.bottom > 0) {
    line.style.height = `${lineHeight}%`;
  } else if (rect.top >= windowHeight) {
    line.style.height = `0%`;
  } else if (rect.bottom <= 0) {
    line.style.height = `100%`;
  }

  // Zobrazení teček (s animací) podle toho, kde je čára
  dots.forEach(dot => {
    const dotRect = dot.getBoundingClientRect();
    const dotTop = dotRect.top + scrollTop;
    const dotRelative = dotTop - elementTop;
    const dotPercent = (dotRelative / totalScroll) * 100;

    if (dotPercent <= lineHeight) {
      // Pokud je tečka v oblasti pod čárou a není ještě viditelná
      if (!dot.classList.contains('visible')) {
        dot.classList.add('visible');

        // Reset animace záblesku
        dot.style.animation = 'none';
        dot.offsetHeight; // force reflow
        dot.style.animation = '';
      }
    } else {
      // Pokud čára nedosáhla k tečce – schovej ji
      dot.classList.remove('visible');
    }
  });

  // Zobrazení malého loga a názvu na mobilních zařízeních
  if (window.innerWidth <= 800) {
    if (scrollTop > 50) {
      logo?.classList.add("hidden");         // Skryj velké logo
      logoS?.classList.add("visible");       // Zobraz malé logo
      titleS?.classList.add("visible");      // Zobraz název
    } else {
      logo?.classList.remove("hidden");      // Zobraz zpět velké logo
      logoS?.classList.remove("visible");    // Skryj malé logo
      titleS?.classList.remove("visible");   // Skryj název
    }
  }
}

// Přidání posluchačů na scroll a resize
window.addEventListener('scroll', onScroll);
window.addEventListener('resize', onScroll);
onScroll(); // Spuštění hned po načtení pro správný stav