const dropdown = document.querySelector('.dropdown');
const buttonIngredients = document.querySelector('#button-ingredients');
const buttonAppliance = document.querySelector('#button-appliance');
const buttonUstensils = document.querySelector('#button-ustensils');
const ingredientList = document.querySelector('.ingredient-list');
const applianceList = document.querySelector('.appliance-list');
const ustensilsList = document.querySelector('.ustensils-list');

function resetButton(typeButton) {
  switch (typeButton) {
    case 'ingredients':
      if (buttonAppliance.classList.contains('show')) {
        buttonIngredients.classList.remove('big-btn');
        ingredientList.classList.remove('three-columns');
        buttonUstensils.value = 'Ustensiles';
        buttonAppliance.value = 'Appareils';
      }
      // if (buttonUstensils.classList.contains('show')) {
      //   buttonUstensils.click();
      //   ustensilsList.classList.remove('three-columns');
      // }
      // si l'utilisateur clique en dehors du bouton, on reset le bouton
      // if (buttonIngredients != document.activeElement) {
      //   buttonIngredients.click();
      // }

      break;

    case 'appliance':
      // if (buttonUstensils.classList.contains('show')) {
      //   buttonUstensils.click();
      //   ustensilsList.classList.remove('three-columns');
      // }
      // if (buttonIngredients.classList.contains('show')) {
      //   buttonIngredients.click();
      //   ingredientList.classList.remove('three-columns');
      // }

      break;

    case 'ustensils':
      // if (buttonAppliance.classList.contains('show')) {
      //   buttonAppliance.click();
      //   applianceList.classList.remove('three-columns');
      // }
      // if (buttonIngredients.classList.contains('show')) {
      //   buttonIngredients.click();
      //   ingredientList.classList.remove('three-columns');
      // }

      break;
  }
}

// l'event listener doit etre placé sur la fleche du dropdown
buttonIngredients.addEventListener('click', (event) => {
  resetButton('ingredients');
  buttonIngredients.value = '';
  ingredientList.classList.toggle('three-columns');
  buttonIngredients.classList.toggle('big-btn');
});

ingredientList.addEventListener('click', (event) => {
  ingredientList.classList.toggle('three-columns');
  buttonIngredients.classList.toggle('big-btn');
});

buttonAppliance.addEventListener('click', (event) => {
  resetButton('appliance');
  buttonAppliance.value = '';
  applianceList.classList.toggle('three-columns');
  buttonAppliance.classList.toggle('big-btn');
});

applianceList.addEventListener('click', (event) => {
  applianceList.classList.toggle('three-columns');
  buttonAppliance.classList.toggle('big-btn');
});

buttonUstensils.addEventListener('click', (event) => {
  resetButton('ustensils');
  buttonUstensils.value = '';
  ustensilsList.classList.toggle('three-columns');
  buttonUstensils.classList.toggle('big-btn');
});

ustensilsList.addEventListener('click', (event) => {
  ustensilsList.classList.toggle('three-columns');
  buttonUstensils.classList.toggle('big-btn');
});
