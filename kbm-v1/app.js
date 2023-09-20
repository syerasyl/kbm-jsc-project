const charactersList = document.getElementById('charactersList');
const searchBar = document.getElementById('searchBar');
let sotrudniki = [];

searchBar.addEventListener('keyup', (e) => {
    let searchString = e.target.value.toLowerCase();

    const filteredCharacters = sotrudniki.filter((character) => {
        return (
            character.name.toLowerCase().includes(searchString) || character.departament.toLowerCase().includes(searchString) || character.position.toLowerCase().includes(searchString)
        );
    });
    displayCharacters(filteredCharacters);
});



const loadCharacters = async () => {
    try {
        const res = await fetch('https://raw.githubusercontent.com/syerasyl/kbm-jsc-project/main/exceljson.json');
        sotrudniki = await res.json();
        displayCharacters(sotrudniki);
    } catch (err) {
        console.error(err);
    }
};

const displayCharacters = (characters) => {
    const htmlString = characters
        .map((character) => {
            return `
            <li class="character">
                <img src="${character.image}">
                <div class="div-1">
                <h3 style="color:blue">${character.position}</h3>
                <h3>${character.name}</h3>
                <p><b>${character.departament}</b></p> 
                <p>Офис: <i><b>${character.office}</i></b></p>
                <p>Вн. номер: <i><b>${character.phone}</b></i></p>
                <p>Вн. IP номер: <i><b>${character.phoneip}</b></i></p>
                <p>Мобильный: <i><b>${character.cellPhone}</i></b></p>
                <p>Почта: <a href="mailto:${character.email}">${character.email}</a></p>
                </div>
            </li>
        `;
        })
        .join('');
    charactersList.innerHTML = htmlString;
};

const blokFilter = (blokValue) => {
    const filteredCharacters2 = sotrudniki.filter((character) => {
        return character.blok.toLowerCase() === blokValue.toLowerCase();
    });
    displayCharacters(filteredCharacters2);
};

const showAll = () => {
    displayCharacters(sotrudniki);
};

loadCharacters();
