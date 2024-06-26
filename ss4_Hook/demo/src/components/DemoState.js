import {Component} from "react";

class DemoState extends Component {
    constructor() {
        super();
        this.state = {
            numberValue: 0
        }
    }

    increment() {
        // this.setState({
        //     numberValue: this.state.numberValue + 1
        // })
        // this.setState({
        //     numberValue: this.state.numberValue + 1
        // })
        // this.setState({
        //     numberValue: this.state.numberValue + 1
        // })
        this.setState(state => (
            {
                numberValue: state.numberValue + 1
            }
        ))
        this.setState(state => (
            {
                numberValue: state.numberValue + 1
            }
        ))
        this.setState(state => (
            {
                numberValue: state.numberValue + 1
            }
        ))
    }


    render() {
        return (
            <>
                <h1>{this.state.numberValue}</h1>
                <button onClick={() => this.increment()}>Increment</button>
            </>
        )
    }
}

export default DemoState;