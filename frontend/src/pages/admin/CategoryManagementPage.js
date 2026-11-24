import React, { useEffect, useState } from "react";
import categoryService from "../../services/categoryService";
import Spinner from "../../components/Spinner";
import "./AdminPage.css";

const message = {
  success: () => {},
  error: () => {},
};

const emptyForm = { id: null, name: "", slug: "", description: "" };

export default function CategoryManagementPage() {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form, setForm] = useState(emptyForm);

  const loadCategories = () => {
    setIsLoading(true);
    return categoryService
      .getAllCategories()
      .then((res) => setCategories(res.data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadCategories();
  }, []);

  const openCreateModal = () => {
    setForm(emptyForm);
    setIsModalOpen(true);
  };

  const openEditModal = (category) => {
    setForm({
      id: category.id,
      name: category.name,
      slug: category.slug,
      description: category.description || "",
    });
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleFieldChange = (field) => (e) => {
    setForm((prev) => ({ ...prev, [field]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = { name: form.name, slug: form.slug, description: form.description };
      if (form.id) {
        await categoryService.updateCategory(form.id, payload);
        message.success("Category updated successfully");
      } else {
        await categoryService.createCategory(payload);
        message.success("Category created successfully");
      }
      setIsModalOpen(false);
      await loadCategories();
    } catch (err) {
      const msg =
        (err.response && err.response.data && err.response.data.message) ||
        "Something went wrong.";
      message.error(msg);
    }
  };

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this category?");
    if (!confirmed) return;
    try {
      await categoryService.deleteCategory(id);
      message.success("Category deleted successfully");
      await loadCategories();
    } catch (err) {
      message.error("Failed to delete category.");
    }
  };

  return (
    <div className="category-management-page">
      <div className="admin-page-header">
        <div>
          <h1>Category management</h1>
          <p>Organize your catalog's category structure</p>
        </div>
        <button type="button" className="admin-primary-btn btn-gradient" onClick={openCreateModal}>
          Add Category
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
                <th>Slug</th>
                <th>Description</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {categories.map((category) => (
                <tr key={category.id}>
                  <td>{category.name}</td>
                  <td>{category.slug}</td>
                  <td>{category.description}</td>
                  <td className="admin-table-actions">
                    <button
                      type="button"
                      className="admin-link-btn"
                      onClick={() => openEditModal(category)}
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      className="admin-link-btn admin-link-btn-danger"
                      onClick={() => handleDelete(category.id)}
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
            <h2>{form.id ? "Edit Category" : "Add Category"}</h2>
            <form onSubmit={handleSubmit}>
              <label htmlFor="category-name">Category Name</label>
              <input
                id="category-name"
                type="text"
                placeholder="Category Name"
                value={form.name}
                onChange={handleFieldChange("name")}
                required
              />

              <label htmlFor="category-slug">Slug</label>
              <input
                id="category-slug"
                type="text"
                placeholder="category-slug"
                data-testid="category-slug"
                value={form.slug}
                onChange={handleFieldChange("slug")}
                required
              />

              <label htmlFor="category-description">Description</label>
              <textarea
                id="category-description"
                placeholder="Description"
                value={form.description}
                onChange={handleFieldChange("description")}
                rows={3}
              />

              <div className="admin-modal-actions">
                <button type="button" className="admin-modal-cancel-btn" onClick={closeModal}>
                  Cancel
                </button>
                <button type="submit" className="admin-modal-submit-btn btn-gradient">
                  {form.id ? "Save Changes" : "Create Category"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
