# Math Pyramid Serverless

![Math Pyramid](https://github.com/tobias-gaenzler/math-pyramid-react/blob/main/public/help_start.jpg?raw=true)
React app for math pyramid, a math exercise to train basic addition/subtraction.
In contrast to [math-pyramid-react](https://github.com/tobias-gaenzler/math-pyramid-react), this repo uses AWS as a backend.

## Technical Information

### Typescript

The application is implemented in typescript and uses AWS serverless services <i>API Gateway, lambda and DynamoDB</i> as a backend.

### React Scripts

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and provides the following scripts:

- `npm start`
  
  Runs the app in the development mode.\
  Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

  The page will reload if you make edits.

### Deployment
During deployment the websocket connection needs to be set e.g. when the app is started:
```
REACT_APP_WS_URL=ws://<IP>:<PORT> npm start
```

  