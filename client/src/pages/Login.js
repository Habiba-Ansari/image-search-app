import React from 'react';
import { useAuth } from '../context/AuthContext';
import './Login.css';

const Login = () => {
  const { login } = useAuth();

  const handleOAuthLogin = (provider) => {
    window.location.href = `http://localhost:5000/auth/${provider}`;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Image Search App</h1>
        <p>Search and discover beautiful images from Unsplash</p>
        
        <div className="oauth-buttons">
          <button 
            onClick={() => handleOAuthLogin('google')} 
            className="oauth-btn google-btn"
          >
            <img src="/google-icon.png" alt="Google" />
            Continue with Google
          </button>
          
          <button 
            onClick={() => handleOAuthLogin('facebook')} 
            className="oauth-btn facebook-btn"
          >
            <img src="/facebook-icon.png" alt="Facebook" />
            Continue with Facebook
          </button>
          
          <button 
            onClick={() => handleOAuthLogin('github')} 
            className="oauth-btn github-btn"
          >
            <img src="/github-icon.png" alt="GitHub" />
            Continue with GitHub
          </button>
        </div>

        <div className="demo-info">
          <p><strong>Demo Features:</strong></p>
          <ul>
            <li>Search high-quality images from Unsplash</li>
            <li>Multi-select functionality with real-time counter</li>
            <li>Personal search history</li>
            <li>Top trending searches across all users</li>
            <li>Secure OAuth login with multiple providers</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Login;