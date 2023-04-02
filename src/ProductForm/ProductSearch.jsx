import React, {useState} from 'react'

function ProductSearch({onSearch}) {
const[searchProduct, setSearchProduct] = useState('');

const handleChange = (evt) => {
  setSearchProduct(evt.target.value);
}
  return (
    <div className='w-25 mt-2 d-flex'>
      <input className="form-control" placeholder='Search By Name' value={searchProduct} onChange={handleChange}/>
      <button className="btn btn-success ms-2" onClick={() => onSearch(searchProduct)}>Search</button>
    </div>
  )
}

export default ProductSearch