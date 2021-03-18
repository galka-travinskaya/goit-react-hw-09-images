import React, { useState, useCallback } from 'react';
import Searchbar from './components/Searchbar/Searchbar';
import ImageGallery from './components/ImageGallery';

export default function App() {
  // state = {
  //   imageName: '',
  // };
  const [imageName, setImageName] = useState('');

  const handleFormSubmit = useCallback(imageName => {
    setImageName(imageName);
    // this.setState({ imageName });
  }, []);

  return (
    <>
      <Searchbar onSubmit={handleFormSubmit} />
      <ImageGallery imageName={imageName} />
    </>
  );
}
