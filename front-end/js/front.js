console.log('front.js file was loaded');

const baseUrl = 'http://localhost:3000/api';
const postsUrl = `${baseUrl}/posts`;

const els = {
  postsContainer: document.getElementById('posts-container'),
  errorTop: document.getElementById('error-el-top'),
};

let isLoggedIn = sessionStorage.getItem('loggedIn');
console.log('isLoggedIn ===', isLoggedIn);
isLoggedIn = Boolean(isLoggedIn);
console.log('isLoggedIn ===', isLoggedIn);
if (isLoggedIn === false) {
  window.location.href = 'login.html';
}

//
(async () => {
  // iffe body

  const [postsArr, error] = await getDataFetch(postsUrl);
  console.log('postsArr ===', postsArr);

  if (error) {
    showError('Kazkas negerai');
    return;
  }

  render(postsArr);
  const firstPostHtml = makeSinglePostHtmlEl(postsArr[0]);
  console.log(firstPostHtml);
  // first post to container
  els.postsContainer.append(firstPostHtml);

  // sukurti funkcija render(arr)
  // is arr masyvo pagamina postu html elementus ir sudeda juos i postsContainer

  function render(arr) {
    // issivalyti konteineri pries generuojant
    els.postsContainer.innerHTML = '';
    const elArr = arr.map(makeSinglePostHtmlEl);

    els.postsContainer.append(...elArr);
  }

  function showError(msg) {
    els.errorTop.textContent = msg;
  }
  // function clearErrors() {
  //   els.errorTop.textContent = '';
  // }

  /*
{
  "post_id": 3,
  "title": "Update update",
  "author": "James Rest 3000",
  "date": "2023-12-03T22:00:00.000Z",
  "body": "Body about post 3"
}
  */
  // posts to html
  // makeSinglePost
  // paimti reiksmes is pObj ir surasyti i atitinkamas post vietas
  function makeSinglePostHtmlEl(pObj) {
    const { title, author, date, body } = pObj;
    const formatedDate = new Date(date).toLocaleDateString('lt-LT');
    const columnEl = document.createElement('div');
    columnEl.className = 'col-lg-4 col-sm-6';
    columnEl.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">${title}</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">${author}</h6>
        <p class="card-text">${body.slice(0, 100)}${
      body.length > 100 ? '...' : ''
    }</p>
        <a href="#" class="btn btn-info text-white">Read more</a>
      </div>
      <div class="card-footer text-body-secondary">
        ${formatedDate}
      </div>
    </div>
  `;
    return columnEl;
  }
})();

// helper fetch fn

async function getDataFetch(url) {
  try {
    const resp = await fetch(url);
    if (resp.ok === false) {
      // eslint-disable-next-line no-throw-literal
      throw {
        status: resp.status,
        message: resp.statusText,
      };
    }
    const data = await resp.json();
    return [data, null];
  } catch (error) {
    console.log('error getDataFetch ===', error);
    return [null, error];
  }
}
