import { useSelector } from 'react-redux';
import { useFetchContactsQuery, useDeleteContactMutation } from 'redux/contactApi';
import { FaUserCircle } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { Notify } from 'notiflix';

import { Spinner } from 'components/Spinner/Spinner';
import { getRandomColor } from 'js/getRandomColor';
import css from './ContactList.module.css';

Notify.init({ showOnlyTheLastOne: true, clickToClose: true });

export const ContactList = () => {
  const { data = [], error: fetchError, isLoading: isFetchLoading, isError: isFetchError } = useFetchContactsQuery();
  const [deleteContact, { error: deleteError, isLoading: isDeleteLoading, isError: isDeleteError }] = useDeleteContactMutation();

  const { filter } = useSelector(store => store.contactSlice);
  const filteredContacts = data.filter(contact => contact.name.toLowerCase().includes(filter.toLowerCase()));

  if (isFetchError || isDeleteError) {
    const error = { ...fetchError, ...deleteError };
    Notify.failure(`${error.data || error.error}`);
    return;
  }

  return (
    <>
      <ul>
        {filteredContacts.map(({ id, name, number }) => {
          return (
            <li className={css.contactCard} key={id}>
              <div className={css.userIcon} style={{ color: getRandomColor() }}>
                <FaUserCircle />
              </div>

              <div className={css.userInfo}>
                <div className={css.userName}>{name}</div>
                <div>{number}</div>
              </div>

              <button className={css.deleteButton} type='button' onClick={() => deleteContact(id)}>
                <span className={css.deleteIcon}>
                  <BsTrash />
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {(isFetchLoading || isDeleteLoading) && <Spinner />}
    </>
  );
};
