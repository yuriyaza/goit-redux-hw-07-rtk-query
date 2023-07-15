import { useSelector, useDispatch } from 'react-redux';

import { contactSlice } from 'redux/contactSlice';
import css from './Filter.module.css';

export const Filter = () => {
  const { filter } = useSelector(store => store.contactSlice);
  const dispatch = useDispatch();

  const setFilter = filter => {
    dispatch(contactSlice.actions.setFilter(filter));
  };

  return (
    <label className={css.field}>
      <span className={css.label}>Find contacts by name:</span>

      <input
        className={css.input}
        type='text'
        name='filter'
        value={filter}
        onChange={e => {
          setFilter(e.target.value);
        }}
      />
    </label>
  );
};
