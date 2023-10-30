const express = require('express');

const app = express();
const cartRoute = express.Router();
const Product = require('../model/Product');


// get all Product from store
cartRoute.route('/').get((req, res, next) => {
    Product.find({}, (error, data) => {
        if (error) {
            return next(error);
        }
        res.json(data);
    });
});

// get product in chunk
cartRoute.route('/chunk/:pageIndex/:pageSize').get((req, res, next) => {
    Cart.find({}, (error, data) => {
        const { pageIndex } = req.params;
        const pageSize = req.params.pageSize - 1;
        if (error) {
            return next(error);
        }
        const chunkData = data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize + 1);
        res.json(chunkData);
    });
});

module.exports = cartRoute;
