import logo from './logo.svg';
import './App.css';
import UsePrevious from './components/UsePrevious';
import UseWhyDidYouUpdate from './components/UseWhyDidYouUpdate';
import UseIdle from './components/UseIdle';

function App() {
  return (
    <div className="App">
      <UsePrevious />
      <UseWhyDidYouUpdate />
      <UseIdle />
    </div>
  );
}

export default App;
