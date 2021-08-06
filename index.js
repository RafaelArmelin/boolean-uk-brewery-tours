let state = {
  selectStateInput: "",
  breweries: [],
  cities: [],
  filters: {
    type: "",
    city: [],
    search: ""
  }
};

//Bridge to the Form
const formEl = document.getElementById('select-state-form');

// Bridge to the List of Breweries 
const mainBridge = document.querySelector("main");

// add eventListener 
formEl.addEventListener("submit", (event) => {
  // console.log("clicked")
  event.preventDefault()
  
  const userInput = formEl.querySelector("#select-state");
  const userValue = userInput.value.split(" ").join("_");
  console.log(userValue);

  fetch(`https://api.openbrewerydb.org/breweries?by_state=${userValue}`)
  .then((res) => res.json())
  .then((breweries) => {
    console.log("Inside GET Fetch: ", breweries);
 
//     let state = {
//       selectStateInput: "",
//       breweries: [],    
//       cities: [],
//       filters: {
//       type: "",
//       city: [],
//       search: ""
//   }
// };

// Search input value
    //   const formSearchEl = document.getElementById('#search-breweries-form');
    //   const searchInput = formSearchEl.querySelector("#search-breweries");
    //   const userSearchValue = searchInput.value;

    // for (let i = 0; i < breweries.length; i++) {

    //   const brewery = breweries[i];

    //       state.selectStateInput = `${userValue}`;
    //       state.cities.push({...brewery.city});
    //       state.breweries.push({...brewery.name});
    //       state.cities.push({...brewery.city});
    //       state.filters.type.push({...brewery.brewery_type});
    //       state.filters.city.push({...brewery.city});

    //       state.filters.search = userSearchValue;
    // }

    const breweryList = renderBreweriesList(breweries);

    const breweryFilters = renderFiltersSection(breweries);

  }); 

formEl.reset()

// const test = renderBreweriesList(breweries); // remove the (breweries)?
// console.log("hallo" , test);

})


function renderBreweriesList(breweries) {
 // console.log("Inside renderBreweriesList: ", breweries);

const headingList = document.createElement("h1");
headingList.innerText = "List of Breweries";
const header = document.createElement("header");
header.setAttribute("class", "search-bar");

const form = document.createElement("form");
form.setAttribute("id", "search-breweries-form");
form.setAttribute("autocomplete", "off");

const label = document.createElement("label");
label.setAttribute("for", "search-breweries");
const headingLabel = document.createElement("h2");
headingLabel.innerText = "Search breweries:";
label.append(headingLabel);
form.append(label);

const inputForm = document.createElement("input");
inputForm.setAttribute("id", "search-breweries");
inputForm.setAttribute("name", "search-breweries");
inputForm.setAttribute("type", "text");
form.append(inputForm);
header.append(form);

form.addEventListener("submit", (event) => {
  //  console.log("clicked");
   event.preventDefault()
  
  const userCityValue = inputForm.value.split(" ").join("_");
  
  fetch(`https://api.openbrewerydb.org/breweries?by_city=${userCityValue}`)
  .then((res) => res.json())
  .then((breweriesbyState) => {
    console.log("Inside GET Fetch: ", breweriesbyState);

    const breweryList = renderBreweriesList(breweriesbyState);

  }); 

formEl.reset()

})


mainBridge.append(headingList);
headingList.append(header);

const article = document.createElement("article");
const ulLi = document.createElement("ul");
ulLi.setAttribute("class", "breweries-list");

  for (let i = 0; i < breweries.length; i++) {

  const brewery = breweries[i];

const liEl = document.createElement("li");

const headingName = document.createElement("h2");
headingName.innerHTML = `${brewery.name}`;
const divEl = document.createElement("div");
divEl.setAttribute("class" , "type");
const textP = document.createElement("p");
textP.innerText = `${brewery.brewery_type}`;
divEl.append(textP);

liEl.append(headingName);
liEl.append(divEl);

const sectionAdress = document.createElement("section");
sectionAdress.setAttribute("class","address");
const headingAdress = document.createElement("h3");
headingAdress.innerText = "Adress:"
const paragraphEl = document.createElement("p");
paragraphEl.innerText = `${brewery.street}`;
const paragraphElTwo = document.createElement("p");
const city = `${brewery.city}`;
const postalCode = `${brewery.postal_code}`;
paragraphElTwo.innerText = city , postalCode;
sectionAdress.append(headingAdress);
sectionAdress.append(paragraphEl);
sectionAdress.append(paragraphElTwo);
liEl.append(sectionAdress);

const sectionPhone = document.createElement("section");
sectionPhone.className = "phone";
const headingPhone = document.createElement("h3");
headingPhone.innerText = "Phone:"
const paragraphPhone = document.createElement("p");
paragraphPhone.innerText = `${brewery.phone}`;
sectionPhone.append(headingPhone);
sectionPhone.append(paragraphPhone);
liEl.append(sectionPhone);

const sectionLink = document.createElement("section");
sectionLink.setAttribute("class" , "link");
const link = document.createElement("a");
link.setAttribute("href", `${brewery.website_url}`);
link.setAttribute("target", "blank");
link.innerText = "Visit Website";
sectionLink.append(link);
liEl.append(sectionLink);

ulLi.append(liEl);
article.append(ulLi);

mainBridge.append(article);
  }
}

