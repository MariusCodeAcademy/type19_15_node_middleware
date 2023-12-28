console.log('login.js file was loaded');

const authUrl = 'http://localhost:3000/api/auth/login';

// nusitaikyti i forma ir inputus
const els = {
  form: document.getElementById('login-form'),
  username: document.getElementById('username'),
  password: document.getElementById('password'),
  errorTop: document.getElementById('error-el-top'),
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

function showError(msg) {
  els.errorTop.textContent = msg;
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
        console.log('issaugti sesijos kintamaji');
        sessionStorage.setItem('loggedIn', loginObj.username);
        window.location.href = 'index.html';
        // return;
      }
      return resp.json();
    })
    .then((data) => {
      console.log('data ===', data);
      showError(data.msg);
    })
    .catch((error) => {
      console.warn('ivyko klaida loginUser:', error);
    });
}
