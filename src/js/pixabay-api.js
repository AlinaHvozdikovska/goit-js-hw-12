import axios from 'axios';

export async function getImages(userInputValue, page = 1) {
  const searchParams = new URLSearchParams({
    key: '48339480-4f5c45a75f87f035650b36ee2',
    q: userInputValue,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: 15,
    page: page,
  });

  try {
    const response = await axios.get(
      `https://pixabay.com/api/?${searchParams}`
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.status : 'Network Error');
  }
}
