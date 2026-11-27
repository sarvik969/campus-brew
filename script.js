// Campus Brew - interactive website behaviours
// Contact messages are not transmitted or stored; cart items use localStorage.
document.addEventListener('DOMContentLoaded', () => {
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.nav-links');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      const open = nav.classList.toggle('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.textContent = open ? '✕' : '☰';
    });
    nav.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
      nav.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.textContent = '☰';
    }));
  }
  
  
const contact = document.getElementById('contactForm');
  if (contact) {
    const name = document.getElementById('contactName');
    const message = document.getElementById('contactMessage');
    const feedback = document.getElementById('contactFeedback');
    contact.addEventListener('submit', event => {
      event.preventDefault();
      if (!name.value.trim() || !message.value.trim()) {
        const field = !name.value.trim() ? name : message;
        field.setCustomValidity('Please enter meaningful text.');
        field.reportValidity();
        return;
      }
      

feedback.textContent = "Form checked successfully. No message was sent.";


      contact.reset();
    });
    [name,message].forEach(field => field.addEventListener('input', () => field.setCustomValidity('')));
  }
});
