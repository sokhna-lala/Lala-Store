import { Link } from "react-router-dom";

export default function Sidebar() {
    return (
        <aside className="w-64 bg-white border-r">
            <div className="p-4 border-b">
                <h2 className="text-2xl font-bold">Lala-Store Admin</h2>
            </div>
            <nav className="flex flex-col gap-2">
                <Link to="/admin" className="p-4 hover:bg-slate-200 border-b">Tableau de Bord</Link>
                <Link to="/admin/orders" className="p-4 hover:bg-slate-200 border-b">Commandes</Link>
                <Link to="/admin/stats" className="p-4 hover:bg-slate-200 border-b">Statistiques</Link>
                <Link to="/admin/products" className="p-4 hover:bg-slate-200 border-b">Produits</Link>
                <Link to="/admin/products/new" className="p-4 hover:bg-slate-200 border-b">Ajouter Produit</Link>
                <Link to="/admin/clients" className="p-4 hover:bg-slate-200 border-b">Clients</Link>
                <Link to="/admin/stock" className="p-4 hover:bg-slate-200 border-b">Stock</Link>
            </nav>
        </aside>
    );
}
