// aktuality.js

fetch("/api/posts")
  .then((res) => res.json())
  .then((data) => {
    const container = document.getElementById("aktuality-container");

    if (data.length === 0) {
      container.innerHTML = "<p>Žádné aktuality zatím nejsou.</p>";
      return;
    }

    data.reverse().forEach((post) => {
      const item = document.createElement("div");
      item.classList.add("aktualita");

      item.innerHTML = `
        <h3>${post.title}</h3>
        <p>${post.content}</p>
        ${
          post.image
            ? `<img src="/uploads/${post.image}" alt="obrázek aktuality">`
            : ""
        }
        <hr>
      `;

      container.appendChild(item);
    });
  })
  .catch((err) => {
    console.error("Chyba při načítání aktualit:", err);
  });
