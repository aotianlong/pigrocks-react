import FetchHttpClient, { json,form } from 'fetch-http-client';
import qs from "qs"
import store from "./store"
import config from "../config"
// Create a new client object. 
const client = new FetchHttpClient(config.endPoint);

// Add access token 
client.addMiddleware(request => {
  //request.options.headers['X-Access-Token'] = 'secret';
  let accessToken = store.get("accessToken")
  if(accessToken && accessToken.access_token){
    request.options.headers["Authorization"] = `Bearer ${accessToken.access_token}`;
  }
  request.options.headers["ClientID"] = config.client_id;
});


// 自带的query用了query string的stringify
// 那个不支持nested object
let query = function() {
  return function (request) {
    if (request.options.query) {
      var queryString = qs.stringify(request.options.query,{arrayFormat: "brackets"});
      if (request.url.indexOf('?') === -1) {
        request.url = request.url.concat('?');
      }
      if (request.url.endsWith('&') || request.url.endsWith('?')) {
        request.url = request.url.concat(queryString);
      } else {
        request.url = request.url.concat('&', queryString);
      }
    }
  };
};

 
// Add json support 
client.addMiddleware(json());
client.addMiddleware(form());
client.addMiddleware(query());
 
// Add Logging 
// client.addMiddleware(request => response => {
//  console.log(request, response);
// });


export let clientId = config.client_id

export function getAccessToken(){
  let token = store.get("accessToken")
  return token && token.access_token
}

export default client;
