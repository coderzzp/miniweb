import axios from 'axios'

var instance
if(process.env.NODE_ENV==='devlopment'){
  instance= axios.create({
    baseURL: 'http://localhost:3003/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
}else{
  instance= axios.create({
    baseURL: 'http://120.78.220.105:3003/',
    timeout: 1000,
    headers: {'X-Custom-Header': 'foobar'}
  });
}
export default instance