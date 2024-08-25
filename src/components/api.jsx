import axios from 'axios';

export default async function getImages(searchQuery, page = 1) {
  try {
    const BASE_URL = `https://pixabay.com/api/`;
    const searchParams = new URLSearchParams({
      key: '44301427-831c86290fcfe2068098f5d0c',
      q: `${searchQuery}`,
      image_type: 'photo',
      orientation: 'horizontal',
      safesearch: 'true',
      page: `${page}`,
      per_page: 12,
    });

    const response = await axios(`${BASE_URL}/?${searchParams}`);

    return response;
  } catch (error) {
    throw new Error(error);
  }
}