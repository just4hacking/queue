import { useState } from 'react'
import { toast } from 'react-toastify'
import logo from './logo.svg';
import './App.css';
import { useRequest } from './hooks'

function App() {
  const [text, setText] = useState('')
  const { doRequest, errors } = useRequest({ 
    url: 'http://localhost:3000/api/task' ,
    method: 'post',
    body: {
      text
    },
    onSuccess: ({ status }) => {
      toast(status)
      setText('')
    }
  })

  const onSubmit = () => {
    doRequest()
  }

  const renderContent = () => {
    if (errors)
      return errors

    return (
      <form className="container w-100">
        <p className="w-100">
          enter <code>some text</code> to paint it.
        </p>
        <div className="form-group w-100">
          <input 
            value={text}
            onChange={e => setText(e.target.value)} 
            type="text" 
            className="form-control w-100 text-center" 
            id="exampleInputEmail1" 
            aria-describedby="emailHelp" 
            placeholder=""
          />
        </div>
        <button 
          onClick={onSubmit}
          type="button" 
          className="btn btn-primary w-100"
        >
          <span>Paint it!</span>
        </button>
      </form>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        {renderContent()}
      </header>
    </div>
  );
}

export default App;
