import Resource from "../lib/resource"
class Message extends Resource {
  static get name(){
    return "Message"
  }



  static findAllSessions(conditions = {},options = {}){
    options.path = "messages/sessions"
    return Message.findAll(conditions,options)
  }
}

export default Message
