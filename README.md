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
