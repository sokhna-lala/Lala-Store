import { useEffect, useState } from 'react';

interface StockItem {
    id: number;
    productName: string;
    quantity: number;
    location: string;
}

export default function StockPage() {
    const [stock, setStock] = useState<StockItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const handleDelete = async (id: number) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;
        try {
            const response = await fetch(`http://localhost:3000/stock/${id}`, { method: 'DELETE' });
            if (response.ok) {
                setStock(stock.filter(item => item.id !== id));
            } else {
                setError('Failed to delete stock item');
            }
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleEdit = (id: number) => {
        // Placeholder for edit functionality
        alert(`Edit item with ID: ${id}`);
    };

    useEffect(() => {
        fetch('http://localhost:3000/stock')
            .then(response => response.json())
            .then(data => {
                setStock(data);
                setLoading(false);
            })
            .catch(err => {
                setError((err as Error).message);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h3 className="text-3xl font-bold mb-6">Gestion du Stock</h3>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Item ID</th>
                            <th className="py-2 px-4 border-b">Product Name</th>
                            <th className="py-2 px-4 border-b">Quantity</th>
                            <th className="py-2 px-4 border-b">Location</th>
                            <th className="py-2 px-4 border-b">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {stock.map(item => (
                            <tr key={item.id}>
                                <td className="py-2 px-4 border-b">{item.id}</td>
                                <td className="py-2 px-4 border-b">{item.productName}</td>
                                <td className="py-2 px-4 border-b">{item.quantity}</td>
                                <td className="py-2 px-4 border-b">{item.location}</td>
                                <td className="py-2 px-4 border-b">
                                    <button
                                        onClick={() => handleEdit(item.id)}
                                        className="bg-yellow-500 text-white px-2 py-1 rounded hover:bg-yellow-600 mr-2"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(item.id)}
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
