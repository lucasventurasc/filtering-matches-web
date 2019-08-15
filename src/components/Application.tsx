import * as React from 'react'
import './Application.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FilterMatchesDashboard from "./FilterMatchesDashboard";
import UserMatched from "../data/UserMatched";

interface ApplicationProps {

}

interface ApplicationState {
}

class Application extends React.Component<ApplicationProps, ApplicationState> {

    constructor(props) {
        super(props);
    }

    render() {
        let usersMatched = new Array<UserMatched>();

        for (let i = 0; i < 15; i++) {
            let userMatched = new UserMatched();
            userMatched.age = 24;
            userMatched.cityName = "London";
            userMatched.displayName = "Andressa Giovana";
            userMatched.favourite = true;
            userMatched.compatibilityScore = 0.51;
            userMatched.contactsExchanged = 30;
            userMatched.heightInCm = 165;
            userMatched.mainPhoto = "http://thecatapi.com/api/images/get?format=src&type=gif";
            userMatched.jobTitle = "Lawyer";
            usersMatched.push(userMatched);
        }

        return (
            <div id={"application"}>
                <FilterMatchesDashboard usersMatched={usersMatched}/>
            </div>
        )
    }
}

export default Application
