import axios from "axios";
export default axios.create({
    baseURL:"https://stock-trader-7efb4-default-rtdb.firebaseio.com"
})