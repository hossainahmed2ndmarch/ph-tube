// Load catagories
const loadCategories = () => {
 fetch("https://openapi.programming-hero.com/api/phero-tube/categories")
  .then(res => res.json())
  .then(data => displayCategories(data.categories))
  .catch(error => console.log(error));
}


const displayCategories = (categories) => {
 const categoriesContainer = document.getElementById('categories');
 categories.forEach((items) => {
  const button = document.createElement("button")
  button.classList = "btn";
  button.innerText = items.category;
  categoriesContainer.append(button);
 });
}

loadCategories();