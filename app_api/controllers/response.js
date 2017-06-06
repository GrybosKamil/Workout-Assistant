(function () {

    module.exports.sendJSON = function (res, status, content) {
        res.status(status)
            .json(content);
    };

})();
