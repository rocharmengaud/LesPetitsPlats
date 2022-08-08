const dropdown = document.querySelector('.dropdown');
const buttonIngredients = document.querySelector('#button-ingredients');
const buttonAppliance = document.querySelector('#button-appliance');
const buttonUstensils = document.querySelector('#button-ustensils');
const ingredientList = document.querySelector('.ingredient-list');
const applianceList = document.querySelector('.appliance-list');
const ustensilsList = document.querySelector('.ustensils-list');

const ingredientListElements = ingredientList.querySelectorAll('div');
console.log(ingredientListElements);

// Array.from(
//   buttonIngredients.forEach(function (element) {
//     element.addEventListener('click', (event) => {
//       console.log('test');
//     });
//   })
// );

// l'event listener doit etre placé sur la fleche du dropdown
buttonIngredients.addEventListener('click', (event) => {
  buttonIngredients.value = '';
  ingredientList.classList.toggle('three-columns');
  buttonIngredients.classList.toggle('big-btn');
});

buttonAppliance.addEventListener('click', (event) => {
  buttonAppliance.value = '';
  applianceList.classList.toggle('three-columns');
  buttonAppliance.classList.toggle('big-btn');
});

buttonUstensils.addEventListener('click', (event) => {
  buttonUstensils.value = '';
  ustensilsList.classList.toggle('three-columns');
  buttonUstensils.classList.toggle('big-btn');
});
