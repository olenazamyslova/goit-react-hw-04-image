import React, { useState, useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Searchbar from './Searchbar/Searchbar';
import ImageGallery from './ImageGallery/ImageGallery';
import Modal from './Modal/Modal';
import Button from './Button/Button';
import Loader from './Loader/Loader';
import { fetchImages } from 'components/services/fetchImages';

const App = () => {
  const [searchRequest, setSearchRequest] = useState('');
  const [images, setImages] = useState([]);
  const [galleryPage, setGalleryPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(null);
  const [showBtn, setShowBtn] = useState(false);

  useEffect(() => {
    if (searchRequest.trim() === '') {
      return;
    }

    setIsLoading(true);
    setTimeout(() => {
      try {
        fetchImages(searchRequest, galleryPage).then(data => {
          if (!data.data.hits.length) {
            return toast.error('There are no images found ;(');
          }

          const mappedImages = data.data.hits.map(
            ({ id, webformatURL, tags, largeImageURL }) => ({
              id,
              webformatURL,
              tags,
              largeImageURL,
            })
          );

          setImages(prevImages => [...prevImages, ...mappedImages]);
          setShowBtn(galleryPage < Math.ceil(data.data.totalHits / 12));
          console.log(data.data.totalHits);
        });
      } catch (error) {
        setError(error);
      } finally {
        setIsLoading(false);
      }
    }, 1000);

    return () => {
      setImages([]);
      setGalleryPage(1);
      setError(null);
    };
  }, [searchRequest, galleryPage]);

  const handleSearchSubmit = searchRequest => {
    setSearchRequest(searchRequest);
  };

  const loadMore = () => {
    setGalleryPage(prevPage => prevPage + 1);
  };

  const showModalImage = id => {
    const image = images.find(image => image.id === id);
    setShowModal({
      largeImageURL: image.largeImageURL,
      tags: image.tags,
    });
  };

  const closeModalImage = () => {
    setShowModal(null);
  };

  return (
    <>
      <Searchbar onSearch={handleSearchSubmit} />
      {error && toast.error(`Something went wrong: ${error.message}`)}
      {images.length > 0 && (
        <>
          <ImageGallery images={images} handlePreview={showModalImage} />
          {showBtn && <Button loadMore={loadMore} />}
        </>
      )}
      {isLoading && <Loader color={'#3f51b5'} size={200} />}
      {showModal && (
        <Modal
          lgImage={showModal.largeImageURL}
          tags={showModal.tags}
          closeModal={closeModalImage}
        />
      )}
      <ToastContainer autoClose={2500} />
    </>
  );
};

export default App;


