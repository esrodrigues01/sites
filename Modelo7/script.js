// Iniciar música
function iniciarMusica() {
  document.getElementById("inicio-musica").style.display = "none";
  const musica = document.getElementById("musica");
  musica.play().catch(() => {});
}

// Surpresa
function mostrarSurpresa() {
  const surpresa = document.getElementById("surpresa");
  surpresa.style.display = "block";
}

// Contador de dias
function calcularDias() {
  const inicio = new Date("2025-01-01"); // ajuste a data inicial
  const hoje = new Date();
  const diff = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));
  document.getElementById("contador").textContent =
    `Já se passaram ${diff} dias desde o início desta história.`;
  document.getElementById("dias-atual").textContent = diff;
}
calcularDias();

// Compartilhar
function compartilhar() {
  const shareData = {
    title: "Flores & Memórias",
    text: "Um presente digital moderno que floresce com você.",
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareData.url)
      .then(() => alert("Link copiado! Agora é só colar onde quiser."))
      .catch(() => alert("Não foi possível copiar automaticamente."));
  } else {
    alert("Copie este link: " + shareData.url);
  }
}

// Efeito corações flutuantes
function criarCoracao() {
  const hearts = document.querySelector(".hearts");
  const heart = document.createElement("div");
  heart.textContent = "💛";
  heart.style.position = "absolute";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animation = "subir 5s linear forwards";
  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}
setInterval(criarCoracao, 1000);

// Animação CSS via JS
const style = document.createElement("style");
style.textContent = `
@keyframes subir {
  from { transform: translateY(100vh); opacity: 1; }
  to { transform: translateY(-10vh); opacity: 0; }
}`;
document.head.appendChild(style);
