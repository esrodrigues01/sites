// ======== ANIMAÇÕES SUAVES AO ROLAR ========
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('animado');
    }
  });
}, { threshold: 0.2 });

// Observa todos os elementos que precisam animar
document.querySelectorAll('section, .cartao, .capitulo, .marco').forEach(el => {
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

  // Atualiza o contador principal
  const contador = document.getElementById("contador");
  if (contador) {
    contador.textContent = `Já se passaram ${dias} dias desde o início desta história. 🌹`;
  }

  // Atualiza o marco atual na linha do tempo (texto ao lado)
  const diasAtual = document.getElementById("dias-atual");
  if (diasAtual) {
    diasAtual.textContent = dias;
  }

  // Atualiza o balão rosa do marco atual com a data de hoje
  const marcoAtual = document.getElementById("marco-atual");
    if (marcoAtual) {
        const hojeFormatado = hoje.toLocaleDateString("pt-BR", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
    });
  marcoAtual.setAttribute("data-dia", hojeFormatado);
}


  // Atualiza os outros marcos
  atualizarMarcos();
}

atualizarContador();


function calcularData(diasDepois) {
  const inicio = new Date("2024-01-27"); // data simbólica
  inicio.setDate(inicio.getDate() + diasDepois);
  return inicio.toLocaleDateString("pt-BR", { day: '2-digit', month: '2-digit', year: 'numeric' });
}
function atualizarMarcos() {
  document.querySelectorAll('.marco').forEach(marco => {
    // Pula o marco do "Hoje"
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




//Iniciar Musica
function iniciarMusica() {
  const musica = document.getElementById("musica");
  const tela = document.getElementById("inicio-musica");

  if (musica) {
    musica.play().catch(err => console.warn("Erro ao iniciar música:", err));
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
  if (surpresa) {
    surpresa.classList.add('mostrar');
  }
}



