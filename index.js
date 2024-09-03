import { v4 as uuidv4 } from 'https://jspm.dev/uuid'

let myList = [];
let titlesArray = [];
const form = document.getElementById("form");

async function getMovies(search) {
    // Clear the titlesArray for a new search
    titlesArray = [];

    const res = await fetch(`https://www.omdbapi.com/?apikey=32190502&s=${search}`);
    const data = await res.json();
    searchIds(data.Search);
}

async function getTitles(imdbID) {
    const res = await fetch(`https://www.omdbapi.com/?apikey=32190502&i=${imdbID}`);
    const data = await res.json();
    data.uuid = uuidv4();
    titlesArray.push(data);
    renderList(titlesArray);
}

function searchIds(searchResults) {
    const movieArray = searchResults.filter(listItem => listItem.Type === "movie");
    movieArray.forEach(movie => {
        getTitles(movie.imdbID);
    });
}

if (form) {
    form.addEventListener("submit", function(e) {
        e.preventDefault();
        const query = document.getElementById("query").value;
        getMovies(query);
        form.reset();
    });
}

document.addEventListener("click", function(e) {
    if (e.target.dataset.movie) {
        addToList(e.target.dataset.movie);
    }
});

function addToList(movieId) {
    const addedMovie = titlesArray.find(movie => movie.uuid === movieId);
    myList = JSON.parse(localStorage.getItem("myList")) || [];
    myList.push(addedMovie);
    localStorage.setItem("myList", JSON.stringify(myList));
}

function renderList(list) {
    
    const listHtml = list.map(item => `
        <div class="movie-card">
            <img src="${item.Poster}" class="movie-poster">
            <div>
                <div class="title">  
                    <div class="tile-rating">
                        <h2>${item.Title}</h2>
                        <div class="rating">
                            <img src="images/star.png">
                            <p>${item.imdbRating}</p> 
                        </div> 
                    </div>
                    <button class="mylist-btn" data-movie="${item.uuid}">my list</button>
                </div>
                <div class="movie-info">
                    <h5>${item.Runtime}</h5>
                    <h5>${item.Year}</h5>
                    <h5>${item.Genre}</h5>
                    <h5>${item.Actors}</h5>
                </div>
                <p>${item.Plot}</p>
            </div>
        </div>`).join("");
    
    document.getElementById("query-results").innerHTML = listHtml;
}
