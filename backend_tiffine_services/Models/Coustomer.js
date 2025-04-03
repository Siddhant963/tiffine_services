const mongoose = require('mongoose');
mongoose.CoustomerSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true
    },
    subscription: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Subscription',
        required: true,
        default: null
    },
    subscription_start_date: {
        type: Date,
        default: Date.now
    },
     subscription_end_date: {
          type: Date,
          required: true
     },

    created_at: {
        type: Date,
        default: Date.now
    },
    updated_at: {
        type: Date,
        default: Date.now
    }
});

mongoose.model('Customer', mongoose.CoustomerSchema);