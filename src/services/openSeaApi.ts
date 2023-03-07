import axios from 'axios';
import { OpenSeaAPIKey } from "../constants";

const openSeaApi = axios.create({
  baseURL: 'https://api.opensea.io/api/v1',
});

openSeaApi.defaults.headers.common['X-API-KEY'] = OpenSeaAPIKey;

export default openSeaApi;
