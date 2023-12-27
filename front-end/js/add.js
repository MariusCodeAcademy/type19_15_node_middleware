'use strict';
console.log('add.js file was loaded');

const postsUrl = 'http://localhost:3000/api/posts';

// nusitaikyti i forma ir inputus
const els = {
  form: document.getElementById('add-post-form'),
  title: document.getElementById('title'),
  author: document.getElementById('author'),
  date: document.getElementById('date'),
  body: document.getElementById('body'),
};
// formai event listeneri
els.form.addEventListener('submit', addPost);

function addPost(event) {
  event.preventDefault();
  // console.log('form was submitted');
  // pasiimti reiksmes is inputu
  const title = els.title.value.trim();
  const author = els.author.value.trim();
  const date = els.date.value.trim();
  const body = els.body.value.trim();

  // console.log(title, author, date, body);
  // sukurti objekta
  const newPostObj = {
    title,
    author,
    date,
    body,
  };
  // console.log(postObj);
  // sukurti posta
  createPost(newPostObj);
}

function createPost(postObj) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(postObj),
    body: JSON.stringify(postObj),
  };
  fetch(postsUrl, options)
    .then((resp) => {
      console.log('resp ===', resp);
      if (resp.status === 201) {
        // alert('post was created');
        window.location.href = 'index.html';
        // return;
      }
      return resp.json();
    })
    .then((data) => {
      console.log('data ===', data);
      if (data.type === 'validation') {
        // handleErrors(data);
        return;
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida createPost:', error);
    });
}
// surinkiti inputus i objeka ir isiusti ji i backend
// jei sekmingai sukurtas postas, naviguoti i index.html
// window.location.href = '';

// backe yra vaildacija title ir autoriui
// A pranesti bendru pranesimu (sukurti/atslepti alert elementa)
// B atvaizduoti lauka kuriame yra klaida su klaidos klase (is-invalid klase)
