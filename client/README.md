# 🖼️ Image Search App - MERN Stack + OAuth

A full-stack image search application built with the MERN stack (MongoDB, Express.js, React.js, Node.js) featuring OAuth authentication, Unsplash API integration, and real-time search functionality.

## 🚀 Features

- **🔐 OAuth Authentication** - Login with Google, Facebook, and GitHub
- **🖼️ Image Search** - Search millions of high-quality images from Unsplash API
- **🎯 Multi-Select** - Select multiple images with real-time counter
- **🔥 Top Searches** - Discover trending searches across all users
- **📝 Search History** - Personal search history with quick re-search
- **⬇️ Download Images** - Download single or multiple selected images
- **⌨️ Keyboard Shortcuts** - Ctrl+A (Select All), Escape (Clear), Ctrl+D (Download)
- **📱 Responsive Design** - Works perfectly on desktop, tablet, and mobile
- **⚡ Real-time Updates** - Live selected images counter and search results

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router
- Axios for API calls
- CSS3 with Grid & Flexbox
- Context API for state management

### Backend
- Node.js
- Express.js
- MongoDB with Mongoose
- Passport.js for OAuth
- Express Sessions

### External APIs
- Unsplash API for images
- Google OAuth 2.0
- Facebook OAuth
- GitHub OAuth

## 📁 Project Structure
image-search-app/
├── client/ # React frontend
│ ├── public/
│ ├── src/
│ │ ├── components/ # Reusable components
│ │ ├── pages/ # Page components
│ │ ├── context/ # React context
│ │ ├── hooks/ # Custom hooks
│ │ ├── services/ # API services
│ │ └── App.js
│ └── package.json
├── server/ # Express backend
│ ├── config/ # Passport configuration
│ ├── models/ # MongoDB models
│ ├── routes/ # API routes
│ ├── services/ # External API services
│ └── server.js
└── README.md


## 🚀 Quick Start

### Prerequisites
- Node.js (v14 or higher)
- MongoDB (local or Atlas)
- Git

### Installation

1. **Clone the repository**
   ```bash
   git clone <your-repo-url>
   cd image-search-app