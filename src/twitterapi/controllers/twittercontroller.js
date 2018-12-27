'use strict'
class twittercontroller {
    constructor(twitterservice) {
        this._twitterservice = twitterservice;
    }
    registerroutes(server) {
        server.get('/search/twitter', this._gettweets.bind(this));
    }
    _gettweets(req, res, next) {
        this._twitterservice.searchForTweets(req.query, res, next);
    }

}
module.exports = twittercontroller;