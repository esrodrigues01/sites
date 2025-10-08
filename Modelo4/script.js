// ======== IntersectionObserver: animações ao rolar ========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animado');
    }
  });
}, { threshold: 0.2 });

// Observar apenas elementos que precisam animar
document.querySelectorAll('.capitulo, .cartao, .marco').forEach(el => {
  el.classList.add('oculto');
  observer.observe(el);
});

// ======== Cartões interativos (click e teclado) ========
document.querySelectorAll('.cartao').forEach(card => {
  card.addEventListener('click', () => card.classList.toggle('ativo'));
  card.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      card.classList.toggle('ativo');
    }
  });
});

// ======== Contador de dias + linha do tempo ========
function atualizarContador() {
  const dataInicio = new Date('2024-01-27'); // ajuste conforme sua história
  const hoje = new Date();
  const dias = Math.floor((hoje - dataInicio) / (1000 * 60 * 60 * 24));

  const contador = document.getElementById('contador');
  if (contador) contador.textContent = `Já se passaram ${dias} dias desde o início desta história. 🌹`;

  const diasAtual = document.getElementById('dias-atual');
  if (diasAtual) diasAtual.textContent = dias;

  const marcoAtual = document.getElementById('marco-atual');
  if (marcoAtual) {
    const hojeFormatado = hoje.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
    marcoAtual.setAttribute('data-dia', hojeFormatado);
  }

  atualizarMarcos();
}

function calcularData(diasDepois) {
  const inicio = new Date('2024-01-27');
  inicio.setDate(inicio.getDate() + diasDepois);
  return inicio.toLocaleDateString('pt-BR', { day: '2-digit', month: '2-digit', year: 'numeric' });
}

function atualizarMarcos() {
  document.querySelectorAll('.marco').forEach(marco => {
    if (marco.id === 'marco-atual') return;
    const dias = parseInt(marco.getAttribute('data-dia'), 10);
    if (!isNaN(dias)) {
      const dataFormatada = calcularData(dias);
      marco.setAttribute('data-dia', dataFormatada);
      // Mantém apenas o texto do marco
      const textoOriginal = marco.textContent.split('—')[1]?.trim() || marco.textContent;
      marco.textContent = textoOriginal;
    }
  });
}

atualizarContador();

// ======== Música: inicia com consentimento + primeiro clique ========
function iniciarMusica() {
  const musica = document.getElementById('musica');
  const tela = document.getElementById('inicio-musica');

  if (musica) {
    musica.play().catch(() => {});
  }
  if (tela) {
    tela.style.opacity = '0';
    setTimeout(() => { tela.style.display = 'none'; }, 400);
  }
}

// Fallback: primeiro clique na página
document.addEventListener('click', () => {
  const musica = document.getElementById('musica');
  if (musica && musica.paused) {
    musica.play().catch(() => {});
  }
}, { once: true });

// ======== Corações caindo (efeito leve) ========
function criarCoracao() {
  const container = document.querySelector('.hearts');
  if (!container) return;

  const item = document.createElement('div');
  const tipo = Math.random() < 0.5 ? '💖' : '🌸';
  item.textContent = tipo;
  item.style.left = `${Math.random() * 100}%`;
  item.style.top = '-30px';
  item.style.fontSize = `${Math.random() * 16 + 18}px`;
  container.appendChild(item);

  setTimeout(() => item.remove(), 6000);
}
const heartsInterval = setInterval(criarCoracao, 900);

// Respeitar usuários que preferem menos movimento
if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
  clearInterval(heartsInterval);
}

// ======== Surpresa (revela seção com transição) ========
function mostrarSurpresa() {
  const surpresa = document.getElementById('surpresa');
  if (surpresa) {
    surpresa.classList.add('mostrar');
  }
}

// ======== Compartilhar nativo (com fallback) ========
function compartilhar() {
  const shareData = {
    title: 'Flores Memórias 🌸',
    text: 'Uma lembrança especial que me emocionou!',
    url: window.location.href
  };

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else {
    // Fallback simples
    const temp = document.createElement('input');
    temp.value = shareData.url;
    document.body.appendChild(temp);
    temp.select();
    document.execCommand('copy');
    document.body.removeChild(temp);
    alert('Link copiado! Você pode colar onde quiser 💜');
  }
}
