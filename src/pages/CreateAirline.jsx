import React, { useState } from "react";
import '../assets/styles/createairline.css'
// import { useDispatch } from "react-redux";
import { createAirline } from '../redux/actions/airline'
// import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2'
import Navbar from '../components/Navbar'

export default function CreateAirline() {
    localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMmFiZTJiLWVmZmItNDdjNS04NjQwLTA4Yjk0NDRmNTBmMiIsImxldmVsIjoxLCJpYXQiOjE2NTI1MzU0OTgsImV4cCI6MTY1MjU1NzA5OH0.7tuFDfOlds1FvcOW7VxYmy8xwrYJDtipHst9yg43C7Y")
    localStorage.setItem("id", "122abe2b-effb-47c5-8640-08b9444f50f2")

    // const dispatch = useDispatch()
    // const navigate = useNavigate()
    const [name, setName] = useState("")
    const [PIC, setPIC] = useState("")
    const [phone, setPhone] = useState("")
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // photo
    const [photo, setPhoto] = useState("")

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", name);
        formData.append("pic", PIC);
        formData.append("phone", phone);
        formData.append("photo", photo)

        setErrors([]);
        setIsLoading(true)

        const createAirlineStatus = await createAirline(formData, setErrors)

        if (createAirlineStatus) {
            Swal.fire({
                title: 'Success',
                text: 'Add airline success',
                icon: 'success',
            })
        }

        setIsLoading(false);
    }

    return (
        <>
        <Navbar />
            <div className="container-fluid hanifAirline ml-0 mr-0">
                <div className="card w-100">
                    <div className="row">
                        <div className="col-12 d-flex justify-content-center">
                            <h3>Create Airline</h3>
                        </div>
                        <div className="col-12 fill-profile">
                            <div className="col-12 form-input">
                                {errors.length > 0 && (
                                    <div className="alert alert-danger mx-0">
                                        <ul className="m-0">
                                            {errors.map((error, index) => (
                                                <li key={index}>{error.msg}</li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                                <form onSubmit={(e) => onSubmit(e)} className="d-flex flex-column">
                                    <div className="form-contact col-6 d-flex flex-column">
                                        <label>Name</label>
                                        <input onChange={(e) => setName(e.target.value)} type="text" required />
                                        <label>PIC</label>
                                        <input onChange={(e) => setPIC(e.target.value)} type="text" required />
                                        <label>Phone</label>
                                        <input onChange={(e) => setPhone(e.target.value)} type="text" required />
                                        <label>Photo</label>
                                        <input onChange={(e) => setPhoto(e.target.files[0])} type="file" required />
                                    </div>

                                    {
                                        isLoading ?
                                            (
                                                <button
                                                    className="btn btn-success btn-lg ms-2"
                                                    type="button"
                                                    disabled
                                                >
                                                    <span
                                                        className="spinner-border spinner-border-sm"
                                                        role="status"
                                                        aria-hidden="true"
                                                    ></span>
                                                    {" "}
                                                    Loading...
                                                </button>
                                            ) :
                                            (
                                                <button type="submit">Save</button>
                                            )
                                    }
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </>

    )
}