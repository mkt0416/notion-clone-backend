
const Memo = require('../models/memo');

exports.create = async (req, res) => {
    try {
        const memoCount = await Memo.find().countDocuments();
        const memo = await Memo.create({
            user: req.user._id,
            position: memoCount > 0 ? memoCount : 0,
        });
        return res.status(200).json(memo);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.getAll = async (req, res) => {
    try {
        const memos = await Memo.find({ user: req.user._id }).sort('-position');
        return res.status(200).json(memos);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.getOne = async (req, res) => {
    const { memoId } = req.params;
    try {
        const memo = await Memo.findOne({
            user: req.user._id,
            _id: memoId,
        });
        if (!memo) {
            return res.status(404).json('メモが存在しません');
        }
        return res.status(200).json(memo);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.update = async (req, res) => {
    const { memoId } = req.params;
    const { title, description } = req.body;
    if (title === '') {
        req.body.title = '無題';
    }
    if (description === '') {
        req.body.description = 'ここに自由に記入してください';
    }

    try {
        const memo = await Memo.findOne({
            user: req.user._id,
            _id: memoId,
        });
        if (!memo) {
            return res.status(404).json('メモが存在しません');
        }
        const updatedMemo = await Memo.updateOne({ _id: memoId }, req.body);
        return res.status(200).json(updatedMemo);
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.delete = async (req, res) => {
    const { memoId } = req.params;
    try {
        const memo = await Memo.findOne({
            user: req.user._id,
            _id: memoId,
        });
        if (!memo) {
            return res.status(404).json('メモが存在しません');
        }
        await Memo.deleteOne({ _id: memoId });
        return res.status(200).json('メモを削除しました');
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};