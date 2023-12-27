'use strict';
console.log('front.js file was loaded');

const baseUrl = 'http://localhost:3000/api';
const postsUrl = `${baseUrl}/posts`;

const els = {
  postsContainer: document.getElementById('posts-container'),
};

//
(async () => {
  // iffe body

  const postsArr = await getPosts(postsUrl);
  console.log('postsArr ===', postsArr);
  //
  const firstPostHtml = makeSinglePostHtmlEl(postsArr[0]);
  console.log(firstPostHtml);
  // first post to container
  els.postsContainer.append(firstPostHtml);

  // sukurti funkcija render(arr)
  // is arr masyvo pagamina postu html elementus ir sudeda juos i postsContainer
  // issivalyti konteineri pries generuojant

  function getPosts(url) {
    return fetch(url)
      .then((resp) => resp.json())
      .then((data) => {
        // console.log('data ===', data);
        return data;
      })
      .catch((error) => {
        console.warn('ivyko klaida getPosts:', error);
      });
  }

  // posts to html
  // makeSinglePost
  // paimti reiksmes is pObj ir surasyti i atitinkamas post vietas
  function makeSinglePostHtmlEl(pObj) {
    const columnEl = document.createElement('div');
    columnEl.className = 'col-lg-4 col-sm-6';
    columnEl.innerHTML = `
    <div class="card">
      <div class="card-body">
        <h5 class="card-title">Cia bus title</h5>
        <h6 class="card-subtitle mb-2 text-body-secondary">autorius</h6>
        <p class="card-text">primi 100 texto simboliu...</p>
        <a href="#" class="btn btn-info text-white">Read more</a>
      </div>
      <div class="card-footer text-body-secondary">
        data bus cia
      </div>
    </div>
  `;
    return columnEl;
  }
})();
