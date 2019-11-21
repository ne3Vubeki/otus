import React, {Component} from 'react';
import {Link} from "react-router-dom";

interface IProps {
    status: any;
    onSearch: (search) => {};
    onInput: (event) => {};
}

export class CitySearch extends Component<IProps> {

    value: string;

    constructor(props: IProps) {
        super(props);
        this.handleInput = this.handleInput.bind(this);
        this.click = this.click.bind(this);
        this.value = '';
    }

    handleInput(event) {
        this.value = event.currentTarget.value;
        this.props.onInput(!!this.value);
    }

    click(event) {
        if(!this.props.status.isSearch) {
            event.preventDefault();
        } else {
            this.props.onInput(false);
        }
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
                    <Link to={this.value}
                          onClick={this.click}
                          style={{
                            verticalAlign: "middle",
                            fontSize: "22px",
                            padding: "4px 10px 6px"
                        }}>Search
                    </Link>
                </h2>
            </div>
        </div>;
    }

}
