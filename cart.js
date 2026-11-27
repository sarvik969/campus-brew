/* Campus Brew — accessible, local-only cart and payment selection. */
document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('smartCart');
  if (!root) return;
  const products = [
    {id:'coffee',name:'Cappuccino',price:120},
    {id:'cold',name:'Cold Coffee',price:150},
    {id:'burger',name:'Veg Burger',price:99},
    {id:'pizza',name:'Margherita Pizza',price:199},
    {id:'sandwich',name:'Grilled Sandwich',price:89},
    {id:'fries',name:'French Fries',price:79}
  ];
  const cart = new Map();

try {
  const saved = JSON.parse(
    localStorage.getItem("campusBrewCart") || "[]"
  );

  if (Array.isArray(saved)) {
    for (const entry of saved) {
      if (!Array.isArray(entry) || entry.length !== 2) continue;

      const [id, quantity] = entry;

      if (
        products.some(p => p.id === id) &&
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 20
      ) {
        cart.set(id, quantity);
      }
    }
  }
} catch (error) {
  console.warn("Saved cart could not be restored.");
}

  const select = document.getElementById('cartProduct');
  const add = document.getElementById('addToCart');
  const items = document.getElementById('cartItems');
  const total = document.getElementById('cartTotal');
  const checkout = document.getElementById('checkoutCart');
  const feedback = document.getElementById('cartFeedback');
  const summary = document.getElementById('orderSummary');
  const upiDetails = document.getElementById('upiDetails');
  const cardDetails = document.getElementById('cardDetails');
  const upiAmount = document.getElementById('upiAmount');
  const cardName = document.getElementById('cardName');
  const cardNumber = document.getElementById('cardNumber');
  const cardExpiry = document.getElementById('cardExpiry');
  const cardCvv = document.getElementById('cardCvv');
  const paymentRadios = document.querySelectorAll('input[name="paymentMethod"]');
  function showPaymentFields() {
    const selected = document.querySelector('input[name="paymentMethod"]:checked');
    upiDetails.hidden = !selected || selected.value !== 'UPI';
    cardDetails.hidden = !selected || selected.value !== 'Card';
    if (!selected || selected.value !== 'Card') {
      cardName.value = ''; cardNumber.value = ''; cardExpiry.value = ''; cardCvv.value = '';
    }
    feedback.textContent = '';
  }
  paymentRadios.forEach(radio => radio.addEventListener('change', showPaymentFields));
  function validateTestCard() {
    const number = cardNumber.value.replace(/\s/g, '');
    const valid = cardName.value.trim().toUpperCase() === 'TEST USER' &&
      number === '4242424242424242' && cardExpiry.value.trim() === '12/30' &&
      cardCvv.value.trim() === '123';
    if (!valid) {
      feedback.textContent = 'Use the example card details shown below the fields.';
      cardName.focus();
    }
    return valid;
  }
  const money = value => '₹' + value;

window.addEventListener("storage", (event) => {
  if (event.key !== "campusBrewCart") return;

  try {
    const saved = JSON.parse(event.newValue || "[]");

    if (!Array.isArray(saved)) return;

    cart.clear();

    for (const entry of saved) {
      if (!Array.isArray(entry) || entry.length !== 2) {
        continue;
      }

      const [id, quantity] = entry;

      if (
        products.some(p => p.id === id) &&
        Number.isInteger(quantity) &&
        quantity >= 1 &&
        quantity <= 20
      ) {
        cart.set(id, quantity);
      }
    }

    // A cart update from another tab invalidates an older checkout summary.
    summary.hidden = true;
    render();
  } catch (error) {
    console.warn("Cart synchronization failed.");
  }
});

