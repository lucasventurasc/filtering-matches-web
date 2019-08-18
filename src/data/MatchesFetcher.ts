import UserMatched from "./UserMatched";

class MatchesFetcher {

    private _url: string;

    constructor(url: string) {
        this._url = url;
    }

    fetchMatches(user: string): Promise<UserMatched[]> {
        return fetch(this._url + "/" + user)
            .then(this.transformToUserMatchedArray)
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