const express = require('express');
const router = express.Router();
const Orders = require('../models/order');

/*post order to database*/
router.post('/', async(req,res) => {
    const data = Object.assign({}, req.body,);
    console.log('jfidjs');
    const order = await new Orders(data);
    order.getOrderNumber();
    res.json(await Orders.create(order));
});

router.get('/', async(req,res) => {
    const data = await Orders.find();
    res.json(data);
});

router.get('/test', async(req,res) => {
    res.send('haha');
});

module.exports = router;