function saveCart() {
  try {
    localStorage.setItem(
      "campusBrewCart",
      JSON.stringify([...cart])
    );
  } catch (error) {
    console.warn("Cart could not be saved.");
  }
}

  function render() {
    items.replaceChildren();
    let sum = 0;
    for (const [id, quantity] of cart) {
      const product = products.find(p => p.id === id);
      if (!product) continue;
      sum += product.price * quantity;
      const row = document.createElement('div'); row.className = 'cart-item';
      const name = document.createElement('strong'); name.textContent = product.name;
      const minus = document.createElement('button'); minus.type = 'button'; minus.textContent = '−'; minus.setAttribute('aria-label','Decrease ' + product.name);
      const count = document.createElement('span'); count.textContent = String(quantity); count.setAttribute('aria-label', 'Quantity ' + quantity);
      const plus = document.createElement('button'); plus.type = 'button'; plus.textContent = '+'; plus.setAttribute('aria-label','Increase ' + product.name);
      const price = document.createElement('span'); price.className = 'line-price'; price.textContent = money(product.price * quantity);
      const remove = document.createElement('button'); remove.type = 'button'; remove.className = 'remove-item'; remove.textContent = 'Remove'; remove.setAttribute('aria-label','Remove ' + product.name);
      
minus.addEventListener('click', () => {
  if (quantity === 1) {
    cart.delete(id);
  } else {
    cart.set(id, quantity - 1);
  }

  feedback.textContent = '';
  summary.hidden = true;
  saveCart();
  render();
});

    
plus.addEventListener('click', () => {
  if (quantity >= 20) {
    feedback.textContent = 'Maximum 20 of each item.';
    return;
  }

  cart.set(id, quantity + 1);
  feedback.textContent = '';
  summary.hidden = true;
  saveCart();
  render();
});

      
remove.addEventListener('click', () => {
  cart.delete(id);
  feedback.textContent = product.name + ' removed.';
  summary.hidden = true;
  saveCart();
  render();
});

      row.append(name,minus,count,plus,price,remove); items.append(row);
    }
    total.textContent = money(sum);
    upiAmount.textContent = money(sum);
    checkout.disabled = cart.size === 0;
    if (cart.size === 0) {
      const empty = document.createElement('p'); empty.className = 'empty-cart'; empty.textContent = 'Your cart is empty. Add something delicious!'; items.append(empty);
    }
    return sum;
  }
  add.addEventListener('click', () => {
    const product = products.find(p => p.id === select.value);
    if (!product) { feedback.textContent='Choose an item first.'; select.focus(); return; }
    const current = cart.get(product.id) || 0;
    if (current >= 20) { feedback.textContent='Maximum 20 of each item.'; return; }
    
cart.set(product.id, current + 1);
saveCart();
summary.hidden = true;

    feedback.textContent = product.name + ' added to cart.'; render();
  });
  checkout.addEventListener('click', () => {
    if (cart.size === 0) return;
    const payment = document.querySelector('input[name="paymentMethod"]:checked');
    if (!payment) {feedback.textContent='Please choose a payment method to continue.'; document.querySelector('input[name="paymentMethod"]').focus(); return;}
    if (payment.value === 'Card' && !validateTestCard()) return;
    const sum = render();
    const lines = [...cart].map(([id,quantity]) => {
      const p=products.find(item=>item.id===id);
      return `${p.name} × ${quantity} — ${money(p.price * quantity)}`;
    });
    summary.replaceChildren();
    const heading=document.createElement('h3'); heading.textContent='Order Summary';
    const list=document.createElement('ul');
    for (const line of lines) { const li=document.createElement('li'); li.textContent=line; list.append(li); }
    const grand=document.createElement('p'); grand.className='summary-total'; grand.textContent='Total: ' + money(sum);
    const method=document.createElement('p'); method.textContent='Selected payment method: ' + payment.value;
    
const note = document.createElement('p'); note.className = 'summary-note'; note.textContent = 'Order summary generated.';


    summary.append(heading,list,grand,method,note); summary.hidden=false;
    
cart.clear();
saveCart();
payment.checked = false;
showPaymentFields();
cardName.value = ''; cardNumber.value = ''; cardExpiry.value = ''; cardCvv.value = '';
feedback.textContent = '';
render();

    summary.scrollIntoView({behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',block:'nearest'});
  });
  render();
});
