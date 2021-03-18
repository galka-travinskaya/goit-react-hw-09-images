import React, { useState, useCallback } from 'react';
import s from './Searchbar.module.css';

export default function Searchbar({ onSubmit }) {
  // state = {
  //   query: '',
  // };

  const [query, setQuery] = useState('');

  const handleNameChange = e => {
    setQuery(e.currentTarget.value.toLowerCase());
    // this.setState({ query: e.currentTarget.value.toLowerCase() });
  };

  const handleSubmit = useCallback(
    e => {
      e.preventDefault();

      if (query.trim() === '') {
        alert('Пустое поле');
        return;
      }

      onSubmit(query);
      setQuery('');
      // this.setState({ query: '' });
    },
    [query, onSubmit],
  );

  return (
    <header className={s.Searchbar}>
      <form className={s.SearchForm} onSubmit={handleSubmit}>
        <button type="submit" className={s.SearchForm__button}>
          <span className={s.SearchForm__button_label}>Search</span>
        </button>

        <input
          className={s.SearchForm__input}
          type="text"
          // autocomplete="off"
          // autofocus
          placeholder="Search images and photos"
          value={query}
          onChange={handleNameChange}
        />
      </form>
    </header>
  );
}
