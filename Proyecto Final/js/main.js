//Función para hacer la petición a la API con Fetch 
const getDataApi = async (page, pageSize) => {
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
            //Agregamos los Video Juegos por defecto en el localStorage
            localStorage.setItem('dataGames', JSON.stringify(games));
            showProducts()
        }

    } catch (error) {
        console.error('Hubo un error al hacer la solicitud a la API:', error);
    }
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

        card.appendChild(infoGame)



        //Agregar al contenedor que guarda los video juegos
        mainProducts.appendChild(card);
    }
}



//Función para iniciar elementos de la página 
const starShop = () => {
    // Llama a la función para hacer la solicitud a la API con la página y tamaño de página deseados
    getDataApi(1, 10) // Ejemplo: página 1, 10 juegos por página
}

//Esperemos que todos los elementos de la página cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', starShop)
} else {
    starShop();
}

