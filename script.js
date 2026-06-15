let tvShow = document.querySelector("#tvShow");
let searchBtn = document.querySelector("#searchBtn");
let loading = document.querySelector("#loading");
let error = document.querySelector("#error");

let showPoster = document.querySelector("#showPoster");
let showTitle = document.querySelector("#showTitle");
let showYear = document.querySelector("#showYear");
let showGenre = document.querySelector("#showGenre");
let showRating = document.querySelector("#showRating");
let showSummary = document.querySelector("#showSummary");

let showDetails = document.querySelector("#myDiv");


searchBtn.addEventListener("click", function () {

    let tvShowInput = tvShow.value;

    tvShow.value ="";


    if (tvShowInput.trim() === "") {
        clearShowDetails();
        error.textContent = "Invalid show name. Please try again.";
        return;
    } else {

        error.textContent = "";
        clearShowDetails();
    }

    const url = `https://api.tvmaze.com/search/shows?q=${tvShowInput}`;
    loading.textContent = "Loading...";


    clearShowDetails();

    fetch(url)
        .then(response => response.json())
        .then(data => {
            console.log(data);

            if (!data || data.length === 0) {
                // arr is null/undefined OR empty

                error.textContent = "show not found. Please try again.";
                loading.textContent = "";
                return;
            }

            loading.textContent = "";
            let poster = data[0].show.image.medium;

            let name = data[0].show.name;
            let premiered = data[0].show.premiered;
            let year = premiered.slice(0, 4);
            let genres = data[0].show.genres;
            let genreText = genres.join(', ');
            let rating = data[0].show.rating.average;
            let rawSummary = data[0].show.summary;
            let summary = rawSummary.replace(/<[^>]*>/g, '').trim();

            showDetails.style.display = "block";

            showPoster.src = poster;
            showPoster.alt = `${name} poster`;
            showTitle.textContent = `Name: ${name}`;
            showYear.textContent = `Year: ${year}`;
            showGenre.textContent = `Genre: ${genreText}`;
            showRating.textContent = `Rating: ${rating}`;
            showSummary.textContent = `Summary: ${summary}`;
        });




});

tvShow.addEventListener("keydown", function (event) {

    if (event.key === "Enter") {
        searchBtn.click();
    }

});


function clearShowDetails() {
    showPoster.src = "";
    showPoster.alt = "";
    showTitle.textContent = "";
    showYear.textContent = "";
    showGenre.textContent = "";
    showRating.textContent = "";
    showSummary.textContent = "";
}
 


// document.querySelector(".show-details").style.display = "block";
// showSummary.innerHTML = ...


// <!-- Search movie name
//       ↓
// Fetch movie data from API
//       ↓
// Show:
// - Movie Poster
// - Title
// - Year
// - Rating
// - Plot


// Search movie
// Show poster
// Show rating
// Show description

// API calls
// Cards
// Images from APIs
// Grid layouts
// Object handling
// Search functionality -->
