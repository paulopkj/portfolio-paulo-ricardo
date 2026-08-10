/* ==========================================
 MAPEAR ELEMENTOS DO DOM
========================================== */

const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector(".menu");

/* ==========================================
   INTRO PREMIUM
========================================== */

const intro = document.querySelector(".intro-premium");

window.addEventListener("load", () => {
    document.body.style.overflow = "hidden";

    setTimeout(() => {
        intro.classList.add("ocultar");

        document.body.style.overflow = "auto";
    }, 3500);
});

/* ==========================================
   EFEITO DIGITAÇÃO TÍTULO PRINCIPAL PREMIUM
========================================== */

const textoDigitando = document.querySelector("#texto-digitando");

const texto = "Desenvolvedor Fullstack";

let indice = 0;

function escreverTexto() {
    if (indice < texto.length) {
        textoDigitando.textContent += texto.charAt(indice);

        indice++;

        setTimeout(escreverTexto, 100);
    }
}

window.addEventListener("load", () => {
    setTimeout(() => {
        escreverTexto();
    }, 4300);
});

/* ==========================================
   MENU MOBILE
========================================== */

if (botaoMenu && menu) {
    botaoMenu.addEventListener("click", () => {
        menu.classList.toggle("ativo");

        if (menu.classList.contains("ativo")) {
            botaoMenu.textContent = "✖";
        } else {
            botaoMenu.textContent = "☰";
        }
    });
}

/* ==========================================
   FECHAR MENU AO CLICAR EM UM LINK
========================================== */

const linksMenu = document.querySelectorAll(".menu a");

linksMenu.forEach((link) => {
    link.addEventListener("click", () => {
        menu.classList.remove("ativo");

        botaoMenu.textContent = "☰";
    });
});

/* ==========================================
   FECHAR MENU AO CLICAR FORA
========================================== */

document.addEventListener("click", (event) => {
    const clicouNoMenu = menu.contains(event.target);

    const clicouNoBotao = botaoMenu.contains(event.target);

    if (!clicouNoMenu && !clicouNoBotao) {
        menu.classList.remove("ativo");

        botaoMenu.textContent = "☰";
    }
});

/* ==========================================
   SCROLL REVEAL PREMIUM
========================================== */

const elementosRevelar = document.querySelectorAll(".revelar");

function revelarElementos() {
    const alturaTela = window.innerHeight;

    elementosRevelar.forEach((elemento) => {
        const distanciaTopo = elemento.getBoundingClientRect().top;

        if (distanciaTopo < alturaTela - 120) {
            elemento.classList.add("ativo");
        }
    });
}

window.addEventListener("scroll", revelarElementos);

window.addEventListener("load", revelarElementos);

/* ==========================================
   VER TODOS OS PROJETOS
========================================== */

const btnProjetos = document.querySelector(".btn-ver-todos-os-projetos");

const projetosExtras = document.querySelectorAll(".projeto-extra");

let projetosVisiveis = false;

if (btnProjetos) {
    btnProjetos.addEventListener("click", (event) => {
        event.preventDefault();

        projetosVisiveis = !projetosVisiveis;

        projetosExtras.forEach((projeto, index) => {
            if (projetosVisiveis) {
                setTimeout(() => {
                    projeto.classList.add("mostrar");
                }, index * 150);
            } else {
                projeto.classList.remove("mostrar");
            }
        });

        btnProjetos.textContent = projetosVisiveis
            ? "Ver menos projetos"
            : "Ver todos os projetos";
    });
}

/* ==========================================
   FORMULÁRIO DE CONTATO EMAILJS
========================================== */

const formularioContato = document.querySelector("#form-contato");

const feedbackFormulario = document.querySelector("#feedback-form");

/* ==========================================
GITHUB
========================================== */

const secaoGithub = document.querySelector(".github-cards");

if (secaoGithub) {
    const observerGithub = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                iniciarContadoresGithub();

                iniciarBarrasGithub();

                observerGithub.unobserve(secaoGithub);
            });
        },
        {
            threshold: 0.35,
        },
    );

    observerGithub.observe(secaoGithub);
}

/* ==========================================
CONTADORES
========================================== */

function iniciarContadoresGithub() {
    const numeros = document.querySelectorAll(".github-numero");

    numeros.forEach((numero) => {
        const textoOriginal = numero.textContent.trim();

        if (textoOriginal === "Full Stack") return;

        const valorFinal = parseInt(textoOriginal);

        if (isNaN(valorFinal)) return;

        let contador = 0;

        const incremento = Math.ceil(valorFinal / 60);

        const intervalo = setInterval(() => {
            contador += incremento;

            if (contador >= valorFinal) {
                contador = valorFinal;
                clearInterval(intervalo);
            }

            if (textoOriginal.includes("%")) {
                numero.textContent = contador + "%";
            } else if (textoOriginal.includes("+")) {
                numero.textContent = contador + "+";
            } else {
                numero.textContent = contador;
            }
        }, 25);
    });
}

/* ==========================================
BARRAS DE PROGRESSO
========================================== */

function iniciarBarrasGithub() {
    const barras = document.querySelectorAll(".stack-progress");

    barras.forEach((barra) => {
        const larguraFinal = barra.dataset.width;

        barra.style.width = "0%";

        setTimeout(() => {
            barra.style.transition = "width 2.5s ease";
            barra.style.width = larguraFinal;
        }, 200);
    });
}

/* ==========================================
   INICIALIZAR EMAILJS
========================================== */

emailjs.init("wYzXJASCU3oYzPFmt");

/* ==========================================
   ENVIAR FORMULÁRIO - MENSAGEM 
========================================== */

if (formularioContato) {
    const botaoEnviar = document.querySelector(
        '.form-contato button[type="submit"]',
    );

    formularioContato.addEventListener("submit", async (event) => {
        event.preventDefault();

        botaoEnviar.disabled = true;
        botaoEnviar.textContent = "Enviando...";
        feedbackFormulario.textContent = "Enviando mensagem...";

        try {
            await emailjs.sendForm(
                "service_3jkvnr9",
                "template_eyrgrc2",
                formularioContato,
            );

            feedbackFormulario.textContent = "✅ Mensagem enviada com sucesso!";

            formularioContato.reset();
        } catch (erro) {
            feedbackFormulario.textContent = "❌ Erro ao enviar mensagem.";

            console.error(erro);
        } finally {
            setTimeout(() => {
                botaoEnviar.disabled = false;
                botaoEnviar.textContent = "Enviar mensagem";
            }, 2000);
        }
    });
}
