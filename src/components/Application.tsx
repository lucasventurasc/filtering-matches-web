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
        let loggedUserQueryParam = this.getParameterByName("loggedUser", window.location.href);
        let loggedUser = loggedUserQueryParam ? loggedUserQueryParam : 'Katherine';
        return (
            <div id={"application"}>
                <BrowserView>
                    <BrowserHeader loggedUser={loggedUser}/>
                </BrowserView>
                <FilterMatchesDashboard serverUrl={this.props.serverUrl} loggedUser={loggedUser.toLocaleLowerCase()}/>
            </div>
        )
    }

    getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        let regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }
}

export default Application
