import Search from "./model/search";
let search = new Search("carrot");
search.doSearch().then(result => console.log(result));
