import * as React from 'react'
import './Application.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FilterMatchesDashboard from "./matches_dashboard/FilterMatchesDashboard";
import UserMatched from "../data/UserMatched";

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
        return (
            <div id={"application"}>
                <FilterMatchesDashboard serverUrl={this.props.serverUrl}/>
            </div>
        )
    }
}

export default Application
