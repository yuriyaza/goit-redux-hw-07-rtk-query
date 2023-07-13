import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { contactSlice } from 'redux/contactSlice';
import { Notify } from 'notiflix';

import { fetchContacts, addContact, deleteContact } from 'redux/operations';

import { ContactForm } from 'components/ContactForm/ContactForm';
import { ContactList } from 'components/ContactList/ContactList';
import { Filter } from 'components/Filter/Filter';
import { Spinner } from 'components/Spinner/Spinner';
import css from './App.module.css';

Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export const App = () => {
  const { contacts, filter, error, isLoading } = useSelector(state => state.contactState);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchContacts());
  }, [dispatch]);

  useEffect(() => {
    if (error) Notify.failure(error);
  }, [error]);

  const onAddContact = newContact => {
    const nameList = contacts.map(contact => contact.name.toLowerCase());

    if (nameList.includes(newContact.name.toLowerCase())) {
      Notify.failure(`${newContact.name} is already in contacts`);
      return;
    }
    dispatch(addContact(newContact));
  };

  const onDeleteContact = id => {
    dispatch(deleteContact(id));
  };

  const onSetFilter = filter => {
    dispatch(contactSlice.actions.setFilter(filter));
  };

  const filteredContacts = contacts.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  return (
    <div className={css.container}>
      <h1 className={css.title}>Phonebook</h1>
      <ContactForm onAddContact={onAddContact} />

      <h2 className={css.subtitle}>Contacts</h2>
      <Filter filter={filter} setFilter={onSetFilter} />

      <ContactList contacts={filteredContacts} onDeleteContact={onDeleteContact} />

      {isLoading && <Spinner />}
    </div>
  );
};
