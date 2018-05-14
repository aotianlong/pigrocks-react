import _ from "lodash"
import qs from "qs"
export function parseError(data){
  // { errors: {login: ["不可以为空"]} }
  console.log("data",data)
  if(data.response){
    data = data.response.jsonData || {}
  }
  console.log("data",data)
  let errors = data.errors
  let new_errors = {}
  _(errors).each( (v,k)=>{
    new_errors[k] = v[0]
  } )
  return new_errors;
}


export function parsePagination(data){
  let result = {}
  let pagination = data['meta']['pagination']
  result.current = pagination['current']
  result.pageSize = pagination['per_page']
  result.total = pagination['total_objects']
  return result
}

export function getParams(){
  return qs.parse(location.search,{ignoreQueryPrefix: true})
}

export function setTitle(...title){
  title = title.join(" - ")
  document.title = title
}
