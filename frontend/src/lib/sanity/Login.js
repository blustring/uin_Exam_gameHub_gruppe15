import React, { useState } from 'react';
import sanityClient from './sanityClient';

const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Call a function to check the user's credentials
    const loggedIn = await login(email);
    if (loggedIn) {
      onLogin();
    }
  };

  const login = async (email) => {
    // Retrieve the user data from Sanity based on the provided email
    const query = `*[_type == "user" && email == $email]`;
    const result = await sanityClient.fetch(query, { email });

    if (result.length === 0) {
      // User not found
      return false;
    } else {
      const user = result[0];
      // Store the user data in localStorage
      localStorage.setItem('user', JSON.stringify(user));

      // Successful login
      // Pag reload like thi is not optimal, i would've done it different if i had more time.
      window.location.href = '/';
      return true;
    }
    
  };

  return (
    <div className="login-container">
    <h2>Login</h2>
    <form className="login-form" onSubmit={handleSubmit}>
      <div>
        <label for="email">Email:</label>
        <input type="email" placeholder="Enter your email"  value={email} onChange={handleEmailChange} required />
      </div>
      <button id="loginBtn" type="submit">Login</button>
    </form> 
  </div>
  
  );
};

export default Login;