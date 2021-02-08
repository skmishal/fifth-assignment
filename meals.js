// Search bar
const inputMeal = document.getElementById('input-meal');
const searchButton = document.getElementById('search-button');
searchButton.addEventListener('click', function () {
    document.getElementById("meal-list").innerHTML = "";
    document.getElementById('alert').style.display = 'none';
    getMeal(inputMeal);
})

// Show meal items
const getMeal = inputMeal => {
    const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${inputMeal.value}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            for (let i = 0; i < data.meals.length; i++) {
                const meals = data.meals[i];
                const mealListDiv = document.getElementById('meal-list');
                const meal = `
                    <div onClick = "displayMealDetails('${meals.idMeal}')">
                        <img class="img-fluid" src="${meals.strMealThumb}" alt=""><br>
                        <h4 class='text-center'>${meals.strMeal}</h4>
                    </div>
                `
                const div = document.createElement('div');
                div.className = 'col-md-3 mealDiv text-center';
                div.innerHTML = meal;
                mealListDiv.appendChild(div);
            }
        })
        .catch(undefined => {
            alert("Ops! Couldn't find what you're looking for.")
            document.getElementById('alert').style.display = 'block';

        })
}

// Show meal ingredients
const displayMealDetails = mealId => {
    document.getElementById("meal-details").innerHTML = "";
    const ingredients = document.getElementById('ingredients');
    ingredients.style.display = 'block';
    const mealSection = document.getElementById('meal-section');
    mealSection.style.display = 'none';
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    fetch(url)
        .then(res => res.json())
        .then(data => {
            console.log(data.meals[0]);
            const mealDetails = document.getElementById('meal-details');
            mealDetails.innerHTML = `
                <img class="img-fluid rounded mx-auto d-block" style="width:400px;" src="${data.meals[0].strMealThumb}" alt="images">
                <h2 class="fw-bold md-1">${data.meals[0].strMeal}</h2><br>
                <h4>Ingredients</h4>
                <ul>
                    <li>${data.meals[0].strIngredient1}</li>
                    <li>${data.meals[0].strIngredient2}</li>
                    <li>${data.meals[0].strIngredient3}</li>
                    <li>${data.meals[0].strIngredient4}</li>
                    <li>${data.meals[0].strIngredient5}</li>
                    <li>${data.meals[0].strIngredient6}</li>
                </ul>   
            `
        })
}