require('../config/Db')
const mongoose = require('mongoose');
const { Collection } = require('../config/Collection');
const { encodePass } = require('../utils/Utils');
const AuthSchema = new mongoose.Schema({
    name:{type:String,required:[true,"Name is Required Filed"]},
    email:{type:String, validate: {
        validator: function(v) {
          return /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(v);
        },
        message: props => `${props.value} is not a valid Email Id!`
      },
      required: [true, 'Email is Required'],unique:true
    },
    password:{type:String,required:[true,'Password is Required'],min:[5,'Minimum 5 character']}
},{
    timestamps:true
})


AuthSchema.pre('save', async function() {
   this.password = await encodePass(this.password);
  });

const AuthModel = mongoose.model(Collection.auth,AuthSchema);
module.exports = AuthModel


