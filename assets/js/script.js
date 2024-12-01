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
        themeTooltip: "Alternar Tema",
        langTooltip: "Português",
    },
    us: {
        title: "🚧 Under construction",
        construction: "Under construction",
        footer: "© Claudão. All rights reserved.",
        themeTooltip: "Switch Theme",
        langTooltip: "English",
    },
    es: {
        title: "🚧 En construcción",
        construction: "En construcción",
        footer: "© Claudão. Todos los derechos reservados.",
        themeTooltip: "Cambiar Tema",
        langTooltip: "Español",
    },
};

// Atualizar ano no rodapé
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;

// Função para atualizar o logo dependendo do tema
function updateLogo() {
    const logoPath = body.classList.contains("dark-mode") ? 
        "assets/images/logo/logo-cld-dark-mode.png" : 
        "assets/images/logo/logo-cld-light-mode.png";
    logoImg.src = logoPath;
}

// Função para atualizar o favicon dependendo do tema
function updateFavicon() {
    const faviconPath = body.classList.contains("dark-mode") ? 
        "assets/images/icon/favicon-dark-mode.png" : 
        "assets/images/icon/favicon-light-mode.png";
    favicon.href = faviconPath;
}

// Trocar tema automaticamente de acordo com o modo do sistema
const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
if (prefersDark) {
    body.classList.add("dark-mode");
    themeSwitch.textContent = "Light 🌞";
} else {
    body.classList.add("light-mode");
    themeSwitch.textContent = "Dark 🌙";
}

// Atualiza o logo e favicon conforme o tema atual
updateLogo();
updateFavicon();

// Trocar tema manualmente
themeSwitch.addEventListener("click", () => {
    const isDarkMode = body.classList.toggle("dark-mode");
    body.classList.toggle("light-mode", !isDarkMode);
    themeSwitch.textContent = isDarkMode ? "Light 🌞" : "Dark 🌙";

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
        
        // Atualizar rodapé com ano e mensagem de direitos
        footerText.innerHTML = `${currentYear} ${translation.footer}`;

        // Atualiza o tooltip do botão de tema
        themeSwitch.title = translation.themeTooltip;

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

// Função para criar e exibir o tooltip
function showTooltip(element, message) {
    // Remove tooltips existentes antes de criar um novo
    const existingTooltip = document.querySelector('.tooltip');
    if (existingTooltip) existingTooltip.remove();

    // Cria o elemento tooltip
    const tooltip = document.createElement('div');
    tooltip.className = 'tooltip show';
    tooltip.textContent = message;
    document.body.appendChild(tooltip);

    // Adiciona o evento de movimento do mouse para o tooltip seguir o cursor
    element.addEventListener('mousemove', (e) => {
        const tooltipWidth = tooltip.offsetWidth;
        const tooltipHeight = tooltip.offsetHeight;
        
        // Calcula a posição do tooltip em tempo real
        let left = e.pageX + 10; // 10px de distância do mouse
        let top = e.pageY + 20;  // 20px de distância do mouse

        // Impede que o tooltip ultrapasse a borda da página (horizontal)
        if (left + tooltipWidth > window.innerWidth) {
            left = window.innerWidth - tooltipWidth - 10;
        }

        // Impede que o tooltip ultrapasse a borda da página (vertical)
        if (top + tooltipHeight > window.innerHeight) {
            top = window.innerHeight - tooltipHeight - 10;
        }

        tooltip.style.left = `${left}px`;
        tooltip.style.top = `${top}px`;
    });

    // Calcula a posição do tooltip
    tooltip.style.left = `${element.getBoundingClientRect().left + 10}px`;
    tooltip.style.top = `${element.getBoundingClientRect().bottom + 20}px`; // Coloca o tooltip logo abaixo
}

// Atualiza o tooltip dinâmico para cada botão
[...Object.values(flagButtons), themeSwitch].forEach((button) => {
    button.addEventListener('mouseenter', (event) => {
        let tooltipMessage;

        // Verifica se o botão é de idioma (bandeira)
        if (event.target.dataset.lang) {
            const lang = event.target.dataset.lang;
            tooltipMessage = translations[lang]?.langTooltip || ''; // Mensagem de tooltip para as bandeiras
        } else if (event.target === themeSwitch) {
            // Para o botão de troca de tema, usamos o conteúdo do título (já traduzido)
            tooltipMessage = themeSwitch.title || 'Alterar tema'; // Mensagem para o botão de troca de tema
        }

        // Exibe o tooltip com a mensagem correta
        if (tooltipMessage) {
            showTooltip(event.target, tooltipMessage);
        }
    });

    button.addEventListener('mouseleave', hideTooltip);
});

// Função para remover o tooltip
function hideTooltip() {
    const tooltip = document.querySelector('.tooltip');
    if (tooltip) tooltip.remove();
}