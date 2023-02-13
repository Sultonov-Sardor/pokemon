let elBody = document.querySelector('body');
let elList = document.querySelector('.js-list');
let elBtn = document.querySelector('.js-btn');
let elImg = document.querySelector('.js-img');
let elSelect = document.querySelector('.js-select');
let elSelectsort = document.querySelector('.js-selectSort');
let elForm = document.querySelector('.js-form');
let elInput = document.querySelector('.js-search');


function domgaChiqaradi(array, node){
  node.innerHTML = '';

  for(i of array){
    var Item = document.createElement('li');
    let Image = document.createElement('img');
  let Num = document.createElement('h2');
  let Title = document.createElement('h3');
  let Egg = document.createElement('p');
  let Time = document.createElement('p');
  let Div = document.createElement('div')

  Image.src = i.img
  Num.textContent = i.num
  Title.textContent = i.name
  Egg.textContent = i.type
  Time.textContent = i.spawn_time
  
  Item.append(Image);
  Item.append(Div);
  
  Div.append(Num);
  Div.append(Title);
  Div.append(Egg);
  Div.append(Time);

  Item.classList.add('item')
  
  node.appendChild(Item);
}

}

domgaChiqaradi(pokemons,elList)

// DARK mode

let elLi = document.querySelectorAll('li');
let theme = false;
let itemTheme = false;

elBtn.addEventListener('click', () => {
  theme = !theme;
  itemTheme = !itemTheme;
  const bg = theme ? 'dark-bg' : 'light';
  const bgItem = itemTheme ? 'item-bg' : 'light';
  window.localStorage.setItem('theme', bg);
  window.localStorage.setItem('itemTheme', bgItem);
  changeTheme();
})

function changeTheme(){
  if(window.localStorage.getItem('theme') == 'dark-bg'){
    elBody.classList.add('dark-bg');
  }else{
    elBody.classList.remove('dark-bg');
  }

  if(window.localStorage.getItem('itemTheme') == 'item-bg'){
    elLi.forEach((i)=>{     
      i.classList.add('item-bg');
    })
  }else{
    elLi.forEach((i)=>{     
      i.classList.remove('item-bg');
    })
  }
}

changeTheme();

// select

let newArray = [];
elSelect.addEventListener('change',() =>{
  newArray = []

  if(elSelect.value != 'All'){

    pokemons.forEach((poc) =>{
      if(poc.type.includes(elSelect.value)){
        newArray.push(poc)
      }
    });
    domgaChiqaradi(newArray,elList)
  }else{
    domgaChiqaradi(pokemons,elList)
  }
})

let Array = [];
pokemons.forEach((poc)=>{
	poc.type.forEach((pocty) =>{
		Array.push(pocty)
	})

});

let setArray = new Set(Array);

setArray.forEach((el) => {


	let eloption = document.createElement('option');
	 
	eloption.setAttribute("value", el);
	eloption.textContent = el
	elSelect.appendChild(eloption)
})

// select sort 

elSelectsort.addEventListener('change', () => {

  if(elSelectsort.value == "Sort"){
    window.location.reload();
  }

  if(elSelectsort.value == "A-Z"){
    const pokemonSort = pokemons.sort((a,b) =>{
      if(a.name > b.name){
        return 1;
      }
      if(a.name < b.name){
        return -1;
      }
      return 0;
    });
    domgaChiqaradi(pokemonSort,elList);
  }

  if(elSelectsort.value == "Z-A"){
    const pokemonSort = pokemons.sort((a,b) =>{
      if(a.name > b.name){
        return -1;
      }
      if(a.name < b.name){
        return 1;
      }
      return 0;
    });
    domgaChiqaradi(pokemonSort,elList);
  }
  console.log(elSelectsort.value);
})

// search

let searchResult = [];

elForm.addEventListener('input', (evt) => {
  elList.innerHTML = '';
  evt.preventDefault();
  let elInputvalue = elInput.value.toLocaleLowerCase();
  pokemons.forEach( el => {
    if(el.name.toLocaleLowerCase().includes(elInputvalue)){
      searchResult.push(el);
    }
  });
  domgaChiqaradi(searchResult,elList);
  searchResult = []
});