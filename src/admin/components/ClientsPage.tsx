import { useEffect, useState } from 'react';

interface Client {
    id: number;
    name: string;
    email: string;
    phone: string;
    totalOrders: number;
}

export default function ClientsPage() {
    const [clients, setClients] = useState<Client[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/clients')
            .then(response => response.json())
            .then(data => {
                setClients(data);
                setLoading(false);
            })
            .catch(err => {
                setError((err as Error).message);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h3 className="text-3xl font-bold mb-6">Liste des Clients</h3>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {!loading && !error && (
                <table className="min-w-full bg-white border">
                    <thead>
                        <tr>
                            <th className="py-2 px-4 border-b">Client ID</th>
                            <th className="py-2 px-4 border-b">Name</th>
                            <th className="py-2 px-4 border-b">Email</th>
                            <th className="py-2 px-4 border-b">Phone</th>
                            <th className="py-2 px-4 border-b">Total Orders</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clients.map(client => (
                            <tr key={client.id}>
                                <td className="py-2 px-4 border-b">{client.id}</td>
                                <td className="py-2 px-4 border-b">{client.name}</td>
                                <td className="py-2 px-4 border-b">{client.email}</td>
                                <td className="py-2 px-4 border-b">{client.phone}</td>
                                <td className="py-2 px-4 border-b">{client.totalOrders}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}
    
    
    

