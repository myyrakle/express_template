const jwt = require("jsonwebtoken");
const key = require("./../key/key");

async function auth(request, response, next) {
    const noAuthPaths = [""];
    const noAuthPathExcept = [""];

    const needAuthPaths = [""];
    const needAuthPathsExcept = [""];

    const token = request.headers.authorization;
    const { privateKey } = key;

    request.tokenValue = {};
    try {
        request.tokenValue = jwt.verify(token, privateKey);
    } catch (error) {
        console.log("인증 실패");
        console.log(error);
    }

    const onLogin =
        tokenValue.id != undefined &&
        request.session.id != undefined &&
        tokenValue.id == request.session.id;

    request.auth = {
        onLogin: onLogin,
        userId: request.session.id,
        userType: request.session.userType,

        //로그인 토큰 반환
        createLoginToken: (id, userType) => {
            const token = jwt.sign({ id: id }, privateKey);
            request.session.id = id;
            request.session.userType = userType;
            return token;
        },

        //로그인 토큰 갱신
        refreshLoginToken: () => {
            const token = jwt.sign({ id: request.session.id }, privateKey);
            return token;
        },
    };

    next();
}

module.exports = auth;
