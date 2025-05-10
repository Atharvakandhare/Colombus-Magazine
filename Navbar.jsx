import React from 'react'
import { Link } from 'react-router-dom'
export default function Navbar() {
  return (
    <div>
            <nav class="navbar navbar-expand-lg navbar-dark bg-success">
  <Link class="navbar-brand" to="/">Columbus</Link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="collapse navbar-collapse" id="navbarNav">
    <ul class="navbar-nav">
      <li class="nav-item active">
        <Link class="nav-link" to="/Login">Home <span class="sr-only">(current)</span></Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="/Login">Login</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link" to="#">Pricing</Link>
      </li>
      <li class="nav-item">
        <Link class="nav-link disabled" to="#">Disabled</Link>
      </li>
    </ul>
  </div>
</nav>
    </div>
  )
}
