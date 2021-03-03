import { useState } from 'react'
import { useRequest } from './hooks'

const DONATION = {id: 2, comment: "4343", amount: "1.23", actionStatus: "with_action", paid: false}

function DonateComponent() {
  const [comment, setComment] = useState('')
  const [secret, setSecret] = useState('')
  const [amount, setAmount] = useState('')
  const [loading, setLoading] = useState(false)
  const [donation, setDonation] = useState(null)

  const { doRequest: createDonation, errors: donationErrors } = useRequest({ 
    url: '/api/donations' ,
    method: 'post',
    body: {
      comment,
      amount
    },
    onSuccess: ({ status, result }) => {
      setComment('')
      setAmount('')
      setDonation({
        id: result.id,
        comment: result.comment
      })
    }
  })

  const { doRequest: completeDonation, errors: completeDonationErrors } = useRequest({ 
    url: '/api/payment/secret' ,
    method: 'post',
    body: {
      id: donation? donation.id : -1
    },
    onSuccess: () => {
      setSecret('')
      setDonation(null)
    }
  })

  const onSubmit = async (request) => {
    try {
      setLoading(true)
      await request()
    }
    catch (exc) {
      console.log(exc)
    }
    finally {
      setLoading(false)
    }
  }

  const renderDonationForm = () => {
    return (
      <form>
        <h4>Donation</h4>
        <div className="form-group">
          <input
            value={amount}
            onChange={e => setAmount(e.target.value)}
            className="form-control" 
            type="number"
            placeholder="amount"
          />
        </div>
        <div className="form-group">
          <textarea 
            value={comment}
            onChange={e => setComment(e.target.value)}
            type="text" 
            style={{ height: '100px' }} 
            className="form-control" 
            placeholder="comment"
          />
        </div>
        <button 
          disabled={loading}
          onClick={() => onSubmit(createDonation)}
          type="button" 
          className="btn btn-primary w-100"
        >
          {!loading? 'Donate' : 'Loading...'}
        </button>
        {donationErrors}
      </form>
    )
  }

  const renderPaymentPage = () => {
    return (
      <div>
        <h3>🎉 Congrads! 🎉</h3>
        <h4>Your donation ID is <code>{donation.id}</code></h4>
        <div className="text-center">
          Provide credit card number to finish
        </div>

        <form>
          <div className="form-group mt-3">
            <input
              value={secret}
              onChange={e => setSecret(e.target.value)}
              className="form-control" 
              type="text"
              placeholder="credit card number"
            />
          </div>
          <button 
            disabled={loading}
            onClick={() => onSubmit(completeDonation)}
            type="button" 
            className="btn btn-primary w-100"
          >
            {!loading? 'Finish' : 'Loading...'}
          </button>
          {completeDonationErrors}
        </form>
      </div>
    )
  }

  return (
    <div>
      {donation? renderPaymentPage() : renderDonationForm()}
    </div>
  );
}

export default DonateComponent
