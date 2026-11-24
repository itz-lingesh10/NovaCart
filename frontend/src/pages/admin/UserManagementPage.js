import React, { useEffect, useState } from "react";
import userService from "../../services/userService";
import Spinner from "../../components/Spinner";
import "./AdminPage.css";

const message = {
  success: () => {},
  error: () => {},
};

export default function UserManagementPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  const loadUsers = () => {
    setIsLoading(true);
    return userService
      .getAllUsers()
      .then((res) => setUsers(res.data))
      .finally(() => setIsLoading(false));
  };

  useEffect(() => {
    loadUsers();
  }, []);

  const handleDelete = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete this user?");
    if (!confirmed) return;
    try {
      await userService.deleteUser(id);
      message.success("User deleted successfully");
      await loadUsers();
    } catch (err) {
      message.error("Failed to delete user.");
    }
  };

  return (
    <div className="user-management-page">
      <div className="admin-page-header">
        <div>
          <h1>User management</h1>
          <p>View and manage registered accounts</p>
        </div>
      </div>

      {isLoading ? (
        <Spinner />
      ) : (
        <div className="admin-table-wrap">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th />
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.username}</td>
                  <td>{user.email}</td>
                  <td>{user.role}</td>
                  <td>
                    <button
                      type="button"
                      className="admin-link-btn admin-link-btn-danger"
                      onClick={() => handleDelete(user.id)}
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
    </div>
  );
}
