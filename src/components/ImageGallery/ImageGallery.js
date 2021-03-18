import React, { useState, useEffect, useCallback } from 'react';
import s from './ImageGallery.module.css';
import ImageGalleryItem from '../ImageGalleryItem/ImageGalleryItem';
import Button from '../Button/Button';
import imagesApi from '../../apiService/apiService';
import Modal from '../Modal/Modal';
import Loader from 'react-loader-spinner';

export default function ImageGallery({ imageName }) {
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [status, setStatus] = useState('idle');
  const [showModal, setShowModal] = useState(false);
  const [largeImg, setLargeImg] = useState('');

  useEffect(() => {
    setStatus('pending');
    imagesApi
      .getImg(imageName)
      .then(({ hits, totalHits }) => {
        console.log(hits);
        if (totalHits === 0) {
          return Promise.reject(
            new Error(`По поиску ${imageName} ничего не найдено`),
          );
        }
        window.scrollTo({ top: 0 });
        // return () => {
        setImages(hits);
        setStatus('resolved');
        // };
      })
      .catch(error => {
        setError(error);
        setImages([]);
        setPage(1);
        setStatus('rejected');
      });
  }, [imageName]);

  useEffect(() => {
    setStatus('pending');
    imagesApi
      .getImg(imageName, page)
      .then(response => {
        // return () => {
        setImages([...images, ...response.hits]);
        setStatus('resolved');
        // };
      })
      .catch(error => {
        setError(error);
        setStatus('rejected');
      })
      .finally(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: 'smooth',
        });
      });
  }, [page, imageName]);

  const loadMore = () => {
    // this.setState(prevState => {
    //   return { page: prevState.page + 1 };
    // });
    setPage(page + 1);
  };

  // const toggleModal = () => {
  //   // this.setState(({ showModal }) => ({
  //   //   showModal: !showModal,
  //   // }));
  // }

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  const handleClickImg = largeImg => {
    setLargeImg(largeImg);
    // this.setState({ largeImg: largeImg });
    toggleModal();
  };

  // const { images, error, status, showModal, largeImg } = this.state;
  return (
    <div className={s.ImageGallery__section}>
      {status === 'idle' && <p>Заполните поле</p>}
      <ul className={s.ImageGallery}>
        {images &&
          images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              onClick={() => {
                handleClickImg(image.largeImageURL);
              }}
            />
          ))}
      </ul>
      {status === 'rejected' && (
        <h1 style={{ color: 'red' }}>{error.message}</h1>
      )}
      {status === 'pending' && <Loader type="TailSpin" color="#00BFFF" />}
      {(images.length > 0 || status === 'resolved') && (
        <Button onLoadMore={loadMore} />
      )}
      {showModal && (
        <Modal onToggleModal={toggleModal}>
          <img src={largeImg} alt={images.tags} />
        </Modal>
      )}
    </div>
  );
}

// componentDidUpdate(prevProps, prevState) {
//   const prevName = prevProps.imageName;
//   const nextName = this.props.imageName;
//   const prevPage = prevState.page;
//   const nextPage = this.state.page;

//   if (prevName !== nextName) {
//     this.setState({ status: 'pending' });

//     imagesApi
//       .getImg(nextName)
//       .then(({ hits, totalHits }) => {
//         if (totalHits === 0) {
//           return Promise.reject(
//             new Error(`По поиску ${nextName} ничего не найдено`),
//           );
//         }
//         window.scrollTo({ top: 0 });
//         return this.setState({
//           images: [...hits],
//           status: 'resolved',
//         });
//       })
//       .catch(error =>
//         this.setState({ error, images: [], page: 1, status: 'rejected' }),
//       );
//   }

//   if (prevPage !== nextPage && nextPage !== 1) {
//     this.setState({ status: 'pending' });

//     imagesApi
//       .getImg(nextName, nextPage)
//       .then(images => {
//         return this.setState(prevState => ({
//           images: [...prevState.images, ...images.hits],
//           status: 'resolved',
//         }));
//       })
//       .catch(error => this.setState({ error, status: 'rejected' }))
//       .finally(res => {
//         window.scrollTo({
//           top: document.documentElement.scrollHeight,
//           behavior: 'smooth',
//         });
//       });
//   }
// }
