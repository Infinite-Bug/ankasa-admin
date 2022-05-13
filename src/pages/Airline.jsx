import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardList from '../components/ListCard'
import {getListAirline, deleteAirline, suspend} from '../redux/actions/airline'

export default function Airline() {
  const navigate = useNavigate()
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
      }).catch((err) => {
  console.log(err.message)
})
  }
  
  const onSuspend = (id, isActive) => {
    suspend(id, isActive).then((res) => {
      console.log(res)
      dispatch(getListAirline())
    }).catch((err) => {
      console.log(err)
    })
  }
  return (
    <div>
      {
        airline.data.map((item, index) => (
          <div key={index}>
            <CardList title={item.name} pic={item.pic} phone={item.phone} date={item.created_date} src={`${process.env.REACT_APP_API_URL}/${item.photo}`} isActive={item.is_active ? "Active" : "Non Active"} btnIsActive={() => onSuspend(item.id, item.is_active ? false : true)} btnUpdate={() => alert(item.id)} btnDelete={() => onDelete(item.id)} />
          </div>
        ))
      }
    </div>
  )
}