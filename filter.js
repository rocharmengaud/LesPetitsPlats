class Api {
  constructor(url) {
    this.url = url;
  }

  // méthode asynchrone pour initialiser la recupération des données du json
  async get() {
    const httpResponse = await fetch(this.url);
    const httpData = await httpResponse.json();
    return httpData;
  }
}

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

// Object.entries(recipesAll).forEach(([clé, valeur]) => console.log(clé, valeur));
console.log(Object.values(recipesAll));

// recipesAll.forEach((element) => {});

class recipesData {
  constructor(data) {
    // Classe constructeur pour pouvoir utiliser les clés au sein du json
    this.data = data;
    // des qu'on crée un constructor, on utilisera this
  }

  parseJson() {
    console.log(this.data.name);
  }
}

function generalFilter(userInput) {
  // console.log(userInput, recipesAll);

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

class App {
  constructor() {
    this.fullData = new Api('data/recipes.json');
  }

  async main() {
    const json = await this.fullData.get();

    for (const data of json.recipes) {
      // json.recipes = json.la clé.dans le json (ici "recipes")
      const template = new recipesData(data);
      template.parseJson;
    }
  }
}

const app = new App();
app.main();
