# Gallery Website

![Gallery Website](https://github-production-user-asset-6210df.s3.amazonaws.com/108184610/244605688-3d9fe784-709e-4b74-a2a5-5a49381673bb.png)

## Description

The Gallery Website is a platform where users can upload their personal images and view them in an organized manner. Users are required to log in or create an account to deploy their images. The website offers a search feature to sort images based on specific criteria. The frontend of the website is built using Material UI, giving it a modern and visually appealing look. Additionally, the website provides a dark mode option for users who prefer a darker interface. The entire state of the application is managed by Redux.

The backend of the website utilizes various technologies for authentication, authorization, and database management. JSON Web Token (JWT) is used for secure user authentication and authorization. Bcryptjs is used for password hashing. The database is managed using Mongoose, an Object Data Modeling (ODM) library for MongoDB. Node.js serves as the web server, and Express is used as the web framework.

## Demo

Check out the live demo of the website: [Gallery Website](https://gallery-website-somnath.vercel.app/)

## Installation

To run the website locally, follow these steps:

1. Clone the repository: `git clone https://github.com/your-username/gallery-website.git`
2. Navigate to the frontend directory: `cd frontend`
3. Install frontend dependencies: `npm install`
4. Return to the previous directory: `cd ..`
5. Change the directory to the backend folder: `cd backend`
6. Install backend dependencies: `npm install`
7. Return to the previous directory: `cd ..`
8. Set up the environment variables:
   - Create a `.env` file in the root directory of the project
   - Define the following environment variables in the `.env` file:
     - `MONGODB_URI=<your-mongodb-uri>`: The MongoDB connection URI
     - `JWT_SECRET=<your-jwt-secret>`: The secret key used for JWT authentication
     - `REACT_APP_HOST=<your-backend-server-url>`: The URL of the backend server (e.g., http://localhost:5000 if running locally)


## Usage

1. Start the backend server: `npm start` (from the project backend directory)
2. Start the frontend server: `npm start` (from the project frontend directory)
3. Open the application in your browser: `http://localhost:3000`

## Contributing

Contributions are welcome! If you have any suggestions, bug reports, or feature requests, please open an issue or submit a pull request.

## Contact

For more information or questions, feel free to reach out:

- Email: somnathkar2023@gmail.com
- LinkedIn: [Somnath Kar](https://www.linkedin.com/in/somnath-kar-aa73aa1a3)
- GitHub: [SomnathKar000](https://github.com/SomnathKar000)
