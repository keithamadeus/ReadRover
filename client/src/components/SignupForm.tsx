import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_USER } from '../utils/mutations';
import Auth from '../utils/auth.js';


interface SignUpFormProps {

  handleModalClose: () => void;

}
const SignupForm: React.FC<SignUpFormProps>  = () => {
  const [formState, setFormState] = useState({ username: '', email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleChange = (event: { target: { name: any; value: any; }; }) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  // interface FormState {
  //   username: string;
  //   email: string;
  //   password: string;
  // }

  const handleFormSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    try {
      const { data } = await addUser({
        variables: { ...formState },
      });

      Auth.login(data.addUser.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
      <input
        name='username'
        type='text'
        value={formState.username}
        onChange={handleChange}
        placeholder='Your username'
      />
      <input
        name='email'
        type='email'
        value={formState.email}
        onChange={handleChange}
        placeholder='Your email'
      />
      <input
        name='password'
        type='password'
        value={formState.password}
        onChange={handleChange}
        placeholder='Your password'
      />
      <button type='submit'>Submit</button>
    </form>
  );
};

export default SignupForm;
