// === Iniciar música ===
function iniciarMusica() {
  const inicio = document.getElementById("inicio-musica");
  inicio.style.display = "none";

  const musica = document.getElementById("musica");
  if (musica) {
    musica.play().catch(() => {
      console.log("Autoplay bloqueado, o usuário precisa interagir.");
    });
  }
}

// === Mostrar surpresa ===
function mostrarSurpresa() {
  const surpresa = document.getElementById("surpresa");
  if (surpresa) {
    surpresa.style.display = "block";
    surpresa.scrollIntoView({ behavior: "smooth" });
  }
}

// === Contador de dias ===
function calcularDias() {
  // Ajuste a data inicial conforme a história
  const inicio = new Date("2022-01-01");
  const hoje = new Date();

  const diff = Math.floor((hoje - inicio) / (1000 * 60 * 60 * 24));

  const contador = document.getElementById("contador");
  const diasAtual = document.getElementById("dias-atual");

  if (contador) {
    contador.textContent = `Já se passaram ${diff} dias desde o primeiro olhar.`;
  }
  if (diasAtual) {
    diasAtual.textContent = diff;
  }
}
calcularDias();

// === Compartilhar ===
function compartilhar() {
  const shareData = {
    title: "Flores & Memórias 🌸",
    text: "Um presente digital romântico que floresce com você.",
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {
      alert("Não foi possível compartilhar agora.");
    });
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareData.url)
      .then(() => alert("Link copiado! Agora é só colar onde quiser."))
      .catch(() => alert("Não foi possível copiar automaticamente."));
  } else {
    alert("Copie este link: " + shareData.url);
  }
}

// === Efeito corações flutuantes ===
function criarCoracao() {
  const hearts = document.querySelector(".hearts");
  if (!hearts) return;

  const heart = document.createElement("div");
  heart.textContent = "💖";
  heart.style.position = "absolute";
  heart.style.left = Math.random() * 100 + "vw";
  heart.style.fontSize = Math.random() * 20 + 15 + "px";
  heart.style.animation = "subir 6s linear forwards";
  hearts.appendChild(heart);

  setTimeout(() => heart.remove(), 6000);
}
setInterval(criarCoracao, 1200);

// === Animação fade-in ao rolar ===
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("aparecer");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".capitulo").forEach(sec => {
  observer.observe(sec);
});
