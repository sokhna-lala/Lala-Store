import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import { useAuth } from "../context/AuthContext";
import Swal from "sweetalert2";
import { userApi } from "../services/api";

const ITEMS_PER_PAGE = 10;

type User = {
  name: string;
  email: string;
  password: string;
  role: string;
};

type EditUser = {
  name: string;
  password: string;
  role: string;
};

export default function AdminUsers() {
  const { user } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [editingUser, setEditingUser] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<EditUser>({
    name: "",
    password: "",
    role: "user",
  });
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedRole, setSelectedRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    // Load from localStorage first
    const usersRaw = localStorage.getItem("users");
    if (usersRaw) {
      setUsers(JSON.parse(usersRaw));
    }
    try {
      const response = await userApi.getUsers();
      setUsers(response.data);
      localStorage.setItem("users", JSON.stringify(response.data));
    } catch (error) {
      console.error("Error fetching users:", error);
      // Keep localStorage data if API fails
    }
  };

  if (!user || user.role !== "admin") {
    return (
      <Layout>
        <div className="text-center py-12">
          <h1 className="text-2xl font-bold text-red-600">Accès refusé</h1>
          <p>Vous devez être administrateur pour accéder à cette page.</p>
          <Link to="/" className="text-blue-600 hover:underline">
            Retour à l'accueil
          </Link>
        </div>
      </Layout>
    );
  }

  const handleEdit = (user: User) => {
    setEditingUser(user.email);
    setEditForm({ name: user.name, password: user.password, role: user.role });
  };

  const handleSaveEdit = async () => {
    if (!editingUser) return;
    try {
      await userApi.updateUser(editingUser, editForm);
      const updatedUsers = users.map((u) =>
        u.email === editingUser ? { ...u, ...editForm } : u
      );
      setUsers(updatedUsers);
      localStorage.setItem("users", JSON.stringify(updatedUsers));
      setEditingUser(null);
      Swal.fire("Succès", "Utilisateur mis à jour avec succès", "success");
    } catch (error) {
      console.error("Error updating user:", error);
      Swal.fire({
        icon: "error",
        title: "Erreur",
        text: "Erreur lors de la mise à jour de l'utilisateur",
      });
    }
  };

  const handleCancelEdit = () => {
    setEditingUser(null);
  };

  const handleDelete = async (email: string) => {
    const result = await Swal.fire({
      title: "Êtes-vous sûr ?",
      text: "Vous ne pourrez pas revenir en arrière !",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Oui, supprimer !",
      cancelButtonText: "Annuler",
    });

    if (result.isConfirmed) {
      try {
        await userApi.deleteUser(email);
        const updatedUsers = users.filter((u) => u.email !== email);
        setUsers(updatedUsers);
        localStorage.setItem("users", JSON.stringify(updatedUsers));
        Swal.fire("Supprimé !", "L'utilisateur a été supprimé.", "success");
      } catch (error) {
        console.error("Error deleting user:", error);
        Swal.fire({
          icon: "error",
          title: "Erreur",
          text: "Erreur lors de la suppression de l'utilisateur",
        });
      }
    }
  };

  // Filtrage et recherche
  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      user.email.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = selectedRole === "" || user.role === selectedRole;
    return matchesSearch && matchesRole;
  });

  // Pagination
  const totalPages = Math.ceil(filteredUsers.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedUsers = filteredUsers.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  return (
    <Layout header={true} navbar={false}>
      <div className="py-12">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Gérer les Utilisateurs</h1>
          <Link
            to="/admin"
            className="bg-gray-600 text-white px-4 py-2 rounded"
          >
            Retour au Dashboard
          </Link>
        </div>

        {/* Recherche et filtres */}
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <input
            type="text"
            placeholder="Rechercher par nom ou email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="border p-2 rounded flex-1"
          />
          <select
            value={selectedRole}
            onChange={(e) => setSelectedRole(e.target.value)}
            className="border p-2 rounded"
            aria-label="Filtrer par rôle"
          >
            <option value="">Tous les rôles</option>
            <option value="user">Utilisateur</option>
            <option value="admin">Administrateur</option>
          </select>
        </div>

        <div className="bg-white shadow rounded-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Nom
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Email
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rôle
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {paginatedUsers.map((u) => (
                <tr key={u.email}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    {editingUser === u.email ? (
                      <input
                        type="text"
                        value={editForm.name}
                        onChange={(e) =>
                          setEditForm({ ...editForm, name: e.target.value })
                        }
                        className="border rounded px-2 py-1 w-full"
                        placeholder="Nom"
                        aria-label="Modifier le nom"
                      />
                    ) : (
                      u.name
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {u.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {editingUser === u.email ? (
                      <select
                        value={editForm.role}
                        onChange={(e) =>
                          setEditForm({ ...editForm, role: e.target.value })
                        }
                        className="border rounded px-2 py-1"
                        aria-label="Modifier le rôle"
                      >
                        <option value="user">Utilisateur</option>
                        <option value="admin">Administrateur</option>
                      </select>
                    ) : (
                      u.role
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 flex space-x-2">
                    {editingUser === u.email ? (
                      <>
                        <button
                          onClick={handleSaveEdit}
                          className="bg-green-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Sauvegarder
                        </button>
                        <button
                          onClick={handleCancelEdit}
                          className="bg-gray-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Annuler
                        </button>
                      </>
                    ) : (
                      <>
                        <button
                          onClick={() => handleEdit(u)}
                          className="bg-blue-600 text-white px-2 py-1 rounded text-xs"
                        >
                          Modifier
                        </button>
                        <button
                          onClick={() => handleDelete(u.email)}
                          className="bg-red-600 text-white px-2 py-1 rounded text-xs"
                          disabled={u.email === user.email}
                        >
                          Supprimer
                        </button>
                      </>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="mt-6 flex justify-center">
            <nav className="flex items-center space-x-1">
              <button
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-l-md hover:bg-gray-50 disabled:opacity-50"
              >
                Précédent
              </button>
              {Array.from({ length: totalPages }, (_, i) => i + 1).map(
                (page) => (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-2 text-sm font-medium border ${
                      page === currentPage
                        ? "text-blue-600 bg-blue-50 border-blue-500"
                        : "text-gray-500 bg-white border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {page}
                  </button>
                )
              )}
              <button
                onClick={() =>
                  setCurrentPage(Math.min(totalPages, currentPage + 1))
                }
                disabled={currentPage === totalPages}
                className="px-3 py-2 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-r-md hover:bg-gray-50 disabled:opacity-50"
              >
                Suivant
              </button>
            </nav>
          </div>
        )}
      </div>
    </Layout>
  );
}
