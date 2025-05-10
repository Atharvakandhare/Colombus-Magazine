import React from 'react'
import Navbar from '../components/Navbar'
import Ending from '../components/Ending'
import { Link } from 'react-router-dom'

export default function Home() {
    return (
        <div>
            <Navbar />
            <div>this is body</div>
            <div><Ending /></div>
            <div>
                <br></br>
                <br></br>
                <div class="card mt-3" style={{ "width": "18rem","maxheight":"5000px" }}>
                    <img class="card-img-top" src="..." alt="Cardcap" />
                    <div class="card-body">
                        <h5 class="card-title">Card title</h5>
                        <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                        <Link to="/Button" class="btn btn-primary">Go somewhere</Link>
                        <div class='container w-100' >
                            <select class='m-2 h-100 w-100 bg-success'>
                                {Array.from(Array(6),(e,i)=>{
                                    return(
                                        <option key={i+1} value={i+1}>{i+1}</option>
                                    )
                                })}
                            </select>
                        </div>
                    </div>
                    


                </div>
            </div>
        </div>
    )
}
