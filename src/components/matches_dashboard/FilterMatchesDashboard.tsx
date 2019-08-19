import * as React from 'react'
import './FilterMatchesDashboard.css'
import {Button, Card, CardBody, CardDeck, CardImg, CardSubtitle, CardText, CardTitle} from 'reactstrap'
import MatchCard from "./card/MatchCard";
import UserMatched from "../../data/UserMatched";
import FilterOptions from "./filter_options/FilterOptions";
import SelectedFilters from "../../data/SelectedFilters";
import MatchesFetcher from "../../data/MatchesFetcher";
import {BrowserView, MobileView } from "react-device-detect";
import MobileHeader from "./mobile_header/MobileHeader";

interface FilterMatchesDashboardProps {
    serverUrl: string
}

interface FilterMatchesDashboardState {

    usersMatched: UserMatched[]
    mobileShowingFilters: boolean,
    mobileShowingMatches: boolean
}


class FilterMatchesDashboard extends React.Component<FilterMatchesDashboardProps, FilterMatchesDashboardState> {
    private matchesFetcher: MatchesFetcher;

    constructor(props) {
        super(props);

        this.state = {
            usersMatched: [],
            mobileShowingMatches: true,
            mobileShowingFilters: false
        };

        this.matchesFetcher = new MatchesFetcher(this.props.serverUrl);
        this.filterMatches(null);
    }

    private filterMatches(filters: SelectedFilters) {
        this.matchesFetcher.fetchMatches("Caroline", filters)
            .then((result) => {
                this.applyFakePhotosForMoreReality(result);
                this.setState(prevState => ({
                    ...prevState,
                    usersMatched: result,
                    mobileShowingMatches: true,
                    mobileShowingFilters: false
                }));
            });
    }

    private applyFakePhotosForMoreReality(result) {
        result.forEach((value, index) => {
            value.mainPhoto = value.mainPhoto ? this.getFakeWomanPhoto()[index] : null
        });
    }

    private onClickToFilter() {
        this.setState(prevState => ({
            ...prevState,
            mobileShowingFilters: true,
            mobileShowingMatches: false
        }));
    }

    private getMobileTextHeader() {
        if (this.state.mobileShowingFilters) {
            return "Filter Matches"
        } else if (this.state.mobileShowingMatches) {
            return "Matches"
        }
    }


    render() {
        let cards = [];

        for (let userMatched of this.state.usersMatched) {
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
            <div>
                {this.renderBrowserView(cards)}
                {this.renderMobileView(cards)}
            </div>
        )
    }

    private renderBrowserView(cards) {
        return <BrowserView>
            <div id={"dashboardContainer"}>
                <div className={"browser filters"}>
                    <div
                        style={{
                            width: "100%",
                            color: "#6E6E6E",
                            borderBottom: "1px solid #ccc",
                            marginBottom: "30px"
                        }}>
                        <h5>Filtering options</h5>
                    </div>
                    <div style={{marginLeft: "30px"}}>
                        <FilterOptions onClickApplyFilter={(filters) => this.filterMatches(filters)}/>
                    </div>
                </div>
                <div className={"matches"}>
                    {this.renderMatchesCardsComponent(cards)}
                </div>
            </div>
        </BrowserView>;
    }

    private renderMatchesCardsComponent(cards) {
        if (cards.length > 0) {
            return <div className={"centeredDeck"}>
                <CardDeck>
                    {cards}
                </CardDeck>
            </div>;
        } else {
            return <div style={{textAlign: "center", width: "100%"}}>
                <span style={{fontSize: "50px", color:"#555", fontWeight:"bold"}}>No matches for that filters</span>
            </div>
        }
    }

    private renderMobileView(cards) {
        return <MobileView>
            <MobileHeader isFiltering={this.state.mobileShowingFilters}
                          text={this.getMobileTextHeader()}
                          onClickToFilter={() => this.onClickToFilter()}/>
            <div className={"mobile matches"} style={{display: this.state.mobileShowingMatches ? 'flex' : 'none', marginTop: "30px", width:"100%"}}>
                {this.renderMatchesCardsComponent(cards)}
            </div>
            <div className={"mobile filters"} style={{padding: "0px", visibility: this.state.mobileShowingFilters ? 'visible' : 'hidden', marginTop: "30px"}}>
                <FilterOptions onClickApplyFilter={(filters) => this.filterMatches(filters)}/>
            </div>
        </MobileView>;
    }

    getFakeWomanPhoto() {
        return [
            'http://cdn6.viralscape.com/wp-content/uploads/2015/07/Oxford-United-Kingdom.jpg',
            'https://i.kinja-img.com/gawker-media/image/upload/s--rc0zysTU--/c_scale,f_auto,fl_progressive,q_80,w_800/xq47qve5n1mlmpvqlxca.jpg',
            'https://www.wellandgood.com/wp-content/uploads/2018/02/Stocksy-Chic-Woman-Alexey-Kuzma.jpg',
            'http://cdn6.viralscape.com/wp-content/uploads/2015/07/Oxford-United-Kingdom.jpg',
            'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBW3Aka.img?h=616&w=624&m=6&q=60&o=f&l=f&x=270&y=123',
            'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBW3Aka.img?h=616&w=624&m=6&q=60&o=f&l=f&x=270&y=123',
            'https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_960_720.jpg',
            'https://i2-prod.mirror.co.uk/incoming/article16543070.ece/ALTERNATES/s615/0_Casual-and-coy.jpg',
            'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://media.gettyimages.com/photos/blond-woman-with-perfect-skin-picture-id886494622?s=612x612',
            'https://media.gettyimages.com/photos/blond-woman-with-perfect-skin-picture-id886494622?s=612x612',
            'https://www.ctvnews.ca/polopoly_fs/1.4376129.1555010364!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg',
            'http://resizer.shared.arcpublishing.com/d3IyBBij30_e8sq2s1u721FSgAQ=/arc-anglerfish-arc2-prod-bonnier/public/H3XZ5IWIJ3NS27M5J3NCTNU3WM.jpg',
            'https://media.gettyimages.com/photos/blond-woman-with-perfect-skin-picture-id886494622?s=612x612',
            'http://cdn6.viralscape.com/wp-content/uploads/2015/07/Oxford-United-Kingdom.jpg',
            'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBW3Aka.img?h=616&w=624&m=6&q=60&o=f&l=f&x=270&y=123',
            'https://girlvsglobe.com/wp-content/uploads/2014/09/girl-vs-globe-london-big-ben.jpg',
            'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBW3Aka.img?h=616&w=624&m=6&q=60&o=f&l=f&x=270&y=123',
            'https://media.gettyimages.com/photos/blond-woman-with-perfect-skin-picture-id886494622?s=612x612',
            'https://www.tripsavvy.com/thmb/d56tGldV3TVEGNbDgwl6rZ1izAQ=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-866791936-5c436d3346e0fb00015d6a55.jpg',
            'https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_960_720.jpg',
            'https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_960_720.jpg',
            'https://i2-prod.mirror.co.uk/incoming/article16543070.ece/ALTERNATES/s615/0_Casual-and-coy.jpg',
            'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
        ]
    }
}

export default FilterMatchesDashboard
