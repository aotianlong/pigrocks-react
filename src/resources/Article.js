import Resource from "../lib/resource"
class Article extends Resource {
  // 由于uglify会改变class.name，所以手工设置
  static get name(){
    return "Article"
  }
}

export default Article
