import axios from "axios";
// const KEY = "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";
// const UNAME = 'raghavadss'
const KEY = 'cmFnaGF2YWRzczpnaHBfbXlsZVVNMVVpYmlwOWhzOTUzQTNNVlFtbmtIbGV5Mnhwdnd6';


export default axios.create({
  baseURL: "https://api.github.com",
  params: {},
  headers:{
    Authorization: `Basic ${KEY}`
  }
});
