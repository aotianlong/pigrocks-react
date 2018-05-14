import Resource from "../lib/resource"
class Group extends Resource {

  static get name(){
    return "Group"
  }

  static findMyAll(params = {},options = {}){
    options.path = "groups/my"
    return Group.findAll(params,options)
  }
}

export default Group
