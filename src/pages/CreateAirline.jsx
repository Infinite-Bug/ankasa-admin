import React, { useEffect, useState } from "react";
import '../assets/styles/createairline.css'
import { useDispatch, useSelector } from "react-redux";
import { getDetailAirline, createAirline } from '../redux/actions/airline'
import { useNavigate, useParams } from "react-router-dom";

export default function CreateAirline() {
    // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMmFiZTJiLWVmZmItNDdjNS04NjQwLTA4Yjk0NDRmNTBmMiIsImxldmVsIjoxLCJpYXQiOjE2NTI0NDAxMjgsImV4cCI6MTY1MjQ2MTcyOH0.rTSYs-p8DB_dU0PJt3LwWA7nxVmry7yh2kMAbtN97jY")
    // localStorage.setItem("id", "122abe2b-effb-47c5-8640-08b9444f50f2")

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [name, setName] = useState("")
    const [PIC, setPIC] = useState("")
    const [phone, setPhone] = useState("")

    // photo
    const [photo, setPhoto] = useState("")

    useEffect(() => {
        dispatch(getDetailAirline(localStorage.getItem("id"), navigate))
    }, [dispatch])

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", name);
        formData.append("pic", PIC);
        formData.append("phone", phone);
        formData.append("photo", photo)


        createAirline(formData)
            .then((result) => {
                alert(result.message)
            })
            .catch((err) => {
                alert(err.message)
            })
    }

    return (
        <>
            <div className="container-fluid hanifAirline ml-0 mr-0">
                <div className="card w-100">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <h3>Create Airline</h3>
                        </div>
                        <div className="col-12 fill-profile">
                            <div className="col-12 form-input">
                                <form onSubmit={(e) => onSubmit(e)} className="d-flex flex-column">
                                    <div className="form-contact col-6 d-flex flex-column">
                                        <label>Name</label>
                                        <input onChange={(e) => setName(e.target.value)} type="text" required />
                                        <label>PIC</label>
                                        <input onChange={(e) => setPIC(e.target.value)} type="text" required />
                                        <label>Phone</label>
                                        <input onChange={(e) => setPhone(e.target.value)} type="text" required />
                                        <label>Photo</label>
                                        <input onChange={(e) => setPhoto(e.target.files[0])} type="file" />
                                    </div>
                                    <button type="submit">Save</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}