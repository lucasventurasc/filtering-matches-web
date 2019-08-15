import * as React from 'react'
import './MatchCard.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Card, Button, CardImg, CardTitle, CardText, CardSubtitle, CardBody } from 'reactstrap'

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

    render() {
        let compatibilityScoreColor: string = 'red';

        if (this.props.compatibilityScore > 0.50 && this.props.compatibilityScore < 0.69) {
            compatibilityScoreColor = 'yellow'
        } else if (this.props.compatibilityScore > 0.69) {
            compatibilityScoreColor = 'green'
        }

        return (
            <div className={"matchCard"}>
                <Card>
                    <CardImg className={"mainPhoto"} top width={"200px"} height={"150px"} src={this.props.mainPhoto} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>{this.props.display_name} - {this.props.age} yrs {!this.props.favourite ? '' : <span className={"rating-star full-star favourite"}/>}</CardTitle>
                        <CardSubtitle>{this.props.cityName} - {this.props.job_title} - {this.props.height_in_cm}cm </CardSubtitle>
                        <CardText>
                            <table>
                                <tr>
                                    <td>
                                        Contacts exchanged: <b>{this.props.contactsExchanged}</b>
                                    </td>
                                    <td>
                                        Compatibility score:
                                        <span style={{color: compatibilityScoreColor}}>
                                            <b>{this.props.compatibilityScore}</b>
                                        </span>
                                    </td>
                                </tr>
                            </table>
                        </CardText>
                    </CardBody>
                </Card>
            </div>
        )
    }
}

export default MatchCard
