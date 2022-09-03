export class Api {
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

export class recipeCard {
  constructor(card) {
    // Classe constructeur pour pouvoir utiliser les clés au sein du json
    this.card = card;
    // des qu'on crée un constructor, on utilisera this
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

export class App {
  constructor(recipesList) {
    this.fullData = new Api('data/recipes.json');
    this.recipesList = recipesList;
  }

  async main() {
    // Creation de 3 tableaux vides de maniere à enlever les doublons par la suite
    const ingredientList = [];
    const applianceList = [];
    const ustensilsList = [];

    for (const data of this.recipesList) {
      // json.recipes = json.la clé.dans le json (ici "recipes")
      // console.log('liste filtrée :' + this.recipesList);
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

    // retrait des doublons pour chaque liste
    document.querySelector('.ingredient-list').innerHTML = '';
    const uniqueIngredientList = Array.from(new Set(ingredientList));
    // console.log('ingredients uniques:' + uniqueIngredientList);
    uniqueIngredientList.forEach((element) => {
      const ingredientElement = document.createElement('div');
      ingredientElement.innerText = element;
      document.querySelector('.ingredient-list').appendChild(ingredientElement);
    });

    document.querySelector('.ustensils-list').innerHTML = '';
    const uniqueUstensilsList = Array.from(new Set(ustensilsList));
    // console.log('ustensiles uniques:' + uniqueUstensilsList);
    uniqueUstensilsList.forEach((element) => {
      const ustensilsElement = document.createElement('div');
      ustensilsElement.innerText = element;
      document.querySelector('.ustensils-list').appendChild(ustensilsElement);
    });

    document.querySelector('.appliance-list').innerHTML = '';
    const uniqueApplianceList = Array.from(new Set(applianceList));
    // console.log('appareils uniques:' + uniqueApplianceList);
    uniqueApplianceList.forEach((element) => {
      const applianceElement = document.createElement('div');
      applianceElement.innerText = element;
      document.querySelector('.appliance-list').appendChild(applianceElement);
    });
  }
}

const fullData = new Api('data/recipes.json');
const json = await fullData.get();

const app = new App(json.recipes);
app.main();
