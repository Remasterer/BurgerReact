import axios from 'axios';

const instance = axios.create({
  baseURL: "https://cookingmachine-c5227.firebaseio.com/"
})

export default  instance;
