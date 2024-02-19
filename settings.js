export default {
  Port: process.env.PORT || 3000,
  BaseUrl: `http://universities.hipolabs.com`,
  Database: {
    host: "localhost",
    user: "root",
    password: "passoword",
    database: "university_db",
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0,
  },
};
