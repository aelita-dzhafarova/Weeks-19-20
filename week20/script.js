'use strict';

const selectDefault = document.querySelector('#selectDefault');

const input = document.querySelector('.input');
const button = document.querySelector('.button');

const loader = document.querySelector('.loader');
const divResult = document.querySelector('.result');
const divError = document.querySelector('.error');

const output = document.querySelector('.output');

const resultFinally = document.createElement('h2');

// Default datas
input.value = '';
selectDefault.selected = true;
loader.setAttribute('hidden', true);

/* Documentation for Star Wars API (SWAPI) :
   https://swapi.dev/documentation#schema */
async function searchObj() {
    resultFinally.innerText = '';
    divResult.innerHTML = '';
    divError.innerHTML = '';
    try {
        const select = document.querySelector('#select').value;
        loader.setAttribute('hidden', false);
        const res = await fetch(`https://swapi.nomoreparties.co/${select}/${input.value}`);
        const obj = await res.json();
        if (input.value === ''){
            divError.innerHTML = `<p>Not found</p><p>You need to fill all the fields.</p>`;
            divResult.innerHTML = '';
            throw new Error("You need to fill all the fields.");
        }
        else if(select === ''){
            createErrorTextSelect();
        }
        else if(obj.detail === 'Not found'){
            createErrorText();
            return Promise.reject(new Error(`Not found`));
        }
        else 
        createDescription(select, obj);
    }
    catch(error) {
        console.log(error.message);
    }
    finally {
        loader.setAttribute('hidden', true);
        resultFinally.innerText = `Search result :`;
        output.prepend(resultFinally);
        clearAll(input);
    }
}

function createDescription(list, item){
    if (list === 'people'){
        divResult.innerHTML = `<p>Character's name: ${item.name}</p>
        <p>Birthday: ${item.birth_year}</p>`;
        divError.innerHTML = '';
    }
    else if (list === 'planets'){
        divResult.innerHTML = `<p>Planet's name: ${item.name}</p>
        <p>Population: ${item.population}</p>`;
        divError.innerHTML = '';
    }
    else if (list === 'films'){
        divResult.innerHTML = `<p>Movie's name: ${item.title}</p>
        <p>Director: ${item.director}</p>`;
        divError.innerHTML = '';
    }
}

function createErrorText(){
    divError.innerHTML = `<p>Not found</p><p>Choose a number between 1 and 10.</p>`;
    divResult.innerHTML = '';
}

function createErrorTextSelect(){
    divError.innerHTML = `<p>Not found</p><p>You need to fill all the fields.</p>`;
    divResult.innerHTML = '';
}

function clearAll(inp) {
    inp.value = '';
    selectDefault.selected = true;
}

/* No brackets for searchObj, because we doesn't want
that it executes right now (asynchrone) */
button.addEventListener('click', searchObj);
