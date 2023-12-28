console.log('login.js file was loaded');

const authUrl = 'http://localhost:3000/api/auth/login';

// nusitaikyti i forma ir inputus
const els = {
  form: document.getElementById('login-form'),
  username: document.getElementById('username'),
  password: document.getElementById('password'),
};
// formai event listeneri
els.form.addEventListener('submit', login);

function login(event) {
  event.preventDefault();
  // console.log('form was submitted');
  // pasiimti reiksmes is inputu
  const username = els.username.value.trim();
  const password = els.password.value.trim();

  // console.log(username, password);
  // sukurti objekta
  const loginObj = {
    username,
    password,
  };
  // console.log(loginObj);
  // sukurti posta
  loginUser(loginObj);
}

function loginUser(loginObj) {
  const options = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // body: JSON.stringify(postObj),
    body: JSON.stringify(loginObj),
  };
  fetch(authUrl, options)
    .then((resp) => {
      console.log('resp ===', resp);
      if (resp.status === 200) {
        // alert('post was created');
        window.location.href = 'index.html';
        // return;
      }
      return resp.json();
    })
    .then((data) => {
      console.log('data ===', data);
      if (data.type === 'validation') {
        alert(data.msg);
      }
    })
    .catch((error) => {
      console.warn('ivyko klaida loginUser:', error);
    });
}

// create a reusable function for fetching data that is easy to use and check for errors
function getData(url) {
  return fetch(url)
    .then((resp) => {
      if (resp.status >= 200 && resp.status <= 299) {
        return resp.json();
      }
      return resp.json().then((data) => {
        throw new Error(data.msg);
      });
    })
    .catch((error) => {
      console.warn('ivyko klaida getData:', error);
    });
}
