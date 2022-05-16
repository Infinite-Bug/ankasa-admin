import React, { useEffect, useState } from "react";
import '../assets/styles/createairline.css'
import { useDispatch, useSelector } from "react-redux";
import { getDetailAirline, updateAirline } from '../redux/actions/airline'
import { useNavigate, useParams } from "react-router-dom";
import Navbar from '../components/Navbar'
import Swal from 'sweetalert2'

export default function UpdateAirline() {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const detailAirline = useSelector((state) => {
        return state.detailAirline
    })

    const { id } = useParams()
    const [name, setName] = useState(detailAirline.data.name)
    const [PIC, setPIC] = useState(detailAirline.data.pic)
    const [phone, setPhone] = useState(detailAirline.data.phone)
    const [errors, setErrors] = useState([])
    const [isLoading, setIsLoading] = useState(false)

    // photo
    const [photo, setPhoto] = useState("")

    useEffect(() => {
        dispatch(getDetailAirline(id, navigate))
    }, [dispatch, id, navigate])

    const onSubmit = async (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", name);
        formData.append("pic", PIC);
        formData.append("phone", phone);
        formData.append("photo", photo)

        setErrors([]);
        setIsLoading(true)

        const updateAirlineStatus = await updateAirline(id, formData, setErrors)

        if (updateAirlineStatus) {
            Swal.fire({
                title: 'Success',
                text: 'Update Airline success',
                icon: 'success',
            })
            dispatch(getDetailAirline(id, navigate))
            navigate('/airline')
        }

        setIsLoading(false);
    }
    return (
        <>
            <Navbar/>
            <>
                <div className="container-fluid hanifAirline ml-0 mr-0">
                    <div className="card w-100">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <h3>Update Airline</h3>
                            </div>
                            <div className="col-12 fill-profile w-100">
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
                                    <form onSubmit={(e) => { onSubmit(e) }} className="d-flex flex-column">
                                        <div className="form-contact col-6 d-flex flex-column">
                                            <label>Name</label>
                                            <input onChange={(e) => setName(e.target.value)} type="text" value={name} required />
                                            <label>PIC</label>
                                            <input onChange={(e) => setPIC(e.target.value)} type="text" value={PIC} required />
                                            <label>Phone</label>
                                            <input onChange={(e) => setPhone(e.target.value)} type="text" value={phone} required />
                                            <label>Photo</label>
                                            <input className="form-control" onChange={(e) => setPhoto(e.target.files[0])} type="file" required />
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
        </>
    )
}