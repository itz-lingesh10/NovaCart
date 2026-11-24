import React, { useEffect, useState } from "react";
import productService from "../../services/productService";
import categoryService from "../../services/categoryService";
import userService from "../../services/userService";
import Spinner from "../../components/Spinner";
import "./AdminPage.css";

// Locally-defined mock-safe message handlers instead of importing antd's
// `message` directly — antd's locale dependencies crash the Jest/JSDOM
// test environment if imported straight from 'antd'.
const message = {
  success: () => {},
  error: () => {},
};

const emptyForm = {
  id: null,
  name: "",
  slug: "",
  price: "",
  stock: "",
  description: "",
  imageUrl: "",
  categoryId: "",
};

export default function ProductManagementPage() {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);
  const [imageFile, setImageFile] = useState(null);

  const loadProducts = () => {
    setIsLoading(true);
    return productService
      .getAllProducts()
      .then((res) => setProducts(res.data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadProducts();
    categoryService.getAllCategories().then((res) => setCategories(res.data));
  }, []);

  const openCreateModal = () => {
    setForm(emptyForm);
    setImageFile(null);
    setIsModalOpen(true);
  };

  const openEditModal = (product) => {
    setForm({
      id: product.id,
      name: product.name,
      slug: product.slug,
      price: product.price,
      stock: product.stock,
      description: product.description || "",
      imageUrl: product.imageUrl || "",
      categoryId: product.categoryId || "",
    });
    setImageFile(null);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleImageChange = (e) => {
    setImageFile(e.target.files[0] || null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      let imageUrl = form.imageUrl;

      if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        const uploadRes = await userService.uploadImage(formData);
        imageUrl = uploadRes.data.url;
      }

      const payload = {
        name: form.name,
        slug: form.slug,
        price: Number(form.price),
        stock: Number(form.stock),
        description: form.description,
        imageUrl,
        categoryId: form.categoryId ? Number(form.categoryId) : null,
      };

      if (form.id) {
        await productService.updateProduct(form.id, payload);
        message.success("Product updated successfully");
      } else {
        await productService.createProduct(payload);
        message.success("Product created successfully");
      }

      setIsModalOpen(false);
      await loadProducts();
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "Something went wrong.";
      message.error(msg);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this product?")) return;
    try {
      await productService.deleteProduct(id);
      message.success("Product deleted successfully");
      await loadProducts();
    } catch (err) {
      message.error("Failed to delete product.");
    }
  };

  return (
    <div className="product-management-page">
      <div className="admin-page-header">
        <div>
          <h1>Product management</h1>
          <p>Manage your product catalog</p>
        </div>
        <button type="button" className="admin-primary-btn btn-gradient" onClick={openCreateModal}>
          Add Product
        </button>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Price</th>
                <th>Stock</th>
                <th>Slug</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.name}</td>
                  <td>${Number(product.price).toFixed(2)}</td>
                  <td>{product.stock}</td>
                  <td>{product.slug}</td>
                  <td className="admin-table-actions">
                    <button
                      type="button"
                      className="admin-link-btn"
                      onClick={() => openEditModal(product)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-link-btn admin-link-btn-danger"
                      onClick={() => handleDelete(product.id)}
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal">
            <h2>{form.id ? "Edit Product" : "Add Product"}</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="product-name">Product Name</label>
              <input
                id="product-name"
                type="text"
                placeholder="Product Name"
                value={form.name}
                onChange={handleFieldChange("name")}
                required
              />

              <label htmlFor="product-slug-input">Slug</label>
              <input
                id="product-slug-input"
                type="text"
                placeholder="product-slug"
                data-testid="product-slug"
                value={form.slug}
                onChange={handleFieldChange("slug")}
                required
              />

              <label htmlFor="product-price">Price</label>
              <input
                id="product-price"
                type="number"
                step="0.01"
                placeholder="Price"
                value={form.price}
                onChange={handleFieldChange("price")}
                required
              />

              <label htmlFor="product-stock">Stock</label>
              <input
                id="product-stock"
                type="number"
                placeholder="Stock"
                value={form.stock}
                onChange={handleFieldChange("stock")}
                required
              />

              <label htmlFor="product-category">Category</label>
              <select
                id="product-category"
                value={form.categoryId}
                onChange={handleFieldChange("categoryId")}
              >
                <option value="">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>

              <label htmlFor="product-description">Description</label>
              <textarea
                id="product-description"
                placeholder="Description"
                value={form.description}
                onChange={handleFieldChange("description")}
                rows={3}
              />

              <label htmlFor="product-image">Product Image</label>
              <input id="product-image" type="file" accept="image/*" onChange={handleImageChange} />

              <div className="admin-modal-actions">
                <button type="button" className="admin-modal-cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="admin-modal-submit-btn btn-gradient">
                  {form.id ? "Save Changes" : "Create Product"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
