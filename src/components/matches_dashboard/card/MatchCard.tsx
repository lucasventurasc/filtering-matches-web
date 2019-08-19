import * as React from 'react'
import './MatchCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button, CardImg, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap'
import {isMobile} from "react-device-detect";

interface MatchCardProps {

    mainPhoto: string,
    age: number,
    cityName: string,
    compatibilityScore: number,
    contactsExchanged: number,
    favourite: boolean,
    job_title: string,
    display_name: string,
    height_in_cm: number

}

interface MatchCardState {
}

class MatchCard extends React.Component<MatchCardProps, MatchCardState> {

    constructor(props) {
        super(props);
    }

    UNSAFE_componentWillMount() {
        if (isMobile) {
            require('./MatchCardMobile.css');
        }
    }

    render() {
        return (
            <div className={"matchCard"}>
                <Card>
                    <CardImg className={"mainPhoto"}
                             src={this.props.mainPhoto ? this.props.mainPhoto : 'assets/no-photo-available.jpg'}
                             alt="Image could not be loaded" />
                    <CardBody>
                        <CardTitle>
                            <span className={"cardTitle"}>
                                <span>
                                    {this.props.display_name}, {this.props.age}
                                </span>
                                <span title={"Favourite"}>
                                    {!this.props.favourite ? '' : <span className={"rating-star full-star favourite"}/>}
                                </span>
                            </span>
                        </CardTitle>
                        <CardSubtitle>
                            <span className={"cardSubtitle"}>
                                <span style={{display:"flex", flexDirection:"column"}}>
                                    <span>{this.props.job_title} at {this.props.cityName}</span>
                                    <span>{this.props.height_in_cm}cm</span>

                                    <span className={"cardIcons"}>
                                        <span title={"Contacts exchanged"}>
                                            <span className={"contactsExchangedIcon"}/>
                                            <b>{this.props.contactsExchanged}</b>
                                        </span>
                                        <span title={"Compatibility score"}>
                                            <span className={"compatibilityScoreIcon"}/>
                                            <span>
                                                <b>{this.props.compatibilityScore*100}%</b>
                                            </span>
                                        </span>
                                    </span>
                                </span>
                            </span>
                        </CardSubtitle>
                        <CardText>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default MatchCard
