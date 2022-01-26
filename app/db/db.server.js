import mongoose from 'mongoose'
//import passport from 'passport';
import User from './models/User';
require('dotenv').config();

const db = {}

mongoose.connect(process.env.ATLAS_DB_CONNECTION_LINK)
// .then(x => {
//     console.log(`Connected to Mongo! Database name: "${x.connections[0].name}"`)
//     return true;
//   })
//   .catch(err => {
//     console.error('Error connecting to mongo', err)
//     return false;
//   });

// models
db.user = User;

// getters
db.registerUser = async (body) => {
  try{
    const user = await User.register(body, body.password)
    return user
  }catch(e){
    return {error:e.message}
  }
}

db.loginUser = async (body) => {
  try{
      const result = await User.authenticate()(body.email, body.password)
      return result
  }catch(err){
    return {errors:[{
      field: 'global',
      message:err.message
    }]}
  }
}

export default db
