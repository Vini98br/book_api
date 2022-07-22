import "reflect-metadata";
require("dotenv").config();
import './database/connect';
import AppDataSource from "./database/connect";

const port = process.env.PORT || 3000;

AppDataSource.initialize()
  .then(async () => {
    console.log('Database connected');
    // Importing dinamically to avoid initiate before the database has started
    const app = (await import('./App')).default;
    app.listen(port, () => {
      console.log('Your app is listening on PORT', port);
    })
  })
  .catch(async (err) => console.log('Database error: ', err));

export { AppDataSource };