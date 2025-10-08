// ======== ANIMAÇÕES SUAVES AO ROLAR ========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animado');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.capitulo, .cartao, .marco').forEach(el => {
  el.classList.add('oculto');
  observer.observe(el);
});

// ======== CARTÕES INTERATIVOS ========
document.querySelectorAll('.cartao').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('ativo'));
});

// ======== CONTADOR DE DIAS ========
function atualizarContador() {
  const dataInicio = new Date("2024-01-27"); // data simbólica
  const hoje = new Date();
  const dias = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));

  const contador = document.getElementById("contador");
  if (contador) {
    contador.textContent = `Já se passaram ${dias} dias desde o início desta história. 🌹`;
  }

  const diasAtual = document.getElementById("dias-atual");
  if (diasAtual) {
    diasAtual.textContent = dias;
  }

  const marcoAtual = document.getElementById("marco-atual");
  if (marcoAtual) {
    const hojeFormatado = hoje.toLocaleDateString("pt-BR", {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    marcoAtual.setAttribute("data-dia", hojeFormatado);
  }

  atualizarMarcos();
}

function calcularData(diasDepois) {
  const inicio = new Date("2024-01-27");
  inicio.setDate(inicio.getDate() + diasDepois);
  return inicio.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function atualizarMarcos() {
  document.querySelectorAll('.marco').forEach(marco => {
    if (marco.id === "marco-atual") return;
    const dias = parseInt(marco.getAttribute('data-dia'));
    if (!isNaN(dias)) {
      const dataFormatada = calcularData(dias);
      marco.setAttribute('data-dia', dataFormatada);
      const textoOriginal = marco.textContent.split('—')[1]?.trim() || marco.textContent;
      marco.textContent = textoOriginal;
    }
  });
}

atualizarContador();

// ======== INICIAR MÚSICA ========
function iniciarMusica() {
  const musica = document.getElementById("musica");
  const tela = document.getElementById("inicio-musica");

  if (musica) {
    musica.play().catch(() => {});
  }

  if (tela) {
    tela.style.transition = "opacity 1s ease";
    tela.style.opacity = "0";
    setTimeout(() => tela.style.display = "none", 1000);
  }
}

// ======== PLAY AUTOMÁTICO NO PRIMEIRO CLIQUE ========
document.addEventListener("click", () => {
  const musica = document.getElementById("musica");
  if (musica && musica.paused) {
    musica.play().catch(() => {});
  }
}, { once: true });

// ======== CORAÇÕES / PÉTALAS CAINDO ========
function criarCoracao() {
  const item = document.createElement('div');
  const tipos = ['💖', '🌸', '🌹', '💐'];
  const tipo = tipos[Math.floor(Math.random() * tipos.length)];
  item.textContent = tipo;
  item.style.left = `${Math.random() * 100}%`;
  item.style.top = '-30px';
  item.style.fontSize = `${Math.random() * 20 + 20}px`;
  document.querySelector('.hearts').appendChild(item);

  setTimeout(() => item.remove(), 6000);
}
setInterval(criarCoracao, 900);

// ======== SURPRESA ========
function mostrarSurpresa() {
  const surpresa = document.getElementById("surpresa");
  if (surpresa) {
    surpresa.classList.add("mostrar");
  }
}

// ======== COMPARTILHAR (API moderna + fallback) ========
function compartilhar() {
  const shareData = {
    title: 'Flores Memórias 🌸',
    text: 'Uma lembrança especial que me emocionou!',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard.writeText(shareData.url)
      .then(() => alert('Link copiado! Você pode colar onde quiser 💜'))
      .catch(() => alert('Não foi possível copiar o link automaticamente.'));
  } else {
    alert('Copie este link: ' + shareData.url);
  }
}
