import {suite, test} from "mocha-typescript";
import {expect} from 'chai';
import MatchesFetcher from "../../src/data/MatchesFetcher";

@suite
class MatcherFetcherTest {

    @test should_return_empty_array_when_no_matches() {
        let userMatcheds = new MatchesFetcher().fetchMatches("tony");

        expect(userMatcheds).is.empty;
    }

}