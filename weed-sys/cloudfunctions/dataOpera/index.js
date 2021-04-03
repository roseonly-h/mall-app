// 云函数入口文件
const cloud = require('wx-server-sdk')
const axios = require('axios')
const cheerio = require('cheerio')
cloud.init({
  env:'test-vszrh'
})

// 云函数入口函数
exports.main = async (event, context) => {
  async function getData(){
    const result = await fetchAll()
    return result
  }
  async function fetchAll() {
    const res = await axios.get('https://www.163.com/dy/media/T1471859851644.html')
    // const res = await axios.get('https://www.zhiwutong.com/yanghua/flower.htm')
    const $ = cheerio.load(res.data);
    const achorElements = $(".media_articles .media_articles_list .media_article .media_article_img");
    const links = achorElements
        .map((i, ele) => {
          let obj = ele.children[1]
          let src = obj.attribs.src
          const href = ele.attribs["href"];
          return {
              src,
              href
          };
        })
        .get();
    const result = links.map(link=>{
        return getLinkData(link)
    })
    return Promise.all(result)
  }
  async function getLinkData(url){
    const res = await axios.get(url.href)
    const $ = cheerio.load(res.data)
    const name = $('h2').text().trim()
    return {
      title: name,
      href: url.href,
      imgUrl:url.src,
      // like:Math.random()*9999,
      // view:Math.random()*9999
    }
  }

  return getData()
}





