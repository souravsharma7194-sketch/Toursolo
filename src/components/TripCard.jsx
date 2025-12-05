import React from 'react'
import { Link } from 'react-router-dom'

const TripCard = ({trip}) => {
  return (
<Link to={`/trip/${trip.id}`}>
    <img
    src={trip.image}
    alt={trip.title}
    />

<div>

<h2>{trip.title}</h2>

<p>{trip.country}</p>

<p>{trip.shortDescription}</p>

<div>

<span>
    ₹{trip.price.toLocaleString()}
</span>

<span>
    {trip.days} Days
</span>

</div>


</div>

</Link>
  );
};

export default TripCard