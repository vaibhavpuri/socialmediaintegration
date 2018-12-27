'use strict'
class twitterrepository {
    constructor(twitterdateModel, tweetsModel) {
        this._twitterdateModel = twitterdateModel;
        this._tweetsModel = tweetsModel;
    }
    saveTweetDateId(idStr, date, queryString) {
        console.log(queryString, 'query');
        const m = new this._twitterdateModel({ id: idStr, tweetDate: date, q: queryString });
        m.save();
    }
    saveTweetDate(date, queryString) {
        const m = new this._twitterdateModel({ tweetDate: date, q: queryString });
        m.save();
    }
    getLatestTweetId(query) {
        console.log('query ', query);
        return this._twitterdateModel.find({ 'q': query }).sort({ 'id': -1 }).limit(1);
    }
    getExistingTweets(query) {
        return this._tweetsModel.find({ 'q': query });
    }
    saveTweets(tweets) {
        return this._tweetsModel.collection.insert(tweets);
    }

}
module.exports = twitterrepository;