'use strict';
const _ = require('lodash');
const moment = require('moment');
class twitterservice {
    constructor(twit, twitterRepository) {
        this._twit = twit;
        this._twitterRepository = twitterRepository;
    }
    searchForTweets(queryString, res, next) {
        this._twitterRepository.getExistingTweets(queryString.query).exec((err, existingTweets) => {
            this._twitterRepository.getLatestTweetId(queryString.query).exec((err, lastIdObj) => {
                var lastId=null;
                if(lastIdObj && lastIdObj[0] && lastIdObj[0].id)
                    lastId= lastIdObj[0].id;
                this._twit.get('search/tweets', { q: queryString.query, since_id: lastId}, (error, tweets) => {
                    console.log('tweets after since lastId', lastId, "length", tweets.statuses.length);
                    if (error) {
                        console.error(error);
                        //If search throws error return the tweets in the db
                        res.send(existingTweets);
                        return next();
                    }

                    tweets.statuses.forEach((status) => {
                        var momentDate = moment(status.created_at, 'ddd MMM DD HH:mm:ss Z YYYY');
                        status.created_at = momentDate.toDate();
                    });

                    var statuses = tweets.statuses;
                    //console.log('tweets ', tweets);
                    if (statuses && statuses.length != 0) {
                        //Getting latest created date
                        statuses.map((element) => {
                            return element.q = queryString.query;
                        });
                        var b = _.maxBy(statuses, 'id');
                        this._twitterRepository.saveTweetDateId(b.id, b.created_at, queryString.query);
                        this._twitterRepository.saveTweets(tweets.statuses);
                    }

                    //merge the existing tweets and latest ones
                    var merged = _.merge(_.keyBy(existingTweets, 'id'), _.keyBy(tweets.statuses, 'id'));
                    var values = _.values(merged);
                    res.send(values);
                    return next();
                });
            });
        })
    }
}
module.exports = twitterservice;