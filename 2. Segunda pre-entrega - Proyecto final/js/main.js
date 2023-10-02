//Se quiere hacer una tienda de video juegos online
//Variable para la cantidad de Video Juegos Comprados
let cantidadVideoJuegos = 0;
//Variable para el valor total a pagar
let cuentaTotal = 0;
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
//Por palabra
const findProductsWord = () => {
    //Palabra clave para mostrar video juegos
    let keyWord = prompt("Ingresa una palabra del video juego que deseas buscar").trim().toUpperCase()
    //Video juegos relacionados con la palabra clave
    let resultGames = videoGamesData.filter((game) => game.name.toUpperCase().includes(keyWord))
    //Validar las coincidencias
    resultGames.length > 0 ? console.table(resultGames) : alert("No se encontro ninguna coincidencia con: " + keyWord)
}

const findProductsIndex = () => {
    //Información del juego por indice array
    let videoGameInfo = []
    //Mostrar los video juegos
    console.table(videoGamesData)
    //Indice del video juego a eliminar
    let keyIndex = parseInt(prompt("Ingresa un index del video juego que desees eliminar"))
    //Validar el indice
    if (keyIndex > -1 && keyIndex < videoGamesData.length) {
        //Obtener los valores de la posición de data especifica en el array
        for (const value of Object.values(videoGamesData[keyIndex])) {
            videoGameInfo.push(value)
        }
        //Imprimir la información del video juego
        console.log(videoGameInfo.join(" - "))
    }
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


// Función para mostrar los video juegos en el momento que se necesite
const showVideoGames = () => {
    // Iterar sobre el array videoGamesData y mostrar la información de cada video juego
    for (let i = 0; i < videoGamesData.length; i++) {
        const videoGame = videoGamesData[i];
        console.log(`Video Game: ${i + 1}`);
        console.log(`Name: ${videoGame.name}`);
        console.log(`Platforms: ${videoGame.platforms}`);
        console.log(`Price: $${videoGame.price}`);
        console.log(`Category: ${videoGame.category}`);
        console.log('-------------------');
    }
}

//Función para evaluar un si o no
const answer = (message) => {
    let answerR = prompt(message).toLowerCase()
    return answerR == "si" || answerR == "yes";
}

//Función para calcular el valor por el total del mismo video juego dependiendo de su cantidad
const amountGames = (price, totalGames) => {
    cantidadVideoJuegos += totalGames
    cuentaTotal += price * totalGames
}

//Función para calcular el descuento de la compra
const aplicarDescuento = (totalCompra, descuento) => {
    return (1 - (descuento / 100)) * totalCompra
}

//Función para la compra de los video juegos
const buyVideoGames = () => {
    let amount = answer("Ahora nos dirás la cantidad que quieres de cada uno de los juegos mostrados, responde (Si o No)")
    //Evaluar la cantidad de juegos por cada item posible
    while (amount) {
        // Iterar sobre el array de la data y mostrar la información de cada uno
        for (let i = 0; i < videoGamesData.length; i++) {
            const videoGame = videoGamesData[i];
            alert(`Video juego Nro: ${i + 1}`);
            let amountVideoGame = parseInt(prompt(`Digital la cantidad Video juego Nro  ${i + 1}:`))
            amountGames(parseFloat(videoGame.price), amountVideoGame)
        }
        //Evaluar si quiere seguir comprando el usuario
        amount = answer("¿Quisieras seguir agregando al carrito? (Si o No)")
        //Despues de comprados los video juegos se evalua un descuento por la cantidad de los mismos
        if (amount === false) {
            //Calcular descuento según la cantidad de VideoGames
            if (cantidadVideoJuegos >= 10) {
                alert("Debido a que compraste más de 10 juegos se te dará un descuento del 10%")
                cuentaTotal = aplicarDescuento(cuentaTotal, 10)
            } else if (cantidadVideoJuegos > 5 && cantidadVideoJuegos < 10) {
                alert("Debido a que compraste más de 5 juegos y menor a 10 juegos se te dará un descuento del 5%")
                cuentaTotal = aplicarDescuento(cuentaTotal, 5)
            } else if (cantidadVideoJuegos >= 2 && cantidadVideoJuegos <= 5) {
                alert("Debido a que compraste más de 5 juegos y menor a 10 juegos se te dará un descuento del 2%")
                cuentaTotal = aplicarDescuento(cuentaTotal, 2)
            } else {
                alert("Debido a que no compraste más de 2 juegos, no lograste obtener descuento ")
                cuentaTotal = aplicarDescuento(cuentaTotal, 0)
            }
        }
    }
    //Impresión del resultado por medio de alert
    alert(`La cantidad total de video juegos comprados es: ${cantidadVideoJuegos}`)
    alert(`La cantidad total a pagar por los video juegos es: $ ${cuentaTotal.toFixed(3)}`)
}


//Saludo persona
sayHello(prompt("Bienvenid@ por favor ingresa tu nombre:"));
//Primera impresión de los datotos de los video juegos disponibles
console.log("El día de hoy comprarás un par de video juegos, debes escribir la cantidad de los que deseas de cada uno")
console.log("A continuación tienes la lista de video juegos, puedes revisar para ya comprar en un momento")

//Mostrar los productos iniciales en una tabla
console.table(videoGamesData)
//Mostrar el total de productos en el momento que se desee
showVideoGames()
//Simular la compra
buyVideoGames()
