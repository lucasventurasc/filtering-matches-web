import * as React from 'react'
import {isMobile} from 'react-device-detect';
import 'bootstrap/dist/js/bootstrap.min';
import InputRange from 'react-input-range';
import Toggle from 'react-toggle'
import SelectedFilters from "../../../data/SelectedFilters";

import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-input-range/lib/css/index.css';
import '../../external/Toggle.css';
import './FilterOptionsCommon.css'

const AGE_SLIDER_MIN = 18;
const AGE_SLIDER_MAX = 95;
const COMPATIBILITY_SLIDER_MIN = 1;
const COMPATIBILITY_SLIDER_MAX = 99;
const HEIGHT_SLIDER_MIN = 135;
const HEIGHT_SLIDER_MAX = 210;
const MAXIMUM_DISTANCE_MIN = 30;
const MAXIMUM_DISTANCE_MAX = 300;

interface FilterOptionsProps {

    onClickApplyFilter: (FilterOptionsState) => void;
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
                min: COMPATIBILITY_SLIDER_MIN,
                max: COMPATIBILITY_SLIDER_MAX,
            },
            ageSlider: {
                min: AGE_SLIDER_MIN,
                max: AGE_SLIDER_MAX,
            },
            heightSlider: {
                min: HEIGHT_SLIDER_MIN,
                max: HEIGHT_SLIDER_MAX,
            },
            maximumDistance: MAXIMUM_DISTANCE_MAX
        }
    }

    UNSAFE_componentWillMount() {
        if (!isMobile) {
            require('./FilterOptionsBrowser.css');
        } else {
            require('./FilterOptionsMobile.css');
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

    private handleRangeSlider(name, value, allowedMin, allowedMax) {
        let sliderName = name + "Slider";
        let filterNameFrom = name + "RangeFrom";
        let filterNameTo = name + "RangeTo";

        value.min = value.min < allowedMin ? allowedMin : value.min;
        value.max = value.max > allowedMax ? allowedMax : value.max;

        this.setState(prevState => ({
            ...prevState,
            [sliderName]: value,
            [filterNameFrom]: value.min,
            [filterNameTo]: value.max
        }));
    }

    private handleSingleRangeInput(name, value, maxAllowed) {
        this.setState(prevState => ({
            ...prevState,
            [name]: value > maxAllowed ? maxAllowed : value,
        }));
    }
    
    private onFilterClick() {
        this.props.onClickApplyFilter(this.transformToSelectedFilters(this.state));
    }

    render() {
        return (
            <div className={"filtersContent"}>
                <div className="form-group row">
                    <table style={{width: "100%"}}>
                        <tbody>
                        <tr>
                            <td>
                                <span className={"filterLabel"}>
                                    Show only with photos
                                </span>
                            </td>
                            <td align={"right"} valign={"middle"}>
                                <Toggle name={"hasPhoto"}
                                        icons={false}
                                        checked={this.state.hasPhoto}
                                        onChange={(event) => this.handleCheckboxChange(event)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="form-group row">
                    <table style={{width: "100%"}}>
                        <tbody>
                        <tr>
                            <td>
                                <span className={"filterLabel"}>
                                    Show only in contact
                                </span>
                            </td>
                            <td>
                                <Toggle name={"inContact"}
                                        icons={false}
                                        checked={this.state.inContact}
                                        onChange={(event) => this.handleCheckboxChange(event)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="form-group row">
                    <table style={{width: "100%"}}>
                        <tbody>
                        <tr>
                            <td>
                                <span className={"filterLabel"}>
                                    Show only favorites
                                </span>
                            </td>
                            <td>
                                <Toggle name={"favorited"}
                                        icons={false}
                                        checked={this.state.favorited}
                                        onChange={(event) => this.handleCheckboxChange(event)}/>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                </div>
                <div className="form-group row">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <span className={"filterLabel"}>
                                    Compatibility Range
                                </span>
                            </td>
                            <td>
                                <span className={"filterLabel rangeDetail"}>
                                    {this.state.compatibilityScoreSlider.min}% - {this.state.compatibilityScoreSlider.max}%
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <span className={"slider"}>
                        <InputRange
                            minValue={COMPATIBILITY_SLIDER_MIN}
                            maxValue={COMPATIBILITY_SLIDER_MAX}
                            formatLabel={value => `${value}%`}
                            value={this.state.compatibilityScoreSlider}
                            onChange={(value => this.handleRangeSlider('compatibilityScore', value,
                                COMPATIBILITY_SLIDER_MIN, COMPATIBILITY_SLIDER_MAX))}/>
                    </span>
                </div>
                <div className="form-group row">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <span className={"filterLabel"}>
                                    Age Range
                                </span>
                            </td>
                            <td>
                                <span className={"filterLabel rangeDetail"}>
                                    {this.state.ageSlider.min} - {this.state.ageSlider.max}
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <span className={"slider"}>
                        <InputRange
                            minValue={AGE_SLIDER_MIN}
                            maxValue={AGE_SLIDER_MAX}
                            value={this.state.ageSlider}
                            onChange={value => this.handleRangeSlider('age', value, AGE_SLIDER_MIN, AGE_SLIDER_MAX)}/>
                    </span>
                </div>
                <div className="form-group row">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <span className={"filterLabel"}>
                                    Height Range
                                </span>
                            </td>
                            <td>
                                <span className={"filterLabel rangeDetail"}>
                                    {this.state.heightSlider.min}cm - {this.state.heightSlider.max}cm
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <span className={"slider"}>
                        <InputRange
                            minValue={HEIGHT_SLIDER_MIN}
                            maxValue={HEIGHT_SLIDER_MAX}
                            formatLabel={value => `${value} cm`}
                            value={this.state.heightSlider}
                            onChange={value => this.handleRangeSlider('height', value, HEIGHT_SLIDER_MIN, HEIGHT_SLIDER_MAX)}/>
                    </span>
                </div>
                <div className="form-group row">
                    <table>
                        <tbody>
                        <tr>
                            <td>
                                <span className={"filterLabel"}>
                                    Maximum Distance
                                </span>
                            </td>
                            <td align={"right"} valign={"middle"}>
                                <span className={"filterLabel rangeDetail"}>
                                    {this.state.maximumDistance}km
                                </span>
                            </td>
                        </tr>
                        </tbody>
                    </table>
                    <span className={"slider"}>
                        <InputRange
                            minValue={MAXIMUM_DISTANCE_MIN}
                            maxValue={MAXIMUM_DISTANCE_MAX}
                            formatLabel={value => `${value} km`}
                            value={this.state.maximumDistance}
                            onChange={value => this.handleSingleRangeInput('maximumDistance', value, MAXIMUM_DISTANCE_MAX)}/>
                    </span>
                </div>
                <div className={"divFilterBtn"} style={{width: "100%", marginBottom: "30px"}}>
                    <button type="button" className="btn btn-secondary filterBtn"
                            onClick={() => this.onFilterClick()}>
                        Apply filters
                    </button>
                </div>
                <div style={{"height": isMobile ? "80px" : "0px"}}>
                    &nbsp;
                </div>
            </div>
        )
    }

    private transformToSelectedFilters(state: Readonly<FilterOptionsState>) {
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

