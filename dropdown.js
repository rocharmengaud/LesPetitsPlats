const dropdown = document.querySelector('.dropdown');
const buttonIngredients = document.querySelector('#button-ingredients');
const buttonAppliance = document.querySelector('#button-appliance');
const buttonUstensils = document.querySelector('#button-ustensils');
const ingredientList = document.querySelector('.ingredient-list');
const applianceList = document.querySelector('.appliance-list');
const ustensilsList = document.querySelector('.ustensils-list');
const listArray = [ingredientList, ustensilsList, applianceList];
const buttonArray = [buttonIngredients, buttonAppliance, buttonUstensils];

buttonArray.forEach((button) => {
  // ici, originalValue n'est pas une variable mais une propriété qu'on ajoute a chacun des boutons
  button.originalValue = button.value;
});

// permet de reset les boutons
function resetButtons(exceptButton, exceptlist) {
  buttonArray.forEach((button) => {
    if (button === exceptButton) {
      return;
    }
    button.value = button.originalValue;
    button.classList.remove('show');
    button.classList.remove('big-btn');
  });
  listArray.forEach((element) => {
    console.log(element);
    if (element === exceptlist) {
      return;
    }
    element.classList.remove('show');
    element.classList.remove('three-columns');
  });
}

function onButtonClicked(button, list) {
  resetButtons(button, list);
  if (button.classList.contains('big-btn')) {
    // permet de restaurer la value originale
    button.value = button.originalValue;
    // permet de perdre le focus sur le click
    document.activeElement.blur();
  } else {
    button.value = '';
  }
  list.classList.toggle('three-columns');
  button.classList.toggle('big-btn');
}

function onListClicked(button, list) {
  list.classList.toggle('three-columns');
  button.classList.toggle('big-btn');
}

buttonIngredients.addEventListener('click', (event) => {
  onButtonClicked(buttonIngredients, ingredientList);
});

ingredientList.addEventListener('click', (event) => {
  onListClicked(buttonIngredients, ingredientList);
});

buttonAppliance.addEventListener('click', (event) => {
  onButtonClicked(buttonAppliance, applianceList);
});

applianceList.addEventListener('click', (event) => {
  onListClicked(buttonAppliance, applianceList);
});

buttonUstensils.addEventListener('click', (event) => {
  onButtonClicked(buttonUstensils, ustensilsList);
});

ustensilsList.addEventListener('click', (event) => {
  onListClicked(buttonUstensils, ustensilsList);
});

// pour supprimer la class show inutile de bootstrap sur les listes
document.querySelector('body').onclick = (e) => {
  ingredientList.classList.remove('show');
  applianceList.classList.remove('show');
  ustensilsList.classList.remove('show');
};
