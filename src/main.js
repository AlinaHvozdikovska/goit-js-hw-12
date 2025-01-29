import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import { getImages } from './js/pixabay-api';
import { renderGallery } from './js/render-functions';
import { gallery } from './js/render-functions';

const searchForm = document.querySelector('.search-form');
const loader = document.querySelector('.loader');
const loadMoreBtn = document.querySelector('.load-btn');

let userInputValue = '';
/* Змінна для сторінки яка зараз */
let currentPage = 1;
/* Змінна для зберігання загальної кількості зображень */
let totalHits = 0;
/* Кількість завантажених зображень */
let loadedImagesCount = 0;

function showLoader() {
  /*  Показуємо лоадер */
  loader.style.display = 'block';
}

function hideLoader() {
  /* Ховаємо лоадер */
  loader.style.display = 'none';
}

searchForm.addEventListener('submit', async ev => {
  ev.preventDefault();

  gallery.innerHTML = '';
  userInputValue = ev.target.elements.search.value.trim().toLowerCase();
  /* Скидання сторінки при новому запиті */
  currentPage = 1;
  /* Скидання кількості завантажених зображень */
  loadedImagesCount = 0;

  if (userInputValue === '') {
    iziToast.show({
      message: 'Input field can not be empty. Please enter your message.',
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    return;
  }

  /* Відображаємо лоадер перед запитом */
  showLoader();
  /* Сховати кнопку перед новим запитом */
  loadMoreBtn.style.display = 'none';

  try {
    const images = await getImages(userInputValue, currentPage);
    /* Отримуєм загальну кількість зображень */
    totalHits = images.totalHits;

    if (images.hits.length === 0) {
      iziToast.show({
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        messageColor: '#ffffff',
        backgroundColor: '#ef4040',
        position: 'topRight',
      });
    } else {
      // Рендерим зображення при успішному запиті
      renderGallery(images.hits);
      /* Збільшуємо кількість завантажених зображень */
      loadedImagesCount += images.hits.length;
      /* показати кнопку після отримання зображення */
      loadMoreBtn.style.display = 'block';
      /*Збільшення сторінки для майбутніх запитів */
      currentPage++;

      /* Скролл сторінки на дві висоти карток галереї */
      const cardHeight =
        gallery.firstElementChild.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      /* Перевірка чи це кінець колекції */
      if (loadedImagesCount >= totalHits) {
        /* Приховуємо кнопку */
        loadMoreBtn.style.display = 'none';

        iziToast.show({
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: '#ffffff',
          backgroundColor: '#ef4040',
          position: 'topRight',
        });
      }
    }
  } catch (error) {
    iziToast.show({
      message: `${error}`,
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
    /* Ховаємо лоадер після завершення запиту*/
  } finally {
    hideLoader();
  }

  searchForm.reset();
});

/* обробка натискання кнопки */
loadMoreBtn.addEventListener('click', async () => {
  showLoader();

  try {
    const images = await getImages(userInputValue, currentPage);
    if (images.hits.length > 0) {
      /* Додавання нових зображень */
      renderGallery(images.hits);
      /* Збільшення кількості завантажених зображень */
      loadedImagesCount += images.hits.length;
      /*Збільшення сторінки для майбутніх запитів */
      currentPage++;

      /* Cкролл сторінки на дві висоти карток галереї */
      const cardHeight =
        gallery.firstElementChild.getBoundingClientRect().height;
      window.scrollBy({
        top: cardHeight * 2,
        behavior: 'smooth',
      });

      /* Перевірка чи кінець колекції */
      if (loadedImagesCount >= totalHits) {
        loadMoreBtn.style.display = 'none';
        iziToast.show({
          message: "We're sorry, but you've reached the end of search results.",
          messageColor: '#ef4040',
          position: 'topRight',
        });
      }
    } else {
      /* Схована кнопка якщо більше немає зображень */
      loadMoreBtn.style.display = 'none';
    }
  } catch (error) {
    iziToast.show({
      message: `${error}`,
      messageColor: '#ffffff',
      backgroundColor: '#ef4040',
      position: 'topRight',
    });
  } finally {
    hideLoader();
  }
});
