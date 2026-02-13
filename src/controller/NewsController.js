const News = require('../models/News');

const createNews = async (req, res) => {
  try {
    const { title, content, image, author } = req.body;

    const news = new News({
      title,
      content,
      image,
      author,
      date: new Date()
    });

    const savedNews = await news.save();

    res.status(201).json(savedNews);
  } catch (error) {
    console.error('Error creating news article:', error);
    res.status(500).json({ error: 'Failed to create news article' });
  }
};

const getAllNews = async (req, res) => {
  try {
    const news = await News.find();
    return res.status(200).json({ news });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get news' });
  }
};

const updateNews = async (req, res) => {
  try {
    const { id } = req.params;

    let news = await News.findById(id);

    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }

    news.title = req.body.title || news.title;
    news.content = req.body.content || news.content;
    news.image = req.body.image || news.image;
    news.author = req.body.author || news.author;

    news = await news.save();

    res.status(200).json(news);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update news article' });
  }
};

const deleteNews = async (req, res) => {
  try {
    const { id } = req.params;

    const deleted = await News.findByIdAndDelete(id);

    if (!deleted) {
      return res.status(404).json({ error: 'News article not found' });
    }

    return res.status(200).json({ message: 'News article deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete news article' });
  }
};

const getNewsById = async (req, res) => {
  try {
    const { id } = req.params;

    const news = await News.findById(id);

    if (!news) {
      return res.status(404).json({ error: 'News article not found' });
    }

    return res.status(200).json({ news });
  } catch (error) {
    return res.status(500).json({ error: 'Failed to get news article' });
  }
};

module.exports = {
  createNews,
  updateNews,
  deleteNews,
  getAllNews,
  getNewsById
};
