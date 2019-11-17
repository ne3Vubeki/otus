import React, {Component} from 'react';
import {actions} from "../actions/actions";
import {connect} from 'react-redux'
import {ApiService} from "../services/api";

const api = new ApiService();

interface IProps {
    status: any;
    onSearch: (event) => {};
    onInput: (event) => {};
}

class CitySearch extends Component<IProps>{

    value: string;

    constructor(props: IProps) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInput(event) {
        this.value = event.currentTarget.value;
        this.props.onInput(!!this.value);
    }

    handleSearch() {
        this.props.onSearch(this.value);
        this.props.onInput(false);
    }

    render() {
        return <div style={{padding: "20px"}}>
            <div style={{background: "#cfcfcf", padding: "20px"}}>
                <h2>
                    <span style={{verticalAlign: "middle"}}>Search city:</span>
                    <input onInput={this.handleInput} style={{
                        margin: "0 10px",
                        verticalAlign: "middle",
                        width: "60%",
                        fontSize: "22px",
                        padding: "3px 10px 4px"
                    }}/>
                    <button style={{
                        verticalAlign: "middle",
                        fontSize: "22px",
                        padding: "4px 10px 6px"
                    }} onClick={this.handleSearch} disabled={!this.props.status.isSearch}>Search
                    </button>
                </h2>
            </div>
        </div>;
    }

}

export const Search = connect(
    state =>
        ({
            status: state.status
        }),
    {
        onSearch: (city) => api.getCity(city),
        onInput: (isSearch) => (dispatch) => dispatch(actions.showSearch(isSearch))
    }
)(CitySearch);

