const express = require("express");
const port = 5000;
const app = express();
const cors = require("cors");
const ejs = require("ejs");

app.set("view engine", "ejs");
app.set("views", "./views");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cors());

// Árak adatbázisa
const prices = [
    {
        id: 1,
        name: "Egyedi megoldás",
        price: 0,
        features: [
            "Egyedi weboldal a szervezetnek",
            "letisztult dizájn",
            "karbantartrás",
            "mobilra is optimalizált",
            "teljeskörű támogatás"
            
        ],
        recommended: true
    }
];

// Árak lekérése
app.get("/prices", (req, res) => {
    try {
        res.status(200).json(prices);
    } catch (error) {
        console.error("Hiba történt az árak lekérésekor:", error);
        res.status(500).json({ error: "Hiba történt az árak lekérésekor." });
    }
});

// Ár frissítése
app.put("/prices/:id", (req, res) => {
    try {
        const id = parseInt(req.params.id);
        const updatedPrice = req.body;
        const index = prices.findIndex(price => price.id === id);
        
        if (index === -1) {
            return res.status(404).json({ error: "Az ár nem található." });
        }
        
        prices[index] = { ...prices[index], ...updatedPrice };
        res.status(200).json(prices[index]);
    } catch (error) {
        console.error("Hiba történt az ár frissítésekor:", error);
        res.status(500).json({ error: "Hiba történt az ár frissítésekor." });
    }
});

app.get("/", (req, res) => {
    res.render("index", { title: "Készségek" });
});

const skills = [
    {
        id: 1,
        name: "JavaScript-php",
        level: 65,
        image: "https://emaillistvalidation.com/blog/content/images/size/w500/2023/09/php_vs_javascript.png",
        projects: ["KaposTransit", "kezdő websocket használat"]
    },
    {
        id: 2,
        name: "HTML",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/61/HTML5_logo_and_wordmark.svg/250px-HTML5_logo_and_wordmark.svg.png",
        level: 80,
    },
    {
        id: 3,
        name: "CSS",
        image: "https://miro.medium.com/v2/resize:fit:600/format:webp/1*Aenej4dxqEZ9j7zsI9pSnw.png",
        level: 70,
    },
    {
        id: 4,
        name: "React",
        image: "https://www.patterns.dev/img/reactjs/react-logo@3x.svg",
        level: 50,
    },
    {
        id: 5,
        name: "Node.js",
        image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSenh_LxuMkLZLm3shZfN8qej9FHHUQusbGtBMTosbwOnhstXcVu3yY36KCvNbrlfzzH4E&usqp=CAU",
        level: 60,
    },
    {
        id: 6,
        name: "Express",
        image: "https://cdn.groovetechnology.com/wp-content/uploads/2023/08/expressjs.png",
        level: 55,
    },
    {
        id: 7,
        name: "SQL",
        image: "https://www.ibm.com/adobe/dynamicmedia/deliver/dm-aid--f385b240-1636-41a3-97a6-a0a6fbc58352/azure-sql-server-monitoring.png?preferwebp=true&quality=90",
        level: 70,
    },
    {
        id: 8,
        name: "C#",
        image: "https://miro.medium.com/v2/resize:fit:375/1*NhpIIUL7AFgKKn30gKoDUw.png",
        level: 50,
    },
    {
        id: 9,
        name: "Python",
        image: "https://i0.wp.com/junilearning.com/wp-content/uploads/2020/06/python-programming-language.webp?fit=1920%2C1920&ssl=1",
        level: 45,
        projects: ["Kezdő Python programozás"]
    },
    {
        id: 10,
        name: "C++",
        image: "https://miro.medium.com/v2/resize:fit:1400/1*ImTT0nd7BZUPe3S8XS_juA.png",
        level: 30,
        projects: ["Alapszintű tömb kezelés", "Alapszintű rendelés kezelő rendszer"]
    }
];

app.get("/skills", (req, res) => {
    try {
        res.status(200).json(skills);
    } catch (error) {
        console.error("Hiba történt a készségek lekérésekor:", error);
        res.status(500).json({ error: "Hiba történt a készségek lekérésekor." });
    }
});

app.post("/skills", (req, res) => {
    try {
        const newSkill = req.body;
        if (!newSkill.name || !newSkill.level) {
            return res.status(400).json({ error: "A készség neve és szintje kötelező." });
        }
        newSkill.id = skills.length + 1;
        skills.push(newSkill);
        res.status(201).json(newSkill);
    } catch (error) {
        console.error("Hiba történt a készség hozzáadásakor:", error);
        res.status(500).json({ error: "Hiba történt a készség hozzáadásakor." });
    }
});

app.listen(port, () => {
    console.log(`Szerver fut a http://localhost:${port} címen`);
});