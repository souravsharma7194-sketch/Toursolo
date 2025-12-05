import React from 'react'
import { useParams } from 'react-router-dom'
import { trips } from '../data/trips';

const TripDetails = () => {

const {id} = useParams();

const trip = trips.find((t) => t.id.toString() === id);

if(!trip){

return <div>Trip not found</div>

}
  return (
    <div>

<img src={trip.image}
 alt={trip.title} />


<h1>{trip.title}</h1>
<p>{trip.country}</p>
<p>{trip.longDescription}</p>

<h3>Highlights:</h3>
<ul>

{trip.highlights.map((point,index)=> (

<li key={index}>{point}</li>

))}


</ul>

<button>Book This Trip</button>

    </div>
  )
}

export default TripDetails;