import * as React from "react";

interface Props {}

interface State {
    time: string;
}

export class Tick extends React.Component<Props, State> {

    state: State;

    tick() {
        setInterval(() => {
            this.setState({time: new Date().toLocaleTimeString()});
        }, 1000);
    }

    render() {
        this.state = {
            time: new Date().toLocaleTimeString(),
        };
        this.tick();
        return <div style={{color: "red"}}>
            <h1>Hello, world!</h1>
            <h2>It is {this.state.time}.</h2>
        </div>;
    }
}
