// ======== ANIMAÇÕES SUAVES AO ROLAR ========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animado');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('section, .cartao').forEach(el => {
  el.classList.add('oculto');
  observer.observe(el);
});

// ======== CARTÕES INTERATIVOS ========
document.querySelectorAll('.cartao').forEach(card => {
  card.addEventListener('click', () => {
    card.classList.toggle('ativo');
  });
});

// ======== CONTADOR DE DIAS ========
function atualizarContador() {
  const dataInicio = new Date("2024-01-27"); // data simbólica
  const hoje = new Date();
  const dias = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));
  document.getElementById("contador").textContent =
    `Já se passaram ${dias} dias desde o início desta história. 🌹`;
}
atualizarContador();

// ======== INICIAR MÚSICA ========
function iniciarMusica() {
  const musica = document.getElementById("musica");
  musica.play().then(() => {
    const tela = document.getElementById("inicio-musica");
    tela.style.opacity = "0";
    setTimeout(() => tela.style.display = "none", 1000);
  }).catch((error) => {
    console.warn("Erro ao iniciar a música:", error);
  });
}

// ======== PLAY AUTOMÁTICO NO PRIMEIRO CLIQUE ========
document.addEventListener("click", () => {
  const musica = document.getElementById("musica");
  if (musica && musica.paused) {
    musica.play().catch(err => console.warn("Não foi possível iniciar a música:", err));
  }
}, { once: true });

// ======== CORAÇÕES CAINDO ========

function criarCoracao() {
  const item = document.createElement('div');
  const tipo = Math.random() < 0.5 ? '💖' : '🌸'; // intercalando
  item.textContent = tipo;
  item.style.left = `${Math.random() * 100}%`;
  item.style.top = '-30px';
  item.style.fontSize = `${Math.random() * 20 + 20}px`;
  document.querySelector('.hearts').appendChild(item);

  setTimeout(() => item.remove(), 5000);
}
setInterval(criarCoracao, 400);

function mostrarSurpresa() {
  const surpresa = document.getElementById('surpresa');
  surpresa.classList.add('mostrar');
}

