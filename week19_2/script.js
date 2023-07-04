'use strict';

const title = document.getElementById('title');
const text = document.getElementById('text');

const button = document.getElementById('button');
const output = document.getElementById('output');

function createPost(obj) {
  const post = document.createElement('div');
  post.className = 'post';
  post.innerHTML = `<h2>${obj.title}</h2><p>${obj.body}</p>`;
  output.append(post);
}

function sendPost(title, text) {
  fetch('https://jsonplaceholder.typicode.com/posts', {
      method: 'POST',
      body: JSON.stringify({
        title: title,
        body: text,
      })
      ,
      headers: {
        "Content-type": "application/json; charset=UTF-8"
      }
    })
    .then(response => response.json())
    .then(json => createPost(json))
}

function clearInputs() {
    title.value = '';
    text.value = '';
}

button.addEventListener('click', () => {
    sendPost(title.value, text.value);
    clearInputs();
});
