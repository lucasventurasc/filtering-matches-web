import UserMatched from "./UserMatched";
import SelectedFilters from "./SelectedFilters";

class MatchesFetcher {

    private _url: string;

    constructor(url: string) {
        this._url = url + "/api/v1/matches";
    }

    fetchMatches(user: string, filters?: SelectedFilters): Promise<UserMatched[]> {
        let queryString = filters ? "?" + this.buildQueryString(filters) : '';
        return fetch(this._url + "/" + user + queryString)
            .then(this.transformToUserMatchedArray)
    }

    private buildQueryString(filters: SelectedFilters): string {
        let queryString = '';
        Object.keys(filters).forEach((key , index) => {
            queryString = queryString.concat("&" + key + "=" + filters[key]);
        });
        return queryString.substr(1, queryString.length);
    }


    private transformToUserMatchedArray(response): Promise<UserMatched[]> {
        return response.json().then(value => {
            let matches: Array<UserMatched> = [];
            for (let data of value) {
                matches.push(MatchesFetcher.toUserMatched(data));
            }
            return matches;
        });
    }

    private static toUserMatched(userMatchedAsJson: JSON): UserMatched {
        let userMatched = new UserMatched();
        userMatched.displayName = userMatchedAsJson["displayName"];
        userMatched.age = userMatchedAsJson["age"];
        userMatched.jobTitle = userMatchedAsJson["jobTitle"];
        userMatched.heightInCm = userMatchedAsJson["heightInCm"];
        userMatched.cityName = userMatchedAsJson["city"].name;
        userMatched.mainPhoto = userMatchedAsJson["mainPhoto"];
        userMatched.compatibilityScore = userMatchedAsJson["compatibilityScore"];
        userMatched.contactsExchanged = userMatchedAsJson["contactsExchanged"];
        userMatched.favourite = userMatchedAsJson["favourite"];
        return userMatched;
    }
}

export default MatchesFetcher;