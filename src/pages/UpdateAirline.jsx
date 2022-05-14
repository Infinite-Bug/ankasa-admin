import React, { useEffect, useState } from "react";
import '../assets/styles/createairline.css'
import { useDispatch, useSelector } from "react-redux";
import { getDetailAirline, updateAirline } from '../redux/actions/airline'
import { useNavigate, useParams } from "react-router-dom";

export default function UpdateAirline() {
    // localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEyMmFiZTJiLWVmZmItNDdjNS04NjQwLTA4Yjk0NDRmNTBmMiIsImxldmVsIjoxLCJpYXQiOjE2NTI1MDk0MTcsImV4cCI6MTY1MjUzMTAxN30.F_rYNsNgZQBDBrLwn_7jUu6rnDJAYlaK4CG6wwtJ_i4")
    // localStorage.setItem("id", "122abe2b-effb-47c5-8640-08b9444f50f2")

    const detailAirline = useSelector((state) => {
        return state.detailAirline
    })

    const dispatch = useDispatch()
    const navigate = useNavigate()
    const { id } = useParams()
    const [name, setName] = useState(detailAirline.data.name)
    const [PIC, setPIC] = useState(detailAirline.data.pic)
    const [phone, setPhone] = useState(detailAirline.data.phone)

    // photo
    const [photo, setPhoto] = useState("")

    useEffect(() => {
        dispatch(getDetailAirline(id, navigate))
    }, [])

    const onSubmit = (e) => {
        e.preventDefault()

        const formData = new FormData();
        formData.append("name", name);
        formData.append("pic", PIC);
        formData.append("phone", phone);
        formData.append("photo", photo)


        updateAirline(id, formData)
            .then((result) => {
                alert(result.message)
            })
            .catch((err) => {
                alert(err.message)
            })
    }
    return (
        <>
            <>
                <div className="container-fluid hanifAirline ml-0 mr-0">
                    <div className="card w-100">
                        <div className="row">
                            <div className="col-12 d-flex justify-content-center">
                                <h3>Update Airline</h3>
                            </div>
                            <div className="col-12 fill-profile w-100">
                                <div className="col-12 form-input">
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
                                        <button type="submit">Update</button>
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