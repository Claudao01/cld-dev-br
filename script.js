// Seletores
const body = document.body;
const themeSwitch = document.getElementById("theme-switch");
const yearSpan = document.getElementById("year");
const langButtons = {
    br: document.getElementById("lang-br"),
    us: document.getElementById("lang-us"),
    es: document.getElementById("lang-es"),
};
const constructionText = document.getElementById("construction-text");
const footerText = document.getElementById("footer-text");
const logoImg = document.getElementById("logo-img");
const favicon = document.getElementById("favicon");
const flagButtons = {
    br: document.getElementById("lang-br"),
    us: document.getElementById("lang-us"),
    es: document.getElementById("lang-es"),
};

// Idiomas
const translations = {
    br: {
        title: "🚧 Em construção",
        construction: "Em construção",
        footer: "© Claudão. Todos os direitos reservados.",
        tooltip: "Alterar para português do Brasil?"
    },
    us: {
        title: "🚧 Under construction",
        construction: "Under construction",
        footer: "© Claudão. All rights reserved.",
        tooltip: "Alterar para inglês?"
    },
    es: {
        title: "🚧 En construcción",
        construction: "En construcción",
        footer: "© Claudão. Todos los derechos reservados.",
        tooltip: "Alterar para espanhol?"
    },
};

// Atualizar ano no rodapé
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Função para atualizar o logo dependendo do tema
function updateLogo() {
    const logoPath = body.classList.contains("dark-mode") ? 
        "assets/img/logo/logo-cld-dark-mode.png" : 
        "assets/img/logo/logo-cld-light-mode.png";
    logoImg.src = logoPath;
}

// Função para atualizar o favicon dependendo do tema
function updateFavicon() {
    const faviconPath = body.classList.contains("dark-mode") ? 
        "assets/img/icon/favicon-dark-mode.png" : 
        "assets/img/icon/favicon-light-mode.png";
    favicon.href = faviconPath;
}

// Trocar tema automaticamente de acordo com o modo do sistema
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (prefersDark) {
    body.classList.add("dark-mode");
    themeSwitch.textContent = "🌞";
} else {
    body.classList.add("light-mode");
    themeSwitch.textContent = "🌙";
}

// Atualiza o logo e favicon conforme o tema atual
updateLogo();
updateFavicon();

// Trocar tema manualmente
themeSwitch.addEventListener("click", () => {
    const isDarkMode = body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode", !isDarkMode);
    themeSwitch.textContent = isDarkMode ? "🌞" : "🌙";
    
    // Atualiza o logo e favicon conforme o tema
    updateLogo();
    updateFavicon();
});

// Trocar idioma
Object.keys(langButtons).forEach((lang) => {
    langButtons[lang].addEventListener("click", () => {
        const translation = translations[lang];
        document.title = translation.title;
        constructionText.textContent = translation.construction;
        
        // Atualizar rodapé com ano na posição correta
        footerText.innerHTML = `${currentYear} ${translation.footer}`;

        // Alterar estilo das bandeiras
        Object.keys(flagButtons).forEach((key) => {
            if (key === lang) {
                // Adiciona a classe selected à bandeira selecionada
                flagButtons[key].classList.add("selected");
            } else {
                // Remove a classe selected das bandeiras não selecionadas
                flagButtons[key].classList.remove("selected");
            }
        });
    });
});

// Inicializa a bandeira selecionada com a opacidade correta
Object.keys(flagButtons).forEach((key) => {
    if (key === 'br') {
        flagButtons[key].classList.add("selected");
    }
});
