import axios from 'axios';

const instance = axios.create({
  baseURL: "https://buegerreact.firebaseio.com/"
})

export default  instance;
