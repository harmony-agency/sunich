const progress = document.querySelector('.progress');
  
progress.addEventListener('input', function() {
  const value = this.value;
  this.style.background = `linear-gradient(to right, #692B6F 0%, #692B6F ${value}%, rgba(105, 43, 111, 0.15) ${value}%, rgba(105, 43, 111, 0.15) 100%)`
})
 