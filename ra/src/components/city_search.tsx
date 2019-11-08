import React, {Component, LegacyRef} from 'react';

interface IProps {
    changeInput: (e) => void;
    onSearch: (input) => void;
}

interface IState {
    isSearch: boolean;
}


export class CitySearch extends Component<IProps, IState> {

    input: LegacyRef<HTMLInputElement>;

    constructor(props: IProps) {
        super(props);
        this.state = {
            isSearch: false
        };
        this.input = React.createRef();
        this.handleInput = this.handleInput.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
    }

    handleInput(event) {
        if (!this.state.isSearch) {
            this.setState({isSearch: true});
        }
        this.props.changeInput(event);
    }

    handleSearch() {
        if (this.state.isSearch) {
            this.setState({isSearch: false});
        }
        this.props.onSearch(this.input);
    }

    render() {
        return <div style={{padding: "20px"}}>
            <div style={{background: "#cfcfcf", padding: "20px"}}>
                <h2>
                    <span style={{ verticalAlign: "middle" }}>Search city:</span>
                    <input onInput={this.handleInput} ref={this.input} style={{
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
