import history from 'history';

browserHistory = history.createBrowserHistory({
  basename: "",
  forceRefresh: false,
  keyLength: 8,
  getUserConfirmation: (message, callback) => callback(window.confirm(message))
});

export default browserHistory;