import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface Product {
    id: string | number;
    name: string;
    price: number;
    stock: number;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const navigate = useNavigate();

    const handleDelete = async (productId: string | number) => {
        if (window.confirm('Are you sure you want to delete this product?')) {
            try {
                const response = await fetch(`http://localhost:3000/products/${productId}`, { method: 'DELETE' });
                if (response.ok) {
                    setProducts(products.filter(p => p.id !== productId));
                } else {
                    setError('Failed to delete product');
                }
            } catch (err) {
                setError((err as Error).message);
            }
        }
    };

    useEffect(() => {
        fetch('http://localhost:3000/products')
            .then(response => response.json())
            .then(data => {
                setProducts(data);
                setLoading(false);
                console.log(Response)
            })
            .catch(err => {
                setError((err as Error).message);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <div className="flex justify-between items-center mb-6">
                <h3 className="text-3xl font-bold">Liste des Produits</h3>
                <button
                    onClick={() => navigate('/admin/products/new')}
                    className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                >
                    Add Product
                </button>
            </div>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Product ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Price</th>
                            <th className="py-2 px-4 border-b">Stock</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {products.map(product => (
                            <tr key={product.id}>
                                <td className="py-2 px-4 border-b">{product.id}</td>
                                <td className="py-2 px-4 border-b">{product.name}</td>
                                <td className="py-2 px-4 border-b">{product.price} fcf</td>
                                <td className="py-2 px-4 border-b">{product.stock}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => navigate(`/admin/products/${product.id}/edit`)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(product.id)}
                                        className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
