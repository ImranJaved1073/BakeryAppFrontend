import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ConfirmationModal from './ConfirmationModal'; // Import the modal

const DashProductList = ({ products, setProducts, setFilteredProducts }) => {
  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 8; // Number of products per page

  // Calculate total pages
  const totalPages = Math.ceil(products.length / productsPerPage);

  // Get current products for the page
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = products.slice(indexOfFirstProduct, indexOfLastProduct);

  const handleDelete = (id) => {
    fetch('http://localhost:8000/products/' + id, {
      method: 'DELETE',
    })
      .then(() => {
        console.log('Product deleted');
        return fetch('http://localhost:8000/products');
      })
      .then((response) => response.json())
      .then((data) => {
        setProducts(data);
        setFilteredProducts(data);
      })
      .catch((error) => console.error('Error deleting product:', error));
  };

  const openModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  const confirmDelete = () => {
    handleDelete(selectedProduct.id);
    closeModal();
  };

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="product-list mt-5">
      <div className="container">
        {currentProducts.length === 0 ? (
          <div className="col-12 text-center">
            <p>No products found!!</p>
          </div>
        ) : (
          <div className="row row-cols-1 row-cols-md-2 row-cols-lg-3 row-cols-xl-4 g-4 py-5">
            {currentProducts.map((product) => (
              <div className="col" key={product.id}>
                <div
                  className="card h-100 border-3 p-2 shadow-sm"
                  style={{
                    maxWidth: '280px', // Fixed width for uniform card size
                    minHeight: '400px', // Ensures cards don’t get too long
                    margin: '0 auto', // Center the card
                  }}
                >
                  <div className="card-body text-center">
                    {/* Price comes before the image */}
                    <h3
                      className="mt-2 border rounded bg-success text-white pt-1 pb-1 fs-5"
                      style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }} // Prevents long text overflow
                    >
                      ${product.price}
                    </h3>
                    {/* Image appears below the price */}
                    <img
                      src={product.image}
                      className="card-img-top img-fluid"
                      alt={product.name}
                      style={{
                        height: '180px',
                        objectFit: 'cover',
                        borderRadius: '8px',
                        marginBottom: '10px',
                        marginTop: '10px', // Optional: add margin between price and image
                      }}
                    />
                    <h4
                      className="card-title mt-3"
                      style={{
                        whiteSpace: 'nowrap',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis',
                      }}
                    >
                      {product.name}
                    </h4>
                    <p className="card-text" style={{ fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      {product.category}
                    </p>
                    <p className="card-text" style={{ fontSize: '0.9rem' }}>{product.brand}</p>
                    <div className="d-flex align-items-center justify-content-center">
                      <Link
                        to={`/products/productDetails/${product.id}`}
                        className="btn btn-sm btn-outline-warning me-1"
                      >
                        <i className="bi bi-eye"></i>
                      </Link>
                      <Link
                        to={`/UpdateProduct/${product.id}`}
                        className="btn btn-sm btn-outline-primary me-1"
                      >
                        <i className="bi bi-pencil-square"></i>
                      </Link>
                      <button
                        onClick={() => openModal(product)} // Open modal on delete
                        className="btn btn-sm btn-outline-danger"
                      >
                        <i className="bi bi-trash"></i>
                      </button>
                    </div>
                    <div className="mt-3">
                      {product.stock > 10 ? (
                        <span className="badge bg-success">In Stock: {product.stock}</span>
                      ) : product.stock > 0 && product.stock <= 10 ? (
                        <span className="badge bg-warning">Low Stock: {product.stock}</span>
                      ) : (
                        <span className="badge bg-danger">Out of Stock</span>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Pagination Controls */}
        {totalPages > 1 && (
          <div className="pagination justify-content-center">
            <nav>
              <ul className="pagination">
                {/* First Page Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(1)}
                    disabled={currentPage === 1}
                  >
                    First
                  </button>
                </li>
                {/* Previous Page Button */}
                <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                  >
                    Previous
                  </button>
                </li>
                {/* Page Numbers */}
                {Array.from({ length: totalPages }, (_, index) => (
                  <li
                    key={index + 1}
                    className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}
                  >
                    <button
                      className="page-link"
                      onClick={() => handlePageChange(index + 1)}
                    >
                      {index + 1}
                    </button>
                  </li>
                ))}
                {/* Next Page Button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                  >
                    Next
                  </button>
                </li>
                {/* Last Page Button */}
                <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                  <button
                    className="page-link"
                    onClick={() => handlePageChange(totalPages)}
                    disabled={currentPage === totalPages}
                  >
                    Last
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        )}

        <div className="d-flex justify-content-end mb-5">
          <Link
            type="button"
            className="addTopicBtn fw-bold btn rounded-pill shadow px-4 py-2"
            style={{ color: 'white', border: 'none' }}
            to="/AddProduct"
          >
            Add Product
          </Link>
        </div>

        {/* Confirmation Modal */}
        {selectedProduct && (
          <ConfirmationModal
            show={showModal}
            handleClose={closeModal}
            handleConfirm={confirmDelete}
            productName={selectedProduct.name}
          />
        )}
      </div>
    </div>
  );
};

export default DashProductList;
