let products = [
    {
        "title":"Apple iPhone 16 pro",
        "price": 65000,
        "image":"https://content2.rozetka.com.ua/goods/images/big/468886490.jpg",
        "desc":"Новітній контролер камери. Такий швидкий. Такий плавний.Тонші рамки для більших дисплеїв.Прорив у часі роботи від акумулятора."
    },
    {
        "title":"MacBook Pro",
        "price": 70000,
        "image":"https://bigmag.ua/image/cache/catalog/archive/data/00000001/1651351531/01/1111111/121/1212/1/1590778665-2000x2000.jpg",
        "desc":"це суперпотужний інструмент для роботи. Феноменальна одно­- та багато­по­то­кова продук­тив­ність центрального процесора, швидша уніфікована памʼять, вдоско­налені приско­рю­вачі машинного навчання."
    },
    {
        "title":"iMac",
        "price": 105000,
        "image":"https://www.apple.com/v/imac/s/images/overview/closer-look/colors_pf_blue__bshbmf5v5rki_large_2x.jpg",
        "desc":"Ще швидший центральний процесор дає змогу виконувати всі завдання хутчіше. Потужний графічний процесор з апаратним прискоренням трасування променів гарантує неймовірну реалістичність графіки."
    },
    {
        "title":"iPad air",
        "price": 35000,
        "image":"https://www.apple.com/v/ipad-air/x/images/overview/two-sizes/gallery-toggle/spin_reverse_endframe__ey8zvqfsy08y_large_2x.png",
        "desc":"він майже вдвічі швидший, ніж моделі попереднього покоління. Його було створено для роботи з Apple Intelligence, щоб допомогти вам писати, проявляти індивідуальність й виконувати завдання без зусиль."
    },
    {
        "title":"AirPods Max",
        "price": 10000,
        "image":"https://www.apple.com/v/airpods-max/h/images/overview/bento/midnight/bento_1_airpod_max_midnight__4jy1tkqh9qay_large_2x.jpg",
        "desc":"AirPods Max відтворюють звук із неймовірно якісною деталізацією й дарують неперевершені аудіовраження. Кожна деталь спеціально розробленого драйвера працює над створенням звучання з ультранизьким спотворенням у всьому чутному діапазоні. Тому ви яскраво чутимете кожну ноту."
    },
    {
        "title":"iPad mini",
        "price": 29000,
        "image":"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSqNjd1bnsfV6dj9igLOWJVvlUBhzq1cIDPWw&s",
        "desc":"Водночас він неймовірно легкий і компактний. Його оснащено корпусом із повністю переробленого алюмінію та дивовижним дисплеєм на всю передню панель. І ви можете всюди брати його з собою, адже він легко поміщається в рюкзак або сумку."
    },
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
