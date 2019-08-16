import * as React from 'react'
import './Application.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import FilterMatchesDashboard from "./FilterMatchesDashboard";
import UserMatched from "../data/UserMatched";

interface ApplicationProps {

}

interface ApplicationState {
}

class Application extends React.Component<ApplicationProps, ApplicationState> {

    constructor(props) {
        super(props);
    }

    render() {
        let usersMatched = new Array<UserMatched>();

        for (let i = 0; i < 12; i++) {
            let userMatched = new UserMatched();
            userMatched.age = 24;
            userMatched.cityName = "London";
            userMatched.displayName = "Andressa Giovana";
            userMatched.favourite = true;
            userMatched.compatibilityScore = 0.51;
            userMatched.contactsExchanged = 30;
            userMatched.heightInCm = 165;
            userMatched.mainPhoto = this.getFakeWomanPhoto()[i];
            userMatched.jobTitle = "Lawyer";
            usersMatched.push(userMatched);
        }

        return (
            <div id={"application"}>
                <FilterMatchesDashboard usersMatched={usersMatched}/>
            </div>
        )
    }

    getFakeWomanPhoto() {
        return [
            'http://cdn6.viralscape.com/wp-content/uploads/2015/07/Oxford-United-Kingdom.jpg',
            'https://i.kinja-img.com/gawker-media/image/upload/s--rc0zysTU--/c_scale,f_auto,fl_progressive,q_80,w_800/xq47qve5n1mlmpvqlxca.jpg',
            'https://www.wellandgood.com/wp-content/uploads/2018/02/Stocksy-Chic-Woman-Alexey-Kuzma.jpg',
            'https://img-s-msn-com.akamaized.net/tenant/amp/entityid/BBW3Aka.img?h=616&w=624&m=6&q=60&o=f&l=f&x=270&y=123',
            'https://cdn.pixabay.com/photo/2017/10/18/21/36/portrait-2865605_960_720.jpg',
            'https://i2-prod.mirror.co.uk/incoming/article16543070.ece/ALTERNATES/s615/0_Casual-and-coy.jpg',
            'https://images.pexels.com/photos/1024311/pexels-photo-1024311.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500',
            'https://media.gettyimages.com/photos/blond-woman-with-perfect-skin-picture-id886494622?s=612x612',
            'https://www.ctvnews.ca/polopoly_fs/1.4376129.1555010364!/httpImage/image.jpg_gen/derivatives/landscape_620/image.jpg',
            'http://resizer.shared.arcpublishing.com/d3IyBBij30_e8sq2s1u721FSgAQ=/arc-anglerfish-arc2-prod-bonnier/public/H3XZ5IWIJ3NS27M5J3NCTNU3WM.jpg',
            'https://girlvsglobe.com/wp-content/uploads/2014/09/girl-vs-globe-london-big-ben.jpg',
            'https://www.tripsavvy.com/thmb/d56tGldV3TVEGNbDgwl6rZ1izAQ=/960x0/filters:no_upscale():max_bytes(150000):strip_icc()/GettyImages-866791936-5c436d3346e0fb00015d6a55.jpg'
        ]
    }
}

export default Application
