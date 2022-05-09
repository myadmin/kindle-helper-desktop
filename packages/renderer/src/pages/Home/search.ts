import axios from 'axios';

const searchInput = (text: string) => {
  if (text.length && text.trim().length) {
    return new Promise((resolve, reject) => {
      axios.get(`https://www.iyd.wang/?s=${text}`).then(res => {
        console.log(res.data);
      });
    });
  }
};

export { searchInput };