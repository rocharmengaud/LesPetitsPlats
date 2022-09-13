const dropdown = document.querySelector('.dropdown');
const buttonIngredients = document.querySelector('#button-ingredients');
const buttonAppliance = document.querySelector('#button-appliance');
const buttonUstensils = document.querySelector('#button-ustensils');
const ingredientList = document.querySelector('.ingredient-list');
const applianceList = document.querySelector('.appliance-list');
const ustensilsList = document.querySelector('.ustensils-list');
const listArray = [ingredientList, ustensilsList, applianceList];
const buttonArray = [buttonIngredients, buttonAppliance, buttonUstensils];

// Permet de stocker la value originale d'un bouton
buttonArray.forEach((button) => {
  // ici, originalValue n'est pas une variable mais une propriété qu'on ajoute a chacun des boutons
  // elle prends en compte la value actuelle du bouton
  button.originalValue = button.value;
});

// Permet de reset les boutons
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
    if (element === exceptlist) {
      return;
    }
    element.classList.remove('show');
    element.classList.remove('three-columns');
  });
}

// Permet d'ouvrir et de fermer correctement le dropdown au moment du clic
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

// Permet de fermer le dropdown lors de la selection d'un des elements d'une liste
function onListClicked(button, list) {
  list.classList.toggle('three-columns');
  button.classList.toggle('big-btn');
}

// Ajout des events listeners sur chaque bouton et chaque liste pour appeler les fonctions précédentes
buttonIngredients.addEventListener('click', (event) => {
  onButtonClicked(buttonIngredients, ingredientList);
});

buttonAppliance.addEventListener('click', (event) => {
  onButtonClicked(buttonAppliance, applianceList);
});

buttonUstensils.addEventListener('click', (event) => {
  onButtonClicked(buttonUstensils, ustensilsList);
});

ingredientList.addEventListener('click', (event) => {
  onListClicked(buttonIngredients, ingredientList);
});

applianceList.addEventListener('click', (event) => {
  onListClicked(buttonAppliance, applianceList);
});

ustensilsList.addEventListener('click', (event) => {
  onListClicked(buttonUstensils, ustensilsList);
});

// Permet de supprimer la class show crée par Bootstrap dont on a pas besoin
document.querySelector('body').onclick = (e) => {
  ingredientList.classList.remove('show');
  applianceList.classList.remove('show');
  ustensilsList.classList.remove('show');
};
