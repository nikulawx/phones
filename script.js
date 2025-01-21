let products = [
    {
        "title":"Apple iPhone 16 pro",
        "price": 65000,
        "image":"https://content2.rozetka.com.ua/goods/images/big/468886490.jpg",
        "description":"Новітній контролер камери. Такий швидкий. Такий плавний.Тонші рамки для більших дисплеїв.Прорив у часі роботи від акумулятора."
    }
    
]
function getCookieValue(cookieName) {
    const cookies = document.cookie.split(';');

    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim();
        
        if (cookie.startsWith(cookieName + '=')) {
            // Якщо так, повертаємо значення кукі
            return cookie.substring(cookieName.length + 1); // +1 для пропуску символу "="
        }
    }
    // Якщо кукі з вказаним іменем не знайдено, повертаємо порожній рядок або можна повернути null
    return '';
 }
 
class Cart{
    constructor(){
        this.products = []
        this.cartCounter = document.querySelector('.cart-container span')
        this.loadCartFromCookies()
    }
    addItem(productIndex){
        let productInCart = this.products.find(product => product.productIndex === productIndex)
        if (productInCart) {
            productInCart.quantity += 1;
        }else {
            this.products.push({
                productIndex,
                quantity:1
            });
        }
      this.updateCounter();
      this.saveCartToCookies()
    }
    addItem(productIndex) {
        let productInCart = this.products.find(product => product.productIndex === productIndex)
     if (productInCart) {
        productInCart.quantity += 1;
     }else{
        this.products.push({
            productIndex,
            quantity:1
        })
     }
     this.updateCounter()
     this.saveCartToCookies()
    }
    updateCounter() {
        let count = 0
        for (let i = 0; i < this.products.length; i++){
            count += this.products[i].quantity
        }
        this.cartCounter.innerHTML = count
    }
    updateQuantity(productIndex, newQuantity) {
        let productInCart = this.products.find(product => product.productIndex === productIndex)
        if (productInCart) {
            productInCart.quantity = newQuantity
            if (productInCart.quantity == 0) {
                this.products = this.products.filter(product => product.productIndex !== productIndex)
            }
            this.updateCounter()
            this.saveCartToCookies()
        }
    }
    saveCartToCookies() {
        let cartJSON = JSON.stringify(this.products)
        document.cookie = `cart=${cartJSON}; max-age=${60 * 60 * 24 * 7}; path=/`
    }
    loadCartFromCookies() {
        let cartCookie = getCookieValue('cart')
        if (cartCookie && cartCookie !=="") {
            this.products = JSON.parse(cartCookie)
            this.updateCounter()
        }
    }
    calculateTotal(){
        let total = 0
        for(let i = 0; i < this.products.length;i++){
            total += products[this.products[i].productIndex].price * this.products[i].quantity;
        }
        return total
    }
}
const cart = new Cart()
function getProductCart(product){
    return `<article class="item">
    <img  src="${product.image}">
                <h3>${product.title}</h3>
                <p class="item-desc">${product.desc}</p>
                 <p class="item-price">${product.price}</p>
           <button class="item-buy">купити</button>
           </article>`
}
function printProducts(_products) {
    let localProducts = _products || products
    //контейнер в якому знаходяться всі товари
    let itemsContainer = document.querySelector(".items");
    itemsContainer.innerHTML = "";
    if(!localProducts.length) {
        itemsContainer.innerHTML = "<h1>Нема товару</h1>";
        return;
    }
    //проходимось по всім товарам та додаємо верстку зі значеннями кожного товару
    for(let i = 0;i < localProducts.length;i++){
        itemsContainer.innerHTML += getProductCart(localProducts[i]);
    }
    //отримуємо всі кнопки "купити" та додаємо на кожну кнопку подію для додання в кошик
    let buyButtons = document.querySelectorAll(".item-buy");
    for(let i = 0;i < buyButtons.length;i++){
        buyButtons[i].addEventListener("click",() => cart.addItem(i))
    }
 }
 
 
 printProducts();
 
 
 let search = document.querySelector(".search");
 
 
 function onSearch(event){
    let localProducts = products.filter(product => product.title.toLocaleLowerCase().includes(event.target.value.toLocaleLowerCase()));
    console.log(localProducts,event.target.value)
 
 
    printProducts(localProducts);
 }
 search.addEventListener("change",onSearch) 
