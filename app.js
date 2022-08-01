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

class App {
  constructor() {
    this.fullData = new Api('data/recipes.json');
  }

  async main() {
    console.log('test');
  }
}

const app = new App();
app.main();
