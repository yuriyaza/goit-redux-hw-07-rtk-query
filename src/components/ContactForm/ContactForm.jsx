import { useState } from 'react';
import { useFetchContactsQuery, useAddContactMutation } from 'redux/phonebook/api';
import { v4 as uuid } from 'uuid';
import { Notify } from 'notiflix';

import { Spinner } from 'components/Spinner/Spinner';
import css from './ContactForm.module.css';

Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export const ContactForm = () => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const { data: contacts, error: fetchError, isLoading: isFetchLoading, isError: isFetchError } = useFetchContactsQuery();
  const [addContact, { error: addError, isLoading: isAddLoading, isError: isAddError }] = useAddContactMutation();

  if (isFetchError || isAddError) {
    const error = { ...fetchError, ...addError };
    Notify.failure(`${error.data || error.error}`);
    return;
  }

  const onInputChange = e => {
    const { name: fieldName, value: fieldValue } = e.target;

    switch (fieldName) {
      case 'name':
        setName(fieldValue);
        break;
      case 'number':
        setNumber(fieldValue);
        break;
      default:
        return undefined;
    }
  };

  const onFormSubmit = e => {
    e.preventDefault();
    const newContact = {
      id: uuid(),
      name,
      number,
    };
    const nameList = contacts.map(contact => contact.name.toLowerCase());
    if (nameList.includes(newContact.name.toLowerCase())) {
      Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }
    addContact(newContact);
    setName('');
    setNumber('');
  };

  return (
    <>
      <form className={css.form} onSubmit={onFormSubmit}>
        <div className={css.inputWrapper}>
          <label>
            <span className={css.label}>Name</span>
            <input
              className={css.input}
              type='text'
              name='name'
              pattern="^[a-zA-Zа-яА-Я]+(([' \-][a-zA-Zа-яА-Я])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={onInputChange}
            />
          </label>

          <label>
            <span className={css.label}>Number</span>
            <input
              className={css.input}
              type='tel'
              name='number'
              pattern='\+?\d{1,4}?[\-.\s]?\(?\d{1,3}?\)?[\-.\s]?\d{1,4}[\-.\s]?\d{1,4}[\-.\s]?\d{1,9}'
              title='Phone number must be digits and can contain spaces, dashes, parentheses and can start with +'
              required
              value={number}
              onChange={onInputChange}
            />
          </label>
        </div>

        <button className={css.button} type='submit'>
          Add contact
        </button>
      </form>

      {(isFetchLoading || isAddLoading) && <Spinner />}
    </>
  );
};
