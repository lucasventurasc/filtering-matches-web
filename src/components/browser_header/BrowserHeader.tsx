import * as React from 'react'
import './BrowserHeader.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import 'bootstrap/dist/js/bootstrap.min'

interface BrowserHeaderProps {
    loggedUser: string
}

interface BrowserHeaderState {
}

class BrowserHeader extends React.Component<BrowserHeaderProps, BrowserHeaderState> {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div id={"BrowserHeader"}>
                <div className={"browserHeader"}>
                    <div style={{fontSize: "25px", fontWeight: "bold"}}>
                        Love OS Platform
                    </div>
                    <div>
                    </div>
                    <div style={{display: "flex", flexFlow: "row", color:"black"}}>
                        <div style={{fontSize: "15px"}}>Logged as {this.props.loggedUser}</div>
                        &nbsp;|&nbsp;
                        <a style={{color: "blue"}} href={"#"} onClick={() => alert("Not implemented")}>Sign out</a>
                    </div>
                </div>
            </div>
        )
    }
}

export default BrowserHeader
