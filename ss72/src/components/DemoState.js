import {Component} from "react";

class DemoState extends Component{
    constructor() {
        super();
        this.state = {
            students: [

            ],
            numberValue: 0
        }
    }

    changeValue = (event) => {
        //Nếu cập nhật giá trị dựa trên giá trị gốc thì nên dùng arrow function
        this.setState((prve) => {
            return {
                numberValue: prve.numberValue + 1
            }
        })

        this.setState((prve) => {
            return {
                numberValue: prve.numberValue + 1
            }
        })
        this.setState((prve) => {
            return {
                numberValue: prve.numberValue + 1
            }
        })
        // this.setState({
        //     numberValue: this.state.numberValue + 1
        // })
        // this.setState({
        //     numberValue: this.state.numberValue + 1
        // })
        // this.setState({
        //     numberValue: this.state.numberValue + 1
        // })
        // this.state.numberValue = event.target.value

    }
    render() {
        return(
            <>
                <input onChange={this.changeValue}/>
                <h1>Số {this.state.numberValue}</h1>
            </>
        )
    }
}

export default DemoState;

