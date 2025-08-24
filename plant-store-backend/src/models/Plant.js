import mongoose from 'mongoose';


const PlantSchema = new mongoose.Schema(
{
name: {
type: String,
required: true,
trim: true,
minlength: 2,
maxlength: 120
},
price: {
type: Number,
required: true,
min: 1,
max: 100000
},
categories: {
type: [String],
default: [],
index: true
},
availability: {
type: Boolean,
default: true
},
imageUrl: {
type: String
}
},
{ timestamps: true }
);


// Text index for name + categories to support keyword search
PlantSchema.index({ name: 'text', categories: 'text' });


export default mongoose.model('Plant', PlantSchema);