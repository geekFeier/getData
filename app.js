const superagent = require('superagent');
const cheerio = require('cheerio');
const fs = require('fs');
const reptileUrl = 'https://www.toutiao.com/';

superagent.get(reptileUrl).end(function (err, res) {
  if (err) {
    throw Error(err);
    return false;
  }
  let $ = cheerio.load(res.text);
  let data = [];

  $('.index-content ul[infinite-scroll-disabled=loading] li').each(function (i, elem) {
    let _this = $(elem);
    console.log(index);
    data.push({
      tit: _this.find('.single-mode-rbox .title-box a').text(), // title 
      time: _this.find('.single-mode-rbox .footer-bar-action').text() // 时间
    });
  });

  fs.writeFile(__dirname + '/api/newsList.json', JSON.stringify({
    status: 0,
    data: data
  }), function (err) {
    if (err) throw err;
    console.log('写入完成');
  });
});
