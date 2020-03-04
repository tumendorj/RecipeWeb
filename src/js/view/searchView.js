import { elements } from "./base";
export const getInput = () => elements.searchInput.value;
export const renderRecipe = recipe => {
  //   publisher: "All Recipes";
  //   title: "Chicken Fettuccini Alfredo";
  //   source_url: "http://allrecipes.com/Recipe/Chicken-Fettuccini-Alfredo/Detail.aspx";
  //   recipe_id: "7202";
  //   image_url: "http://forkify-api.herokuapp.com/images/214411de5a.jpg";
  //   social_rank: 99.9999995711024;
  //   publisher_url: "http://allrecipes.com";
  const markup = `
     <li>
        <a class="results__link results__link--active" href="#${recipe.recipe_id}">
            <figure class="results__fig">
                <img src="${recipe.image_url}" alt="Test">
            </figure>
            <div class="results__data">
                <h4 class="results__name">${recipe.title}</h4>
                <p class="results__author">${recipe.publisher}</p>
            </div>
        </a>
    </li>
    `;
  elements.resultList.insertAdjacentHTML("beforeend", markup);
};
export const renderRecipes = recipes => {
  recipes.forEach(el => {
    renderRecipe(el);
  });
};
export const clearInput = () => {
  elements.searchInput.value = "";
};
export const clearList = () => {
  elements.resultList.innerHTML = "";
};
