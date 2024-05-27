const schema = {
  topicNumber: {
    type: Number,
    required: "Enter topic number",
  },
  head: {
    type: String,
    required: "Enter topic number",
    unique: true,
  },
  options: {
    type: [String],
    required: "Enter 4 options",
  },
  answer: {
    type: Number,
    required: "Enter answer",
    min:0,
    max:3
  },
  img: {
    type: String,
  },
};
module.exports=schema;