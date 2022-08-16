import { getData } from './data.js';
const recipesAll = await getData();

const searchbarInput = document.querySelector('#search-recipe');
const searchbarValue = searchbarInput.value;
const ingredientListElements = document.querySelectorAll('.ingredient-list div');
const applianceListElements = document.querySelectorAll('.appliance-list div');
const ustensilsListElements = document.querySelectorAll('.ustensils-list div');
const tagsContainer = document.querySelector('.tags-container');

/* addeventlistener on the search input */
searchbarInput.addEventListener('change', function (event) {
  generalFilter(event.target.value);
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

    closeTag.addEventListener('click', function (event) {
      const tag = document.getElementById(tagId);
      tag.remove();
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

    closeTag.addEventListener('click', function (event) {
      const tag = document.getElementById(tagId);
      tag.remove();
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

    closeTag.addEventListener('click', function (event) {
      const tag = document.getElementById(tagId);
      tag.remove();
    });
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

function generalFilter(userInput) {
  let recipesFiltered = []; // array of recipes filtered by search terms

  /* filter recipes with search terms */
  if (userInput.length > 2) {
    recipesFiltered = recipesAll.recipes.filter((recipe) => {
      // console.log(recipe.name, recipe.description);
      return (
        recipe.name.toLowerCase().includes(userInput.toLowerCase()) ||
        recipe.description.toLowerCase().includes(userInput.toLowerCase()) ||
        collectIngredients(recipe).forEach((ingredient) => ingredient.toLowerCase().includes(userInput.toLowerCase()))
      );
    });
  } else {
    recipesFiltered = recipesAll.recipes;
  }
  console.log('Recipes filtered with search filter: ', recipesFiltered);
}

const filter = generalFilter(searchbarValue);
console.log(filter);
