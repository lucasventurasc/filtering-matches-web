import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
import MatchesFetcher from "../../src/data/MatchesFetcher";
import fetchMock from "fetch-mock"
import UserMatched from "../../src/data/UserMatched";

const SERVER_URL = 'http://server.com/matches';

@suite
class MatcherFetcherTest {

    before(): void {
        fetchMock.reset();
    }

    @test should_return_empty_array_when_no_matches(done) {
        fetchMock.mock(SERVER_URL + "/tony", {body: '[]', status: 200});
        new MatchesFetcher(SERVER_URL).fetchMatches("tony").then(result => {
            expect(result).is.empty;
            done();
        }).catch(done);
    }

    @test should_call_all_matches_and_return_200_when_no_filter(done) {
        let matchesFetcher = new MatchesFetcher(SERVER_URL);

        let body = "[" + JSON.stringify(this.getUserMatchedTestJson()) + "]";

        fetchMock.mock(SERVER_URL + "/tony", {body: body, status: 200});

        matchesFetcher.fetchMatches("tony").then(result => {
            expect(result).to.be.an.instanceOf(Array);
            expect(result).to.have.lengthOf(1);
            expect(result.pop()).is.deep.equal(this.getUserMatchedTestObject());
            done();
        }).catch(done);
    }

    getUserMatchedTestObject() {
        let userMatched = new UserMatched();
        userMatched.displayName = "Caroline";
        userMatched.age = 41;
        userMatched.jobTitle = "Corporate Lawyer";
        userMatched.heightInCm = 153;
        userMatched.cityName = "Leeds";
        userMatched.mainPhoto = "http://thecatapi.com/api/images/get?format=src&type=gif";
        userMatched.compatibilityScore = 0.76;
        userMatched.contactsExchanged = 2;
        userMatched.favourite = true;
        return userMatched;
    }

    getUserMatchedTestJson() {
       return {
            "displayName": "Caroline",
            "age": 41,
            "jobTitle": "Corporate Lawyer",
            "heightInCm": 153,
            "city": {
                "name": "Leeds",
                "lat": 53.801277,
                "lon": -1.548567
            },
            "mainPhoto": "http://thecatapi.com/api/images/get?format=src&type=gif",
            "compatibilityScore": 0.76,
            "contactsExchanged": 2,
            "favourite": true
        };
    }

}

