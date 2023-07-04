const container = document.getElementById('container');

function createDiv(content) {
  const div = document.createElement('div');
  div.innerHTML = content;
  return div;
}

document.addEventListener("DOMContentLoaded", (event) => {
  fetch('https://jsonplaceholder.typicode.com/posts')
  .then(res => res.json())
  .then(articles => {
      articles.forEach(el => {
        const article = `<h2>Title: ${el.title}</h2><p>Article: ${el.body}</p>`;
        const divContent = createDiv(article);
        container.append(divContent);
      });
  })
  .catch(error => console.log(error));
});
