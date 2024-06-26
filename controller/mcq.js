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
        help: mcqs[i].help.length ? mcqs[i].help : undefined,
        answer: mcqs[i].options.indexOf(mcqs[i].answer),
        topicNumber: await topicNumber,
      });
      if ((await mcqs.filter((x) => mcqs[i].head === x.head).length) > 1)
        throw new Error(`${q.head} is duplicated`);
      await Model.MCQ.validate(q)
        .then(async () => {
          if (await Model.MCQ.findOne({ head: q.head }).head)
            throw new Error(`${q.head} is exist`);
        })
        .catch((err) => {
          throw new Error(error(err));
        });
      await newMCQs.push(q);
    }
    for (var i = 0; i < length; i++) {
      await newMCQs[i].save();
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
const createMCQsTest = async (req, res) => {
  try {
    let mcqArr = [];
    const payload = req.body.payload;
    while (payload.testTopics.length) {
      let topicNumber = payload.testTopics.pop();
      let mcqs = await Model.MCQ.find({ topicNumber });
      while (mcqs.length) {
        let random = Math.random().toString()[5];
        let q = await mcqs.pop();
        let head=topicNumber===6?`Find the word that names a necessary part of "${q.head}"`:q.head;
        if (random % 2 === 0) {
          mcqArr.push({ ...q._doc, head,userAnswer: -1 });
        } else {
          mcqArr.unshift({ ...q._doc,head, userAnswer: -1 });
        }
      }
    }
    res.status(200).json(mcqArr.slice(0,payload.numQ));
  } catch (err) {
    res.status(404).json(error(err));
  }
};
const controller = {
  createMCQs,
  getMCQsBytopicNumber,
  createMCQsTest,
};
module.exports = controller;
