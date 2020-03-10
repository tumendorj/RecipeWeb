import Search from "./model/search";
import { elements, renderLoader, clearLoader } from "./view/base";
import * as searchView from "./view/searchView";
import Recipe from "./model/Recipe";
import List from "./model/List";
import { renderRepice, clearRecipe, highlight } from "./view/recipeView";
import * as listView from "./view/listView";
import * as likesView from "./view/likesView";
import Like from "./model/Like";
/*
 * web app state
 * - хайлтын query үр дүн
 * - үзүүлэх гэж буй жор
 * - лайкалсан жорууд
 * - захиалсан жорын найрлагууд
 */
const state = {};

const searchControl = async () => {
  // 1. input дахь утгыг авна
  const query = searchView.getInput();
  if (query) {
    // 2. hailtiin objectiig uusgeh
    state.search = new Search(query);

    // 3. delgetsiin UI beltgeh
    searchView.clearInput();
    searchView.clearList();
    renderLoader(elements.searchResultDiv);
    // 4. hailtiig guitsetgene
    await state.search.doSearch();

    // 5. hailtiin ur dung delgetsend uzuulne
    clearLoader();
    if (state.search.result === undefined) alert("Хайлтаар илэрцгүй...");
    else searchView.renderRecipes(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  searchControl();
});
elements.pageButtons.addEventListener("click", e => {
  const btn = e.target.closest(".btn-inline");
  if (btn) {
    const pageNumber = parseInt(btn.dataset.goto);
    searchView.clearList();
    searchView.renderRecipes(state.search.result, pageNumber);
  }
});
// Recipe model
const recipeControl = async () => {
  // 1. id - g awah
  const id = window.location.hash.replace("#", "");
  if (!state.likes) state.likes = new Like();
  // 2. recipe model uusgene
  state.recipe = new Recipe(id);
  // 3. UI delgetsiig beltgene
  clearRecipe();
  renderLoader(elements.recipeDiv);
  // 4. recipe download
  await state.recipe.getRecipe();
  // 5. calculate time and people number
  highlight(id);
  clearLoader();
  state.recipe.calcTime();
  state.recipe.calcPersonNumber();
  // 6. joroo delgetslene
  renderRepice(state.recipe, state.likes.isLiked(id));
};
window.addEventListener("hashchange", recipeControl);

// ingredient control
const ingredientControl = () => {
  state.list = new List();
  listView.clearItems();
  state.recipe.ingredients.forEach(el => {
    const item = state.list.addItem(el);
    listView.renderList(item);
  });
};
// like control
const likeControl = () => {
  // 1) Лайкийн моделийг үүсгэнэ.

  // 2) Одоо харагдаж байгаа жорын ID-ийг олж авах
  const currentRecipeId = state.recipe.id;

  // 3) Энэ жорыг лайкласан эсэхийг шалгах
  if (state.likes.isLiked(currentRecipeId)) {
    // Лайкласан бол лайкийг нь болиулна
    state.likes.deleteLike(currentRecipeId);
    likesView.deleteLike(currentRecipeId);
    likesView.toggleLikeBtn(false);
  } else {
    // Лайклаагүй бол лайклана.
    const newLike = state.likes.addLike(
      currentRecipeId,
      state.recipe.title,
      state.recipe.publisher,
      state.recipe.image_url
    );
    likesView.renderLike(newLike);
    likesView.toggleLikeBtn(true);
  }

  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
};
elements.recipeDiv.addEventListener("click", e => {
  if (e.target.matches(".recipe__btn, .recipe__btn *")) {
    ingredientControl();
  } else if (e.target.matches(".recipe__love, .recipe__love *")) {
    likeControl();
  }
});
elements.shoppingList.addEventListener("click", e => {
  const id = e.target.closest(".shopping__item").dataset.itemid;
  state.list.deleteItem(id);
  listView.deleteItem(id);
});
window.addEventListener("load", e => {
  if (!state.likes) state.likes = new Like();
  likesView.toggleLikeMenu(state.likes.getNumberOfLikes());
  state.likes.likes.forEach(e => likesView.renderLike(e));
});
