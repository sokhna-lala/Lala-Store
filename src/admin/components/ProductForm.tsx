import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Product {
    id?: string | number;
    name: string;
    price: string;
    stock: string;
}

export default function ProductForm() {
    const { id } = useParams<{ id: string }>();
    const navigate = useNavigate();
    const [product, setProduct] = useState<Product>({ name: '', price: '', stock: '' });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (id) {
            setLoading(true);
            fetch(`http://localhost:3000/products/${id}`)
                .then(response => response.json())
                .then(data => {
                    setProduct({ name: data.name, price: data.price.toString(), stock: data.stock.toString() });
                    setLoading(false);
                })
                .catch(err => {
                    setError((err as Error).message);
                    setLoading(false);
                });
        }
    }, [id]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        const method = id ? 'PUT' : 'POST';
        const url = id ? `http://localhost:3000/products/${id}` : 'http://localhost:3000/products';
        const body = {
            name: product.name,
            price: parseFloat(product.price),
            stock: parseInt(product.stock, 10)
        };
        try {
            const response = await fetch(url, {
                method,
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(body),
            });

            if (!response.ok) throw new Error('Failed to save product');
            navigate('/admin/products');
        } catch (err) {
            setError((err as Error).message);
            setLoading(false);
        }
    };

    return (
        <div>
            <h3 className="text-3xl font-bold mb-6">{id ? 'Edit Product' : 'Add Product'}</h3>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && (
                <form onSubmit={handleSubmit} className="max-w-md">
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Name</label>
                        <input
                            type="text"
                            value={product.name}
                            onChange={e => setProduct({ ...product, name: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Price</label>
                        <input
                            type="number"
                            value={product.price}
                            onChange={e => setProduct({ ...product, price: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                            min="0"
                            step="0.01"
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 mb-2">Stock</label>
                        <input
                            type="number"
                            value={product.stock}
                            onChange={e => setProduct({ ...product, stock: e.target.value })}
                            className="w-full px-3 py-2 border rounded"
                            required
                            min="0"
                            step="1"
                        />
                    </div>
                    <button
                        type="submit"
                        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        disabled={loading}
                    >
                        {loading ? 'Saving...' : 'Save Product'}
                    </button>
                </form>
            )}
        </div>
    );
}
    
                     
