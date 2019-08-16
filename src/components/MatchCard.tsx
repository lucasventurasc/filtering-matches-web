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
        let compatibilityScoreColor: string = '#0D98BA';

        if (this.props.compatibilityScore > 0.50 && this.props.compatibilityScore < 0.69) {
            compatibilityScoreColor = '#FFAE42'
        } else if (this.props.compatibilityScore > 0.69) {
            compatibilityScoreColor = '#ADFF2F'
        }

        return (
            <div className={"matchCard"}>
                <Card>
                    <CardImg className={"mainPhoto"} top width={"200px"} height={"150px"} src={this.props.mainPhoto} alt="Card image cap" />
                    <CardBody>
                        <CardTitle>
                            <span className={"cardTitle"}>
                                <span>
                                    {this.props.display_name}, {this.props.age}
                                </span>
                                <span>
                                    {!this.props.favourite ? '' : <span className={"rating-star full-star favourite"}/>}
                                </span>
                            </span>
                        </CardTitle>
                        <CardSubtitle>
                            <span className={"cardSubtitle"}>
                                <table style={{width: "100%"}}>
                                    <tr>
                                        <td>
                                            <span style={{display:"flex", flexDirection:"column"}}>
                                                <span>{this.props.job_title} at {this.props.cityName}</span>
                                                <span>{this.props.height_in_cm}cm</span>
                                            </span>
                                        </td>
                                        <td align={"right"}>
                                            <span style={{display:"flex", flexDirection:"column"}}>
                                                <span>Compatibility:&nbsp;
                                                    <span style={{color: compatibilityScoreColor}}>
                                                        <b>{this.props.compatibilityScore*100}%</b>
                                                    </span>
                                                </span>
                                                <span>Contacts exchanged:&nbsp;<b>{this.props.contactsExchanged}</b></span>
                                            </span>
                                        </td>
                                    </tr>
                                </table>
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
