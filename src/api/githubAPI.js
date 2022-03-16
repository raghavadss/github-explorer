import axios from "axios";
const KEY =
  "cmFnaGF2YWRzczpnaHBfY2I3MFphZVRlbjVCRmFWR1hQTFVKQ0RPNzE0a1RDMndUVmQw";

export default axios.create({
  baseURL: "https://api.github.com",
  params: {},
  headers: {
    Authorization: `Basic ${KEY}`,
  },
});
