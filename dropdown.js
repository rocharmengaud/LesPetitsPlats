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
  ingredientList.classList.toggle('three-columns');
});

buttonAppliance.addEventListener('click', (event) => {
  applianceList.classList.toggle('three-columns');
});

buttonUstensils.addEventListener('click', (event) => {
  ustensilsList.classList.toggle('three-columns');
});
