import Resource from "../lib/resource"
import httpClient from "../lib/http_client"
class Notification extends Resource {

  static get name(){
    return "Notification"
  }


  // 已经阅读了所有
  static readAll(){
    return httpClient.put("notifications/read_all")
  }
}

export default Notification
