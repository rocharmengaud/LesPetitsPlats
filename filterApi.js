// Méthode pour importer des données d'un autre fichier .js
import { getData } from './data.js';
const recipesAll = await getData();

const searchbarInput = document.querySelector('#search-recipe');
const tagsContainer = document.querySelector('.tags-container');
const buttonIngredients = document.querySelector('#button-ingredients');
const buttonAppliance = document.querySelector('#button-appliance');
const buttonUstensils = document.querySelector('#button-ustensils');
const cardsGrid = document.querySelector('.cards-grid');

// Création d'une classe pour pouvoir créer les cartes des recettes
export class recipeCard {
  constructor(card) {
    // Classe constructeur pour pouvoir utiliser les clés au sein du json
    this.card = card;
  }
  // Importation de chacune des recettes sous forme de carte
  createRecipeCard() {
    const cardGrid = document.querySelector('.cards-grid');

    const card = document.createElement('div');
    card.className = 'card';
    const cardPicture = document.createElement('img');
    cardPicture.className = 'card-picture';

    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';

    const cardRecipe = document.createElement('div');
    cardRecipe.classList.add('card-recipe', 'flex');

    const cardTitle = document.createElement('div');
    cardTitle.className = 'card-title';
    cardTitle.innerHTML = this.card.name;

    const cardTiming = document.createElement('div');
    cardTiming.className = 'card-timing';
    cardTiming.innerHTML = '<img id="clock" src="assets/clock.svg" alt="Clock" /> ' + this.card.time + ' min';

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info', 'flex');

    const cardIngredients = document.createElement('div');
    cardIngredients.className = 'card-ingredients';
    this.card.ingredients.forEach((Element) => {
      cardIngredients.innerHTML += '<strong>' + Element.ingredient + ':</strong> ' + Element.quantity + Element.unit + '<br/>';
    });

    const cardDescription = document.createElement('div');
    cardDescription.className = 'card-description';
    let description = '';
    if (this.card.description.length >= 170) {
      // slice permet de reduire le texte au nombre de caracteres souhaité
      description = this.card.description.slice(0, 170) + '...';
    } else {
      description = this.card.description;
    }
    cardDescription.innerHTML = description;

    cardGrid.appendChild(card);
    card.appendChild(cardPicture);
    card.appendChild(cardBody);
    cardBody.appendChild(cardRecipe);
    cardRecipe.appendChild(cardTitle);
    cardRecipe.appendChild(cardTiming);
    cardBody.appendChild(cardInfo);
    cardInfo.appendChild(cardIngredients);
    cardInfo.appendChild(cardDescription);
  }
}

function main(recipesFiltered) {
  // Creation de 3 tableaux vides de maniere à pouvoir enlever les doublons par la suite
  const ingredientList = [];
  const applianceList = [];
  const ustensilsList = [];

  // Creation d'une boucle pour pouvoir créer chacune des cartes de recettes
  // mais également importer chacune des listes (ingrédients/appareils/ustensiles)
  for (const data of recipesFiltered) {
    const template = new recipeCard(data);
    template.createRecipeCard();

    // Importation des listes
    data.ingredients.forEach((ingredient) => {
      ingredientList.push(ingredient.ingredient);
    });

    data.ustensils.forEach((ustensils) => {
      ustensilsList.push(ustensils);
    });

    applianceList.push(data.appliance);
  }

  // On vide la liste de manière à pouvoir importer les listes actualisées avec le filtrage
  document.querySelector('.ingredient-list').innerHTML = '';
  // Méthode de retrait des doublons pour chaque liste
  const uniqueIngredientList = Array.from(new Set(ingredientList));
  uniqueIngredientList.forEach((element) => {
    const ingredientElement = document.createElement('div');
    ingredientElement.innerText = element;
    document.querySelector('.ingredient-list').appendChild(ingredientElement);
  });
  const newIngredientList = document.querySelectorAll('.ingredient-list div');
  ingredientsListener(newIngredientList);

  document.querySelector('.ustensils-list').innerHTML = '';
  const uniqueUstensilsList = Array.from(new Set(ustensilsList));
  uniqueUstensilsList.forEach((element) => {
    const ustensilsElement = document.createElement('div');
    ustensilsElement.innerText = element;
    document.querySelector('.ustensils-list').appendChild(ustensilsElement);
  });
  const newUstensilstList = document.querySelectorAll('.ustensils-list div');
  ustensilsListener(newUstensilstList);

  document.querySelector('.appliance-list').innerHTML = '';
  const uniqueApplianceList = Array.from(new Set(applianceList));
  uniqueApplianceList.forEach((element) => {
    const applianceElement = document.createElement('div');
    applianceElement.innerText = element;
    document.querySelector('.appliance-list').appendChild(applianceElement);
  });
  const newApplianceList = document.querySelectorAll('.appliance-list div');
  applianceListener(newApplianceList);

  // Utilisation du .oninput pour filtrer en temps réel avec l'user input
  const ingredientInput = document.querySelector('#button-ingredients');
  ingredientInput.oninput = (e) => {
    const inputValue = e.target.value;

    newIngredientList.forEach((el) => {
      if (el.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  };

  const applianceInput = document.querySelector('#button-appliance');
  applianceInput.oninput = (e) => {
    const inputValue = e.target.value;

    newApplianceList.forEach((el) => {
      if (el.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  };

  const ustensilsInput = document.querySelector('#button-ustensils');
  ustensilsInput.oninput = (e) => {
    const inputValue = e.target.value;

    newUstensilstList.forEach((el) => {
      if (el.innerText.toLowerCase().includes(inputValue.toLowerCase())) {
        el.style.display = 'block';
      } else {
        el.style.display = 'none';
      }
    });
  };

  /* addeventlistener sur la barre de recherche générale */
  searchbarInput.addEventListener('change', function (event) {
    generalFilter(recipesFiltered);
  });
}

// Appel de la fonction main pour la 1ere fois avec l'intégralité des recettes
main(recipesAll.recipes);

// Creation des tags, de leur suppression et de l'actualisation du filtrage
function ingredientsListener(list) {
  Array.from(list).forEach(function (element) {
    const tagText = element.innerHTML;

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
      buttonIngredients.value = 'Ingrédients';

      generalFilter();

      // retrait du tag si la croix est cliquée et retour du tag au debut de la liste
      const tag = document.getElementById(tagText);
      closeTag.addEventListener('click', function (event) {
        tag.remove();
        // on ré-ajoute la liste complete aprés avoir supprimé le(s) tag(s)
        main(recipesAll.recipes);
        generalFilter();
      });
    });
  });
}
function applianceListener(list) {
  Array.from(list).forEach(function (element) {
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
      buttonAppliance.value = 'Appareils';
      generalFilter();

      closeTag.addEventListener('click', function (event) {
        const tag = document.getElementById(tagId);
        tag.remove();
        main(recipesAll.recipes);
        generalFilter();
      });
    });
  });
}

function ustensilsListener(list) {
  Array.from(list).forEach(function (element) {
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
      buttonUstensils.value = 'Ustensiles';
      generalFilter();

      closeTag.addEventListener('click', function (event) {
        const tag = document.getElementById(tagId);
        tag.remove();
        main(recipesAll.recipes);
        generalFilter();
      });
    });
  });
}

