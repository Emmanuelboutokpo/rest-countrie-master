const btn = document.querySelector(".btn");
const header = document.querySelector("header");
const title_img = document.querySelector(".title_img");
const search = document.querySelector(".search");
const input = document.querySelector(".search input");
const dropbtn = document.querySelector(".dropbtn");
const dropdown_content = document.querySelector(".dropdown-content");
const dropdown_content_p = document.querySelectorAll(".dropdown-content p");
const countrie_detail = document.querySelector(".countries_detail")
const modalDevis=document.querySelector(".modalDevisHead");
const modalDevisContent=document.querySelector(".modalDevisContent");
let allCountries = [], empty=""; 

//All countries
const countrieDisplay = (countrie, id) => {
  return `
  <div class="countrie" onclick="myCountrie(${id})">
      <div class="countrie_img">
        <img src="${countrie.flags.png}" alt="${countrie.name.common}">
     </div>
     <div class="contrieInfo">
        <h2 class="name">${countrie.name.common}</h2>
        <p><b>Population: </b>${countrie.population}</p>
        <p><b>Region: </b>${countrie.region}</p>
        <p><b>Capital: </b>${countrie.capital}</p>
   </div>
</div>      
`
}

//Modal to show a countrie
const showOneCountrie = (id) =>{
  let currencies ="";
  let borderCountries =allCountries[id].borders;
   let content = []
  let nativeName = allCountries[id].translations.nld.common;
  let languages = Object.values( allCountries[id].languages);
  Object.values( allCountries[id].currencies).forEach(val => currencies= val);

if (borderCountries != undefined) {
      content =   `<span>${borderCountries}</span>`
  } else {
      content = "<span>Nothing borders !</span>"
  }  
    return`
    <div class="modalDevisBody">
      <button class="back" dataDismiss="dialogue"><i class="bi bi-arrow-return-left"></i> Back</button>
      <div class="backButton">
        <div class="img">
          <img src="${allCountries[id].flags.png}" alt="flag">
        </div>
        <div class="twoBox">
          <div class="countriesInfoSection">
            <div class="detailInfo">
              <h2>${allCountries[id].name.common}</h2>
              <p> <b>Native Name : </b>${nativeName}</p>
              <p> <b>Population : </b>${allCountries[id].population}</p>
              <p> <b>Region : </b> ${allCountries[id].region}</p>
              <p> <b>Sub Region : </b> ${allCountries[id].subregion}</p>
              <p> <b>Capital : </b>${allCountries[id].capital}</p>
            </div>
            <div class="otherDetails">
              <p> <b>Top Level Domain : </b>${allCountries[id].tld}</p>
              <p> <b>Currencies : </b> ${currencies.name}</p>
              <p> <b>Languages : </b>${languages}</p>
            </div>
          </div>
          <div class="borderCountries">
            <h4>Border Countries :</h4>  
              ${content}
          </div>
        </div>
      </div>

    `
}

//The all countries addEventListener function 
const myCountrie= (id) =>{
modalDevis.innerHTML =  showOneCountrie(id)
     let back = document.querySelector(".back");
     document.body.style.overflow="hidden"
     modalDevis.classList.add("show");
     back.onclick = function() {
      modalDevis.classList.remove("show");
     document.body.style.overflow="auto"
    }  
}

//Search a country
const searchCountry = () =>{
    input.addEventListener("keyup", (e)=>{
          if (e.key=="Enter" && input.value) {        
            countrie_detail.innerHTML= allCountries.map((countrie,id) =>{
            if (countrie.name.common === input.value) {
               return  countrieDisplay(countrie,id)
            }
        }).join("")   || '<span style="text-align: center; font-weight: bold;">You must insert a right country</span>';
        
        input.value =""
    }
  })
}
searchCountry()

//Show or hide the custom select
dropbtn.addEventListener("click", () => {
  dropdown_content.classList.toggle("show")
});

dropdown_content_p.forEach((region) => {
  region.addEventListener("click", () =>{
      countrie_detail.innerHTML= allCountries.map((countrie,id) =>{
       if (countrie.region ===  region.id) {
          return countrieDisplay(countrie,id)
       }
     }).join("")
     
      if (region.id === "all") {
          return showCountrie()
      }
  })
})

//Get all countries
const getCountrie = async () => {
        await fetch("g.json")
        .then((res) => res.json())
        .then(data => allCountries = data);
}

const paginationContainer = document.getElementById("pagination-container");

const itemsPerPage = 8; // Nombre de pays par page
let currentPage = 1; // Page courante

const showCountries = async () => {
  await getCountrie();

const startIndex = (currentPage - 1) * itemsPerPage;
const endIndex = startIndex + itemsPerPage;

const countriesToShow = allCountries.slice(startIndex, endIndex);

countrie_detail.innerHTML = countriesToShow
  .map((country, id) => {
    return countrieDisplay(country, id);
  })
  .join("");

const totalPages = Math.ceil(allCountries.length / itemsPerPage);

paginationContainer.innerHTML = "";
let startPage = Math.max(1, currentPage - 2);
let endPage = Math.min(startPage + 3, totalPages);

if (endPage - startPage < 3) {
  startPage = Math.max(1, endPage - 3);
}

for (let page = startPage; page <= endPage; page++) {
  const button = document.createElement("button");
  button.innerText = page;
  button.classList.add("pagination-button");
  if (page === currentPage) {
    button.classList.add("actives");
  }
  button.addEventListener("click", () => {
    currentPage = page;
    showCountries();
  });
  paginationContainer.appendChild(button);
}

if (startPage > 1) {
  const prevGroupButton = document.createElement("button");
  prevGroupButton.innerText = "<";
  prevGroupButton.classList.add("pagination-button");
  prevGroupButton.addEventListener("click", () => {
    currentPage = startPage - 1;
    showCountries();
  });
  paginationContainer.prepend(prevGroupButton);
}

if (endPage < totalPages) {
  const nextGroupButton = document.createElement("button");
  nextGroupButton.innerText = ">";
  nextGroupButton.classList.add("pagination-button");
  nextGroupButton.addEventListener("click", () => {
    currentPage = endPage + 1;
    showCountries();
  });
  paginationContainer.appendChild(nextGroupButton);
}
};
showCountries()
 

//Dark mode
btn.addEventListener("click", (e) => {
  searchCountry()
  const countrie = document.querySelectorAll(".countrie")
    document.body.classList.toggle("active");
    modalDevisContent.classList.toggle("header_darks");
    modalDevis.classList.toggle("header_darks");
    header.classList.toggle("header_dark");
    btn.classList.toggle("header_dark");
    title_img.classList.toggle("moonDark")
    search.classList.toggle("header_dark")
    input.classList.toggle("header_dark")
    dropdown_content.classList.toggle("header_dark")
    dropbtn.classList.toggle("header_dark");

   dropdown_content_p.forEach((ite) => {
        ite.classList.toggle("header_darks")
    }) 
}) 


