import {useState} from "react";

export default function useClock() {
    const [time, setTime] = useState("");
    const [ampm, setAmpm] = useState("");

    // Function cap nhat thoi gian.
    const updateTime = function () {
        let dateInfo = new Date();
        let hour = 0;
        /*Lay gia tri cua gio*/
        if (dateInfo.getHours() === 0) {
            hour = 12;
        } else if (dateInfo.getHours() > 12) {
            hour = dateInfo.getHours() - 12;
        } else {
            hour = dateInfo.getHours();
        }
        /*Lay gia tri cua phut*/
        let minute = dateInfo.getMinutes() < 10
            ? parseInt("0" + dateInfo.getMinutes())
            : dateInfo.getMinutes();

        // Lay gia tri cua giay
        let seconds = dateInfo.getSeconds() < 10
            ? parseInt("0" + dateInfo.getSeconds())
            : dateInfo.getSeconds();

        // Dinh dang ngay
        let ampm = dateInfo.getHours() >= 12 ? " PM" : " AM";

        // Cap nhat state
        setAmpm(ampm)
        setTime(`${hour}:${minute}:${seconds}`);
    };

    setInterval(function () {
        updateTime();
    }, 1000);

    return [time, ampm]
}