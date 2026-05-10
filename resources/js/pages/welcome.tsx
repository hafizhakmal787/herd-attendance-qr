import { Head, Link } from '@inertiajs/react';
import React from 'react';

export default function Welcome() {
    return (
        <div className="min-h-screen bg-[#0b0f1a] text-slate-200 flex flex-col items-center justify-center p-6 font-sans">
            <Head title="G-state Attendance" />

            <div className="w-full max-w-4xl text-center space-y-8">
                {/* Badge Badge kecil */}
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-slate-800/50 border border-slate-700 rounded-md">
                    <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full"></div>
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-400">System Monitoring v1.0</span>
                </div>

                {/* Main Heading - Clean Typography */}
                <div className="space-y-2">
                    <h1 className="text-6xl md:text-7xl font-light tracking-tight text-white">
                        STATE <span className="font-black text-emerald-500">ATTENDANCE</span>
                    </h1>
                    <p className="text-slate-500 text-lg max-w-xl mx-auto font-medium">
                        Manajemen absensi karyawan perkebunan wilayah Green Estate melalui verifikasi QR Code terenkripsi.
                    </p>
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link
                        href="/absensi"
                        className="px-10 py-4 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold text-lg transition-all shadow-lg active:scale-95"
                    >
                        Buka Scanner
                    </Link>

                    <Link
                        href="/login"
                        className="px-10 py-4 bg-transparent hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg font-bold text-lg transition-all border border-slate-700 active:scale-95"
                    >
                        Admin Portal
                    </Link>
                </div>

                {/* Footer Stats - Minimalist */}
                <div className="pt-16 grid grid-cols-3 gap-4 border-t border-slate-800/50 max-w-md mx-auto">
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-300">15</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Karyawan</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-300">Active</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Status</p>
                    </div>
                    <div className="text-center">
                        <p className="text-sm font-bold text-slate-300">Secure</p>
                        <p className="text-[9px] text-slate-500 uppercase tracking-widest">Cloud</p>
                    </div>
                </div>
            </div>

            <footer className="mt-20 text-[9px] text-slate-700 font-medium uppercase tracking-[0.4em]">
                &copy; 2026 Green Estate - Digital Infrastructure
            </footer>
        </div>
    );
}