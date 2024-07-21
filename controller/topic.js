const Model = require("../base/model");
const error = require("../base/error");
const createNew = async (req, res) => {
  try {
    let topics = await Model.Topic.find();
    let number = topics.length ? topics[topics.length - 1].number + 1 : 1;
    let topic = new Model.Topic({
      name: req.body.name,
      number,
      category: req.body.categoryNumber,
    });
    await topic.save();
    await topics.push(topic);
    res.status(200).json(topics.sort((a, b) => a.name.localeCompare(b.name)));
  } catch (err) {
    res.status(400).json(error(err));
  }
};
const readAllTopics = async (req, res) => {
  try {
    let category = req.params.category;
    let categories = ["All", "English", "Web", "Logical Reasoning","Exams"];
    let topics =
      category === "All"
        ? await Model.Topic.find()
        : await Model.Topic.find({ category: categories.indexOf(category) });
    res.status(200).json(topics);
  } catch (err) {
    res.status(400).json(error(err));
  }
};
const readMaxMCQByTopicId = async (req, res) => {
  try {
    let testTopics = req.body.testTopics;
    let max = 0;
    while (testTopics.length)
      max =
        max + (await Model.MCQ.find({ topicNumber: testTopics.pop() })).length;
    await res.status(200).json(max);
  } catch (error) {
    res.status(400).json(error(err));
  }
};
const controller = {
  createNew,
  readAllTopics,
  readMaxMCQByTopicId,
};
module.exports = controller;
