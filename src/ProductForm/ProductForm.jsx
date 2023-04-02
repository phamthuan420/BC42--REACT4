import React, {useState, useEffect} from 'react'

function ProductForm({product, onSubmit, onReset}) {

    //State QL giá trị của các input trong form
    const[values, setValues] = useState({
        name: '',
        type: '',
        desc: '',
        img:'',
        price: '',
    });

    useEffect(() => {
        setValues(product);
    }, [product])

    const handleChange = (evt) => {
        const {value, name} = evt.target;
        setValues({
            ...values,
            [name]: name === 'price' ? +value : value,
        });
    };

    const handleSubmit = (evt) => {
        evt.preventDefault();
        onSubmit(values);
        handleResetForm();
    }

    const handleResetForm = () => {
        setValues({
            name: '',
            type: '',
            desc: '',
            img:'',
            price: '',
        });
        onReset();
    }

  return (
        <form onSubmit={handleSubmit}>
            <div className="mb-3">
                <label className="form-label">Name</label>
                <input type="text" name='name' className="form-control" value={values.name || ''} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Type</label>
                <input type="text" name='type' className="form-control" value={values.type || ''} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Description</label>
                <input type="text" name='desc' className="form-control" value={values.desc || ''} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Image</label>
                <input type="text" name='img' className="form-control" value={values.img || ''} onChange={handleChange}/>
            </div>
            <div className="mb-3">
                <label className="form-label">Price</label>
                <input type="text" name='price' className="form-control" value={values.price || ''} onChange={handleChange}/>
            </div>
            <button type='submit' className="btn btn-success me-2">Submit</button>
            <button type='button' className="btn btn-secondary" onClick={handleResetForm}>Reset</button>
        </form>
  )
}

export default ProductForm