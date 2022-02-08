

function searchMovieMain() {
    let movies_div=document.getElementById("moviesListSearched");
    movies_div.innerHTML=""
    movies_div.style.display="none";
    console.log("coming here after enter")
    document.querySelector("body").style.backgroundImage = "none";
    var searchMovie = document.getElementById("search").value;
    console.log(searchMovie);
    let url = "https://www.omdbapi.com/?apikey=cb354965&s=" + searchMovie + "&type=movie";

    let streamData = fetch(url);
    streamData.then(function (res) {
        return res.json();

    })
        .then(function (res) {
            console.log("res:", res)
            console.log("response:", res["Response"])
            if (res["Response"] == true || res["Response"] == "True") {
                let searchArr = res["Search"];
                console.log(searchArr);
                displaySearchMovies(searchArr);

            }
            else {
                displayError();
                console.log("No Movie found")
            }


        })
    streamData.catch(function (err) {
        console.log("err", err);
    })




}

function displaySearchMovies(searchArr) {
    document.getElementById("search").value=null;
    let movies_div=document.getElementById("moviesListSearched");
    movies_div.innerHTML=""
    movies_div.style.display="none";
    document.querySelector("body").style.backgroundImage = "none";
    document.getElementById("container").innerHTML = "";
    document.getElementById("error_container").innerHTML = "";
    console.log(searchArr);
    searchArr.map(function (item, index) {
        let div = document.createElement("div");
        div.className = "box";
        let image = document.createElement("img");
        image.setAttribute("src", item.Poster);
        // console.log(image["src"].substring(image["src"].length - 4).trim() == "/N/A");
        // console.log(image["src"].substring(image["src"].length - 4));
        if (image["src"].substring(image["src"].length - 4).trim() == "/N/A") {
            image.setAttribute("src", "https://th.bing.com/th/id/OIP.kbFiBtYMeaTO_XB2luvZGwAAAA?w=176&h=132&c=7&r=0&o=5&dpr=1.5&pid=1.7");
        }

        let details = document.createElement("div");
        details.className = "movie_details";
        let movieName = document.createElement("p");
        movieName.textContent = item.Title;
        let releaseDate = document.createElement("p");
        releaseDate.textContent = item.Year;
        let rating = document.createElement("p");
        let ratingValue = (Math.random() * (10 - 5) + 5).toFixed(1);
        rating.textContent = ratingValue + "★";
        let recommend = document.createElement("div");
        recommend.className = "recommended";
        let icon_like = document.createElement("i");
        icon_like.setAttribute("class", "far fa-thumbs-up");
        let liked = document.createElement("p");
        liked.textContent = "Most Liked";
        recommend.append(icon_like, liked);
        if (ratingValue > 8.5) {
            details.append(movieName, releaseDate, rating, recommend);
        }
        else {
            details.append(movieName, releaseDate, rating);
        }

        div.append(image, details);
        document.getElementById("container").append(div);

    })

}

function displayError() {
    let movies_div=document.getElementById("moviesListSearched");
    movies_div.innerHTML=null;
    movies_div.style.display="none";
    document.getElementById("error_container").innerHTML = "";
    document.getElementById("container").innerHTML = "";
    let div = document.createElement("div");
    div.className = "error_box";
    let image = document.createElement("img");
    image.setAttribute("src", "https://www.hotstar.com/assets/034501045372cd256031ea4bc0e78d23.svg");
    let info1 = document.createElement("h3");
    info1.textContent = "Nothing Found!";
    let info2 = document.createElement("p");
    info2.textContent = "Try Searching for something else";
    div.append(image, info1, info2)
    document.getElementById("error_container").append(div);

}


 async function main(){
    let data=await searchMovie();

    if(data === undefined){
        let movies_div=document.getElementById("moviesListSearched");
        movies_div.style.display="none";
        return false;
    }
    appendData(data);
}

async function searchMovie(){

    try {
        let movieName=document.getElementById("search").value;

    let url= `https://www.omdbapi.com/?apikey=cb354965&s=${movieName}`;
    let res=await fetch(url);
    let data= await res.json();
        
    return data.Search;
    
        
    } catch (error) {
        console.log(error)
        
    }
    
}

function appendData(movies){
    console.log("movies: ",movies)
    document.getElementById("moviesListSearched").innerHTML=null;

    movies.map(function (item,index){
        console.log(item);
        let movies_div=document.getElementById("moviesListSearched");

        let box=document.createElement("div");
        let image=document.createElement("img");
        image.id="searchImage"
        image.setAttribute("src", item.Poster);
        let mname=document.createElement("p");
        mname.innerText=item.Title;
        box.append(image,mname);
        box.addEventListener('click',function(e){
            e.preventDefault();
            displaySearchMovies([item]);
            
            
            })
       movies_div.append(box);
       movies_div.style.display="block";
       
    })

}

//  "a" --> oninput --> debounce() --> main("a") --> setTimeout(main,1000)
//  "av" --> oninput --> debounce() --> main("av") --> setTimeout(main,1000)
let timerId;
// debounce
function debounce(func,delay){

    if(timerId){
        clearTimeout(timerId);
    }

    timerId=setTimeout(function(){
        func()
    },delay)
}
