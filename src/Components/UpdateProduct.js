import React, { useEffect, useState } from 'react';
import { useParams, useHistory } from 'react-router-dom';

const UpdateProduct = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const history = useHistory();
    const [isPending, setIsPending] = useState(false);

    const [product, setProduct] = useState({
        name: '',
        image: '',
        description: '',
        ingredients: [],
        price: '',
        availability: true,
        stock: '',
        category: ''
    });

    const [ingredient, setIngredient] = useState(''); // For adding new ingredients

    useEffect(() => {
        // Fetch the product details based on the ID
        fetch(`http://localhost:8000/products/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch product');
                }
                return response.json();
            })
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product:', error));
    }, [id]);

    const handleChange = (e) => {
        setProduct({ ...product, [e.target.name]: e.target.value });
    };

    const handleAddIngredient = () => {
        if (ingredient.trim() !== '') {
            setProduct(prevProduct => ({
                ...prevProduct,
                ingredients: [...prevProduct.ingredients, ingredient],
            }));
            setIngredient(''); // Reset input after adding
        }
    };

    const handleRemoveIngredient = (index) => {
        // Prevent the default behavior
        setProduct(prevProduct => ({
            ...prevProduct,
            ingredients: prevProduct.ingredients.filter((_, i) => i !== index),
        }));
    };

    const handleUpdateProduct = (e) => {
        e.preventDefault();
        setIsPending(true);

        fetch(`http://localhost:8000/products/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                console.log('Product updated:', data);
                setIsPending(false);
                history.push('/products'); // Redirect to the products page
            })
            .catch(error => {
                setIsPending(false);
                console.error('Error updating product:', error);
                alert(`Error updating product: ${error.message}`);
            });
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            e.preventDefault(); // Prevent default form submission
            handleAddIngredient();
        }
    };

    if (!product) {
        return <div>Loading...</div>; // Display loading state until the product is fetched
    }

    return (
        <div className="UpdateProduct">
            <h1 className="mx-5">Update Product</h1>
            <div className="container my-5">
                <form onSubmit={handleUpdateProduct}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Product Name</label>
                        <input
                            type="text"
                            className="form-control"
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="image" className="form-label">Image URL</label>
                        <input
                            type="text"
                            className="form-control"
                            name="image"
                            value={product.image}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="description" className="form-label">Description</label>
                        <textarea
                            className="form-control"
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            rows="4"
                            required
                        />
                    </div>

                    <div className="col-md-12">
                        <label className="form-label">Ingredients</label>
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className="form-control"
                                value={ingredient}
                                onChange={(e) => setIngredient(e.target.value)}
                                placeholder="Enter ingredient"
                            />
                            <button
                                className="btn btn-outline-success"
                                type="button"
                                onClick={handleAddIngredient}
                            >
                                Add
                            </button>
                        </div>
                        <div>
                            {product.ingredients.map((ing, index) => (
                                <span key={index} className="badge me-2 mb-2" style={{ fontSize: '1rem' }}>
                                    {ing} <span style={{ cursor: 'pointer' }} onClick={() => handleRemoveIngredient(index)}>&times;</span>
                                </span>
                            ))}
                        </div>
                    </div>

                    <div className="mb-3">
                        <label htmlFor="price" className="form-label">Price ($)</label>
                        <input
                            type="number"
                            className="form-control"
                            name="price"
                            value={product.price}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="stock" className="form-label">Stock</label>
                        <input
                            type="number"
                            className="form-control"
                            name="stock"
                            value={product.stock}
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="category" className="form-label">Category</label>
                        <select
                            className="form-control"
                            name="category"
                            value={product.category}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Select category</option>
                            <option value="Cake">Cake</option>
                            <option value="Pastry">Pastry</option>
                            <option value="Cookie">Cookie</option>
                        </select>
                    </div>

                    <div className="col-12">
                        {!isPending &&
                            <button type="submit" className="btn-success btn btn-primary w-100 mt-3">
                                Update Product
                            </button>
                        }
                        {isPending &&
                            <button type="button" className="btn-success btn btn-primary w-100 mt-3" disabled>
                                Updating Product...
                            </button>
                        }
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProduct;
