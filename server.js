// server.js
const express = require("express");
const multer = require("multer");
const path = require("path");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT || 3000;

// Tajný token
const SECRET = "TAJNYTOKEN123";

// Ukládání nahraných obrázků do složky /public/uploads

app.post("/add-post", upload.single("image"), (req, res) => {
    if (!req.file) {
      return res.status(400).send("Chybí obrázek.");
    }
    
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "public/uploads"),
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});
const upload = multer({ storage });

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// 🟢 Zobrazení admin formuláře pouze s tokenem
app.get("/admin", (req, res) => {
  if (req.query.access === SECRET) {
    res.sendFile(path.join(__dirname, "public/admin.html"));
  } else {
    res.status(403).send("Přístup odepřen.");
  }
});

// 🟢 Přidání aktuality
app.post("/add-post", upload.single("image"), (req, res) => {
  const { title, content, token } = req.body;

  if (token !== SECRET) return res.status(403).send("Neplatný token.");

  const newPost = {
    title,
    content,
    image: req.file ? "/uploads/" + req.file.filename : null,
    date: new Date().toISOString(),
  };

  const filePath = "aktuality.json";
  let posts = [];

  if (fs.existsSync(filePath)) {
    posts = JSON.parse(fs.readFileSync(filePath));
  }

  posts.unshift(newPost); // nejnovější nahoru

  fs.writeFileSync(filePath, JSON.stringify(posts, null, 2));
  res.send("Aktualita uložena!");
});

// 🟢 Získání aktualit (např. pro veřejnou stránku)
app.get("/api/posts", (req, res) => {
  const posts = fs.existsSync("aktuality.json")
    ? JSON.parse(fs.readFileSync("aktuality.json"))
    : [];
  res.json(posts);
});

app.listen(PORT, () => {
  console.log(`Server běží na http://localhost:${PORT}`);
});

res.redirect('/admin'); // nebo na stránku s aktuálními příspěvky
