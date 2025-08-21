document.addEventListener('click', (e)=>{
  const prev = e.target.closest('[data-prev]');
  const next = e.target.closest('[data-next]');
  if(!prev && !next) return;
  const root = (prev||next).closest('[data-product-carousel]');
  if(!root) return;
  const imgs = Array.from(root.querySelectorAll('.product-card-carousel__img'));
  if(imgs.length < 2) return;
  const currentIndex = imgs.findIndex(img => img.classList.contains('is-active'));
  let target = currentIndex;
  if(prev) target = (currentIndex - 1 + imgs.length) % imgs.length;
  if(next) target = (currentIndex + 1) % imgs.length;
  imgs.forEach((img,i)=>{img.classList.toggle('is-active', i===target)});
});
