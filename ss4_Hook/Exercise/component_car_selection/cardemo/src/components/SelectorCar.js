import {useState, useEffect} from "react";

function SelectCar() {
    let [selectedCar, setSelectedCar] = useState("0");
    let [valueSelectedCar, setValueSelectedCar] = useState("");

    let [selectedColor, setSelectedColor] = useState("0");
    let [valueSelectedColor, setValueSelectedColor] = useState("");

    const choiceCar = ca => {
        setSelectedCar(ca.target.value);
    };

    const choiceColor = co => {
        setSelectedColor(co.target.value);
    };



    useEffect(() => {
        switch (selectedCar) {
            case "0":
                setValueSelectedCar("BMW 320i");
                break;
            case "1":
                setValueSelectedCar("BMW 330 M Sport");
                break;
            case "2":
                setValueSelectedCar("BMW 520i");
                break;
            case "3":
                setValueSelectedCar("BMW 530i");
                break;
            case "4":
                setValueSelectedCar("BMW 730i");
                break;
            case "5":
                setValueSelectedCar("BMW X3");
                break;
            case "6":
                setValueSelectedCar("BMW X5");
                break;
            case "7":
                setValueSelectedCar("BMW X7");
                break;
            default:
        }
    }, [selectedCar]);


    useEffect(() => {
        switch (selectedColor) {
            case "0":
                setValueSelectedColor("Black");
                break;
            case "1":
                setValueSelectedColor("White");
                break;
            case "2":
                setValueSelectedColor("Blue");
                break;
            case "3":
                setValueSelectedColor("Yellow");
                break;
            case "4":
                setValueSelectedColor("Red");
                break;
            default:
        }
    }, [selectedColor]);


    return(
        <div>
            <h1>Select your Car</h1>
            Select a car
            <select onChange={ca => {
                choiceCar(ca);
            }}>
                <option value={"0"}>BMW 320i</option>
                <option value={"1"}>BMW 330 M Sport</option>
                <option value={"2"}>BMW 520i</option>
                <option value={"3"}>BMW 530i</option>
                <option value={"4"}>BMW 730i</option>
                <option value={"5"}>BMW X3</option>
                <option value={"6"}>BMW X5</option>
                <option value={"7"}>BMW X7</option>
            </select>

            Select your color
            <select onChange={co => {
                choiceColor(co);
            }}>
                <option value={"0"}>Black</option>
                <option value={"1"}>White</option>
                <option value={"2"}>Blue</option>
                <option value={"3"}>Yellow</option>
                <option value={"4"}>Red</option>
            </select>

            <h2>Your selected a {valueSelectedColor} - {valueSelectedCar}</h2>
        </div>
    )
}

export default SelectCar;