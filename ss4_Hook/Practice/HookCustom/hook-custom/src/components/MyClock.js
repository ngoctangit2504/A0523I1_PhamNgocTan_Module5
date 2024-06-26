import useClock from "../hooks/useClock";
import "./Clock.css"

function MyClock() {
    // Goij custom hook de su dung
    const [time, ampm] = useClock();
    return(
        <div id="Clock-style">
            {time}
            <span>{ampm}</span>
        </div>
    );

}

export default MyClock;