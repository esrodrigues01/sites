// ======== Tela inicial: iniciar música e entrar ========
function iniciarMusica() {
  const musica = document.getElementById("musica");
  const tela = document.getElementById("inicio-musica");

  if (musica) {
    musica.play().catch(() => {
      // Alguns navegadores exigem interação do usuário; haverá um fallback no primeiro clique.
    });
  }

  if (tela) {
    tela.style.transition = "opacity 800ms ease";
    tela.style.opacity = "0";
    setTimeout(() => { tela.style.display = "none"; }, 800);
  }
}

// Fallback: inicia a música no primeiro clique em qualquer lugar
document.addEventListener("click", () => {
  const musica = document.getElementById("musica");
  if (musica && musica.paused) {
    musica.play().catch(() => {});
  }
}, { once: true });


// ======== Animações suaves ao rolar (elegantes e discretas) ========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) entry.target.classList.add("aparecer");
  });
}, { threshold: 0.15 });

document.querySelectorAll(".bloco, .galeria img, .linha-tempo .marco, footer").forEach(el => {
  el.classList.add("invisivel");
  observer.observe(el);
});


// ======== Contador de dias e linha do tempo ========
function atualizarContador() {
  // Ajuste para a data inicial da história
  const dataInicio = new Date("2024-01-27");

  const hoje = new Date();
  const dias = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));

  const contador = document.getElementById("contador");
  if (contador) {
    contador.textContent = `Já se passaram ${dias} dias desde o início desta história.`;
  }

  const diasAtual = document.getElementById("dias-atual");
  if (diasAtual) {
    diasAtual.textContent = dias;
  }

  const marcoAtual = document.getElementById("marco-atual");
  if (marcoAtual) {
    const hojeFormatado = hoje.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
    marcoAtual.setAttribute("data-dia", hojeFormatado);
  }

  atualizarMarcos();
}

function calcularData(diasDepois) {
  const inicio = new Date("2024-01-27");
  inicio.setDate(inicio.getDate() + diasDepois);
  return inicio.toLocaleDateString("pt-BR", { day: "2-digit", month: "2-digit", year: "numeric" });
}

function atualizarMarcos() {
  document.querySelectorAll(".linha-tempo .marco").forEach(marco => {
    if (marco.id === "marco-atual") return;
    const dias = parseInt(marco.getAttribute("data-dia"), 10);
    if (!isNaN(dias)) {
      const dataFormatada = calcularData(dias);
      marco.setAttribute("data-dia", dataFormatada);
      // Mantém apenas o texto original (remove possíveis prefixos)
      const texto = marco.textContent.replace(/^\s*[-–—]\s*/, "");
      marco.textContent = texto;
    }
  });
}

// Inicializa contador ao carregar
document.addEventListener("DOMContentLoaded", atualizarContador);


// ======== Compartilhar (API nativa + clipboard moderno + fallback simples) ========
function compartilhar() {
  const shareData = {
    title: "Flores & Memórias — Elegante",
    text: "Um cartão digital elegante que floresce com você.",
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
    return;
  }

  if (navigator.clipboard) {
    navigator.clipboard.writeText(shareData.url)
      .then(() => alert("Link copiado! Você pode colar onde quiser."))
      .catch(() => alert("Não foi possível copiar automaticamente."));
    return;
  }

  // Último recurso
  alert("Copie este link: " + shareData.url);
}


// ======== Detalhe sutil: partículas elegantes (bem discretas) ========
(function elegantesParticulas() {
  const container = document.querySelector(".hearts");
  if (!container) return;

  // Respeita preferência de reduzir movimento
  const reduzMov = window.matchMedia && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduzMov) return;

  function criarParticula() {
    const p = document.createElement("div");
    p.textContent = "•"; // ponto elegante, como granulação dourada
    p.style.position = "absolute";
    p.style.left = `${Math.random() * 100}%`;
    p.style.top = "-20px";
    p.style.color = "#c9a646";
    p.style.fontSize = `${Math.random() * 10 + 10}px`;
    p.style.opacity = "0.85";
    p.style.animation = "fall 6.5s linear forwards";
    container.appendChild(p);
    setTimeout(() => p.remove(), 7000);
  }

  // Frequência bem baixa para ser sutil
  setInterval(criarParticula, 1600);
})();
