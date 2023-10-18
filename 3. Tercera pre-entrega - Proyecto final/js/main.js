//Productos iniciales en la tienda, en el arraglo videoGamesData
const videoGamesData = [
    {
        id: 1,
        name: "Blue Protocol",
        platforms: "PC,PS5",
        price: 10.50,
        category: "MMORPG",
        dateRegistered: new Date("10/1/22"),
    },
    {
        id: 2,
        name: "Beyond Good & Evil 2",
        platforms: "PC,PS4,XboxOne",
        price: 22.22,
        category: "Action Adventure/Open World",
        dateRegistered: new Date("10/1/22"),
    },
    {
        id: 3,
        name: "Star Citizen",
        platforms: "PC",
        price: 50.45,
        category: "Action / Space Simulator",
        dateRegistered: new Date("10/1/22"),
    },
    {
        id: 4,
        name: "Granblue Fantasy: Relink",
        platforms: "PC,PS4,PS5",
        price: 20.36,
        category: "Action-RPG",
        dateRegistered: new Date("10/2/22"),
    },
    {
        id: 5,
        name: "Grand Theft Auto VI",
        platforms: "PC,PS4,PS5,XboxOne,XSX",
        price: 85.99,
        category: "Open world / GTA type",
        dateRegistered: new Date("10/2/22"),
    },
    {
        id: 6,
        name: "Final Fantasy XVI",
        platforms: "PC,PS5",
        price: 12.05,
        category: "JRPG / Rol",
        dateRegistered: new Date("10/2/22"),
    },
];


//CRUD

//-----Create-----
//Función para agregar nuevos productos
const addNewProduct = () => {
    //Formulario de la creación del nuevo producto
    let createdGame = document.getElementById("createdGame")

    createdGame.addEventListener("submit", function (event) {
        // Evita que el formulario se envíe de forma predeterminada
        event.preventDefault();
        //Variables del nuevo video juego
        let nameNew = document.getElementById("nameNewGame").value.trim()
        let platformsNew = document.getElementById("platformsNewGame").value.trim()
        let priceNew = parseFloat(document.getElementById("priceNewGame").value)
        let categoryNew = document.getElementById("categoryNewGame").value.trim()

        if (nameNew === "" || platformsNew === "" || isNaN(priceNew) || categoryNew === "") {
            alert("Por favor ingresa valores validos")
        }
        //Traer el último elemento de la data para obtener el ID
        const lastElement = videoGamesData[videoGamesData.length - 1]
        //Objecto del nuevo video juegos
        const newGame = {
            id: lastElement.id + 1,
            name: nameNew,
            platforms: platformsNew,
            price: parseFloat(priceNew),
            category: categoryNew,
            dateRegistered: new Date(),
        };
        // Verificar que no exista el video juego por nombre
        if (videoGamesData.some((itemGame) => itemGame.name.toLowerCase() === newGame.name.toLowerCase())) {
            alert("El producto ya existe 👏")
        } else {
            videoGamesData.push(newGame)
            //Agregamos el nuevo video juegos en el localStorage
            localStorage.setItem('dataVideoGames', JSON.stringify(videoGamesData));
            //Mostrar los nuevos productos
            showProducts()
            alert("El producto fue añadido exitosamente 😊 ")
        }
        setTimeout(() => {
            createdGame.reset();
        }, 5000);
    })
}

//-----Read-----
//Buscar productos por medio de un input
const searchProduct = document.getElementById("searchInput")
searchProduct.addEventListener('keyup', e => {
    e.target.matches('#searchInput') && (
        document.querySelectorAll('.card').forEach(game => {
            const titleGame = game.querySelector('.nameGame')
            titleGame.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? game.style.display = 'flex' : game.style.display = 'none'
        })
    )
})
//Función para mostrar productos
const showProducts = () => {
    //Traer la data del localStorage
    const gamesData = JSON.parse(localStorage.getItem('dataVideoGames'))
    console.log(gamesData)
    //Contenedor donde se verán  los productos
    const mainProducts = document.querySelector(".products")
    //Cada vez que se creen nuevos se vacia el contenedor
    mainProducts.innerHTML = "";

    for (const game of gamesData) {
        //Card de  cada producto
        const card = document.createElement("div");
        card.classList.add('card');

        const imageGame = document.createElement("img")
        imageGame.classList.add('imageGame');
        imageGame.src = "../assets/images/5084927.jpg"
        imageGame.alt = "no image"
        card.appendChild(imageGame)

        //Nombre del Video Juego
        const nameGame = document.createElement("h1")
        nameGame.classList.add('nameGame');
        nameGame.textContent = game?.name;
        card.appendChild(nameGame);

        //Plataformas del Video Juego
        const platformsGame = document.createElement("p")
        platformsGame.classList.add('platformsGame');
        platformsGame.textContent = game?.platforms;
        card.appendChild(platformsGame);

        //Plataformas del Video Juego
        const priceGame = document.createElement("p")
        priceGame.classList.add('platformsGame');
        priceGame.textContent = game?.price;
        card.appendChild(priceGame);

        //Categoria del Video Juego
        const categoryGame = document.createElement("p")
        categoryGame.classList.add('platformsGame');
        categoryGame.textContent = game?.category;
        card.appendChild(categoryGame);

        //Agregar al carrito Video Juego
        const addCarGame = document.createElement("button")
        addCarGame.classList.add('addCarGame');
        addCarGame.textContent = "Add";
        card.appendChild(addCarGame);

        //Borrar Video Juego
        const deleteGame = document.createElement("button")
        deleteGame.classList.add('deleteGame');
        deleteGame.textContent = "Delete";
        deleteGame.addEventListener('click', deleteVideoGame);
        card.appendChild(deleteGame);

        //Agregar al contenedor que guarda los video juegos
        mainProducts.appendChild(card);
    }

}

//-----Update----- aún falta


//-----Delete-----
const deleteVideoGame = (e) => {
    //Evento del Botón
    const button = e.target;
    //Traer la card padre
    const item = button.parentElement;
    //Traer el nombre del video juego
    const nameGameData = item.querySelector('.nameGame').textContent.trim().toLowerCase();
    //Indice del elemento a eliminar
    const resultadoIndex = videoGamesData.findIndex((game) => game.name.toLowerCase() === nameGameData);
    //Verificar que sea un indice valido
    if (resultadoIndex != -1) {
        //Borrar el video juego
        videoGamesData.splice(resultadoIndex, 1);
        //Actualizar el Local Storage
        localStorage.setItem('dataVideoGames', JSON.stringify(videoGamesData));
        //Mostrar los productos restantes
        showProducts()
    }
}


//Botón para la creación de un nuevo video juego
const createButton = document.getElementById("createnewGame")
createButton.addEventListener("click", e => {
    addNewProduct()
})


//Función para iniciar elementos de la página 
const starShop = () => {
    //Agregamos los Video Juegos por defecto en el localStorage
    localStorage.setItem('dataVideoGames', JSON.stringify(videoGamesData));
    //Primero mostrar los productos
    showProducts()
}

//Espermos que todos los elementos de la página cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', starShop)
} else {
    starShop();
}



//Posibles tareas
/*
1. Apartir del local mostrar las card
*/
