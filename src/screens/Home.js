import React, { useEffect, useState } from 'react'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import Card from '../components/Card'

export default function Home () {
  const [search, setSearch] = useState("");
  const [foodCat, setFoodCat] = useState([]);
  const [foodItem, setFoodItem] = useState([]);

  const loadData = async() => {
    let response = await fetch("http://localhost:8000/api/foodData", {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      }
    })
    response = await response.json();
    setFoodItem(response.data[0]);
    setFoodCat(response.data[1]);
  }

  useEffect(() => {
    loadData();
  }, [])

  return (
    <>
        <div> <Navbar /> </div>
        <div>
          <div id="carouselExampleFade" className="carousel slide carousel-fade" data-bs-ride="carousel" style={{objectFit:"contain !important"}}>
            <div className="carousel-inner" id="carousel">
              <div className="carousel-caption" style={{"zIndex": "10"}}>
                <div className="d-flex justify-content-center">
                  <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" value={search} onChange={(e) => {setSearch(e.target.value)}} />
                  {/* <button className="btn btn-outline-success text-white bg-success" type="submit">Search</button> */}
                </div>
              </div>
              <div className="carousel-item active">
                <img src="https://www.foodandwine.com/thmb/pwFie7NRkq4SXMDJU6QKnUKlaoI=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/Ultimate-Veggie-Burgers-FT-Recipe-0821-5d7532c53a924a7298d2175cf1d4219f.jpg" className="d-block w-100" style={{filter: "brightness(30%)", "height": "600px"}} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://www.foodandwine.com/thmb/Wd4lBRZz3X_8qBr69UOu2m7I2iw=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/classic-cheese-pizza-FT-RECIPE0422-31a2c938fc2546c9a07b7011658cfd05.jpg" className="d-block w-100"  style={{filter: "brightness(30%)", "height": "600px"}} alt="..." />
              </div>
              <div className="carousel-item">
                <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTSfzwyIb2VY5-zNKn8hvOVxAXTgvmIv7azHw&s" className="d-block w-100"  style={{filter: "brightness(30%)", "height": "600px"}} alt="..." />
              </div>
            </div>
          </div>
        </div>
        <div className='container'>
          {
            foodCat !== []
            ? foodCat.map(data => {
              return (
                <div className='row mb-3'>
                  <div key={data._id} className='fs-3 m-3'>{data.CategoryName}</div>
                  <hr />
                  {foodItem !== []
                  ? foodItem.filter((item) => (item.CategoryName === data.CategoryName) && (item.name.toLowerCase().includes(search.toLowerCase()))) 
                  .map(filterItems => {
                    return (
                      <div key={filterItems._id} className='col-12 col-md-6 col-lg-3 m-3'>
                        <Card foodItem = {filterItems}
                        options={filterItems.options[0]}></Card>
                      </div>
                    )
                  }) : <div>No Such Data Found</div>}
                </div>
              )
            }) : ""
          }
        </div>
        <div> <Footer /> </div>
    </>
  )
}
