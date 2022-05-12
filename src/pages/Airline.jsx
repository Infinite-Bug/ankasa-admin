import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardList from '../components/ListCard'
import {getListAirline} from '../redux/actions/airline'

export default function Airline() {
  const dispatch = useDispatch()
  
  const airline = useSelector((state) => {
    return state.airline
  })
  console.log(airline)

  useEffect(() => {
    dispatch(getListAirline())
  }, [dispatch])

  return (
    <div>
      {
        airline.data.map((item, index) => (
          <div key={index}>
            <CardList title={item.name} pic={item.pic} phone={item.phone} src={`${process.env.REACT_APP_UPI_URL}/${item.photo}`} />
          </div>
        ))
      }
    </div>
  )
}