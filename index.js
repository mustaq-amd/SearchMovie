

function searchMovie() {
    var searchMovie = document.getElementById("search").value;
    console.log(searchMovie);
    let url = "https://www.omdbapi.com/?apikey=cb354965&s=" + searchMovie;
    let streamData = fetch(url);
    streamData.then(function (res) {
        return res.json();

    })
        .then(function (res) {
            console.log("res:", res)
            console.log("response:", res["Response"])
            if (res["Response"] == true || res["Response"] == "True") {
                let searchArr = res["Search"];
                displaySearchMovies(searchArr)

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
