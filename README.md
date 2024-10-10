# Koinx Task

This program implements a backend server which does the following tasks:

- Runs a background worker that fetches and stores data for the following 3 cryptocurrencies - Bitcoin , Ethereum , Matic-Network.

- Exposes a `/ping` endpoint - GET endpoint to check whether the server is alive or not.

- Exposes a `/stats` endpoint - GET endpoint that returns the latest data about the requested cryptocurrency.

- Exposes a `/deviation` Endpoint - GET endpoint that returns the standard deviation of the price of the requested cryptocurrency for the last 100 records stored by the background service in the database.

## Trying out the APIs

You can try out the apis by opening postman or any other api testing application you want to use. Append the endpoint at the end of the deployment link `https://koinx-eosin.vercel.app/` for example:

```
https://koinx-eosin.vercel.app/ping
```

Can be used to check if the server is alive

or

```
https://koinx-eosin.vercel.app/stats?coin=matic-network

```
will fetch you the stats for matic-network.

you can replace `/stats` with `/deviation` as well and `matic-network` with `bitcoin` or `ethereum`.


## Setting up the project Locally

To set up the project paste the follwing commands in your terminal:

```bash
git clone https://github.com/Swetabh333/Koinx.git
cd Koinx
npm install
```
This will install all the required dependencies for the project.

Next you have to create a `.env` file in the top level of the project. Inside the env file you have to paste your mongodb connection string with your database name as shown below.

```
MONGODB_URI=your_database_string/<your_database_name>
```

Now you can start the project with the following command

```bash
npm start
```

## Contribution Guidelines