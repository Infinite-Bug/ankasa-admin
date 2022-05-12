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
          <div className="col-md-6 info">
            <h2 className="title">{params.title}</h2>
            <p className="infoText">{params.pic} | {params.phone}</p>
          </div>
          <div className="col-md-4 boxButton">
            <button className={params.isActive === "Active" ? "active" : "nonActive" } >{params.isActive}</button>
            <button className="update">Update</button>
          </div>
        </div>
    </div>
    </>
  )
}