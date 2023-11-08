//Array de las compras del carrito
const listShoppingCart = localStorage.getItem('shoppingCart') ? JSON.parse(localStorage.getItem('shoppingCart')) : []
let hasDataFetched = false;
//Función para hacer la petición a la API con Fetch 
const getDataApi = async (page, pageSize) => {
    if (hasDataFetched) {
        return;
    }
    // Api:https://rawg.io
    const apiKey = '77beef111ed54b6a991db45248e5998c'; // Reemplaza 'TU_CLAVE_DE_API' con tu clave de API de RAWG
    const apiUrl = 'https://api.rawg.io/api/games';

    // Parámetros de la solicitud, incluyendo pageSize y page
    const params = new URLSearchParams({
        key: apiKey,
        page: page,
        page_size: pageSize,
        // Puedes agregar más parámetros según tus necesidades, como 'platforms', 'genres', etc.
    });

    //URL con los parametros de la solicitud
    const url = `${apiUrl}?${params.toString()}`;

    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('No se pudo obtener la respuesta de la API.');
        }

        const data = await response.json();

        if (data.results.length > 0) {
            const games = data.results;

            // Comprobar si los precios ya están en el localStorage
            let storedGames = JSON.parse(localStorage.getItem('dataGames')) || [];

            if (storedGames.length === 0) {
                // Si no hay precios almacenados, asigna precios aleatorios
                games.forEach(element => {
                    element['priceGame'] = (20 + (Math.random() * (50 - 20))).toFixed(3);
                });

                // Guarda los juegos con precios en localStorage
                localStorage.setItem('dataGames', JSON.stringify(games));
            } else {
                // Si los precios ya están en localStorage, usa esos precios
                games.forEach(element => {
                    const storedGame = storedGames.find(game => game.name === element.name);
                    element['priceGame'] = storedGame ? storedGame.priceGame : 0;
                });
            }

            // Muestra los productos
            showProducts();
        }

    } catch (error) {
        console.error('Hubo un error al hacer la solicitud a la API:', error);
    }
    // Marcar que los datos han sido obtenidos
    hasDataFetched = true;
}

//Función para mostrar productos
const showProducts = () => {
    //Traer la data del localStorage
    const gamesData = JSON.parse(localStorage.getItem('dataGames'))
    //Contenedor donde se verán  los productos
    const mainProducts = document.querySelector(".products")
    //Cada vez que se creen nuevos se vacia el contenedor
    mainProducts.innerHTML = "";

    for (const game of gamesData) {
        //Card de  cada Video Juego
        const card = document.createElement("div");
        card.classList.add('card');

        //Div de la imagen
        const imageCard = document.createElement("div");
        imageCard.classList.add('imageCard');
        //Imagen del Video Juego
        const imageGame = document.createElement("img")
        imageGame.classList.add('imageGame');
        imageGame.src = `${game.background_image}`
        imageGame.alt = "no image"
        imageCard.appendChild(imageGame)
        card.appendChild(imageCard)

        //Div con la información
        const infoGame = document.createElement("div");
        infoGame.classList.add('infoGame');
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

        //Titulo Video Juego
        const titleGame = document.createElement("div");
        titleGame.classList.add('titleGame');
        //Nombre del Video Juego
        const nameGame = document.createElement("p")
        nameGame.classList.add('nameGame');
        nameGame.textContent = game?.name;
        titleGame.appendChild(nameGame);
        infoGame.appendChild(titleGame)

        // Categorias del Video Juego
        const genresContainer = document.createElement("div");
        genresContainer.classList.add('genresContainer');
        const genresArrayTotal = [];
        const genresGameTotal = game?.genres
        genresGameTotal.forEach(genre => {
            genresArrayTotal.push(genre.name)
        });
        const genresGame = document.createElement("p")
        genresGame.classList.add('genresGame');
        genresGame.textContent = "Genres:" + genresArrayTotal.join(', ');
        genresContainer.appendChild(genresGame);
        infoGame.appendChild(genresContainer)

        //Price
        const priceContainer = document.createElement("div");
        priceContainer.classList.add('priceContainer');
        const priceGame = document.createElement("p")
        priceGame.classList.add('priceGame')
        priceGame.textContent = `$${game.priceGame}`
        priceContainer.appendChild(priceGame)
        infoGame.appendChild(priceContainer);

        //Agregar al carrito Video Juego
        const addCartGameContainer = document.createElement("div")
        addCartGameContainer.classList.add("addCartGameContainer")
        const addCartGame = document.createElement("button")
        addCartGame.classList.add('addCartGame');
        addCartGame.textContent = "Add to Cart";
        addCartGameContainer.appendChild(addCartGame)
        addCartGame.addEventListener('click', addCartGameHandler) //Agregar al carrito al dar clic
        infoGame.appendChild(addCartGameContainer);
        //Agregar toda la info del Video Juego a la Card
        card.appendChild(infoGame)
        //Agregar al contenedor que guarda los video juegos
        mainProducts.appendChild(card);
    }
}

//Función para agregar al carrito
const addCartGameHandler = (e) => {
    e.preventDefault();
    //Traer la data del localStorage
    const gamesData = JSON.parse(localStorage.getItem('dataGames'))
    //Evento del Botón
    const button = e.target;
    //Traer la card padre abuelo
    const item = button.parentElement.parentElement;
    //Traer el nombre del video juego
    const nameGameData = item.querySelector('.nameGame').textContent.trim().toLowerCase();
    //Traer la info del Video Juego Especifico por a partir del nombre
    const elementGame = gamesData.find((game) => game.name.toLowerCase() === nameGameData);

    if (elementGame) {
        listShoppingCart.push(elementGame)
        localStorage.setItem('shoppingCart', JSON.stringify(listShoppingCart));

        const numberShop = document.querySelector('.numberShop');
        numberShop.textContent = listShoppingCart.length

        Toastify({
            text: "Added to cart",
            duration: 3000,
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

        // showProductsCart()
    }
}

//-----Read-----
//Buscar productos por medio de un input
const searchProduct = document.getElementById("searchInput")
searchProduct.addEventListener('keyup', e => {
    e.preventDefault();
    e.target.matches('#searchInput') && (
        document.querySelectorAll('.card').forEach(game => {
            //Obtener el nombrel de Video Juego
            const titleGame = game.querySelector(".infoGame").querySelector(".titleGame").querySelector(".nameGame")
            titleGame.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? game.style.display = 'flex' : game.style.display = 'none'
        })
    )
})

//Función para iniciar elementos de la página 
// const starShop = () => {
//     // Llama a la función para hacer la solicitud a la API con la página y tamaño de página deseados
// }
getDataApi(1, 10) // Ejemplo: página 1, 10 juegos por página
const numberShop = document.querySelector('.numberShop');
numberShop.textContent = listShoppingCart.length




// //Esperemos que todos los elementos de la página cargen para ejecutar el script
// if (document.readyState == 'loading') {
//     document.addEventListener('DOMContentLoaded', starShop)
// } else {
//     starShop();
// }

