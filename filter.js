// utilisation de l'import des données du js
import { getData } from './data.js';
const recipesAll = await getData();

// import d'une classe provenant d'un autre fichier
import { App, recipeCard } from './cards.js';

const searchbarInput = document.querySelector('#search-recipe');
const ingredientInput = document.querySelector('#button-ingredients');
const applianceInput = document.querySelector('#button-appliance');
const ustensilsInput = document.querySelector('#button-ustensils');
const ingredientListElements = document.querySelectorAll('.ingredient-list div');
const applianceListElements = document.querySelectorAll('.appliance-list div');
const ustensilsListElements = document.querySelectorAll('.ustensils-list div');
const tagsContainer = document.querySelector('.tags-container');
const cardsGrid = document.querySelector('.cards-grid');

/* addeventlistener sur la barre de recherche générale */
searchbarInput.addEventListener('change', function (event) {
  generalFilter();
});

/* addeventlistener sur chacun des "tags" que l'utilisateur selectionne */
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
    // ingredientInput.value = '';

    // retrait du tag si la croix est cliquée et retour du tag au debut de la liste
    const tag = document.getElementById(tagId);
    closeTag.addEventListener('click', function (event) {
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

// tableau des ingredients sans doublons en lowercase
function arrayIngredients(recipe) {
  const ingredientsAll = new Set();

  for (let item of recipe.ingredients) {
    ingredientsAll.add(item.ingredient.toLowerCase());
  }

  return [...ingredientsAll];
}

// tri avec la recherche de l'utilisateur dans l'input du bouton
ingredientInput.oninput = (e) => {
  const inputValue = e.target.value;

  ingredientListElements.forEach((el) => {
    if (el.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
};

applianceInput.oninput = (e) => {
  const inputValue = e.target.value;

  applianceListElements.forEach((el) => {
    if (el.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
};

ustensilsInput.oninput = (e) => {
  const inputValue = e.target.value;

  ustensilsListElements.forEach((el) => {
    if (el.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
      el.style.display = 'block';
    } else {
      el.style.display = 'none';
    }
  });
};

function generalFilter() {
  const searchbarInput = document.querySelector('#search-recipe');
  const searchbarValue = searchbarInput.value;
  // array qui contiendra les recettes filtrées
  let recipesFiltered = [];
  // filtrage avec titre, liste des ingredients, et description de la recette
  // filtrage actif si 2 caractères ou plus ont été tapés par l'utilisateur
  if (searchbarValue.length > 2) {
    recipesFiltered = recipesAll.recipes.filter((recipe) => {
      // console.log(recipe.name, recipe.description);
      return (
        recipe.name.toLowerCase().includes(searchbarValue.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchbarValue.toLowerCase()) ||
        arrayIngredients(recipe).forEach((ingredient) => ingredient.toLowerCase().includes(searchbarValue.toLowerCase()))
      );
    });
    // il va falloir faire une boucle native avec i++ etc
  } else {
    recipesFiltered = recipesAll.recipes;
  }
  // console.log('Recipes filtered with search filter: ', recipesFiltered);

  // filtrage avec les tags sélectionnés par l'utilisateur
  let tagsSelected = Array.from(document.querySelectorAll('.tag'));

  tagsSelected.forEach((tag) => {
    // blue = ingredients | green = appliance | orange = ustensils
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
      new App(recipesFiltered).main();
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
          if (el2.toLowerCase() === tag.innerText.toLowerCase()) {
            ustensilsFiltered.push(el);
          }
        });
      });
      recipesFiltered = ustensilsFiltered;
    }
  });
  // il faut qu'il reste les tags en rapport avec les recettes une fois qu'un tag a été selectionné

  // console.log('Recipes filtered with tags: ', recipesFiltered);
  // on vide les cartes avec un innerHtml blanc
  cardsGrid.innerHTML = '';
  // pour ensuitele remplir avec les cartes filtrées
  recipesFiltered.forEach((data) => {
    const template = new recipeCard(data);
    template.createRecipeCard();
  });
}
