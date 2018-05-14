import Resource from "../lib/resource"
class MessageSession extends Resource {

  static get name(){
    return "MessageSession"
  }


  static findAllMessages(conditions = {},options = {}){
    options = {...options,...{path: "message_sessions/messages"}}
    return MessageSession.findAll(conditions,options)
  }

  static read(params = {}){
    let path = MessageSession.path()
    return MessageSession.httpClient.put(`message_sessions/read`,{json: params}).then( response => response.jsonData )
  }

}

export default MessageSession
