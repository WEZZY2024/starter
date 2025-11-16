const mongoose = require('mongoose');

const tourSchema = new mongoose.Schema({
    name : {
        type : String,
        required : [true , 'A tour must have a name'],
        unique : true,
        trim: true,
        maxLength : [40 , ' A tour must have less or equal then 40 characters'],
        minLength : [10 , 'A tour name must have more or equal than characters']
    },
    slug : String,
    durations : {
        type : Number,
        required : [true, 'A tour must have a duration']
    },
    maxGroupSize : {
        type : Number,
        required : [true , 'A tour must have a group size']
    },
    difficulty : {
        type : String,
        required : [true , 'A tour must have a difficulty'],
        enum :{
            values :['easy', 'medium', 'difficult'],
            message : 'Difficult is either : easy , medium , difficult'
        } 
    },
    ratingsAverage: {
        type : Number,
        default : 4.5 ,
        min : [1 ,' Rating must be above 1.0'],
        max : [5, ' Rating must below 5.0']
    },
    ratingsQuantity : {
        type : Number,
        default : 0
    },
    price : {
        type : Number,
        required :[ true , 'A tour must have a price']
    },
    priceDiscount : {
        type :  Number,
        validate :  {
            validator : function(val){
                // This only points to current doc on NEW document creation 
            return val < this.price;
        },
        message: 'Discount price ({VALUE}) should be below regular price'
        }
    },
    summary:{
        type: String,
        trim: true,
        required :[ true , 'A tour must have a summary']
    },
    description : {
        type : String,
        trim : true
    },
    imageCover : {
        type:String,
        required :[ true , 'A tour must have a cover image']
    },
    image: [String],
    createAt:{
        type : Date,
        default : Date.now(),
        select : false
    },
    startDate : [Date],
    secretTour : {
        type: Boolean,
        default:false
    }
},{
    toJSON:{
        virtuals : true
    },
    toObject:{ virtuals : true}
});
tourSchema.virtual('durationWeeks').get(function(){
    return this.duration / 7
})
//DOCUMENT MIDDLEWARE : runs before .save() and .create()
// tourSchema.pre('save',function(next){
// this.slug = slugify(this.name,{ lower:true })
// next();  
// })
// tourSchema.pre('save',function(next){
//     next( )
// })
// tourSchema.post('save',function(doc,next){
//     next();
// })

//  QUERY MIDDLEWARE
tourSchema.pre(/^find/,function(next){
    // tourSchema.pre('find',function(next){
    this.find({ secretTour : {$ne : true}});
    next();
});
tourSchema.post(/^find/,function(doc,next){
    next();
}) 

// AGGREGATION MIDDLEWARE 
tourSchema.pre('aggregate', function(next){
   this.pipeline().unshift({ $match : {secretTour : {$ne : true}}});
   next(); 
})


const Tour = mongoose.model('Tour',tourSchema);

module.exports = Tour 