import Search from "./model/search";
import { elements } from "./view/base";
import * as searchView from "./view/searchView";
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
    // 4. hailtiig guitsetgene
    await state.search.doSearch();
    // 5. hailtiin ur dung delgetsend uzuulne
    searchView.renderRecipes(state.search.result);
  }
};
elements.searchForm.addEventListener("submit", e => {
  e.preventDefault();
  searchControl();
});
