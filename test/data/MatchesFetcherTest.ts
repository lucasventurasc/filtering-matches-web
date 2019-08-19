import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
import MatchesFetcher from "../../src/data/MatchesFetcher";
import fetchMock from "fetch-mock"
import UserMatched from "../../src/data/UserMatched";
import SelectedFilters from "../../src/data/SelectedFilters";

const BASE_SERVER_URL = 'http://server.com';

@suite
class MatcherFetcherTest {

    private matchesFetcher: MatchesFetcher;

    before(): void {
        fetchMock.reset();
        this.matchesFetcher = new MatchesFetcher(BASE_SERVER_URL);
    }

    @test should_return_empty_array_when_no_matches(done) {
        fetchMock.mock('http://server.com/api/v1/matches/tony', {body: '[]', status: 200});
        this.matchesFetcher.fetchMatches("tony").then(result => {
            expect(result).is.empty;
            done();
        }).catch(done);
    }

    @test should_call_all_matches_and_return_200_when_no_filter(done) {
        let body = "[" + JSON.stringify(this.getUserMatchedTestJson()) + "]";

        fetchMock.mock('http://server.com/api/v1/matches/tony', {body: body, status: 200});

        this.matchesFetcher.fetchMatches("tony").then(result => {
            expect(result).to.be.an.instanceOf(Array);
            expect(result).to.have.lengthOf(1);
            expect(result.pop()).is.deep.equal(this.getUserMatchedTestObject());
            done();
        }).catch(done);
    }

    @test should_call_all_matches_and_pass_has_photo_in_contact_and_favourite_filter(done) {
        let body = "[" + JSON.stringify(this.getUserMatchedTestJson()) + "]";

        fetchMock.mock( 'http://server.com/api/v1/matches/tony' +
            '?hasPhoto=true' +
            '&inContact=true' +
            '&favorited=true' ,{body: body, status: 200});

        let filters = new SelectedFiltersFake();
        filters.hasPhoto = true;
        filters.inContact = true;
        filters.favorited = true;

        this.matchesFetcher.fetchMatches("tony", filters).then(result => {
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

class SelectedFiltersFake implements SelectedFilters {
    favorited: boolean;
    hasPhoto: boolean;
    inContact: boolean;

}
