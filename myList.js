
let myList= []

 let listFromLocalStorage = JSON.parse(localStorage.getItem("myList") )
 
 document.addEventListener("click", function(e){
    if (e.target.dataset.movie){
    removeFromList(e.target.dataset.movie)
    
                }
})

function removeFromList(movieId){
    const newList = listFromLocalStorage.filter(function(movie){
         return !(movie.uuid === movieId)
    })
    localStorage.clear()
    localStorage.setItem("myList", JSON.stringify(newList))
    renderMyList()
    }


function renderMyList(){
    listFromLocalStorage = JSON.parse(localStorage.getItem("myList") )
    if (listFromLocalStorage.length > 0){
    const myListHtml = listFromLocalStorage.map(function(item){
    return `<div class="movie-card" id="movie-card">
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
                     <button class="remove-btn" data-movie="${item.uuid}">remove</button>
                  </div>
                  <div class="movie-info">
                      <h5>${item.Runtime}</h5>
                      <h5>${item.Genre}</h5>
                     <h5>${item.Actors}</h5>
                  </div>
                    <p>${item.Plot}</p>
                </div>
            </div>`
   }) .join("")
            
            document.getElementById("mylist").innerHTML = myListHtml
            } 
            
}


renderMyList()