import { getData } from './data.js';
const recipesAll = await getData();

import { recipeCard } from './cards.js';

const searchbarInput = document.querySelector('#search-recipe');
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
      generalFilter();
    });

    ingredientTag.addEventListener('click', function (event) {});
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

    closeTag.addEventListener('click', function (event) {
      const tag = document.getElementById(tagId);
      tag.remove();
    });

    applianceTag.addEventListener('click', function (event) {});
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

    closeTag.addEventListener('click', function (event) {
      const tag = document.getElementById(tagId);
      tag.remove();
    });

    ustensilsTag.addEventListener('click', function (event) {});
  });
});

function collectIngredients(recipe) {
  const ingredientsAll = new Set();

  for (let item of recipe.ingredients) {
    ingredientsAll.add(item.ingredient.toLowerCase());
  }
  // console.log(ingredients);
  return [...ingredientsAll];
}

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
        collectIngredients(recipe).forEach((ingredient) => ingredient.toLowerCase().includes(searchbarValue.toLowerCase()))
      );
    });
  } else {
    recipesFiltered = recipesAll.recipes;
  }
  console.log('Recipes filtered with search filter: ', recipesFiltered);

  /* filter recipes with selected tags */
  let tagsSelected = Array.from(document.querySelectorAll('.tag'));
  console.log(tagsSelected);
  tagsSelected.forEach(function (tag) {
    // blue = ingredients | green = appareils | orange = ustensiles
    if (tag.classList.contains('blue')) {
      let ingredientFiltered = [];
      recipesFiltered.forEach((el) => {
        el.ingredients.forEach((el2) => {
          if (el2.ingredient.toLowerCase() === tag.innerText.toLowerCase()) {
            ingredientFiltered.push(el);
          }
        });
      });
      recipesFiltered = ingredientFiltered;
    }

    if (tag.classList.contains('green')) {
      recipesFiltered.filter(function (recipe) {
        return recipe.appliance.includes(tag.innerText);
      });
    }

    if (tag.classList.contains('orange')) {
      recipesFiltered.filter(function (recipe) {
        return recipe.ustenstils.includes(tag.innerText);
      });
    }
  });

  console.log('Recipes filtered with tags: ', recipesFiltered);

  /* add recipes to the page */
  // addRecipesToPage(recipesFiltered);
  cardsGrid.innerHTML = '';

  recipesFiltered.forEach((data) => {
    const template = new recipeCard(data);
    template.createRecipeCard();
    // boucle pour importer les données dans le button
    template.createIngredientList(data);
    template.createApplianceList(data);
    template.createUstensilsList(data);
  });
}

const filter = generalFilter();
console.log(filter);
