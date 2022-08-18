import React, { useState, useEffect } from 'react';
import { useGetUsersQuery } from './app/services/users';
import {
  FaEnvelopeOpen,
  FaUser,
  FaCalendarTimes,
  FaMap,
  FaPhone,
  FaLock,
} from 'react-icons/fa';

function App() {
  const [person, setPerson] = useState([]);
  const [value, setValue] = useState('Random Person');
  const [title, setTitle] = useState('Name');

  const { data, isLoading, refetch } = useGetUsersQuery();
  const defaultImage = 'https://randomuser.me/api/portraits/men/75.jpg';

  useEffect(() => {
    if (data) {
      const randomUser = data.results[0];
      const {
        email,
        phone,
        picture: { large: image },
        login: { password },
        name: { first, last },
        dob: { age },
        location: {
          street: { number, name },
        },
      } = randomUser;
      const newPerson = {
        email,
        phone,
        image,
        password,
        age,
        street: `${number} ${name}`,
        name: `${first} ${last}`,
      };
      setPerson(newPerson);
      setTitle('Name');
      setValue(newPerson.name);
    }
  }, [data]);

  const handleValue = e => {
    e.preventDefault();

    if (e.target.classList.contains('icon')) {
      const newValue = e.target.dataset.label;
      setTitle(newValue);
      setValue(person[newValue]);
    }
  };

  return (
    <main>
      <div className='block bcg-black'></div>
      <div className='block'>
        <div className='container'>
          <img
            src={person?.image || defaultImage}
            alt='random user'
            className='user-img'
          />
          <p className='user-title'>My {title}</p>
          <p className='user-value'>{value}</p>
          <div className='values-list'>
            <button
              data-label='name'
              className='icon'
              onMouseOver={handleValue}
            >
              <FaUser />
            </button>
            <button
              data-label='email'
              className='icon'
              onMouseOver={handleValue}
            >
              <FaEnvelopeOpen />
            </button>
            <button data-label='age' className='icon' onMouseOver={handleValue}>
              <FaCalendarTimes />
            </button>
            <button
              data-label='street'
              className='icon'
              onMouseOver={handleValue}
            >
              <FaMap />
            </button>
            <button
              data-label='phone'
              className='icon'
              onMouseOver={handleValue}
            >
              <FaPhone />
            </button>
            <button
              data-label='password'
              className='icon'
              onMouseOver={handleValue}
            >
              <FaLock />
            </button>
          </div>
          <button className='btn' type='button' onClick={() => refetch()}>
            {isLoading ? 'Loading...' : 'Random User'}
          </button>
        </div>
      </div>
    </main>
  );
}

export default App;
