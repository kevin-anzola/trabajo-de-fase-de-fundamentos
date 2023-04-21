function cart(db, printProducts) {

  let cart = []

  // Elemento del DOM
  const productsDOM = document.querySelector('.products__container')
  const notifyDOM = document.querySelector('.notify')
  const cartDOM = document.querySelector('.cart__body')
  const countDOM = document.querySelector('.cart__count--item')
  const totalDOM = document.querySelector('.cart__total--item')
  const checkoutDOM = document.querySelector('.btn--buy')

  // Funciones
  function printCart() {
    let htmlCart = ''

    if (cart.length === 0) {
      htmlCart += `
        <div class="cart__empty">
          <i class='bx bx-cart'></i>
          <p class="cart__empty--text">No hay productos en el carrito</p>
        </div>
      `
      notifyDOM.classList.remove('show--notify')
    } else {
      for (const item of cart) {
        const product = db.find(p => p.id === item.id)
        htmlCart += `
          <article class="article">
            <div class="article__image">
              <img src="${product.image}" alt="${product.name}">
            </div>
            <div class="article__content">
              <h3 class="article__title">${product.name}</h3>
              <span class="article__price">$${product.price}</span>
              <div class="article__quantity">
                <button type="button" class="article__quantity-btn article--minus" data-id="${item.id}">
                  <i class='bx bx-minus'></i>
                </button>
                <span class="article__quantity-text">${item.qty}</span>
                <button type="button" class="article__quantity-btn article--plus" data-id="${item.id}">
                  <i class='bx bx-plus'></i>
                </button>
              </div>
              <button type="button" class="article__btn remove-from-cart" data-id="${item.id}">
                <i class='bx bx-trash'></i>
              </button>
            </div>
          </article>
        `
      }
      notifyDOM.classList.add('show--notify')
    }

    cartDOM.innerHTML = htmlCart
    notifyDOM.innerHTML = showItemsCount()
    countDOM.innerHTML = showItemsCount()
    totalDOM.innerHTML = showTotal()
  }

  function addToCart(id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id)

    if (itemFinded) {
      itemFinded.qty += qty
    } else {
      cart.push({id, qty})
    }
    printCart()
  }

  function removeFromCart(id, qty = 1) {
    const itemFinded = cart.find(i => i.id === id)
    const result = itemFinded.qty - qty

    if (result > 0) {
      itemFinded.qty -= qty
    } else {
      cart = cart.filter(i => i.id !== id)
    }
    
    printCart()
  }

  function deleteFromCart(id) {
    cart = cart.filter(i => i.id !== id)
    printCart()
  }

  function showItemsCount() {
    let suma = 0
    for (const item of cart) {
      suma += item.qty
    }
    return suma
  }

  function showTotal() {
    let total = 0
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      total += item.qty * productFinded.price
    }
    
    return total
  }
/* here */ 
// L.addEventListener("click", function(t) {
//   var e = t.target;
//   e.closest(".article--plus") && _(+e.closest(".article--plus").dataset.id),
//   e.closest(".article--minus") && function(t) {
//       var e = arguments.length > 1 && void 0 !== arguments[1] ? arguments[1] : 1
//         , n = y.find(function(e) {
//           return e.id === t
//       });
      
      
//   }
// }),
  
  
  /* here */ 
  function checkout() {
    for (const item of cart) {
      const productFinded = db.find(p => p.id === item.id)
      productFinded.quantity -= item.qty
    }

    cart = []
    printCart()
    printProducts()
    window.alert('Gracias por su compra')
  }
  
  printCart()
  // Eventos
  productsDOM.addEventListener('click', function (e) {
    if (e.target.closest('.add--to--cart')) {
      const id = +e.target.closest('.add--to--cart').dataset.id
      addToCart(id)
    }
  })

  cartDOM.addEventListener('click', function (e) {

    if (e.target.closest('.article--minus')) {
      const id = +e.target.closest('.article--minus').dataset.id
      removeFromCart(id)
    }

    if (e.target.closest('.article--plus')) {
      const id = +e.target.closest('.article--plus').dataset.id
      addToCart(id)
    }

    if (e.target.closest('.remove-from-cart')) {
      const id = +e.target.closest('.remove-from-cart').dataset.id
      deleteFromCart(id)
    }

  })

  checkoutDOM.addEventListener('click', function () {
    checkout()
  });
  function copyCoupon() {
    let copyTxt = document.getElementById("input1");
    let btnTxt = document.getElementById("btn1");

    copyTxt.select();
    copyTxt.setSelectionRange(0,99999);

    navigator.clipboard.writeText(copyTxt.value);

    if (btnTxt.innerHTML === "copiar cupon") {
        btnTxt.innerHTML = "cupon copiado";
    }
}

function canjearCoupon() {
    let canjearTxt = document.getElementById("input2").value;
    let canjearBtn = document.getElementById("btn2");

    let number = document.getElementById("number1").innerHTML;
    let discount = document.getElementById("discount");

    function getPercent(percent) { return number / 100 * percent; }
    let percentResult = getPercent(90); //VOY A OBTENER EL 90 PORCIENTO DE 200.

    if (canjearTxt === "ACADEMLO24") {
        canjearBtn.innerHTML = "cupon canjeado";

        discount.innerHTML = `<h3 id="number2">${percentResult}</h3><h3>$</h3><span>${number}$</span>`;

    } else if (canjearTxt === "") {

        discount.innerHTML = '<h3 style="font-size: 15px; width: 300px;">aun no has pegado el codigo 🤔</h3>';
         
    } else if (canjearTxt !== "54ldqwer23") {
        discount.innerHTML = '<h3 style="font-size: 15px; width: 300px;">el coupon no es valido 🥲</h3>';
    } 
}
  
}

export default cart