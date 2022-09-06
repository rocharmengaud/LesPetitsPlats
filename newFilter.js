import { getData } from './data.js';
const recipesAll = await getData();

function getIngredients(recipes) {
  let ingredients = [];

  for (const recipe of recipesAll.recipes) {
    for (const ingredient of recipe.ingredients) {
      // console.log(recipe.ingredients);
      // console.log(ingredient.name);
      if (!Boolean(ingredients.find((i) => i.name === ingredient.name))) {
        ingredients.push(ingredient);
      }
    }
    return ingredients;
  }
}

const ingredients = getIngredients(recipesAll);
console.log(ingredients);

let targetIngredients = [];

let searchValue = '';
const searchbarInput = document.querySelector('#search-recipe');
const searchButton = document.querySelector('#icon');
const targetIngredientList = document.querySelector('.tags-container');
const ingredientList = document.querySelectorAll('.ingredient-list');
const tagsContainer = document.querySelector('.tags-container');

function init() {
  for (const ingredient of ingredients) {
    addIngredient(ingredient);
  }
}

function addIngredient(ingredient) {
  const ingredientButton = document.createElement('button');
  ingredientButton.append(ingredient.name);
  ingredientButton.addEventListener('click', (e) => {
    addTargetIngredient(ingredient);
  });
  ingredientList.append(ingredientButton);
}

function addTargetIngredient(ingredient) {
  if (targetIngredients.includes(ingredient)) return;

  const span = document.createElement('span');
  const closeButton = document.createElement('button');
  closeButton.append('x');
  closeButton.addEventListener('click', (e) => {
    removeTargetIngredient(ingredient);
    addIngredient(ingredient);
  });

  span.append(ingredient.name);
  span.appendChild(closeButton);
  targetIngredientList.append(span);
  targetIngredients.push(ingredient);

  for (const button of ingredientList.childNodes) {
    const text = button.firstChild.data;
    if (text === ingredient.name) {
      button.remove();
    }
  }
}

function removeTargetIngredient(ingredient) {
  for (const span of targetIngredientList.childNodes) {
    const text = span.firstChild.data;
    if (text === ingredient.name) {
      span.remove();
    }
  }
  targetIngredients = targetIngredients.filter((tIngredient) => ingredient !== tIngredient);
}

init();

searchButton.addEventListener('click', (e) => {
  searchValue = searchbarInput.value;
  console.log(searchbarInput.value);
});
