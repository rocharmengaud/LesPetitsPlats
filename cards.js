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

  createIngredientList(ingredients) {
    ingredients.ingredients.forEach((Element) => {
      const ingredientList = document.createElement('div');
      ingredientList.innerText = Element.ingredient;
      document.querySelector('.ingredient-list').appendChild(ingredientList);
    });
  }

  // createApplianceList(appliance) {
  //   appliance.appliance.forEach((Element) => {
  //     const applianceList = document.createElement('div');
  //     applianceList.innerText = Element.appliance;
  //     document.querySelector('.appliance-list').appendChild(applianceList);
  //   });
  // }

  // createUstensilsList(ustensils) {
  //   ustensils.ustensils.forEach((Element) => {
  //     const ustensilsList = document.createElement('div');
  //     ustensilsList.innerText = Element.ustensils;
  //     document.querySelector('.ustensils-list').appendChild(ustensilsList);
  //   });
  // }
}

class App {
  constructor() {
    this.fullData = new Api('data/recipes.json');
  }

  async main() {
    const json = await this.fullData.get();

    for (const data of json.recipes) {
      // json.recipes = json.la clé.dans le json (ici "recipes")
      const template = new recipeCard(data);
      template.createRecipeCard();
      // boucle pour importer les données dans le button
      template.createIngredientList(data);
      // template.createApplianceList(data);
      // template.createUstensilsList(data);
    }
  }
}

// function uniqueWord(word) {
//   let arr = [];
//   word.forEach(element => {
//     if(!arr.includes(element)){
//        arr.push(element);
//     }
//   });
//   return arr;
// }

const app = new App();
app.main();
