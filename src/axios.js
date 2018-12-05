import Axios from "axios";

const instance = Axios.create({
  // baseURL: 'https://trilli-app.firebaseio.com/'
  baseURL: 'http://localhost:3000/api/v1/'
})

instance.defaults.headers.post['uid'] = '123';
instance.defaults.headers.post['provider'] = 'anonymous';

export default instance;
