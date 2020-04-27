const request = require("request");

let getBeforeday = () => {
    const fullDate = new Date(new Date().setDate(new Date().getDate() - 1))
    const yyyy = fullDate.getFullYear();
    const MM = (fullDate.getMonth() + 1) >= 10 ? (fullDate.getMonth() + 1) : ("0" + (fullDate.getMonth() + 1));
    const dd = fullDate.getDate() < 10 ? ("0" + fullDate.getDate()) : fullDate.getDate();
    return String(yyyy) + String(MM) + String(dd);
}

let getStock = async (stockNo) => {
    let stock;
    const jsonUrl = `http://www.twse.com.tw/exchangeReport/STOCK_DAY?response=json&date=${getBeforeday()}&stockNo=${stockNo}`;
    stock = await getStockData(jsonUrl);
    console.log(stock.title);
    return stock.title;
}

let getStockData = (jsonUrl) => {
    return new Promise((resolve, reject) => {
        request(jsonUrl, (err, res, body) => {
            if (!err && res.statusCode == 200) {
                let stock = JSON.parse(body);
                resolve(stock)
            } else {
                reject('取得股票資訊失敗' + err.message);
            }
        });
    });
}

module.exports = {
    getStock
};