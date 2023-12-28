'use strict';
console.log('front.js file was loaded');

const baseUrl = 'http://localhost:3000/api';
const postsUrl = `${baseUrl}/posts`;

const els = {
  postsContainer: document.getElementById('posts-container'),
  errorTop: document.getElementById('error-el-top'),
};

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

  function getPosts(url) {
    return fetch(url)
      .then((resp) => {
        console.log('resp ===', resp);
        return resp.json();
      })
      .then((data) => {
        // console.log('data ===', data);
        return data;
      })
      .catch((error) => {
        console.warn('ivyko klaida getPosts:', error);
        if (error.message === 'Failed to fetch') {
          showError('Something went wrong, try again later');
        }
        console.log('error.message ===', error.message);
      });
  }

  function showError(msg) {
    els.errorTop.textContent = msg;
  }
  function clearErrors() {
    els.errorTop.textContent = '';
  }

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
