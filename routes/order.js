const express = require('express');
const router = express.Router();
const Orders = require('../models/order');
const orderStatus = require('../variables/orderStatus');
/*post order to database*/
router.post('/', async(req,res) => {
    const data = Object.assign({}, req.body,);
    const newOrder = await new Orders(data);
    newOrder.getOrderNumber();
    Orders.create(newOrder)
        .then((result)=> {
            res.json(result);
        })
});

router.get('/', async(req,res) => {
    const data = await Orders.find();
    res.json(data);
});

router.get('/:orderNumber', async(req,res) => {
    const data = await Orders.findOne({orderNumber: req.params.orderNumber});
    res.json(data);
});

router.delete('/:orderNumber', async(req,res) => {
    Orders.remove(
        {orderNumber: req.params.orderNumber}
    ).then(result => {res.json(result)})
        .catch(err => res.send(err));
});

router.post('/confirmed/:orderNumber', async(req,res) => {
    Orders.findOneAndUpdate(
        {orderNumber: req.params.orderNumber},
        {status: orderStatus.Confirmed}
    ).then(() => {
        res.status(200).send('order confirmed !')})
        .catch(err => res.send(err));
});

router.post('/completed/:orderNumber', async(req,res) => {
    Orders.findOneAndUpdate(
        {orderNumber: req.params.orderNumber},
        {status: orderStatus.Completed}
    ).then(() => {
        res.status(200).send('order confirmed !')})
        .catch(err => res.send(err));
});

router.post('/cancel/:orderNumber', async(req,res) => {
    Orders.findOneAndUpdate(
        {orderNumber: req.params.orderNumber},
        {status: orderStatus.Canceled}
    ).then(() => {
        res.status(200).send('order confirmed !')})
        .catch(err => res.send(err));;
});


router.post('/pickup/:orderNumber', async(req,res) => {
    Orders.findOneAndUpdate(
        {'orderNumber': req.params.orderNumber},
        {status: orderStatus.Pickup}
    )
        .then(() => {res.status(200).send('pick up is ready')})
        .catch(err => res.send(err));
});



module.exports = router;
