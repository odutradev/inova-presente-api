import mongoose from "mongoose";

const ClasseSchema = mongoose.Schema({
    name:{
        type: String
    },
    description: {
        type: String
    },
    teacher:{
        name:{
            type: String
        },
        id:{
            type: String
        }
    },
    date: {
        type: Date,
        default: Date.now()
    },
    timeline:[
        {
            name: {
                type: String,
            },
            description: {
                type: String
            },
            access:{
                url: {
                    type: String
                },
                start: {
                    type: Date
                },
                end: {
                    type: Date
                }
            },
            attendanceList:[
                {
				name: String,
				id: String,
				date: String,
				data: Object
                }
            ]
        }
    ]
});

export default mongoose.model('classe', ClasseSchema);