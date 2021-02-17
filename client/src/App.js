import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import logo from './logo.svg';
import './App.css';
import { useRequest } from './hooks'

function App() {
  const [text, setText] = useState('')
  const [items, setItems] = useState([])
  const { doRequest, errors } = useRequest({ 
    url: '/api/task' ,
    method: 'post',
    body: {
      text
    },
    onSuccess: ({ status }) => {
      toast.dark(status)
      setText('')
    }
  })

  useEffect(() => {
    const updateMsec = 2000
    const interval = setInterval(async () => {
      const response = await axios.delete('/api/task', {
        body: {}
      })
      console.log(response)
      if (response.status === 200) {
        console.log('here')
        setItems([...items, response.data.item.data ])
      }
      
    }, updateMsec)

    return () => {
      clearInterval(interval)
    }
  });

  const renderItems = () => {
    
    return items.map(({ text, color }) => {
      return <div style={{ color: `#${color}` }}>{text}</div>
    })
  }

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
        <div className="mt-3 w-100 text-center" style={{ height: '200px', overflowY: 'scroll'  }}>
          {renderItems()}
        </div>
      </header>
    </div>
  );
}

export default App;
