import { useState } from 'react'
import './Home.css'
import Header from '../../componenrts/Header/Header'
import ExploreMenu from '../../componenrts/ExploreMenu/ExploreMenu'
import FoodDisplay from '../../componenrts/FoodDisplay/FoodDisplay'
import AppDownload from '../../componenrts/AppDownload/AppDownload'
const Home = () => {

  const [category, setCategory] = useState("All");

  return (
    <div>
      <Header />
      <ExploreMenu category={category} setCategory={setCategory} />
      <FoodDisplay category={category} />
      <AppDownload />
    </div>
  )
}

export default Home