import React from 'react';
import { Link } from '@inertiajs/react';

export function AppSidebar() {
    return (
        <aside className="w-64 bg-[#0b1120] border-r border-slate-800 h-screen p-4 flex flex-col fixed left-0 top-0">
            <div className="mb-8 px-2">
                <h1 className="text-emerald-500 font-black text-xl tracking-tighter">G-STATE</h1>
                <p className="text-[10px] text-slate-500 uppercase font-bold tracking-widest">Management System</p>
            </div>
            
            <nav className="space-y-1 flex-1">
                {/* <Link href="/dashboard" className="block text-slate-300 p-3 hover:bg-slate-800 rounded-xl transition text-sm">
                    Dashboard
                </Link> */}
                {/* <Link href="/karyawan/qr-list" className="block text-slate-300 p-3 hover:bg-slate-800 rounded-xl transition text-sm">
                    Daftar QR Karyawan
                </Link> */}
                <Link href="/absensi" className="block text-emerald-400 p-3 bg-emerald-500/5 border-l-2 border-emerald-500 rounded-r-xl text-sm font-bold">
                    Buka Scanner
                </Link>
            </nav>

            <div className="p-2 border-t border-slate-800">
                <p className="text-[10px] text-slate-600 text-center uppercase tracking-widest">Green Data v1.0</p>
            </div>
        </aside>
    );
}