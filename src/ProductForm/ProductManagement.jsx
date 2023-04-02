import React from 'react'
import { useState, useEffect } from 'react'
import ProductForm from './ProductForm'
import ProductList from './ProductList'
import axios from "axios";
import ProductSearch from './ProductSearch'

function ProductManagement() {

    const [products, setProducts] = useState([]);

    const [selectedProduct, setSelectedProduct] = useState({});

    const [searchByname, setSearchByName] = useState('')

    const fetchProducts = async () => {
        try{
            const reponse = await axios.get("https://642530557ac292e3cff9937a.mockapi.io/api/MOBILE", 
            {params:{
                name: searchByname || undefined,
            }}
            );
           
            setProducts(reponse.data);
        }catch (error){
            console.log(error);
        }
    }

    // hàm xử lý nhận object product và thêm hoặc cập nhật product
    const handeleSubmit = async (product, type) => {
        const {id, ...payload} = product;
        try{
            if(id){
                //Cập nhật
                await axios.put(`https://642530557ac292e3cff9937a.mockapi.io/api/MOBILE/${id}`, payload);
            }else{
                // Thêm mới
                await axios.post("https://642530557ac292e3cff9937a.mockapi.io/api/MOBILE", payload);
            }
        }catch (error){
            console.log(error);
        }
        fetchProducts();
    }

    const handleSeclectProduct = (product) => {
        setSelectedProduct(product);
    }

    const handleDeleteProduct = async (productId) => {
        try{
            await axios.delete(`https://642530557ac292e3cff9937a.mockapi.io/api/MOBILE/${productId}`);
            fetchProducts();
        }catch(error){
            console.log(error);
        }
    }

    const handleSearch = (searchProduct) => {
        setSearchByName(searchProduct);

    }


    useEffect(() => {
        fetchProducts();
    },[searchByname]);

  return (
        <div className="container">
            <div className="card">
                <div className="card-header bg-dark text-white">Product Form</div>
                <div className="card-body">
                    <ProductForm
                    product={selectedProduct}
                    onSubmit={handeleSubmit}
                    onReset={() => setSelectedProduct({})}
                    />
                </div>
            </div>
            <div className="mt-4">
                <ProductSearch onSearch={handleSearch}/>
            </div>
            <div className="mt-4">
                <ProductList products = {products} onSelectProduct={handleSeclectProduct} onDeleteProduct={handleDeleteProduct} onReset={() => setSelectedProduct({})}/>
            </div>
        </div>
  )
}

export default ProductManagement