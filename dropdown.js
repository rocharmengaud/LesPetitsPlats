const dropdown = document.querySelector('.dropdown');
const buttonIngredients = document.querySelector('#button-ingredients');
const buttonAppliance = document.querySelector('#button-appliance');
const buttonUstensils = document.querySelector('#button-ustensils');
const ingredientList = document.querySelector('.ingredient-list');
const applianceList = document.querySelector('.appliance-list');
const ustensilsList = document.querySelector('.ustensils-list');

// Array.from(
//   buttonIngredients.forEach(function (element) {
//     element.addEventListener('click', (event) => {
//       console.log('test');
//     });
//   })
// );

function openDropdownIngredients() {
  ingredientList.style.width = '177px';
  ingredientList.style.height = '55px';
}

openDropdownIngredients();
