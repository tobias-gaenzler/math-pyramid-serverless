// Dirty hack to inject Websocket URL after build process (the Websocket API is created after build by CDK)
window.REACT_APP_WS_URL="ws://127.0.0.1:3002";
window.REACT_APP_DEFAULT_SIZE="3";
window.REACT_APP_MAX_VALUE="100";