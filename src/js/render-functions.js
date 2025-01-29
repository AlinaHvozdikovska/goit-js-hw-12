import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

export const gallery = document.querySelector('.gallery');

const modalSimpleLiteBox = new SimpleLightbox('.gallery a', {
  captions: true,
  captionsData: 'alt',
  captionDelay: 250,
});

export function renderGallery(images) {
  const markup = images
    .map(image => {
      return `
        <li class="gallery-item">
          <a class="gallery-link" href="${image.largeImageURL}">
            <img
            class="gallery-image"
            src="${image.webformatURL}"
            alt="${image.tags}"
            />
          </a>
          <div class="stat-container">
            <div>
                <span><b>Likes</b></span>
                <span>${image.likes}</span>
            </div>
            <div>
                <span><b>Views</b></span>
                <span>${image.views}</span>
            </div>
             <div>
                <span><b>Comments</b></span>
                <span>${image.comments}</b></span>
            </div>
             <div>
                <span><b>Downloads</b></span>
                <span>${image.downloads}</span>
            </div>
          </div>
        </li>
    `;
    })
    .join('');
  /* Додаємо нові зображення */
  gallery.insertAdjacentHTML('beforeend', markup);

  modalSimpleLiteBox.refresh();
}
