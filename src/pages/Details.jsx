import React, { useContext, useEffect, useState } from 'react'; 
import { useParams } from 'react-router-dom';
import { http } from '../axios'; 
import { CartContext } from '../App';

function Details() {
  const [product, setProduct] = useState({}); 
  const { id } = useParams(); 
  const [color, setColor] = useState(); 
  const [count, setCount] = useState(1); 
  const { cart, setCart } = useContext(CartContext);
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await http.get(`products/${id}`);
        if (response.status === 200) {
          setProduct(response.data.data);
          
          // colors mavjudligini tekshirish
          if (response.data.data.colors && response.data.data.colors.length > 0) {
            setColor(response.data.data.colors[0]); 
          } else {
            setColor(null); // agar ranglar yo'q bo'lsa, null qilib qo'yamiz
          }
        }
      } catch (err) {
        setError('Error fetching product details.');
        console.error(err);
      } finally {
        setLoading(false); // Loading finished
      }
    };
    fetchProduct();
  }, [id]);

  function handleSetCart(e) {
    e.preventDefault();
    const updatedProduct = { ...product, count, color }; 
    setCart([...cart, updatedProduct]);

    const storage = JSON.parse(localStorage.getItem('cart')) || [];
    storage.push(updatedProduct);
    localStorage.setItem('cart', JSON.stringify(storage));
  }

  if (loading) {
    return <div>Loading...</div>; // Loading feedback
  }

  if (error) {
    return <div>{error}</div>; // Display error message
  }

  const { title, company, price, description, colors, image } = product.attributes || {};

  return (
    <div className='container max-w-[1140px] mx-auto mt-3'>
      <div className="flex items-center space-x-2 text-lg">
        <a href="/" className="hover:underline">Home</a>
        <span className="text-gray-500">/</span>
        <a href="/product" className="hover:underline">Product</a>
      </div>

      {
        product.id &&
        <div className="wrapper container mx-auto flex mt-3 gap-10">
          <img className="w-96 h-96 object-cover rounded-lg lg:w-full" src={image} alt={title} />
          <div>
            <h3 className='capitalize text-3xl font-bold text-indigo-950'>{title}</h3>
            <p className="text-xl text-neutral-content font-bold mt-2 text-gray-400">{company}</p>
            <p className='mt-3 text-xl'>${price}</p>
            <p className='mt-6 leading-8'>{description}</p>
            <p className="text-md font-medium tracking-wider capitalize mt-6">Colors</p>

            <div className='flex'>
              {
                colors?.map((c, index) => (
                  <button
                    key={index}
                    className={`w-6 h-6 rounded-full mr-2 ${color === c ? 'border-2 border-black' : ''}`}
                    style={{ backgroundColor: c }}
                    onClick={() => setColor(c)} 
                  ></button>
                ))
              }
            </div>

            <div className="mb-4 mt-3">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                Amount
              </label>
              <div className="relative w-72">
                <select
                  id="amount"
                  value={count}
                  onChange={(e) => setCount(e.target.value)}
                  className="block appearance-none w-full bg-white border border-purple-500 text-gray-700 py-2 px-3 pr-8 rounded-lg leading-tight focus:outline-none focus:ring focus:border-purple-500"
                >
                  {[1, 2, 3].map(num => (
                    <option key={num} value={num}>{num}</option>
                  ))}
                </select>
                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                    <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                  </svg>
                </div>
              </div>
            </div>

            <button onClick={handleSetCart} className='bg-indigo-800 text-zinc-300 font-semibold p-3 rounded-lg'>
              ADD TO BAG
            </button>
          </div>
        </div>
      }
    </div>
  );
}

export default Details;
