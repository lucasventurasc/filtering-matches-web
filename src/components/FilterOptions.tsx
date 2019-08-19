import * as React from 'react'
import './FilterOptions.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';

interface FilterOptionsProps {
}

interface FilterOptionsState {
    hasPhoto: boolean,
    inContact: boolean,
    favourite: boolean
}


class FilterOptions extends React.Component<FilterOptionsProps, FilterOptionsState> {

    constructor(props) {
        super(props);

        this.state = {
            hasPhoto: false,
            inContact: false,
            favourite: false
        }
    }

    handleCheckboxChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState(prevState => ({
            ...prevState,
            [name]: value
        }));
    }

    render() {
        return (
            <div>
                <div className="form-group row">
                    <input id={"chkHasPhoto"}
                           type="checkbox"
                           className={"checkbox-filter"}
                           name={"hasPhoto"}
                           checked={this.state.hasPhoto}
                           onChange={(event) => this.handleCheckboxChange(event)}/>
                    <label className={"checkboxtext"} htmlFor={"chkHasPhoto"} style={{fontSize: "2em"}}>
                        Big
                    </label>
                </div>
                <div className="form-group row">
                    <input id={"chkInContact"}
                           type="checkbox"
                           className={"checkbox-filter"}
                           name={"inContact"}
                           checked={this.state.inContact}
                           onChange={(event) => this.handleCheckboxChange(event)}/>
                    <label className={"checkboxtext"} htmlFor={"chkInContact"} style={{fontSize: "2em"}}>
                        Big
                    </label>
                </div>
                <div className="form-group row">
                    <input id={"chkFavourite"}
                           type="checkbox"
                           className={"checkbox-filter"}
                           name={"favourite"}
                           checked={this.state.favourite}
                           onChange={(event) => this.handleCheckboxChange(event)}/>
                    <label className={"checkboxtext"} htmlFor={"chkFavourite"} style={{fontSize: "2em"}}>
                        Big
                    </label>
                </div>
            </div>
        )
    }
}

export default FilterOptions
