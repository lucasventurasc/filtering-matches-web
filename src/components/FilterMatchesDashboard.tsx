import * as React from 'react'
import './FilterMatchesDashboard.css'
import {Button, Card, CardBody, CardDeck, CardImg, CardSubtitle, CardText, CardTitle} from 'reactstrap'
import MatchCard from "./MatchCard";
import UserMatched from "../data/UserMatched";

interface FilterMatchesDashboardProps {
    usersMatched: Array<UserMatched>;
}

interface FilterMatchesDashboardState {
}


class FilterMatchesDashboard extends React.Component<FilterMatchesDashboardProps, FilterMatchesDashboardState> {

    constructor(props) {
        super(props);
    }

    render() {
        let cards = [];

        for (let userMatched of this.props.usersMatched) {
            cards.push(<MatchCard mainPhoto={userMatched.mainPhoto}
                                  age={userMatched.age}
                                  cityName={userMatched.cityName}
                                  compatibilityScore={userMatched.compatibilityScore}
                                  contactsExchanged={userMatched.contactsExchanged}
                                  favourite={userMatched.favourite}
                                  job_title={userMatched.jobTitle}
                                  display_name={userMatched.displayName}
                                  height_in_cm={userMatched.heightInCm}/>);
        }

        return (
            <div id={"dashboardContainer"}>
                <div className={"filters"}>
                    &nbsp;
                </div>
                <div className={"matches"}>
                    <div className={"centeredDeck"}>
                        <CardDeck>
                            {cards}
                        </CardDeck>
                    </div>
                </div>
            </div>
        )
    }
}

export default FilterMatchesDashboard
