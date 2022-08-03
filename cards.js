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

class recipeCard {
  constructor(card) {
    // Classe constructeur pour pouvoir utiliser les clés au sein du json
    this.card = card;
    // des qu'on crée un constructor, on utilisera this
  }

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
    cardTiming.innerHTML = '<img id="clock" src="assets/clock.svg" alt="Clock" /> ' + this.card.time + ' minutes';

    const cardInfo = document.createElement('div');
    cardInfo.classList.add('card-info', 'flex');

    const cardIngredients = document.createElement('div');
    cardIngredients.className = 'card-ingredients';
    cardIngredients.innerHTML = this.card.ingredient;
    const cardDescription = document.createElement('div');
    cardDescription.className = 'card-description';
    cardDescription.innerHTML = this.card.description;

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

class App {
  constructor() {
    this.fullData = new Api('data/recipes.json');
  }

  async main() {
    const json = await this.fullData.get();
    for (const card of json.recipes) {
      // json.recipes = json.la clé.dans le json (ici "recipes")
      const template = new recipeCard(card);
      template.createRecipeCard();
    }
  }
}

const app = new App();
app.main();
