# Koinx Task

This program implements a backend server which does the following tasks:

- Run a background worker that fetches and stores data for the following 3 cryptocurrencies - Bitcoin , Ethereum , Matic- Network.

- Exposes a /ping endpoint - To check whether the server is alive or not.

- Exposes a /stats endpoint - That returns the latest data about the requested cryptocurrency.

- Exposes a /deviation Endpoint - That returns the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.

## Setting up the project Locally

To set up the project paste the follwing commands in your terminal:

```bash
git clone https://github.com/Swetabh333/Koinx.git
cd Koinx
npm install
```
This will install all the required dependencies for the project.

Next you have to create a .env file in the top level of the project. Inside the env file you have to paste your mongodb connection string with your database name as shown below.

```
MONGODB_URI=your_database_string/<your_database_name>
```

Now you can start the project with the following command

```bash
npm start
```