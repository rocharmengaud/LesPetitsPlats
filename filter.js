const searchbarInput = document.querySelector('#search-recipe');
const searchbarSubmit = document.querySelector('#icon');

function generalFilter() {
  searchbarSubmit.addEventListener('click', (event) => {
    const searchbarValue = searchbarInput.value;

    if (searchbarValue.length >= 3) {
      console.log(searchbarValue);
      return true;
    } else {
      return false;
    }
  });
}

generalFilter();
