import { getData } from './data.js';
const recipesAll = await getData();

const searchbarInput = document.querySelector('#search-recipe');
const searchbarValue = searchbarInput.value;
const ingredientListElements = document.querySelectorAll('.ingredient-list div');
const applianceListElements = document.querySelectorAll('.appliance-list div');
const ustensilsListElements = document.querySelectorAll('.ustensils-list div');

/* addeventlistener on the search input */
searchbarInput.addEventListener('change', function (event) {
  generalFilter(event.target.value);
});

/* addeventlistener on insert tag element */
Array.from(ingredientListElements).forEach(function (element) {
  element.addEventListener('click', function (event) {
    console.log(element);
  });
});

Array.from(applianceListElements).forEach(function (element) {
  element.addEventListener('click', function (event) {
    console.log(element);
  });
});

Array.from(ustensilsListElements).forEach(function (element) {
  element.addEventListener('click', function (event) {
    console.log(element);
  });
});

/* addeventlistener on delete tag element */
// Array.from(document.querySelectorAll('.tag-selected')).forEach(function (element) {
//   element.addEventListener('click', function (event) {
//     console.log(element);
//   });
// });

function generalFilter(userInput) {
  console.log(userInput, recipesAll);

  let recipesFiltered = []; // array of recipes filtered by search terms

  /* filter recipes with search terms */
  if (userInput.length > 2) {
    recipesFiltered = recipesAll.filter(function (recipe) {
      return (
        recipe.title.toLowerCase().includes(userInput.toLowerCase()) ||
        recipe.description.toLowerCase().includes(userInput.toLowerCase()) ||
        recipe.ingredients.some(function (ingredient) {
          ingredient.toLowerCase().includes(userInput.toLowerCase());
        })
      );
    });
  } else {
    recipesFiltered = recipesAll;
  }
}

generalFilter(searchbarValue);
