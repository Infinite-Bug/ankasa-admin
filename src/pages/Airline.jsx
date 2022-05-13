import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import CardList from '../components/ListCard'
import {getListAirline, deleteAirline} from '../redux/actions/airline'

export default function Airline() {
  const dispatch = useDispatch()
  
  const airline = useSelector((state) => {
    return state.airline
  })

  useEffect(() => {
    dispatch(getListAirline())
  }, [dispatch])

  const onDelete = (id) => {
    deleteAirline(id)
      .then((res) => {
        console.log(res)
        dispatch(getListAirline())
        alert('hallo')
      }).catch((err) => {
  console.log(err.message)
})
  }
  
  return (
    <div>
      {
        airline.data.map((item, index) => (
          <div key={index}>
            <CardList title={item.name} pic={item.pic} phone={item.phone} date={item.created_date} src={`${process.env.REACT_APP_API_URL}/${item.photo}`} isActive={item.is_active ? "Active" : "Non Active"} btnIsActive={() => alert(item.is_active ? false : true)} btnUpdate={() => alert('Update')} btnDelete={() => onDelete(item.id)} />
          </div>
        ))
      }
    </div>
  )
}