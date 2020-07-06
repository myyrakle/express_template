const jwt = require("jsonwebtoken");

function auth(option) {
    const validatePathValues = (e) => {
        if (typeof e == "string") {
            return new RegExp(e);
        } else if (e instanceof RegExp) {
            return e;
        } else {
            throw new Error(
                `Bad Path Value. You need to insert string or regexp value: ${e}`
            );
        }
    };

    // 인증이 필요한 경로값 배열
    const needAuthPaths = (option.needAuthPaths || []).map(validatePathValues);

    // 인증이 필요하지 않은 경로값 배열
    const needAuthPathsExcept = (option.needAuthPathsExcept || []).map(
        validatePathValues
    );

    // 1 (millisecond)
    // 1ms (millisecond)
    // 1s (second)
    // 1m (minute)
    // 1h (hour)
    // 1d (day)
    // 1w (week)
    // 1y (year)
    const expiresIn = option.expiresIn || "1h";

    // ['RS256', 'RS384', 'RS512',
    // 'HS256', 'HS384', 'HS512',
    // 'PS256', 'PS384', 'PS512',
    // 'ES256', 'ES384', 'ES512']
    const algorithms = option.algorithms || ["RS256"];

    const key = option.key || "";

    // 미들웨어
    return async function (req, res, next) {
        req.authorizer = {
            onLogin: false,
            //로그인 토큰 반환
            getToken: (id, datas) => {
                const token = jwt.sign({ id, ...datas }, key, {
                    expiresIn,
                    algorithms,
                });

                return token;
            },

            //로그인 토큰 갱신
            refreshToken: () => {
                const token = jwt.sign({ id, ...datas }, key);
                return token;
            },

            authorize: () => {},
        };

        const token = req.headers.authorization;
        const path = req.path;

        let needAuth = false;
        for (const e of needAuthPaths) {
            if (e.test(path)) {
                needAuth = true;
                break;
            }
        }

        let needAuthExcept = false;
        for (const e of needAuthPathsExcept) {
            if (e.test(path)) {
                needAuthExcept = true;
                break;
            }
        }

        if (needAuth && !needAuthExcept) {
            if (token == undefined) {
                res.status(401).json({
                    success: false,
                    msg: "need authorization token",
                });
                return;
            }

            // 인증 대상
            req.tokenValue = {};
            try {
                req.tokenValue = jwt.verify(token, privateKey);
            } catch (error) {
                req.error(error);
                res.status(401).json({ success: false, msg: "login failed" });
                return;
            }

            req.authorizer.onLogin = true;
            next();
        } else {
            //인증 대상 아님
            req.authorizer.onLogin = false;
            next();
        }
    };
}

module.exports = auth;
