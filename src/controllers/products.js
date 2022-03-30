

const list = (req, res) => {
    res.json([
        {
            id: 1,
            name: "Kamera",
            price_buy: 8000000,
            price_sell: 8500000,
            image: "https://cf.shopee.co.id/file/2e14a386911b649f04a22738a1ec8ec3"
        }
    ])
}


module.exports = {
    list
}