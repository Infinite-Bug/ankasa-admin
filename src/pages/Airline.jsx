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
            <CardList title={item.name} pic={item.pic} phone={item.phone} date={item.created_date} src={`${process.env.REACT_APP_API_URL}/${item.photo}`} isActive={item.is_active ? "Active" : "Non Active"} />
          </div>
        ))
      }
    </div>
  )
}