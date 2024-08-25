import React, { useState } from 'react';
import axios from 'axios';
import Searchbar from './components/Searchbar';
import ImageGallery from './components/ImageGallery';
import Loader from './components/Loader';
import Button from './components/Button';
import Modal from './components/Modal';


const PIXABAY_API_KEY = '44301427-831c86290fcfe2068098f5d0c'; 

function App() {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [selectedImage, setSelectedImage] = useState(null);
  const [hasMoreImages, setHasMoreImages] = useState(true);

  const fetchImages = async (searchQuery, pageNumber) => {
    setLoading(true);
    try {
      const response = await axios.get(
        `https://pixabay.com/api/`,
        {
          params: {
            q: searchQuery,
            page: pageNumber,
            key: PIXABAY_API_KEY,
            image_type: 'photo',
            orientation: 'horizontal',
            per_page: 20,
          },
        }
      );

      if (pageNumber === 1) {
        setImages(response.data.hits);
      } else {
        setImages((prevImages) => [...prevImages, ...response.data.hits]);
      }

      if (response.data.hits.length < 12) {
        setHasMoreImages(false);
      } else {
        setHasMoreImages(true);
      }
    } catch (error) {
      console.error("Error fetching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleSearchSubmit = (searchQuery) => {
    setQuery(searchQuery);
    setPage(1);
    fetchImages(searchQuery, 1);
  };

  const handleLoadMore = () => {
    const nextPage = page + 1;
    setPage(nextPage);
    fetchImages(query, nextPage);
  };

  const handleImageClick = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <div className="app">
      <Searchbar onSubmit={handleSearchSubmit} />
      <ImageGallery images={images} onImageClick={handleImageClick} />
      {loading && <Loader />}
      {images.length > 0 && hasMoreImages && !loading && <Button onClick={handleLoadMore} />}
      {selectedImage && <Modal image={selectedImage} onClose={closeModal} />}
    </div>
  );
}

export default App;