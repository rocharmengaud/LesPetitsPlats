const dropdown = document.querySelector('.dropdown');
const buttonIngredients = document.querySelector('#button-ingredients');
const buttonAppliance = document.querySelector('#button-appliance');
const buttonUstensils = document.querySelector('#button-ustensils');
const ingredientList = document.querySelector('.ingredient-list');
const applianceList = document.querySelector('.appliance-list');
const ustensilsList = document.querySelector('.ustensils-list');

const ingredientListElements = ingredientList.querySelectorAll('div');
console.log(ingredientListElements);

function resetButton(typeButton) {
  switch (typeButton) {
    case 'ingredients':
      if (buttonAppliance.classList.contains('big-btn')) {
        buttonAppliance.click();
        // applianceList.classList.remove('three-columns');
      }
      if (buttonUstensils.classList.contains('big-btn')) {
        buttonUstensils.click();
        // ustensilsList.classList.remove('three-columns');
      }

      break;

    case 'appliance':
      applianceList.classList.remove('three-columns', 'show');
      if (buttonUstensils.classList.contains('big-btn')) {
        buttonUstensils.click();
        // ustensilsList.classList.remove('three-columns');
      }
      if (buttonIngredients.classList.contains('big-btn')) {
        buttonIngredients.click();
        // ingredientList.classList.remove('three-columns');
      }

      break;

    case 'ustensils':
      ustensilsList.classList.remove('three-columns', 'show');
      if (buttonAppliance.classList.contains('big-btn')) {
        buttonAppliance.click();
        // applianceList.classList.remove('three-columns');
      }
      if (buttonIngredients.classList.contains('big-btn')) {
        buttonIngredients.click();
        // ingredientList.classList.remove('three-columns');
      }

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

buttonAppliance.addEventListener('click', (event) => {
  resetButton('appliance');
  buttonAppliance.value = '';
  applianceList.classList.toggle('three-columns');
  buttonAppliance.classList.toggle('big-btn');
});

buttonUstensils.addEventListener('click', (event) => {
  resetButton('ustensils');
  buttonUstensils.value = '';
  ustensilsList.classList.toggle('three-columns');
  buttonUstensils.classList.toggle('big-btn');
});
