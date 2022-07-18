import React from 'react'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom'

export default function Home() {
  const navigate = useNavigate();
  const handle = () => {
    navigate('/login')
  }
  return (
    <div>Home
      <Button type="primary" onClick={handle}>Click</Button>
    </div>
  )
}
