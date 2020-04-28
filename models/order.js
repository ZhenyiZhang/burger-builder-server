const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const OrderSchema = new Schema({
    phone: {
        type: String,
        required: true
    },
    items: {
        type: Object,
        required: false
    },
    name: {
        type: String,
        required: true
    },
    status: {
        type: String,
        default: 'Pending'
    },
    timeOrdered: {
        type: Date,
        required: false
    },
    orderNumber: {
        type: String,
        required: false
    },
});

OrderSchema.methods.getOrderNumber = function uniqueNumber () {
    let date = Date.now().toString();

    // If created at same millisecond as previous
    if (date <= uniqueNumber.previous) {
        date = ++uniqueNumber.previous;
    } else {
        uniqueNumber.previous = date;
    }
    this.orderNumber = date;
};

module.exports = exports = mongoose.model('Order', OrderSchema);