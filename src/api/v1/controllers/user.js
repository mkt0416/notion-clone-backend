
const CryptoJs = require('crypto-js');
const JWT = require('jsonwebtoken');
const User = require('../models/user');

exports.register = async (req, res) => {
    // パスワードの受け取り
    const password = req.body.password;

    try {
        // パスワードの暗号化
        req.body.password = CryptoJs.AES.encrypt(password, process.env.SECRET_KEY);
        // ユーザーの新規作成
        const user = await User.create(req.body);
        // JWTの発行
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SCRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
        return res.status(201).json({ user, token });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        // DBからユーザーを探してくる
        const user = await User.findOne({ username: username });
        if (!user) {
            return res.status(401).json({
                errors: [
                    {
                        path: 'username',
                        msg: 'ユーザー名が無効です',
                    }
                ]
            });
        }
        // パスワードの照合
        const decryptedPassword = CryptoJs.AES.decrypt(
            user.password,
            process.env.SECRET_KEY,
        ).toString(CryptoJs.enc.Utf8);
        if (password !== decryptedPassword) {
            return res.status(401).json({
                errors: [
                    {
                        path: 'password',
                        msg: 'パスワードが無効です',
                    }
                ]
            });
        }
        // JWTの発行
        const token = JWT.sign({ id: user._id }, process.env.TOKEN_SCRET_KEY, {
            algorithm: 'HS256',
            expiresIn: '1d',
        });
        return res.status(200).json({ user, token });
    } catch (err) {
        console.log(err);
        return res.status(500).json(err);
    }
};