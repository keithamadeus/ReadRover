import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../utils/mutations';
import Auth from '../utils/auth.js';


interface LoginFormProps {

  handleModalClose: () => void;

}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login] = useMutation(LOGIN_USER);

  interface FormState {
    email: string;
    password: string;
  }

  interface ChangeEvent {
    target: {
      name: string;
      value: string;
    };
  }
  

  const handleChange = (event: ChangeEvent) => {
    const { name, value } = event.target;
    setFormState((prevState: FormState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  interface FormSubmitEvent {
    preventDefault: () => void;
  }

  interface LoginData {
    login: {
      token: string;
    };
  }

  const handleFormSubmit = async (event: FormSubmitEvent) => {
    event.preventDefault();

    try {
      const { data } = await login({
        variables: { ...formState },
      });

      Auth.login((data as LoginData).login.token);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <form onSubmit={handleFormSubmit}>
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

export default LoginForm;
