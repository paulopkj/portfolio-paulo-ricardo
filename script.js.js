/* ===== MENU MOBILE ===== */
const botaoMenu = document.querySelector(".botao-menu");
const menu = document.querySelector(".menu");

if (botaoMenu && menu) {
  // Abre/fecha menu mobile
  botaoMenu.addEventListener("click", () => {
    menu.classList.toggle("ativo");
  });
}

/* ===== SCROLL REVEAL ===== */
const elementos = document.querySelectorAll(".revelar");

// Observa entrada dos elementos na viewport
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("ativo"); // ativa animação
      }
    });
  },
  { threshold: 0.2 }
);

// Aplica observer em todos os elementos
elementos.forEach((el) => observer.observe(el));

/* ===== PROJETOS (CASCATA) ===== */
const gradeProjetos = document.querySelector(".grade-projetos");

// Ativa animação em cascata dos cards
if (gradeProjetos) observer.observe(gradeProjetos);

/* ===== MODAL PROJETOS ===== */
const modal = document.getElementById("modal-projeto");
const modalImagem = document.getElementById("modal-imagem");
const modalTitulo = document.getElementById("modal-titulo");
const modalDescricao = document.getElementById("modal-descricao");
const modalLink = document.getElementById("modal-link");
const fecharModal = document.querySelector(".modal-fechar");

// Abre modal ao clicar no card
document.querySelectorAll(".card-projeto").forEach((card) => {
  card.addEventListener("click", () => {
    const img = card.querySelector("img");
    const titulo = card.querySelector("h3");
    const descricao = card.querySelector("p");
    const link = card.querySelector("a");

    if (modalImagem && img) modalImagem.src = img.src;
    if (modalTitulo && titulo) modalTitulo.textContent = titulo.textContent;
    if (modalDescricao && descricao)
      modalDescricao.textContent = descricao.textContent;
    if (modalLink && link) modalLink.href = link.href;

    modal.classList.add("ativo"); // exibe modal
    document.body.style.overflow = "hidden"; // trava scroll
  });
});

/* ===== VER TODOS OS PROJETOS ===== */
const btnVerProjetos = document.querySelector(".btn-ver-todos-os-projetos");
const projetosExtras = document.querySelectorAll(".projeto-extra");

let projetosVisiveis = false;

if (btnVerProjetos) {
  btnVerProjetos.addEventListener("click", (e) => {
    e.preventDefault();

    // Exibe projetos extras com efeito cascata
    projetosExtras.forEach((projeto, index) => {
      setTimeout(() => {
        projeto.classList.toggle("ativo");
      }, index * 100);
    });

    projetosVisiveis = !projetosVisiveis;

    // Alterna texto do botão
    btnVerProjetos.textContent = projetosVisiveis
      ? "Ver menos projetos"
      : "Ver todos os projetos";
  });
}

/* ===== FECHAR MODAL ===== */
if (fecharModal) {
  fecharModal.addEventListener("click", fecharModalFunc);
}

// Fecha modal ao clicar fora
if (modal) {
  modal.addEventListener("click", (e) => {
    if (e.target === modal) fecharModalFunc();
  });
}

// Função central de fechamento
function fecharModalFunc() {
  modal.classList.remove("ativo");
  document.body.style.overflow = "auto"; // libera scroll
}

/* ===== CARROSSEL ===== */
const track = document.querySelector(".carrossel-track");

if (track) {
  // Calcula metade da largura (loop infinito)
  const metade = track.scrollWidth / 2;
  track.style.setProperty("--deslocamento", `-${metade}px`);
}

/* ===== FORMULÁRIO DE CONTATO ===== */

const formContato = document.getElementById("form-contato");
const feedback = document.getElementById("feedback-form");

// Simula envio de mensagem e exibe feedback

if (formContato) {
  formContato.addEventListener("submit", (e) => {
    e.preventDefault();

    // Aqui você pode adicionar lógica real de envio (ex: fetch API)
    
    feedback.textContent = "Mensagem enviada com sucesso! Retornarei em breve.";
    feedback.classList.remove("erro");
    feedback.classList.add("sucesso");

    formContato.reset();
  });
}




