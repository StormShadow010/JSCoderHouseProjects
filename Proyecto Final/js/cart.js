//Array de las compras del carrito
const listShopping = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []

//Número de compras que se llevan en el carrito de compras
const numberShop = document.querySelector('.numberShop');
numberShop.textContent = listShopping.length

//Función para mostrar la compra
const showProductsCart = () => {
    const containerProducts = document.querySelector(".productsCart")
    //Evaluar que existan productos en el carrito
    if (listShopping.length > 0) {
        //Cada vez que se creen nuevos se vacia el contenedor
        containerProducts.innerHTML = "";
        //Creacion de la card de cada producto en el carrito
        let indiceShopGame = 0
        for (const game of listShopping) {
            //Card de  cada producto
            const cardShop = document.createElement("div");
            cardShop.classList.add('item-cart');
            cardShop.setAttribute('data-index', indiceShopGame);

            //Div de la imagen
            const imageCard = document.createElement("div");
            imageCard.classList.add('imageCard');
            //Imagen del Video Juego
            const imageGame = document.createElement("img")
            imageGame.classList.add('imageGame');
            imageGame.src = `${game.background_image}`
            imageGame.alt = "no image"
            imageCard.appendChild(imageGame)
            cardShop.appendChild(imageCard)

            //Div con la información
            const infoGame = document.createElement("div");
            infoGame.classList.add('infoGame');

            //Titulo Video Juego
            const titleGame = document.createElement("div");
            titleGame.classList.add('titleGame');
            //Nombre del Video Juego
            const nameGame = document.createElement("p")
            nameGame.classList.add('nameGame');
            nameGame.textContent = game?.name;
            titleGame.appendChild(nameGame);
            infoGame.appendChild(titleGame);

            //Plataformas del Video Juego
            const platforms = document.createElement("div");
            platforms.classList.add('platformsGame');
            const platformGameSpecific = game.platforms
            //Arreglo para cada una de las plaformas posibles
            const platformNames = [];
            const platformsTotal = ['PlayStation', 'Xbox', 'PC', "macOS", "Nintendo"]
            //Foreach para recorrer cada plataforma en el objeto
            platformGameSpecific.forEach(element => {
                const platformInd = element.platform.name
                platformsTotal.forEach(plat => {
                    if (plat.toLowerCase().includes(platformInd.substring(0, 3).toLowerCase())) {
                        platformNames.push(plat)
                    }
                });
            });

            const platformsFinal = new Set(platformNames);
            let result = [...platformsFinal];

            for (let index = 0; index < result.length; index++) {
                const imagePlatform = document.createElement("img")
                imagePlatform.classList.add('imagePlatform');
                imagePlatform.src = `../assets/platforms/${result[index].toLowerCase()}.png`
                imagePlatform.alt = `Icon:${result[index].toLowerCase()}`
                platforms.appendChild(imagePlatform)
            }
            infoGame.appendChild(platforms)
            cardShop.appendChild(infoGame);
            //Price
            const priceContainer = document.createElement("div");
            priceContainer.classList.add('priceContainer');
            const priceGame = document.createElement("p")
            priceGame.classList.add('priceGame')
            priceGame.textContent = `$${game.priceGame}`
            priceContainer.appendChild(priceGame)
            infoGame.appendChild(priceContainer);
            //Botón para borrar el Video Juego
            const deleteShopGame = document.createElement("button")
            deleteShopGame.classList.add('deleteShopGame');
            //Imagen delete
            const imageGameDelete = document.createElement("img")
            imageGameDelete.classList.add('imageGameDelete');
            imageGameDelete.src = "../assets/images/contenedor-de-basura.png"
            imageGameDelete.alt = "no image"
            deleteShopGame.appendChild(imageGameDelete)
            // deleteShopGame.textContent = "Delete";
            deleteShopGame.addEventListener('click', deleteShopVideoGame);
            cardShop.appendChild(deleteShopGame);
            indiceShopGame++
            //Agregar al contenedor que guarda los video juegos
            containerProducts.appendChild(cardShop);
        }
        cuentaTotal = listShopping.reduce((total, game) => total + (parseFloat(game?.priceGame) || 0), 0);
        //Total $ Shop
        const priceTotalShop = document.createElement("h1")
        priceTotalShop.classList.add('priceTotalShop');
        priceTotalShop.textContent = `Total Games:${listShopping.length} |$ ${cuentaTotal.toFixed(3)}`;
        containerProducts.appendChild(priceTotalShop);

        //Botón de pagar
        const payShop = document.createElement("button")
        payShop.classList.add('payShop');
        payShop.textContent = `Buy`;
        containerProducts.appendChild(payShop);


    } else {
        //Ocular contenedor
        containerProducts.style.display = "none"
    }

}

const deleteShopVideoGame = (e) => {
    //Evento del Botón
    const button = e.target;
    //Traer la card padre
    const item = button.parentElement.parentElement;
    //Indice del que se desea borrar a partir del atributo creado en el div contenedor
    const indice = item.getAttribute("data-index");
    //Eliminar el juego correspondiente
    listShopping.splice(indice, 1);
    //Notificacion de eliminación del juego del carrito
    Toastify({
        text: "El producto fue eliminado exitosamente 😊 ",
        duration: 1000,
        gravity: 'top',
        position: 'right',
        offset: {
            x: 10, // horizontal axis - can be a number or a string indicating unity. eg: '2em'
            y: 10 // vertical axis - can be a number or a string indicating unity. eg: '2em'
        },
        style: {
            background: "linear-gradient(to right, #00b09b, #96c93d)",
            width: "20%",
            textAlign: "center"
        },
    }).showToast();
    //Actualizar el Local Storage
    localStorage.setItem('shoppingCart', JSON.stringify(listShopping));
    //Productos en el carrito
    numberShop.textContent = listShopping.length
    //Mostrar los productos restantes
    showProductsCart()
}

//Modal boostrap


showProductsCart()