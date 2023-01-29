const jwt = require('jsonwebtoken');
const { default: mongoose } = require('mongoose');
const moongose = require('mongoose');
const {ObjectId} = mongoose.Schema.Types
require("dotenv").config();

const campSchema = new moongose.Schema({

   campname: {
        type: String
    },

    startdate :{
        type: Date
    },

    enddate : {
        type: Date
    },

        teachers: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Teacher'
            },
        ],

        
        students: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Student'
            },
        ]

  //teachers : {
    //type: Array
  //}
  

    // students: {
    //     type: Array
    // }

})


const Camp = mongoose.model('Camp',campSchema);
module.exports = Camp;