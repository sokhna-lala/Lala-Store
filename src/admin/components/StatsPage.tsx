import { useEffect, useState } from "react";

interface Stats {
    totalSales: number;
    totalProductsSold: number;
    uniqueClients: number;
}

export default function StatsPage() {
    const [stats, setStats] = useState<Stats | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch('http://localhost:3000/stats')
            .then(response => response.json())
            .then(data => {
                setStats(data);
                setLoading(false);
            })
            .catch(err => {
                setError((err as Error).message);
                setLoading(false);
            });
    }, []);

    return (
        <div>
            <h3 className="text-3xl font-bold mb-6">Statistiques des Ventes</h3>
            {loading && <p>Loading...</p>}
            {error && <p className="text-red-500">Error: {error}</p>}
            {stats && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <div className="bg-white p-4 rounded shadow">
                        <h4 className="text-xl font-semibold mb-2">Total des Ventes</h4>
                        <p className="text-2xl">{stats.totalSales} fcf</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h4 className="text-xl font-semibold mb-2">Produits Vendus</h4>
                        <p className="text-2xl">{stats.totalProductsSold}</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h4 className="text-xl font-semibold mb-2">Clients Uniques</h4>
                        <p className="text-2xl">{stats.uniqueClients}</p>
                    </div>
                </div>
            )}
        </div>
    );
}

