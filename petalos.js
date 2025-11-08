function crearPetalo() {
  const petalo = document.createElement('div');
  petalo.classList.add('petalo');
  petalo.style.left = Math.random() * 100 + 'vw';
  petalo.style.animationDuration = 3 + Math.random() * 5 + 's';
  petalo.style.opacity = Math.random();
  petalo.style.width = petalo.style.height = 15 + Math.random() * 20 + 'px';
  
  document.body.appendChild(petalo);

  setTimeout(() => {
    petalo.remove();
  }, 8000);
}

setInterval(crearPetalo, 300);