// Tableau complet des ingredients sans doublons en lowercase utilisé pour le filtrage général
function arrayIngredients(recipe) {
  const ingredientsAll = new Set();

  for (let item of recipe.ingredients) {
    ingredientsAll.add(item.ingredient.toLowerCase());
  }

  return [...ingredientsAll];
}

function generalFilter() {
  const searchbarInput = document.querySelector('#search-recipe');
  const searchbarValue = searchbarInput.value;
  // Array qui contiendra les recettes filtrées
  let recipesFiltered = [];
  // Filtrage avec titre, liste des ingredients, et description de la recette
  // Filtrage actif si 2 caractères ou plus ont été tapés par l'utilisateur
  if (searchbarValue.length > 2) {
    recipesFiltered = recipesAll.recipes.filter(function (recipe) {
      return (
        recipe.name.toLowerCase().includes(searchbarValue.toLowerCase()) ||
        recipe.description.toLowerCase().includes(searchbarValue.toLowerCase()) ||
        arrayIngredients(recipe).forEach((ingredient) => ingredient.toLowerCase().includes(searchbarValue.toLowerCase()))
      );
    });
    main(recipesFiltered);
    // On reset le placeholder si l'utilisateur a tapé plus de 2 caractères
    searchbarInput.placeholder = 'Rechercher une recette';
  } else {
    recipesFiltered = recipesAll.recipes;
    main(recipesFiltered);
  }

  // Filtrage avec les tags sélectionnés par l'utilisateur
  let tagsSelected = Array.from(document.querySelectorAll('.tag'));

  // blue = ingredients | green = appliance | orange = ustensils
  tagsSelected.forEach((tag) => {
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
      main(recipesFiltered);
    }

    if (tag.classList.contains('green')) {
      let applianceFiltered = [];

      recipesFiltered.forEach((el) => {
        if (el.appliance.toLowerCase() === tag.innerText.toLowerCase()) {
          applianceFiltered.push(el);
        }
      });
      recipesFiltered = applianceFiltered;
      main(recipesFiltered);
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
      main(recipesFiltered);
    }
  });

  // on vide les cartes avec un innerHtml blanc
  cardsGrid.innerHTML = '';
  // pour ensuitele remplir avec les cartes filtrées
  recipesFiltered.forEach((data) => {
    const template = new recipeCard(data);
    template.createRecipeCard();
  });
}

//Fonction pour avertir l'utilisateur qu'il doit taper au moins 3 caractères
function showAlert() {
  const searchbarInput = document.querySelector('#search-recipe');
  const searchbarValue = searchbarInput.value;
  if (searchbarValue.length <= 2) {
    searchbarInput.placeholder = 'Veuillez au moins taper 3 caractères';
  }
  return;
}

// On applique la fonction sur le bouton de recherche
const submitButton = document.querySelector('.submit-button');
submitButton.addEventListener('click', (event) => {
  showAlert();
});
// mais aussi quand on appuie sur entrée
document.body.addEventListener('keydown', function (event) {
  if (event.key === 'Enter') {
    showAlert();
  }
});
