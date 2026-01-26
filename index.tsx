const navbar = document.getElementById('navbar');

const handleScroll = () => {
  if (!navbar) return;
  if (window.scrollY > 40) {
    navbar.classList.add('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
  } else {
    navbar.classList.remove('bg-slate-950/90', 'backdrop-blur-md', 'border-b', 'border-white/10');
  }
};

window.addEventListener('scroll', handleScroll);
handleScroll();
