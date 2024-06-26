import logo from './logo.svg';
import './App.css';
import StudentList from "./components/student/StudentList";
import DemoState from "./components/DemoState";
import StudentListFunc from "./components/student/StudentListFunc";
import DemoStateFunc from "./components/DemoStateFunc";

function App() {
  let name ="A0523I1"

  const changeNameClass = (value) => {
    console.log(value)
  }
  return (
    <>
    {/*<StudentList nameClass = {name} changeNameClass = {changeNameClass}/>*/}
    {/*  <DemoState />*/}
      <StudentListFunc />
      <DemoStateFunc />
    </>
  );
}

export default App;
