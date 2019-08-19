import * as React from 'react'
import './FilterOptions.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.min';
import InputRange from 'react-input-range';
import "react-input-range/lib/css/index.css"
import SelectedFilters from "../data/SelectedFilters";

interface FilterOptionsProps {

    onFilterClick: (FilterOptionsState) => void;
}

interface FilterOptionsState {
    hasPhoto: boolean,
    inContact: boolean,
    favorited: boolean,
    compatibilityScoreSlider: {
        min: number,
        max: number,
    },
    ageSlider: {
        min: number,
        max: number,
    },
    heightSlider: {
        min: number,
        max: number,
    },
    maximumDistance: number
}


class FilterOptions extends React.Component<FilterOptionsProps, FilterOptionsState> {

    constructor(props) {
        super(props);

        this.state = {
            hasPhoto: false,
            inContact: false,
            favorited: false,
            compatibilityScoreSlider: {
                min: 1,
                max: 99,
            },
            ageSlider: {
                min: 18,
                max: 95,
            },
            heightSlider: {
                min: 135,
                max: 210,
            },
            maximumDistance: 300
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

    private handleRangeSlider(name, value) {
        let sliderName = name + "Slider";
        let filterNameFrom = name + "RangeFrom";
        let filterNameTo = name + "RangeTo";
        this.setState(prevState => ({
            ...prevState,
            [sliderName]: value,
            [filterNameFrom]: value.min,
            [filterNameTo]: value.max
        }));
    }

    private handleSimpleInput(name, value) {
        this.setState(prevState => ({
            ...prevState,
            [name]: value,
        }));
    }

    render() {
        return (
            <div>
                <div className="form-group row">
                    <div className="checkbox">
                        <label className={"label"}>
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
                        <label className={"label"}>
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
                        <label className={"label"}>
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
                <div className="form-group row label" style={{minWidth: "100%"}}>
                    Compatibility:
                </div>
                <div className="form-group row hide-min-max">
                    <InputRange
                        minValue={1}
                        maxValue={99}
                        formatLabel={value => `${value}%`}
                        value={this.state.compatibilityScoreSlider}
                        onChange={value => this.handleRangeSlider('compatibilityScore', value)}
                        onChangeComplete={value => console.log(value)} />
                </div>
                <div className="form-group row label" style={{minWidth: "100%"}}>
                    Age:
                </div>
                <div className="form-group row hide-min-max">
                    <InputRange
                        minValue={18}
                        maxValue={95}
                        value={this.state.ageSlider}
                        onChange={value => this.handleRangeSlider('age', value)}
                        onChangeComplete={value => console.log(value)} />
                </div>
                <div className="form-group row label" style={{minWidth: "100%"}}>
                    Height:
                </div>
                <div className="form-group row hide-min-max">
                    <InputRange
                        minValue={135}
                        maxValue={210}
                        formatLabel={value => `${value} cm`}
                        value={this.state.heightSlider}
                        onChange={value => this.handleRangeSlider('height', value)}
                        onChangeComplete={value => console.log(value)} />
                </div>
                <div className="form-group row label" style={{minWidth: "100%"}}>
                    Maximum Distance:
                </div>
                <div className="form-group row maximumDistance">
                    <InputRange
                        minValue={30}
                        maxValue={300}
                        formatLabel={value => `${value} km`}
                        value={this.state.maximumDistance}
                        onChange={value => this.handleSimpleInput('maximumDistance', value)}
                        onChangeComplete={value => console.log(value)} />
                </div>
                <div className="form-group row align-bottom" style={{width:"100%", marginTop: "50px"}}>
                    <button type="button" className="btn btn-primary filterBtn"
                            onClick={() => this.props.onFilterClick(this.toSelectedFilters(this.state))}>Filter</button>
                </div>
            </div>
        )
    }

    private toSelectedFilters(state: Readonly<FilterOptionsState>) {
        let selectedFilters = new SelectedFilters();
        selectedFilters.hasPhoto = state.hasPhoto;
        selectedFilters.inContact = state.inContact;
        selectedFilters.favorited = state.favorited;
        selectedFilters.ageRangeFrom = state.ageSlider.min;
        selectedFilters.ageRangeTo = state.ageSlider.max;
        selectedFilters.heightRangeFrom = state.heightSlider.min;
        selectedFilters.heightRangeTo = state.heightSlider.max;
        selectedFilters.compatibilityScoreRangeFrom = state.compatibilityScoreSlider.min / 100;
        selectedFilters.compatibilityScoreRangeTo = state.compatibilityScoreSlider.max / 100;
        selectedFilters.distanceInKm = state.maximumDistance;
        return selectedFilters;
    }

}

export default FilterOptions
