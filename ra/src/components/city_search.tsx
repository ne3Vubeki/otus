import React, {Component, LegacyRef} from 'react';

interface IProps {
    changeInput: (e) => void;
    onSearch: () => void;
}

interface IState {
    value: string;
    isSearch: boolean;
}


export class CitySearch extends Component<IProps, IState> {

    constructor(props: IProps) {
        super(props);
        this.state = {
            value: '',
            isSearch: false
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleChange(event) {
        this.setState({ value: event.target.value }, () => {
            if (!this.state.isSearch) {
                this.setState({isSearch: true});
            } else if (!this.state.value) {
                this.setState({isSearch: false});
            }
        });
        this.props.changeInput(event);
    }

    handleSearch() {
        if (this.state.isSearch) {
            this.setState({
                isSearch: false,
                value: ''
            });
        }
        this.props.onSearch();
    }

    render() {
        return <div style={{padding: "20px"}}>
            <div style={{background: "#cfcfcf", padding: "20px"}}>
                <h2>
                    <span style={{ verticalAlign: "middle" }}>Search city:</span>
                    <input onChange={this.handleChange} value={this.state.value} style={{
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
                    }} onClick={this.handleSearch} disabled={!this.state.isSearch}>Search</button>
                </h2>
            </div>
        </div>
    }

}
