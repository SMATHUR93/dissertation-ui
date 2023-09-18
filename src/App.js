import logo from './logo.svg';
import './App.css';
import EmployeeList from './components/EmployeeList';

function App() {
  return (
    <div className="App">
      {/* <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header> */}
        <EmployeeList employees={[{
            firstName: "ABC",
            lastName: "DEF",
            email: "abc.def@google.com",
        },{
            firstName: "PQR",
            lastName: "LMN",
            email: "pqr.lmn@google.com",
        }]}/>
    </div>
  );
}

export default App;
