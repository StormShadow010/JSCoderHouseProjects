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

//Función para mostrar productos acorde a un array
const showProducts = (data) => {
    //Contenedor donde se verán  los productos
    const mainProducts = document.querySelector(".products")

    for (const game of data) {
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

        //Agregar al contenedor que guarda los video juegos
        mainProducts.appendChild(card);
    }

}
//Primero mostrar los productos
showProducts(videoGamesData)

//Buscar productos por medio de un inpu
const searchProduct = document.getElementById("searchInput")

searchProduct.addEventListener('keyup', e => {
    e.target.matches('#searchInput') && (
        document.querySelectorAll('.card').forEach(game => {
            const titleGame = game.querySelector('.nameGame')
            titleGame.textContent.toLowerCase().includes(e.target.value.toLowerCase()) ? game.style.display = 'flex' : game.style.display = 'none'
        })
    )
})


//Agregar productos al carrito
document.querySelectorAll('.addCarGame').forEach(buttonGame => {
    buttonGame.addEventListener('click', e => {
        var button = e.target;
        var item = button.parentElement;
        console.log(item)
    })
})
