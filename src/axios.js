import Axios from "axios";

const instance = Axios.create({
  baseURL: 'https://trilli-app.firebaseio.com/'
})

instance.defaults.headers.post['uid'] = '123';
instance.defaults.headers.post['provider'] = 'anonymous';

export default instance;
