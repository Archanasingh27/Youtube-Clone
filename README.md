# YouTube Clone

A full-stack YouTube clone developed using the MERN stack. The project provides core video-sharing functionality including authentication, video management, channels, comments, reactions, search, category filtering, and a responsive user interface.

## Tech Stack

### Frontend

* React.js
* React Router
* Axios
* CSS
* Vite

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT Authentication

## Features

* User registration and login
* JWT-based authentication
* Create and manage channels
* Upload, edit, and delete videos
* Video playback with thumbnails
* View count 
* Like and dislike functionalitySave videos
* hare video links
* Add, edit, and delete own comments
* Search videos
* Category-based video filtering
* Suggested videos
* Responsive design for desktop, tablet, and mobile
* Mock data for demonstration

## Project Structure

```text
youtube-clone/
│
├── frontend/
│   ├── src/
│   ├── public/
│   ├── package.json
│   └── vite.config.js
│
└── backend/
    ├── config/
    ├── controllers/
    ├── middleware/
    ├── models/
    ├── routes/
    ├── package.json
    └── server.js
```
## 
Before running the project, make sure the following are installed:

* Node.js
* npm
* MongoDB or MongoDB Atlas


## Installation

Clone the repository:

```bash
git clone https://github.com/Archanasingh27/Youtube-Clone.git
cd Youtube-Clone
``
## Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file inside the `backend` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Start the backend:

```bash
npm run dev
```

The backend will run on:

```text
http://localhost:5000
```

### Frontend Setup

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will run on the URL provided by Vite, usually:

```text
http://localhost:5173
```

## Usage

1. Register a new user account.
2. Log in to the application.
3. Create a channel.
4. Upload videos to the channel.
5. Browse and search available videos.
6. Filter videos by category.
7. Watch videos and interact using likes, dislikes, saves, and comments.
8. Manage your own videos, channel, and comments.

## Mock Data

The project includes mock video data for demonstration and testing purposes. This allows the application to display videos even when limited real content is available.

## Authentication

The application uses JWT-based authentication. Authentication tokens are used to protect operations such as:

* Creating channels
* Uploading videos
* Editing and deleting videos
* Adding comments
* Editing and deleting own comments
* Reacting to videos
* Saving videos


The sidebar, video grid, video player, suggested videos, and header adapt to different screen sizes.

.

## Repository

GitHub: https://github.com/Archanasingh27

## Author

Archana Singh
