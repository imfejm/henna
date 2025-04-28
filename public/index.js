document.addEventListener("DOMContentLoaded", () => {
  // Navigace na klik a krizek z hamburgeru
  const tlacitko = document.querySelector("#ham");
  const rozbal = document.querySelector("#menu");
  const odkazy = rozbal.querySelectorAll("a");

  tlacitko?.addEventListener("click", () => {
    rozbal.classList.toggle("hidden");

    document.querySelector("#cara1")?.classList.toggle("caraA");
    document.querySelector("#cara2")?.classList.toggle("caraB");
    document.querySelector("#cara3")?.classList.toggle("caraC");
  });

  odkazy.forEach((link) => {
    link.addEventListener("click", () => {
      rozbal.classList.add("hidden");
      document.querySelector("#cara1")?.classList.remove("caraA");
      document.querySelector("#cara2")?.classList.remove("caraB");
      document.querySelector("#cara3")?.classList.remove("caraC");
    });
  });

  // Časová osa
  const line = document.querySelector(".line");
  const wrapperTimeline = document.querySelector(".timeline");
  const dots = document.querySelectorAll(".dot");
  const logo = document.querySelector(".logo");
  const logoS = document.querySelector(".logoS");
  const titleS = document.querySelector(".titleS");

  function onScroll() {
    const rect = wrapperTimeline?.getBoundingClientRect();
    if (!rect) return;

    const windowHeight = window.innerHeight;
    const scrollTop = window.scrollY || window.pageYOffset;
    const elementTop = scrollTop + rect.top;
    const elementBottom = scrollTop + rect.bottom;
    const totalScroll = elementBottom - elementTop;
    const currentScroll = scrollTop + windowHeight - elementTop;
    const lineHeight = Math.min(currentScroll / totalScroll, 1) * 100;

    if (rect.top < windowHeight && rect.bottom > 0) {
      line.style.height = `${lineHeight}%`;
    } else if (rect.top >= windowHeight) {
      line.style.height = `0%`;
    } else if (rect.bottom <= 0) {
      line.style.height = `100%`;
    }

    dots.forEach((dot) => {
      const dotRect = dot.getBoundingClientRect();
      const dotTop = dotRect.top + scrollTop;
      const dotRelative = dotTop - elementTop;
      const dotPercent = (dotRelative / totalScroll) * 100;

      if (dotPercent <= lineHeight) {
        if (!dot.classList.contains("visible")) {
          dot.classList.add("visible");
          dot.style.animation = "none";
          dot.offsetHeight;
          dot.style.animation = "";
        }
      } else {
        dot.classList.remove("visible");
      }
    });

    //logo a nazev do titulku

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
    }
  }

  window.addEventListener("scroll", onScroll);
  window.addEventListener("resize", onScroll);
  onScroll();

  // Galerie – šipky a swipe
  let aktivniIndex = 0;
  const obrazky = document.querySelectorAll(".galerie-img");
  const wrapperGalerie = document.getElementById("galerie-obrazky");

  if (obrazky.length && wrapperGalerie) {
    function posunGalerii(smer) {
      obrazky[aktivniIndex].classList.remove("active");
      aktivniIndex = (aktivniIndex + smer + obrazky.length) % obrazky.length;
      obrazky[aktivniIndex].classList.add("active");
      vystredObrazek(obrazky[aktivniIndex]);
    }

    function vystredObrazek(img) {
      const rect = img.getBoundingClientRect();
      const wrapperRect = wrapperGalerie.getBoundingClientRect();
      const scrollLeft =
        wrapperGalerie.scrollLeft +
        (rect.left + rect.width / 2) -
        (wrapperRect.left + wrapperRect.width / 2);
      wrapperGalerie.scrollTo({ left: scrollLeft, behavior: "smooth" });
    }

    let startX = 0;
    wrapperGalerie.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
    });
    wrapperGalerie.addEventListener("touchend", (e) => {
      const endX = e.changedTouches[0].clientX;
      if (endX - startX > 50) posunGalerii(-1);
      else if (startX - endX > 50) posunGalerii(1);
    });
  }
  const sipkaVlevo = document.getElementById("arrow-left");
  const sipkaVpravo = document.getElementById("arrow-right");

  sipkaVlevo?.addEventListener("click", () => posunGalerii(-1));
  sipkaVpravo?.addEventListener("click", () => posunGalerii(1));
});

//rozkliknuti recenzi
const reference = document.getElementById("reference");
const toggleButton = document.getElementById("toggleButton");

toggleButton.addEventListener("click", function () {
  reference.classList.toggle("expanded");

  if (reference.classList.contains("expanded")) {
    toggleButton.textContent = "↑ méně";
  } else {
    toggleButton.textContent = "↓ přečti si více recenzí";
  }
});
