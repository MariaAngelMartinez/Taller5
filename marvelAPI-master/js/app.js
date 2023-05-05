const marvel = {

  render: () => {
    const urlAPI = 'https://gateway.marvel.com/v1/public/characters?ts=1&apikey=1c2d8b5513f466a31322cff4a854dc87&hash=9c9e909861697816758cc39a59ef77a4';
    const container = document.querySelector('#marvel-row');
    let contentHTML = '';

    fetch(urlAPI)
      .then(res => res.json())
      .then((json) => {
        for (const hero of json.data.results) {
          let urlHero = hero.urls[0].url;
          contentHTML += `
            <div class="col-md-4">
                <a href="${urlHero}" target="_blank">
                  <img src="${hero.thumbnail.path}.${hero.thumbnail.extension}" alt="${hero.name}" class="img-thumbnail">
                </a>
                <h3 class="title">${hero.name}</h3>
            </div>`;
        }
        container.innerHTML = contentHTML;
        addEventListeners();
      })
  }
};

function addEventListeners() {
  const buttons = document.querySelectorAll('.btn-primary');
  buttons.forEach(button => {
    button.addEventListener('click', () => {
      const id = button.dataset.id;
      showComics(id);
    });
  });
}

function showComics(id) {
  const urlAPI = `https://gateway.marvel.com/v1/public/characters/${id}/comics?ts=1&apikey=1c2d8b5513f466a31322cff4a854dc87&hash=9c9e909861697816758cc39a59ef77a4`;
  const container = document.querySelector('#comics-container');
  let contentHTML = '';

  fetch(urlAPI)
    .then(res => res.json())
    .then((json) => {
      for (const comic of json.data.results) {
        let urlComic = comic.urls[0].url;
        contentHTML += `
          <div class="col-md-4">
            <a href="${urlComic}" target="_blank">
              <img src="${comic.thumbnail.path}.${comic.thumbnail.extension}" alt="${comic.title}" class="img-thumbnail">
            </a>
            <h3 class="title">${comic.title}</h3>
          </div>`;
      }
      container.innerHTML = contentHTML;
    })
}
marvel.render();
