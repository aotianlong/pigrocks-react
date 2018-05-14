// Example custom build usage: 
import engine from 'store/src/store-engine';
import localStorage from 'store/storages/localStorage';
import cookieStorage from 'store/storages/cookieStorage';

let storages = [
  localStorage,cookieStorage
]
let store = engine.createStore(storages, [])
export default store;
