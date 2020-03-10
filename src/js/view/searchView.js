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
        <a class="results__link" href="#${recipe.recipe_id}">
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
const createButton = (page, type, direct) => {
  return `<button class="btn-inline results__btn--${type}" data-goto = ${page}>
  <svg class="search__icon">
      <use href="img/icons.svg#icon-triangle-${direct}"></use>
  </svg>
  <span>Хуудас ${page}</span>
</button>`;
};
const renderButtons = (currentPage, totalPages) => {
  let button;
  if (currentPage == 1 && totalPages > 1) {
    button = createButton(2, "next", "right");
  } else if (currentPage < totalPages) {
    button = createButton(currentPage - 1, "prev", "left");
    button += createButton(currentPage + 1, "next", "right");
  } else if (currentPage == totalPages) {
    button = createButton(currentPage - 1, "prev", "left");
  }
  elements.pageButtons.insertAdjacentHTML("afterbegin", button);
};
export const renderRecipes = (recipes, currentPage = 1, resperPage = 10) => {
  const start = (currentPage - 1) * resperPage;
  const end = currentPage * resperPage;
  recipes.slice(start, end).forEach(el => {
    renderRecipe(el);
  });
  const totalPages = Math.ceil(recipes.length / resperPage);
  renderButtons(currentPage, totalPages);
};
export const clearInput = () => {
  elements.searchInput.value = "";
};
export const clearList = () => {
  elements.resultList.innerHTML = "";
  elements.pageButtons.innerHTML = "";
};
