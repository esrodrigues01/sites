// Carrossel
const carousel = document.querySelector('.carousel-images');
const images = document.querySelectorAll('.carousel-images img');
let index = 0;

document.querySelector('.next').addEventListener('click', () => {
  index = (index + 1) % images.length;
  carousel.style.transform = `translateX(-${index * 100}%)`;
});

document.querySelector('.prev').addEventListener('click', () => {
  index = (index - 1 + images.length) % images.length;
  carousel.style.transform = `translateX(-${index * 100}%)`;
});

// Corações caindo
function createHeart() {
  const heart = document.createElement('div');
  heart.textContent = '💖';
  heart.style.position = 'absolute';
  heart.style.left = `${Math.random() * 100}%`;
  heart.style.top = '-30px';
  heart.style.fontSize = `${Math.random() * 20 + 20}px`;
  heart.style.animation = 'fall 5s linear';
  document.querySelector('.hearts').appendChild(heart);

  setTimeout(() => heart.remove(), 5000);
}



setInterval(createHeart, 300);

const style = document.createElement('style');
style.textContent = `
@keyframes fall {
  to {
    transform: translateY(100vh);
    opacity: 0;
  }
}
`;
document.head.appendChild(style);

const texto = "Desde que te conheci, cada dia é mais bonito. Te amo infinitamente!";
let i = 0;
function digitar() {
  if (i < texto.length) {
    document.getElementById("mensagem").innerHTML += texto.charAt(i);
    i++;
    setTimeout(digitar, 100);
  }
}
digitar();
