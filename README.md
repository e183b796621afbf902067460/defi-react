# DeFi React
No dependencies.

---

DeFi React frontend for DeFi ETL management.

# Local Configuration

First of all to configure React frontend correctly need to do next steps:

- Clone current repository:
```
git clone https://github.com/e183b796621afbf902067460/defi-react
```

- Get into the project folder:
```
cd defi-react/
```

- Set the __baseURL__ variable in [axios.js](https://github.com/e183b796621afbf902067460/defi-react/blob/master/src/services/axios.js) to allow [backend](https://github.com/e183b796621afbf902067460/defi-fastapi), by default:
```js
const baseURL = "http://0.0.0.0:8000/api/v1/";
```

- Install dependencies:
```
npm install
```

- Run:
```
npm start
```
`Result will be at` [http://0.0.0.0:3000](http://0.0.0.0:3000)

# Docker
- Set the __baseURL__ variable in [axios.js](https://github.com/e183b796621afbf902067460/defi-react/blob/master/src/services/axios.js) to allow [backend](https://github.com/e183b796621afbf902067460/defi-fastapi), by default:
```js
const baseURL = "http://0.0.0.0:8000/api/v1/";
```

- Run docker build (`sudo`):
```
docker build -t defi_react .
```

- Docker run (`sudo`):
```
docker run -p 3000:3000 -d defi_react
```

`Result will be at` [http://0.0.0.0:3000](http://0.0.0.0:3000)

# Exit
- To stop all running containers:
```
docker stop $(docker ps -a -q)
```
- And remove it all:
```
docker rm $(docker ps -a -q)
```
