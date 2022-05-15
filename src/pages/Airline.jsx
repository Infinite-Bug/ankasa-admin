import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import CardList from '../components/ListCard'
import {getListAirline, deleteAirline, suspend} from '../redux/actions/airline'
import Swal from 'sweetalert2'

export default function Airline() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  
  const airline = useSelector((state) => {
    return state.airline
  })

  useEffect(() => {
    dispatch(getListAirline())
    document.title = `${process.env.REACT_APP_APP_NAME} | Airline`
    window.scrollTo(0, 0)
  }, [dispatch])

  const onDelete = (id) => {
    Swal.fire({
      title: 'Are you sure delete this airline?',
      icon: 'warning',
      showCancelButton: true,
      showLoaderOnConfirm: true,
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        deleteAirline(id)
          .then((response) => {
            Swal.fire({
              title: response.message,
              icon: 'success'
            })
            dispatch(getListAirline())
          })
          .catch((err) => {
            Swal.fire({
              title: 'Delete failed!',
              icon: 'error'
          })
        })
      }
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
            <CardList title={item.name} pic={item.pic} phone={item.phone} date={item.created_date} src={`${process.env.REACT_APP_API_URL}/${item.photo}`} isActive={item.is_active ? "Active" : "Non Active"} btnIsActive={() => onSuspend(item.id, item.is_active ? false : true)} btnUpdate={() => navigate(`${process.env.REACT_APP_API_URL}/airline/${item.id}`)} btnDelete={() => onDelete(item.id)} />
          </div>
        ))
      }
    </div>
  )
}