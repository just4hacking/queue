import DonateComponent from './DonateComponent'
import CommentsComponent from './CommentsComponent'
import './App.css';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <DonateComponent/>
        <div className="w-100" style={{ overflowY: 'scroll', height: '200px' }}>
        <CommentsComponent/>
        </div>
      </header>
    </div>
  );
}

export default App;
