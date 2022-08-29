// ce fichier sert uniquement à utiliser la data du json partout dans le projet
export const getData = async () => {
  const response = await fetch('/data/recipes.json');
  const recipesAll = await response.json();
  return recipesAll;
};