// renderBreweriesList();


function renderFiltersSection(breweries) {
  // console.log("Inside renderFiltersSection: ", breweries);

    const filtersAsideEl = document.createElement("aside"); 
    filtersAsideEl.className = "filters-section";

    const headingEl = document.createElement("h2");
    headingEl.innertext = ("FIlter By:");
    filtersAsideEl.append(headingEl);

    const filterByTypeFormEL = document.createElement("form");
    filterByTypeFormEL.setAttribute("id", "filter-by-type-form");
    filtersAsideEl.append(filterByTypeFormEL);

    const labelEl = document.createElement("label");
    labelEl.setAttribute("for", "filter-by-type");
    filterByTypeFormEL.append(labelEl);

    const labelHeadingEl = document.createElement("h3");
    labelHeadingEl.innerText = ("Type of Brewery")
    labelEl.append(labelHeadingEl);


    const selectEl = document.createElement("select");
    selectEl.setAttribute("name", "filter-by-type");
    selectEl.setAttribute("id", "filter-by-type");

    const optionOneEl = document.createElement("option");
    optionOneEl.setAttribute("value", "");
    optionOneEl.innerText = ("Select a type...")
    selectEl.append(optionOneEl);

    const optionTwoEl = document.createElement("option");
    optionTwoEl.setAttribute("value", "micro");
    optionTwoEl.innerText = ("Micro")
    selectEl.append(optionTwoEl);

    const optionThreeEl = document.createElement("option");
    optionThreeEl.setAttribute("value", "regional");
    optionThreeEl.innerText = ("Regional")
    selectEl.append(optionThreeEl);

    const optionFourEl = document.createElement("option");
    optionFourEl.setAttribute("value", "brewpub");
    optionFourEl.innerText = ("Brewpub")
    selectEl.append(optionFourEl);

    filterByTypeFormEL.append(selectEl);


    const divEl = document.createElement("div");
    divEl.className = "filter-by-city-heading";

    const divHeadingEl = document.createElement("h3");
    divHeadingEl.innerText = "Cities";
    divEl.append(divHeadingEl);

    const buttonEl = document.createElement("button");
    buttonEl.className = ".clear-all-btn";
    buttonEl.innerText = "clear all";
    divEl.append(buttonEl);
    filtersAsideEl.append(divEl);

    const filterByCityFormEl = document.createElement("form");
    filterByCityFormEl.setAttribute("id", "filter-by-city-form");

    for (let i = 0; i < breweries.length; i++){

    const brewery =  breweries[i];
    
    const inputOneEl = document.createElement("input");
    inputOneEl.setAttribute("type", "checkbox");
    inputOneEl.setAttribute("name", `${brewery.city}`); 
    inputOneEl.setAttribute("value", `${brewery.city}`);
    filterByCityFormEl.append(inputOneEl);

    const inputOneLabelEl = document.createElement("label");
    inputOneLabelEl.setAttribute("for", `${brewery.city}`); 
    inputOneLabelEl.innerText = `${brewery.city}`; 
    filterByCityFormEl.append(inputOneLabelEl);

    filtersAsideEl.append(filterByCityFormEl);
    mainBridge.append(filtersAsideEl);
  }
};

