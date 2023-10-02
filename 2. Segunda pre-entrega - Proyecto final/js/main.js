//Se quiere hacer una tienda de video juegos online

//Productos iniciales en la tienda, en el arra videoGamesData
const videoGamesData = [
    {
        name: "Blue Protocol",
        platforms: "PC,PS5",
        price: 10.50,
        category: "MMORPG",
    },
    {
        name: "Beyond Good & Evil 2",
        platforms: "PC,PS4,XboxOne",
        price: 22.22,
        category: "Action Adventure/Open World",
    },
    {
        name: "Star Citizen",
        platforms: "PC",
        price: 50.45,
        category: "Action / Space Simulator",
    },
    {
        name: "Granblue Fantasy: Relink",
        platforms: "PC,PS4,PS5",
        price: 20.36,
        category: "Action-RPG",
    },
    {
        name: "Grand Theft Auto VI",
        platforms: "PC,PS4,PS5,XboxOne,XSX",
        price: 85.99,
        category: "Open world / GTA type",
    },
    {
        name: "Final Fantasy XVI",
        platforms: "PC,PS5",
        price: 12.05,
        category: "JRPG / Rol",
    },
];


//Función de Bienvenida
const sayHello = (name) => {
    alert(`Bienvenido ${name} al simulador de compras de video juegos`);
}

//CRUD

//Create
//Agregar un nuevo video juego (Administrador), esto se hará apartir de un botón más adelante
const addProduct = () => {
    //Variables del nuevo video juego
    let nameNew = prompt("Ingresa el nombre del nuevo video juego").trim()
    let platformsNew = prompt("Ingresa las plataformas del video juego").trim()
    let priceNew = parseFloat(prompt("Ingresa el precio del video juego"))
    let categoryNew = prompt("Ingresa la categoria del video juego").trim()

    if (nameNew === "" || platformsNew === "" || isNaN(priceNew) || categoryNew === "") {
        alert("Por favor ingresa valores validos")
    }
    //Objecto del nuevo video juegos
    const newGame = {
        name: nameNew,
        platforms: platformsNew,
        price: parseFloat(priceNew),
        category: categoryNew,
    };

    // Verificar que no exista el video juego
    if (videoGamesData.some((itemGame) => itemGame.name === newGame.name)) {
        alert("El producto ya existe")
    } else {
        alert("El producto fue añadido exitosamente 😊 ")
        videoGamesData.push(newGame)
        console.table(videoGamesData)
    }
}

//Read
//Filtrar un video juego (Administrador), esto se hará en una espacio de busqueda
const findProducts = () => {
    //Palabra clave para mostrar video juegos
    let keyWord = prompt("Ingresa una palabra del video juego que deseas buscar").trim().toUpperCase()
    //Video juegos relacionados con la palabra clave
    let resultGames = videoGamesData.filter((game) => game.name.toUpperCase().includes(keyWord))
    //Validar las coincidencias
    resultGames.length > 0 ? console.table(resultGames) : alert("No se encontro ninguna coincidencia con: " + keyWord)
}

//Update - aún falta


//Delete
//Eliminar un video juego (Administrador), esto se hará en una espacio de busqueda
const deleteProducts = () => {
    //Mostrar los video juegos
    console.table(videoGamesData)
    //Indice del video juego a eliminar
    let keyIndex = parseInt(prompt("Ingresa un index del video juego que desees eliminar"))
    //Validar el indice
    if (keyIndex > -1 && keyIndex < videoGamesData.length) {
        videoGamesData.splice(keyIndex, 1)
        console.table(videoGamesData)
        alert("El producto fue eliminado exitosamente 👍 ")
    } else {
        alert("El producto no pudo ser elimiando 😒")
    }
}


//Saludo persona
sayHello(prompt("Bienvenid@ por favor ingresa tu nombre:"));
//Primera impresión de los datotos de los video juegos disponibles
console.log("El día de hoy comprarás un par de video juegos, debes escribir la cantidad de los que deseas de cada uno")
console.log("A continuación tienes la lista de video juegos, puedes revisar para ya comprar en un momento")

//Mostrar los productos iniciales en una tabla
console.table(videoGamesData)