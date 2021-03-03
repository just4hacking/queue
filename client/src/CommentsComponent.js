import { useState, useEffect } from 'react'
import axios from 'axios'

function CommentsComponent() {
  const [items, setItems] = useState([])

  useEffect(() => {
    const updateMsec = 1000
    const interval = setInterval(async () => {
      const response = await axios.get('/api/donation/messages')
      
      if (response.status === 200) {
        setItems(response.data.result)
      }
      
    }, updateMsec)

    return () => {
      clearInterval(interval)
    }
  })

  const renderItems = () => {
    return items.map(item => {
      return (
        <div>
          <span style={{ color: `#${item.color}`}}>{item.comment}</span>
        </div>
      )
    })
  }

  return (
    <div className="mt-3">
      <h4>Comments</h4>
      {renderItems()}
    </div>
  );
}

export default CommentsComponent
