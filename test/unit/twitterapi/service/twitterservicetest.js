var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
var should = chai.should();
var sinon = require('sinon');
var server;
var twitterservice = require('../../../../src/twitterapi/services/twitterservice');

chai.use(chaiAsPromised);

describe('Twitter API service tests', () => {
    let twitterrepository;
    let twit;
    beforeEach((done) => {
        twitterrepository = sinon.mock();
        twit = sinon.mock();

        twitterrepository.getExistingTweets = sinon.stub().resolves(
            [{
                "_id": "5c235c51e462b24e3ffbca78",
                "created_at": "2018-12-26T16:10:14.000+05:30",
                "id": 1077876737969553400,
                "id_str": "1077876737969553408",
                "text": "RT @manishtamancha: 1. TUMBBAD / OCTOBER\n\nTwo stunningly shot, evocative and intimate studies of human psyche- one a spectacularly mounted…",
                "truncated": false,
                "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
                "in_reply_to_status_id": null,
                "in_reply_to_status_id_str": null,
                "in_reply_to_user_id": null,
                "in_reply_to_user_id_str": null,
                "in_reply_to_screen_name": null,
                "geo": null,
                "coordinates": null,
                "place": null,
                "contributors": null,
                "is_quote_status": false,
                "retweet_count": 17,
                "favorite_count": 0,
                "favorited": false,
                "retweeted": false,
                "lang": "en",
                "q": "tumbbad"
            }]
        );
        twitterrepository.getLatestTweetId = sinon.stub().resolves(
            [{ 'id': 1077876737969553400 }]
        );
        twit.get = sinon.stub().resolves([{
            "_id": ObjectId("5c235c51e462b24e3ffbca78"),
            "created_at": ISODate("2018-12-26T16:10:14.000+05:30"),
            "id": 10778767379695534012,
            "id_str": "1077876737969553408",
            "text": "RT @manishtamancha: 1. TUMBBAD / OCTOBER\n\nTwo stunningly shot, evocative and intimate studies of human psyche- one a spectacularly mounted…",
            "truncated": false,
            "source": "<a href=\"http://twitter.com/download/android\" rel=\"nofollow\">Twitter for Android</a>",
            "in_reply_to_status_id": null,
            "in_reply_to_status_id_str": null,
            "in_reply_to_user_id": null,
            "in_reply_to_user_id_str": null,
            "in_reply_to_screen_name": null,
            "geo": null,
            "coordinates": null,
            "place": null,
            "contributors": null,
            "is_quote_status": false,
            "retweet_count": 17,
            "favorite_count": 0,
            "favorited": false,
            "retweeted": false,
            "lang": "en",
            "q": "tumbbad"
        }]);
    });
    xit('SHOULD GET TWEETS FROM BACKEND AND MERGE WITH THE ON THE FLY SEARCH', () => {
        let twitterservice = new twitterservice(twit, twitterrepository);
        twitterservice.searchForTweets().then(res => {
            try {
                done();
            }
            catch (error) {
                done(error);
            }
        }).catch((error) => {
            done(error);
        });
    });
});