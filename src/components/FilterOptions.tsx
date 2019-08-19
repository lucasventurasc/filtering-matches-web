import * as React from 'react'
import './FilterOptions.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import SelectedFilters from "../data/SelectedFilters";

interface FilterOptionsProps {

    onFilterClick: (FilterOptionsState) => void;
}

interface FilterOptionsState extends SelectedFilters {
    hasPhoto: boolean,
    inContact: boolean,
    favorited: boolean
}


class FilterOptions extends React.Component<FilterOptionsProps, FilterOptionsState> {

    constructor(props) {
        super(props);

        this.state = {
            hasPhoto: false,
            inContact: false,
            favorited: false
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
                    <div className="checkbox">
                        <label>
                            <input id={"chkHasPhoto"}
                                   type="checkbox"
                                   className={"checkbox-filter"}
                                   name={"hasPhoto"}
                                   checked={this.state.hasPhoto}
                                   onChange={(event) => this.handleCheckboxChange(event)}/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Has photo
                        </label>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox"
                                   className={"checkbox-filter"}
                                   name={"inContact"}
                                   checked={this.state.inContact}
                                   onChange={(event) => this.handleCheckboxChange(event)}/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            In contact
                        </label>
                    </div>
                </div>
                <div className="form-group row">
                    <div className="checkbox">
                        <label>
                            <input type="checkbox"
                                   className={"checkbox-filter"}
                                   name={"favorited"}
                                   checked={this.state.favorited}
                                   onChange={(event) => this.handleCheckboxChange(event)}/>
                            <span className="cr"><i className="cr-icon fa fa-check"/></span>
                            Favourites
                        </label>
                    </div>
                </div>
                <div className="form-group row align-bottom" style={{width:"100%"}}>
                    <button type="button" className="btn btn-primary filterBtn"
                            onClick={() => this.props.onFilterClick(this.state)}>Filter</button>
                </div>
            </div>
        )
    }
}

export default FilterOptions
