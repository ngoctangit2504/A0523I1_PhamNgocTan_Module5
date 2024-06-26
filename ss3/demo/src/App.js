import logo from './logo.svg';
import './App.css';
import StudentList from "./components/student/StudentList";
import DemoState from "./components/DemoState";

function App() {
  let name ="A0523I1"

  const changeNameClass = (value) => {
    console.log(value)
  }
  return (
    <>
    <StudentList nameClass = {name} changeNameClass = {changeNameClass}/>
      <DemoState />
    </>
  );
}

export default App;
