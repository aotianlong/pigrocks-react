import httpClient from "./http_client"
import inflection from "inflection"
import Jsona from "jsona"
import { parsePagination } from "../lib/service"

/*
body: ReadableStream {locked: false}
bodyUsed: false
headers: Headers {append: function, delete: function, get: function, has: function, set: function, …}
ok: false
redirected: false
status: 401
statusText: "Unauthorized"
type: "cors"
url: "http://www.lvh.me:3001/api/v1/profiles/1"
*/
function processResponseError(response){
  return {
    error: true,
    errorType: "response",
    response
  }
}

class Resource {
  constructor(attributes = {}){
    this._attributes = attributes
  }

  get attributes(){
    return this._attributes;
  }

  create(){
    let path = this.klass.path()
    return new Promise( (resolve,reject)=>{
      httpClient.post(path,{json: this.attributes})
        .then( response =>{
          let data = response.jsonData
          let rawData = data;
          if(response.ok){
            data = new Jsona().deserialize(data);
            if(!data){
              reject({error: "解析数据失败",data: rawData})
            } else {
              resolve(data)
            }
          } else {
            reject(processResponseError(response))
          }
        })
        .catch( error => {
          reject(error);
        })
    } )
  }
  destroy(){
    let path = this.klass.path();
    return new Promise( (resolve,reject)=>{
      httpClient.delete(`${path}/${this.attributes.id}`)
        .then( response =>{
          let data = response.jsonData
          if(response.ok){
            resolve(data)
          } else {
            reject(processResponseError(response))
          }
        })
        .catch( error =>{
          reject(error)
        } )
    } )
  }
  update(){
    let path = this.klass.path();
    return new Promise( (resolve,reject)=>{
      httpClient.put(`${path}/${this.attributes.id}`,{json: this.attributes})
        .then( response =>{
          let data = response.jsonData
          if(response.ok){
            data = new Jsona().deserialize(data)
            resolve(data)
          } else {
            reject(processResponseError(response))
          }
        })
        .catch( error => {
          reject(error)
        } )

    } )
  }
  save(){
    if(this.attributes.id){
      return this.update()
    } else {
      return this.create()
    }
  }

  get klass(){
    return this.__proto__.constructor;
  }

  static find(id){
    let path = this.path()
    return new Promise( (resolve,reject)=>{
      httpClient.get(`${path}/${id}`)
        .then( (response)=>{
          let data = response.jsonData
          if(response.ok){
            data = new Jsona().deserialize(data)
            resolve(data)
          } else {
            console.log("error",response)
            reject(processResponseError(response))
          }
        })
        .catch( error =>{
          reject(error)
        } )
    })
  }
  static findAll(conditions = {},options = {}){
    let path = options.path || this.path()
    return new Promise( (resolve,reject)=>{
      httpClient.get(path,{query: conditions})
        .then( (response)=>{
          let data = response.jsonData
          let rawData = data
          if(response.ok){
            data = new Jsona().deserialize(data)
            if(options.more){
              let pagination = parsePagination(rawData)
              resolve({data: data,pagination: pagination})
            } else {
              resolve(data)
            }
          } else {
            reject(processResponseError(response))
          }
        },(response)=>{
          console.log('failed',response)
          reject({error: true,status: "error",data: response})
        })
        .catch( (e) => {
          console.log("catch")
          reject({error: true,status: "error",data: e})
        })
    })
  }
  static destroy(id){
    let resource = new this({id})
    return resource.destroy()
  }
  static path() {
    let path = this.options.path
    if(path){
      return path;
    } else {
      let class_name = this.name
      class_name = inflection.underscore(class_name)
      path = inflection.pluralize(class_name)
      //this.options.path = path;
      return path;
    }
  }
}

Resource.httpClient = httpClient
Resource.options = {}

export default Resource;
