import _ from "lodash"
let config = {
  author: {
    name: "aotianlong",
    email: "aotianlong@gmail.com",
    homepage: "http://www.aotianlong.com"
  },
  version: "0.0.1" //软件版本
}
let env = process.env.NODE_ENV || "development"
if(env == "production") {
  config = _.merge(config,{
    endPoint: "https://pig.rocks/api/v1/",
    client_id: "b9535e6537d39df766921e8963f5a7868a7bb48cb28a3acd924d05a92d93bc10",
    secret: "a85a2805acb688ab4864d8cd420076d935bf8c8a7fc2b524b95b5e945644b2e3"
  })
} else {
  config = _.merge(config,{
    endPoint: "http://www.lvh.me:3001/api/v1/",
    client_id: "b9535e6537d39df766921e8963f5a7868a7bb48cb28a3acd924d05a92d93bc10",
    secret: "a85a2805acb688ab4864d8cd420076d935bf8c8a7fc2b524b95b5e945644b2e3"
  })
}
export default config;
