const error = require("../base/error");
const Model = require("../base/model");
const createMCQs = async (req, res) => {
  try {
    const mcqs = req.body.mcqs;
    if (!mcqs.length) throw new Error("Invalid process");
    const length = mcqs.length;
    const newMCQs = [];
    const topicNumber = (await Model.Topic.findOne({ name: req.body.topic }))
      ?.number;
    for (var i = 0; i < length; i++) {
      const q = new Model.MCQ({
        ...mcqs[i],
        img: mcqs[i].img.length?mcqs[i].img:undefined,
        answer: mcqs[i].options.indexOf(mcqs[i].answer),
        topicNumber: await topicNumber,
      });
      if((await mcqs.filter(x=>mcqs[i].head===x.head).length)>1)throw new Error(`${q.head} is duplicated`);
      await Model.MCQ.validate(q).then(async ()=>{
        if(await Model.MCQ.findOne({head:q.head}).head)
          throw new Error(`${q.head} is exist`);
      }).catch((err) => {
        throw new Error(error(err));
      });
      await newMCQs.push(q);
    }
    for (var i = 0; i < length; i++) {
      await newMCQs[i].save()
    }
    await res.status(200).json("created");
  } catch (err) {
    res.status(404).json(error(err));
  }
};
const getMCQsBytopicNumber = async (req, res) => {
  try {
    const mcqs = await Model.MCQ.find({ topicNumber: req.body.topicNumber });
    const _mcqs = [];
    while (mcqs.length) {
      let mcq = mcqs.pop();
      _mcqs.unshift({
        ...mcq._doc,
        answer: mcq.options[mcq.answer],
      });
    }
    await res.status(200).json(_mcqs);
  } catch (err) {
    res.status(404).json(error(err));
  }
};
const controller = {
  createMCQs,
  getMCQsBytopicNumber,
};
module.exports = controller;
