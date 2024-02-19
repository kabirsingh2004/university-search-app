# University Search App

University Search App is a web application that allows users to search for universities in India and save their favorite ones.

## Table of Contents

- [Features](#features)
- [Technologies](#technologies)
- [Setup](#setup)
- [Usage](#usage)
- [Screenshots](#screenshots)
- [Contributing](#contributing)
- [License](#license)

## Features

- Search for universities in India.
- View search results with details like name, state/province, and web pages.
- Mark universities as favorites and view them in a separate page.

## Technologies

- Node.js
- Express.js
- MySQL
- Bootstrap 5
- Axios

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/university-search-app/university-search-app.git
   ```

2. Install dependencies:

   ```bash
   cd university-search-app
   npm install
   ```

3. Set up the database:

   - Create a MySQL database and update the database configuration in `settings.js`.

   ```js
   export default {
     Port: process.env.PORT || 3000,
     BaseUrl: `http://universities.hipolabs.com`,
     Database: {
       host: "localhost",
       user: "root",
       password: "password",
       database: "university_db",
       waitForConnections: true,
       connectionLimit: 10,
       queueLimit: 0,
     },
   };
   ```

4. Run the application:

   ```bash
   node server.js
   ```

The server will start on http://localhost:3000.

## Usage

1. Open your browser and go to http://localhost:3000.
2. Use the search form to search for universities in India.
3. Click on the "Favorite" button to save a university as a favorite.
4. View your favorite universities on the "Favorites" page.

## Screenshots

![Search Results](/screenshots/search-results.png)
_Screenshot of the search results page._

![Favorites](/screenshots/favorites.png)
_Screenshot of the favorites page._

## Contributing

Contributions are welcome! Feel free to open issues or submit pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
