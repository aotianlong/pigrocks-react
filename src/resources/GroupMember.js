import Resource from "../lib/resource"

class GroupMember extends Resource {

  static get name(){
    return "GroupMember"
  }


  static block(groupMember){
    return this.httpClient.put(`group_members/${groupMember.id}`,{form: {state: "blocked"}})
  }

  static unblock(groupMember){
    return this.httpClient.delete(`group_members/${groupMember.id}`)
  }

  static approve(groupMember){

  }

  static disapprove(groupMember){

  }

}

export default GroupMember
