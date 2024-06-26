import {useState} from "react";

function DemoStateFunc() {
    const [numberValue, setNumberValue] = useState(0);
    const [value, setValue] = useState("haiTT");
    const increment = () => {
        setNumberValue(prevState => prevState + 1);
        setNumberValue(prevState => prevState + 1);
        setNumberValue(prevState => prevState + 1);
        // setNumberValue(numberValue + 1);
        // setNumberValue(numberValue + 1);
    }
    return (
        <>
            <h1>{numberValue}</h1>
            <button onClick={increment}>Increment</button>
        </>
    )
}

export default DemoStateFunc;