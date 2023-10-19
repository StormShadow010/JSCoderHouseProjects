//Se quiere hacer una tienda de video juegos online
//Variable para la cantidad de Video Juegos Comprados
let cantidadVideoJuegos = 0;
//Variable para el valor total a pagar
let cuentaTotal = 0;

const listshopping = []

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

        // let contenedor = document.createElement("div");
        // contenedor.classList.add('addCarGameContainer');
        // contenedor.innerHTML = `<p> Add</p>
        // <i class="fa-solid fa-magnifying-glass" style="color: #001E6C;"></i>`;

        //Agregar al carrito Video Juego
        const addCarGame = document.createElement("button")
        addCarGame.classList.add('addCarGame');
        addCarGame.textContent = "Add";
        addCarGame.addEventListener('click', addCarGameHandler) //
        //addCarGame.appendChild(contenedor)
        card.appendChild(addCarGame);

        // let contenedor2 = document.createElement("div");
        // contenedor2.innerHTML = `<p> Delete </p>
        // <i class="fa-solid fa-trash" style="color: #001E6C;"></i>`;
        // //Borrar Video Juego
        const deleteGame = document.createElement("button")
        deleteGame.classList.add('deleteGame');
        deleteGame.textContent = "Delete";
        deleteGame.addEventListener('click', deleteVideoGame);
        //deleteGame.appendChild(contenedor2);
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
        alert("El producto fue eliminado exitosamente 😊 ")
        //Actualizar el Local Storage
        localStorage.setItem('dataVideoGames', JSON.stringify(videoGamesData));
        //Mostrar los productos restantes
        showProducts()
    }
}



//Función para agregar al carrito
const addCarGameHandler = (e) => {
    //Evento del Botón
    const button = e.target;
    //Traer la card padre
    const item = button.parentElement;
    //Traer el nombre del video juego
    const nameGameData = item.querySelector('.nameGame').textContent.trim().toLowerCase();
    //Indice del elemento a añadir al carrio
    const elementGame = videoGamesData.find((game) => game.name.toLowerCase() === nameGameData);

    if (elementGame) {
        listshopping.push(elementGame)
        localStorage.setItem('shoppingGames', JSON.stringify(listshopping));
        createTable()
    } else {
        countElementCart()
    }
}

//Botón para la creación de un nuevo video juego
const createButton = document.getElementById("createnewGame")
createButton.addEventListener("click", e => {
    addNewProduct()
})


//Función para mostrar la compra
function createTable() {
    const gamesDataShop = JSON.parse(localStorage.getItem('shoppingGames'))
    const tableContainer = document.getElementById('table-container');

    tableContainer.style.display = "block";
    // Create a <table> element and a <thead> for the table header.
    // Create a <table> element if it doesn't already exist.
    let table = document.querySelector('#table-container > table');
    if (!table) {
        table = document.createElement('table');
        table.style.width = "1000px";
        tableContainer.appendChild(table);
    }


    // Check if the <thead> already exists, and create it if not.
    let thead = table.querySelector('thead');
    if (!thead) {
        thead = document.createElement('thead');
        table.appendChild(thead);

        // Create a row for the table header.
        const headerRow = document.createElement('tr');

        const headers = Object.keys(gamesDataShop[0]);
        const specificHeader = headers.splice(1, 4);
        specificHeader.push("Delete")

        specificHeader.forEach((item) => {
            const th = document.createElement('th');
            th.textContent = item.toUpperCase();
            headerRow.appendChild(th);
        });

        thead.appendChild(headerRow);
    }

    // Create a <tbody> for the table data.
    let tbody = table.querySelector('tbody');
    if (!tbody) {
        tbody = document.createElement('tbody');
        table.appendChild(tbody);
    }

    // Clear any existing rows in the tbody.
    tbody.innerHTML = '';

    // Loop through the data array to create rows and cells.
    gamesDataShop.forEach((item) => {
        const headers = Object.keys(gamesDataShop[0]);
        const specificHeader = headers.splice(1, 4);
        const row = document.createElement('tr');
        row.classList.add('GameShopping');
        for (const key in item) {
            if (specificHeader.includes(key)) {
                const cell = document.createElement('td');
                cell.classList.add(`${key}`);
                cell.textContent = item[key];
                row.appendChild(cell);
            }
        }
        const cellDelete = document.createElement('td');
        cellDelete.classList.add('deleteGameShop');
        cellDelete.innerHTML = `<button>Delete</button>`
        cellDelete.addEventListener('click', deleteVideoGameShop);
        row.appendChild(cellDelete);
        tbody.appendChild(row);
    });
}


const deleteVideoGameShop = (e) => {
    const gamesDataShop = JSON.parse(localStorage.getItem('shoppingGames'))
    //Evento del Botón
    const button = e.target;
    //Traer la card padre
    const item = button.parentElement.parentElement;
    console.log(item)
    //Traer el nombre del video juego
    const nameGameData = item.querySelector('.name').textContent.trim().toLowerCase();

    const resultadoIndex = gamesDataShop.findIndex((game) => game.name.toLowerCase() === nameGameData);
    if (resultadoIndex != -1) {
        //Borrar el video juego
        gamesDataShop.splice(resultadoIndex, 1);
        alert("El producto fue eliminado exitosamente 😊 ")
        //Actualizar el Local Storage
        localStorage.setItem('shoppingGames', JSON.stringify(gamesDataShop));
        //Mostrar los productos restantes
        createTable()
    }
}

//Función para iniciar elementos de la página 
const starShop = () => {
    //Agregamos los Video Juegos por defecto en el localStorage
    localStorage.setItem('dataVideoGames', JSON.stringify(videoGamesData));
    //Primero mostrar los productos
    showProducts()
}

//Esperemos que todos los elementos de la página cargen para ejecutar el script
if (document.readyState == 'loading') {
    document.addEventListener('DOMContentLoaded', starShop)
} else {
    starShop();
}
