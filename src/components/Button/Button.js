import React from 'react';
import s from './Button.module.css';

export default function Button({ onLoadMore }) {
  // const { onLoadMore } = this.props;

  return (
    <button
      data-action="loadMore"
      type="button"
      className={s.Button}
      onClick={onLoadMore}
    >
      Load more
    </button>
  );
}
