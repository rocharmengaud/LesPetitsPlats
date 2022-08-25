import { getData } from './data.js';
const recipesAll = await getData();

import { recipeCard } from './cards.js';

const searchbarInput = document.querySelector('#search-recipe');
const ingredientInput = document.querySelector('#button-ingredients');
const ingredientListElements = document.querySelectorAll('.ingredient-list div');
const applianceListElements = document.querySelectorAll('.appliance-list div');
const ustensilsListElements = document.querySelectorAll('.ustensils-list div');
const tagsContainer = document.querySelector('.tags-container');
const cardsGrid = document.querySelector('.cards-grid');

/* addeventlistener on the search input */
searchbarInput.addEventListener('change', function (event) {
  generalFilter();
});

/* addeventlistener on insert tag element */
Array.from(ingredientListElements).forEach(function (element) {
  const tagId = element.innerHTML;

  element.addEventListener('click', function (event) {
    const ingredientTag = document.createElement('button');
    ingredientTag.className = 'btn btn-primary tag blue';
    ingredientTag.setAttribute('id', element.innerHTML);
    const tagContent = document.createElement('div');
    tagContent.className = 'tag-content flex';
    const closeTag = document.createElement('img');
    closeTag.src = './assets/x-circle.svg';
    closeTag.className = 'close-tag';
    tagsContainer.appendChild(ingredientTag);
    ingredientTag.appendChild(tagContent);
    tagContent.appendChild(element);
    tagContent.appendChild(closeTag);
    generalFilter();

    closeTag.addEventListener('click', function (event) {
      const tag = document.getElementById(tagId);
      tag.remove();
      document.querySelector('.ingredient-list').prepend(element);
      generalFilter();
    });
  });
});

Array.from(applianceListElements).forEach(function (element) {
  const tagId = element.innerHTML;

  element.addEventListener('click', function (event) {
    const applianceTag = document.createElement('button');
    applianceTag.className = 'btn btn-primary tag green';
    applianceTag.setAttribute('id', element.innerHTML);
    const tagContent = document.createElement('div');
    tagContent.className = 'tag-content flex';
    const closeTag = document.createElement('img');
    closeTag.src = './assets/x-circle.svg';
    closeTag.className = 'close-tag';
    tagsContainer.appendChild(applianceTag);
    applianceTag.appendChild(tagContent);
    tagContent.appendChild(element);
    tagContent.appendChild(closeTag);
    generalFilter();

    closeTag.addEventListener('click', function (event) {
      const tag = document.getElementById(tagId);
      tag.remove();
      document.querySelector('.appliance-list').prepend(element);
      generalFilter();
    });
  });
});

Array.from(ustensilsListElements).forEach(function (element) {
  const tagId = element.innerHTML;

  element.addEventListener('click', function (event) {
    const ustensilsTag = document.createElement('button');
    ustensilsTag.className = 'btn btn-primary tag orange';
    ustensilsTag.setAttribute('id', element.innerHTML);
    const tagContent = document.createElement('div');
    tagContent.className = 'tag-content flex';
    const closeTag = document.createElement('img');
    closeTag.src = './assets/x-circle.svg';
    closeTag.className = 'close-tag';
    tagsContainer.appendChild(ustensilsTag);
    ustensilsTag.appendChild(tagContent);
    tagContent.appendChild(element);
    tagContent.appendChild(closeTag);
    generalFilter();

    closeTag.addEventListener('click', function (event) {
      const tag = document.getElementById(tagId);
      tag.remove();
      document.querySelector('.ustensils-list').prepend(element);
      generalFilter();
    });
  });
});

function arrayIngredients(recipe) {
  const ingredientsAll = new Set();

  for (let item of recipe.ingredients) {
    ingredientsAll.add(item.ingredient.toLowerCase());
  }

  return [...ingredientsAll];
}

ingredientInput.oninput = (e) => {
  const inputValue = e.target.value;

  ingredientListElements.forEach((el) => {
    console.log(el.innerText);
    if (el.innerText.toLowerCase().indexOf(inputValue.toLowerCase()) !== -1) {
      el.style.display = 'none';
    } else {
      el.style.display = 'block';
    }
  });
};

function generalFilter() {
  const searchbarInput = document.querySelector('#search-recipe');
  const searchbarValue = searchbarInput.value;
  let recipesFiltered = []; // array of recipes filtered by search terms

  /* filter recipes with search terms */
  if (searchbarValue.length > 2) {
    recipesFiltered = recipesAll.recipes.filter((recipe) => {
      // console.log(recipe.name, recipe.description);
      return (
        recipe.name.toLowerCase().includes(searchbarValue.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchbarValue.toLowerCase()) ||
        arrayIngredients(recipe).forEach((ingredient) => ingredient.toLowerCase().includes(searchbarValue.toLowerCase()))
      );
    });
  } else {
    recipesFiltered = recipesAll.recipes;
  }
  console.log('Recipes filtered with search filter: ', recipesFiltered);

  /* filter recipes with selected tags */
  let tagsSelected = Array.from(document.querySelectorAll('.tag'));

  tagsSelected.forEach((tag) => {
    // blue = ingredients | green = appliance | orange = ustensils
    if (tag.classList.contains('blue')) {
      let ingredientFiltered = [];

      recipesFiltered.forEach((el) => {
        el.ingredients.forEach((el2) => {
          if (el2.ingredient.toLowerCase() === tag.innerText.toLowerCase()) {
            ingredientFiltered.push(el);
            console.log(ingredientFiltered);
          }
        });
      });
      recipesFiltered = ingredientFiltered;
    }

    if (tag.classList.contains('green')) {
      let applianceFiltered = [];

      recipesFiltered.forEach((el) => {
        if (el.appliance.toLowerCase() === tag.innerText.toLowerCase()) {
          applianceFiltered.push(el);
        }
      });
      recipesFiltered = applianceFiltered;
    }

    if (tag.classList.contains('orange')) {
      let ustensilsFiltered = [];
      recipesFiltered.forEach((el) => {
        el.ustensils.forEach((el2) => {
          console.log(el2);
          if (el2.toLowerCase() === tag.innerText.toLowerCase()) {
            ustensilsFiltered.push(el);
          }
        });
      });
      recipesFiltered = ustensilsFiltered;
    }
  });

  console.log('Recipes filtered with tags: ', recipesFiltered);
  /* add recipes to the page */
  // addRecipesToPage(recipesFiltered);
  cardsGrid.innerHTML = '';

  recipesFiltered.forEach((data) => {
    const template = new recipeCard(data);
    template.createRecipeCard();
  });
}
