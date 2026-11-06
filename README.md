# ToDoList

A full-stack to-do list app built with **React**, **Node.js** and **MongoDB**.

**Live demo:** https://todolist-web-6j81.onrender.com

## Features

- Add new tasks
- Edit existing tasks
- Mark tasks as complete / incomplete
- Delete tasks
- Tasks are saved in MongoDB, so they persist between sessions

## Tech Stack

| Layer    | Technology         |
| -------- | ------------------ |
| Frontend | React              |
| Backend  | Node.js, Express   |
| Database | MongoDB            |
| Hosting  | Render             |

## Project Structure

```
ToDoList/
├── Client/     # React frontend
├── Server/     # Node.js backend (REST API)
├── LICENSE
└── README.md
```

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or later recommended)
- [MongoDB](https://www.mongodb.com/) (local install or a free MongoDB Atlas cluster)
- npm

### 1. Clone the repository

```bash
git clone https://github.com/Soumyasriau/ToDoList.git
cd ToDoList
```

### 2. Set up the server

```bash
cd Server
npm install
```

Create a `.env` file in the `Server` folder:

```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
```

Start the server:

```bash
npm start
```

### 3. Set up the client

Open a new terminal:

```bash
cd Client
npm install
```

Create a `.env` file in the `Client` folder and point it to your API:

```env
# Use the variable name your client code reads (e.g. VITE_API_URL or REACT_APP_API_URL)
VITE_API_URL=http://localhost:5000
```

Start the client:

```bash
npm start
```

The app will be available at `http://localhost:3000` (or `http://localhost:5173` if you use Vite).

## Environment Variables

| Variable      | Location | Description                          |
| ------------- | -------- | ------------------------------------ |
| `PORT`        | Server   | Port the API runs on                 |
| `MONGO_URI`   | Server   | MongoDB connection string            |
| `*_API_URL`   | Client   | Base URL of the backend API          |

> Never commit `.env` files. They are listed in `.gitignore`.

## Deployment

The app is deployed on [Render](https://render.com/). When deploying, set the same environment variables in the Render dashboard, and set the client's API URL to your deployed server URL.

## Contributing

Contributions are welcome! Fork the repo, create a branch, commit your changes and open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).

## Author

Built by [Soumyasriau](https://github.com/Soumyasriau).
