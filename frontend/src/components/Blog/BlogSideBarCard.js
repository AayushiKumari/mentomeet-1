import React from 'react'
import resTable from '../../img/restaurant-table.jpg'
import iftekhaRiyad from '../../img/Iftekhar-Riyad.jpg'

export default function BlogSideBarCard(){
    return(
            <div id='card' className="card">
            <img id='card-img-top' src={resTable} className="card-img-top d-block position-relative" alt="..."></img>
            <img id='author-img' className='position-absolute'   src={iftekhaRiyad}></img>
            <div id='card-body' className="card-body text-center">
                <h5 className="card-title">Iftekhar Riyad</h5>
                <p className="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
            </div>
        </div>
      
    )
}