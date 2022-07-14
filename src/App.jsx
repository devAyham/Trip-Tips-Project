import './App.css';
import {BrowserRouter as Router} from 'react-router-dom';
import Main from './components/main/mainComponent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {   faRightToBracket } from '@fortawesome/free-solid-svg-icons';
import {   faH } from '@fortawesome/free-regular-svg-icons';
function App() {
  return (
    <Router>
      <div className="App">
        <Main/>
      </div>
    </Router>
  );
}

export default App;
