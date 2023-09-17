//Se quiere hacer una tienda de video juegos online
//Data Video Games Info
const videoGamesData = [
    {
        name: "Blue Protocol",
        platforms: "PC,PS5",
        price: 10.00,
        category: "MMORPG",
    },
    {
        name: "Beyond Good & Evil 2",
        platforms: "PC,PS4,XboxOne",
        price: 22.00,
        category: "Action Adventure/Open World",
    },
    {
        name: "Star Citizen",
        platforms: "PC",
        price: 50.00,
        category: "Action / Space Simulator",
    },
    {
        name: "Granblue Fantasy: Relink",
        platforms: "PC,PS4,PS5",
        price: 20.00,
        category: "Action-RPG",
    },
    {
        name: "Grand Theft Auto VI",
        platforms: "PC,PS4,PS5,XboxOne,XSX",
        price: 85.00,
        category: "Open world / GTA type",
    },
    {
        name: "Final Fantasy XVI",
        platforms: "PC,PS5",
        price: 12.00,
        category: "JRPG / Rol",
    },
];

//Variable para la cantidad de Video Juegos Comprados
let cantidadVideoJuegos = 0;
//Variable para el valor total a pagar
let cuentaTotal = 0;

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
//Primera impresión de los datotos de los video juegos disponibles
console.log("El día de hoy comprarás un par de video juegos, debes escribir la cantidad de los que deseas de cada uno")
console.log("A continuación tienes la lista de video juegos, puedes revisar para ya comprar en un momento")

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

let amount = answer("Ahora nos dirás la cantidad que quieres de cada uno de los juegos mostrados, responde (Si o No)")
//Evaluar la cantidad de juegos por cada item posible
while (amount) {
    // Iterar sobre el array pizzaData y mostrar la información de cada pizza
    for (let i = 0; i < videoGamesData.length; i++) {
        const videoGame = videoGamesData[i];
        alert(`Video Game: ${i + 1}`);
        let amountVideoGame = parseInt(prompt("Digital la cantidad del primer Video juego:"))
        amountGames(parseFloat(videoGame.price), amountVideoGame)
    }
    //Evaluar si quiere seguir comprando el usuario
    amount = answer("¿Quisieras seguir agregando al carrito? (Si o No)")
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




