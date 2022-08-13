export const getData = async () => {
  const response = await fetch('/data/recipes.json');
  const recipesAll = await response.json();
  return recipesAll;
};
