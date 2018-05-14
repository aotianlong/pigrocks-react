import _ from "lodash"
export function parseError(data){
  // { errors: {login: ["不可以为空"]} }
  let errors = data.errors
  let new_errors = {}
  _(errors).each( (v,k)=>{
    new_errors[k] = v[0]
  } )
  return new_errors;
}
