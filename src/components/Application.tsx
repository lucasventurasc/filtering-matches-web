import * as React from 'react'
import './Application.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FilterMatchesDashboard from "./matches_dashboard/FilterMatchesDashboard";
import UserMatched from "../data/UserMatched";
import {BrowserView, MobileView } from "react-device-detect";
import BrowserHeader from "./browser_header/BrowserHeader";

interface ApplicationProps {

    serverUrl: string;
}

interface ApplicationState {

    usersMatchedList: Array<UserMatched>;
}

class Application extends React.Component<ApplicationProps, ApplicationState> {

    constructor(props) {
        super(props);
    }

    render() {
        let loggedUser = "Caroline";
        return (
            <div id={"application"}>
                <BrowserView>
                    <BrowserHeader loggedUser={loggedUser}/>
                </BrowserView>
                <FilterMatchesDashboard serverUrl={this.props.serverUrl} loggedUser={loggedUser}/>
            </div>
        )
    }
}

export default Application
