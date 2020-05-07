const request = require("request");

const d3 = require('d3');

let runTime;

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
    stock = await getStockData(jsonUrl).catch(error => {
        console.log(error);
    });
    runTime = new Date();
    return stock;
}

let getStockData = (jsonUrl) => {
    return new Promise((resolve, reject) => {
        setTimeout(function () {
            request(jsonUrl, (err, res, body) => {
                let stock = JSON.parse(body);
                if (!err && res.statusCode == 200 && stock.stat === "OK") {
                    console.log("success");
                    let stock = JSON.parse(body);
                    resolve(stock)
                } else {
                    reject(stock.stat);
                }
            });
        }, 2000);
    });
}

let convertStock = (stock) => {
    let date = stock.fields[0];
    let count = stock.fields[1];
    let endPrice = stock.fields[6];
    let stockMessage = `${stock.title} \n ${date} | ${count} | ${endPrice}`;
    const stockData = stock.data.sort()
    for (data of stockData) {
        stockMessage += `\n ${data[0]} | ${data[1]} | ${data[6]}`
    }

    return stockMessage;
}

module.exports = {
    getStock,
    convertStock
};