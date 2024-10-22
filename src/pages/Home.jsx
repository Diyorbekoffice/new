import React, { useEffect, useState } from 'react';
import { http } from "../axios";
import { useNavigate } from 'react-router-dom';

function Home() {
  const [products, setProducts] = useState([]);
  const navigate = useNavigate(); 

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await http.get('products?featured=true'); // `featured` parametri
        if (response.status === 200) {
          setProducts(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, []);

  function handleRedirect(id) {
    navigate(`/products/${id}`); 
  }

  return (
    <div className=''>
      <div className="wrapper container flex flex-wrap gap-6 justify-center text-center mx-auto">
        {products.length > 0 && products.map(product => (
          <div 
            key={product.id} 
            onClick={() => handleRedirect(product.id)} 
            className='shadow-md p-5 rounded-2xl cursor-pointer' 
          >
            <img className='h-64 w-72 rounded-xl' src={product.attributes.image} alt={product.attributes.title} />
            <h3>{product.attributes.title}</h3>
            <p>${product.attributes.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
