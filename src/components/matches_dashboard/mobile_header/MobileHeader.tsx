import * as React from 'react'
import './MobileHeader.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

interface MobileMenuProps {
    text: string
    onClickToFilter: () => void;
    isFiltering: boolean
}

interface MobileMenuState {
}

class MobileHeader extends React.Component<MobileMenuProps, MobileMenuState> {

    constructor(props) {
        super(props);

    }

    openFilters() {
        this.props.onClickToFilter();
    }

    render() {
        return (
            <div id={"MobileHeader"}>
                <div className={"mobileFilterHeader"}>
                    <div style={{width: "70px"}}>
                        &nbsp;
                    </div>
                    <div>
                        {this.props.text}
                    </div>
                    <div className={"menuIcon"}
                         title={"Filters"}
                         style={{visibility: this.props.isFiltering ? 'hidden' : 'visible'}}
                         onClick={() => this.openFilters()}/>
                </div>
            </div>
        )
    }
}

export default MobileHeader
