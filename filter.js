import { getData } from './data.js';
const recipesAll = await getData();

const searchbarInput = document.querySelector('#search-recipe');
const searchbarValue = searchbarInput.value;
const ingredientListElements = document.querySelectorAll('.ingredient-list div');
const applianceListElements = document.querySelectorAll('.appliance-list div');
const ustensilsListElements = document.querySelectorAll('.ustensils-list div');
const tagsContainer = document.querySelector('.tags-container');
const tag = document.querySelectorAll('.tag');

/* addeventlistener on the search input */
searchbarInput.addEventListener('change', function (event) {
  generalFilter(event.target.value);
});

/* addeventlistener on insert tag element */
Array.from(ingredientListElements).forEach(function (element) {
  element.addEventListener('click', function (event) {
    const ingredientTag = document.createElement('button');
    ingredientTag.className = 'btn btn-primary tag blue';
    const tagContent = document.createElement('div');
    tagContent.className = 'tag-content flex';
    const closeTag = document.createElement('img');
    closeTag.src = './assets/x-circle.svg';
    closeTag.className = 'close-tag';
    tagsContainer.appendChild(ingredientTag);
    ingredientTag.appendChild(tagContent);
    tagContent.appendChild(element);
    tagContent.appendChild(closeTag);
  });
});

Array.from(applianceListElements).forEach(function (element) {
  element.addEventListener('click', function (event) {
    const applianceTag = document.createElement('button');
    applianceTag.className = 'btn btn-primary tag green';
    const tagContent = document.createElement('div');
    tagContent.className = 'tag-content flex';
    const closeTag = document.createElement('img');
    closeTag.src = './assets/x-circle.svg';
    closeTag.className = 'close-tag';
    tagsContainer.appendChild(applianceTag);
    applianceTag.appendChild(tagContent);
    tagContent.appendChild(element);
    tagContent.appendChild(closeTag);
  });
});

Array.from(ustensilsListElements).forEach(function (element) {
  element.addEventListener('click', function (event) {
    const ustensilsTag = document.createElement('button');
    ustensilsTag.className = 'btn btn-primary tag orange';
    const tagContent = document.createElement('div');
    tagContent.className = 'tag-content flex';
    const closeTag = document.createElement('img');
    closeTag.src = './assets/x-circle.svg';
    closeTag.className = 'close-tag';
    tagsContainer.appendChild(ustensilsTag);
    ustensilsTag.appendChild(tagContent);
    tagContent.appendChild(element);
    tagContent.appendChild(closeTag);
  });
});

/* addeventlistener to delete tag element */
Array.from(tag).forEach(function (element) {
  element.addEventListener('click', function (event) {
    console.log('test');
  });
});

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
