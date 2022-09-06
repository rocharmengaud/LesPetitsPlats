import { getData } from './data.js';
const recipesAll = await getData();
let tagIngredients = [
  {
    ingredient: 'Lait de coco',
    quantity: 400,
    unit: 'ml',
  },
];
const tagsContainer = document.querySelector('.tags-container');

function getIngredients(recipes) {
  let ingredients = [];

  for (const recipe of recipes) {
    for (const ingredient of recipe.ingredients) {
      if (!Boolean(ingredients.find((i) => i.ingredient === ingredient.ingredient))) {
        ingredients.push(ingredient);
      }
    }
  }
  return ingredients;
}

function removeTagIngredient(ingredient) {
  tagIngredients = tagIngredients.filter((tagIngredient) => ingredient.ingredient !== tagIngredient.ingredient);
}

function refreshTagIngredientsElement(ingredients) {
  tagsContainer.innerHTML = '';
  for (const tagIngredient of ingredients) {
    const ingredientTag = document.createElement('button');
    ingredientTag.className = 'btn btn-primary tag blue';
    const tagContent = document.createElement('div');
    tagContent.className = 'tag-content flex';
    const closeTag = document.createElement('img');
    closeTag.src = './assets/x-circle.svg';
    closeTag.className = 'close-tag';
    tagsContainer.appendChild(ingredientTag);
    ingredientTag.appendChild(tagContent);
    tagContent.append(tagIngredient.ingredient);
    tagContent.appendChild(closeTag);

    closeTag.addEventListener('click', (event) => {
      removeTagIngredient(tagIngredient);
      // Cette fonction supprime l'element car il n'existe plus quand on repasse dans le for (const tagIngredient of ingredients)
      refreshTagIngredientsElement(tagIngredients);
    });
  }
}

const ingredients = getIngredients(recipesAll.recipes);
const ingredientListElements = document.querySelectorAll('.ingredient-list div');
const applianceListElements = document.querySelectorAll('.appliance-list div');
const ustensilsListElements = document.querySelectorAll('.ustensils-list div');
console.log(ingredientListElements);

Array.from(ingredientListElements).forEach(function (element) {
  element.addEventListener('click', function (event) {
    // tagIngredients = [???]
    refreshTagIngredientsElement(tagIngredients);
  });
});
