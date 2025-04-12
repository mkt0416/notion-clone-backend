
const router = require('express').Router();

const memoControllers = require('../controllers/memo');
const tokenHandler = require('../handlers/tokenHandler');

// メモの作成
router.post('/', tokenHandler.verifyToken, memoControllers.create);

// ログインしているユーザーが投稿したメモを全て取得
router.get('/', tokenHandler.verifyToken, memoControllers.getAll);

// ログインしているユーザーが投稿したメモを1つ取得
router.get('/:memoId', tokenHandler.verifyToken, memoControllers.getOne);

// ログインしているユーザーが投稿したメモを1つ更新
router.put('/:memoId', tokenHandler.verifyToken, memoControllers.update);

// ログインしているユーザーが投稿したメモを1つ削除
router.delete('/:memoId', tokenHandler.verifyToken, memoControllers.delete);

module.exports = router;
