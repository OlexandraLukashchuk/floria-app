import React, {useState} from 'react'
import CommonSection from "../components/UI/CommoSection";
import Helmet from "../components/Helmet/Helmet"
import { Container, Row, Col } from 'reactstrap';
import '../styles/shop.css'
import products from '../assets/data/products'
import ProductsList from '../components/UI/ProductsList';

const Shop = () => {

  const [productsData, setProductsData] = useState(products)

  const handleFilter =e=>
  {
    const  filterValue = e.target.value;
    if(filterValue === 'Birthday'){
      const filteredProducts = products.filter(
        (item) => item.category === "Birthday"
      );
        setProductsData(filteredProducts)
    }
    if(filterValue === 'Friends'){
      const filteredProducts = products.filter(
        (item) => item.category === "Friends"
      );
        setProductsData(filteredProducts)
    }
    if(filterValue === 'Summer'){
      const filteredProducts = products.filter(
        (item) => item.category === "Summer"
      );
        setProductsData(filteredProducts)
    }
    if(filterValue === 'Winter'){
      const filteredProducts = products.filter(
        (item) => item.category === "Winter"
      );
        setProductsData(filteredProducts)
    }
  };

  const handleSearch = e =>{
    const searchTerm = e.target.value
    const searchedProducts = products.filter((item) => item.productName.
    toLowerCase().includes(searchTerm.toLowerCase()));
    setProductsData(searchedProducts)
  }

  return <Helmet title='Shop'>
    <CommonSection title='Flowers'/>

    <section>
      <Container>
        <Row>
          <Col lg='3' md='3'>
            <div className="filter_widget">
              <select onChange={handleFilter}>
              <option>Filter by category</option>
                <option value = "Birthday">Birthday</option>
                <option value = "Friends">Friends</option>
                <option value = "Summer">Summer</option>
                <option value = "Winter">Winter</option>
              </select>
            </div>
          </Col>
          
          <Col lg='6' md='6'>
            <div className="search_box">
              <input type="text" placeholder="Search....." onChange={handleSearch}/>
              <span>
                  <i class="ri-search-line"></i>
              </span>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
    <section className='pt-0'>
      <Container>
        <Row>
          {productsData.length === 0? (<h1 className='text-center fs-4'> No products are found!</h1>)
          :(<ProductsList data={productsData} />)}
        </Row>
      </Container>
    </section>
  </Helmet>
}

export default Shop