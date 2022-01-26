import mongoose, {Schema} from 'mongoose'
import passportLocalMongoose from 'passport-local-mongoose'
//passport stuff
//import passport from 'passport'

const userSchema = new Schema({
    username:{
        type: String,
        required: true
    },
    role:{
        type: String,
        enum: ['GUEST', 'MEMBER','ADMIN'],
        default: 'GUEST'
    },
    email: String,
    displayName: String,

},{
    timestamps:true,
})

userSchema.set('toObject',{virtuals:true})
userSchema.plugin(passportLocalMongoose,{usernameField:'email'})

const User = mongoose.models.User || mongoose.model('User', userSchema)

// passport stuff
// passport.use(User.createStrategy())
// passport.serializeUser(User.serializeUser())
// passport.deserializeUser(User.deserializeUser());

export default User
// export default mongoose.model('User', userSchema)