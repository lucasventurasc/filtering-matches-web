import * as React from 'react'
import './FilterMatchesDashboard.css'

interface FilterMatchesDashboardProps {

}

interface FilterMatchesDashboardState {
}

class FilterMatchesDashboard extends React.Component<FilterMatchesDashboardProps, FilterMatchesDashboardState> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"dashboardContainer"}>
                <h1>SHOW</h1>
            </div>
        )
    }
}

export default FilterMatchesDashboard
