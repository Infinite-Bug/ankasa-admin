import React from "react";
import '../assets/styles/cardList.css'

export default function CardList() {
  return (
    <>
      <div className="container cardlist shadow-sm">
        <div className="row">
          <div className="col-md-2 boxLogo">
            <img src="https://s3-alpha-sig.figma.com/img/d670/ed6a/9d205fa306085ffa6cc1365eef78958f?Expires=1653264000&Signature=aeMyM4YBSavA9gbI7ZCNc4fO07mMu5TvWoUASw38is6LYiEKdzG4dyktJ1VOns8pZOE7Eu0rSkp-1KCeNp-fSLyQo9JWne7Fno3jT9c4PD1lbizXrG~2YSqy0wkufTYxg-fDj8jkdlkN0ipQLROobGbA102f80J6DNrWYE9fblL~~iDeGGgc~n5-qZaiYskQ7awQMAzzlzSLKb8mAwieDKdwjZZzqQobk9o3AXGu1LOC-TIC6mUIhdSTDg7UJSslS7ifEEzmHRGqpmm2vvTXm2wc~tLd-szR21NMe3IebAcLmQ5dM58J~Y7G38AcABfStrcqr8nn5KVskpHWviv5Tg__&Key-Pair-Id=APKAINTVSUGEWH5XD5UA" alt="" className="logoAirline" />
          </div>
          <div className="col-md-6 info">
            <h2 className="title">Garuda Indonesia</h2>
            <p className="infoText">Muhamad Hakam Faza | 082314970112</p>
          </div>
          <div className="col-md-4 boxButton">
            <button className="update">Update</button>
            <button className="delete">Delete</button>
          </div>
        </div>
    </div>
    </>
  )
}