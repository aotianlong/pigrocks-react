import pathToRegexp from "path-to-regexp"
import _ from "lodash"
import qs from "qs"

class UrlMatcher {
  constructor({location,dispatch}){
    this.location = location
    this.dispatch = dispatch
    this.resources = []
    this.rules = []
  }


  addResource(resource,options = {}){
    this.resources.push({resource,options})
    return this;
  }

  /*
   * addRule({pattern: "/user/:id",action: "global/showuser"})
  */
  addRule(rule){
    this.rules.push(rule)
    return this;
  }

  run(){
    this.resources.forEach( ({resource,options})=>{
      this._processResource(resource,options)
    } )
    this.rules.forEach( (rule)=>{
      this._processRule(rule)
    } )
  }

  _processRule(rule){
    let { dispatch,location } = this
    let { action,pattern } = rule
    let params = this._parseLocation(pattern,location)
    if(params){
      dispatch({type: action,params: params})
    }
  }

  _processResource(resource,options = {}){
    let { dispatch ,location } = this
    let { pathname } = location
    let { prefix,path,action } = options
    prefix = prefix || ""

    let resourcePath = path || resource.path()
    let mappings = {
      index: `${prefix}/${resourcePath}`,
      show: `${prefix}/${resourcePath}/:id`,
      edit: `${prefix}/${resourcePath}/:id/edit`,
      new: `${prefix}/${resourcePath}/new`
    }
    if(options.mappings){
      mappings = {...mappings,...options.mappings}
    }
    _(mappings).each( (v,k)=>{
      let params = this._parseLocation(v,location)
      if(params){
        let type = `${action || resourcePath}/${k}`
        console.log("dispatch",type)
        dispatch({...params,type: type})
      }
    } )

  }
  _parseLocation(pattern,location){
    let regexp = pathToRegexp(pattern)
    console.log("regexp",regexp)
    let keys = regexp.keys
    let match = regexp.exec(location.pathname)
    let result = {}
    let urlParams = qs.parse(location.search,{ ignoreQueryPrefix: true })
    if(match){
      keys.forEach( (k,i)=>{
        result[k.name] = match[i + 1]
      } )
      return {...result,...urlParams};
    } else {
      return false;
    }
  }
}


export default UrlMatcher;

