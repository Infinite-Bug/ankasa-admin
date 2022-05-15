import React from "react";
import '../assets/styles/cardList.css'

export default function CardList(params) {
  return (
    <>
      <div className="container cardlist">
        <div className="row">
          <div className="col-md-2 boxLogo">
            <img src={params.src} alt={params.title} className="logoAirline" />
          </div>
          <div className="col-md-5 info">
            <h2 className="title">{params.title}</h2>
            <p className="infoText">{params.pic} | {params.phone} | {params.date}
            </p>
          </div>
          <div className="col-md-5 boxButton">
            <button className={params.isActive === "Active" ? "active" : "danger" } onClick={params.btnIsActive} >{params.isActive}</button>
            <button className="update" onClick={params.btnUpdate}>Update</button>
            <button className="danger" onClick={params.btnDelete} >Delete</button>
          </div>
        </div>
    </div>
    </>
  )
}