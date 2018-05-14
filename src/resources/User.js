import Resource from "../lib/resource"
import httpClient from "../lib/http_client"
import config from "../config"
import Jsona from "jsona"

class User extends Resource {

  static get name(){
    return "User"
  }


  static findByUsername(username){
    return User.find(username)
  }

  static unlock(login){
    return new Promise( (resolve,reject)=>{

      httpClient.put("users/unlock",{query: {login}})
        .then( (response)=>{
          if(response.ok){
            resolve(response.jsonData)
          } else {
            reject(response)
          }
        },(response)=>{
          console.log("error",response)
          reject(response)
        } )
        .catch( response =>{
          reject(response)
        } )


    } )
  }

  static info(){
    return new Promise( (resolve,reject)=>{
      let error = {status: 'error',message: "未登录"}
      httpClient.get("/api/v1/users/info")
        .then( response =>{
          if(response.ok){
            let user = new Jsona().deserialize(response.jsonData);
            resolve(user)
          } else {
            // console.log(response)
            reject(error)
          }
        } )
        .catch( response =>{
          reject(error)
        } )
    })
  }

  static login(login,password){
    return new Promise( (resolve,reject) =>{
      let params = {}
      params.login = login
      params.password = password
      params.client_id = config.client_id
      params.grant_type = "password"
      httpClient.post("/oauth/token",{form: params})
        .then( response =>{
          console.log("oauth token",response)
          if(response.ok){
            let token = response.jsonData
            resolve(token)
          } else {
            let data = response.jsonData
            if(data.error == "invalid_client"){
              //error = new SubmissionError({login: data.error_description})
            }
            reject(data)
          }
        } ,(response) =>{
          console.log("oauth token error",response)
          reject(response)
        })
        .catch( response =>{
          console.log("oauth token error",response)
          reject(response)
        })
    })

  }

  static findPassword(values){
    return new Promise( (resolve,reject)=>{
      let params = values.user
      httpClient.post("users/password",{ json: params })
        .then( (response)=>{
          if(response.ok){
            resolve(response)
          } else {
            let errors = response.jsonData
            reject(errors)
          }
        })
        .catch( (response)=>{
          reject(response)
        })
    }) 
  }

  static updatePassword(values){
     return new Promise( (resolve,reject)=>{
      let params = values.user
      httpClient.put("users/update_password",{ json: params })
        .then( (response)=>{
          if(response.ok){
            resolve(response)
          } else {
            let errors = response.jsonData
            reject(errors)
          }
        })
        .catch( (response)=>{
          reject(response)
        })
    }) 
   
  }
}

export default User;
