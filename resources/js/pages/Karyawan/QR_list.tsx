import { Head } from '@inertiajs/react';
import React from 'react';
import { QRCodeSVG } from 'qrcode.react'; 

interface Employee {
    id: number;
    nama: string;
    id_karyawan: string;
    qr_code: string;
}

export default function QRList({ employees }: { employees: Employee[] }) {
    
    const handlePrint = () => {
        window.print();
    };

    return (
        // Pakai warna putih/terang biar hemat tinta printer & bersih
        <div className="min-h-screen bg-white p-4 sm:p-10 text-slate-900">
            <Head title="Cetak QR Code Karyawan - G-STATE" />

            {/* Header: Muncul di layar, Hilang pas di-print */}
            <div className="mb-10 flex flex-col md:flex-row justify-between items-center gap-4 border-b pb-6 print:hidden">
                <div>
                    <h1 className="text-3xl font-black tracking-tighter text-slate-900">G-STATE <span className="text-emerald-600">QR DIRECTORY</span></h1>
                    <p className="text-slate-500 font-medium">Unit Perkebunan Cipayung - Depok</p>
                </div>
                <div className="flex gap-3">
                    <button 
                        onClick={() => window.history.back()}
                        className="px-5 py-2.5 bg-slate-100 text-slate-600 rounded-xl font-bold hover:bg-slate-200 transition"
                    >
                        Kembali
                    </button>
                    <button 
                        onClick={handlePrint}
                        className="px-6 py-2.5 bg-emerald-600 text-white rounded-xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-200 transition flex items-center gap-2"
                    >
                        <span>Cetak / Save PDF</span>
                    </button>
                </div>
            </div>

            {/* Grid Kartu QR */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
                {employees.map((emp) => (
                    <div 
                        key={emp.id} 
                        className="relative border-2 border-slate-200 rounded-[2rem] p-6 flex flex-col items-center shadow-sm hover:shadow-md transition-shadow bg-white overflow-hidden break-inside-avoid"
                    >
                        {/* Label Atas */}
                        <div className="absolute top-0 left-0 w-full h-2 bg-emerald-500"></div>
                        
                        {/* QR Box */}
                        <div className="p-4 bg-white border-4 border-slate-50 rounded-3xl mb-4 mt-2">
                            <QRCodeSVG 
                                value={emp.qr_code} 
                                size={160}
                                level="H"
                                includeMargin={false}
                            />
                        </div>

                        {/* Nama & ID */}
                        <div className="text-center w-full">
                            <h3 className="text-xl font-black text-slate-900 uppercase tracking-tighter leading-tight">
                                {emp.nama}
                            </h3>
                            <div className="mt-3 inline-block px-4 py-1 bg-emerald-50 text-emerald-700 rounded-full text-xs font-bold border border-emerald-100 uppercase tracking-widest">
                                {emp.id_karyawan}
                            </div>
                            <p className="text-[9px] text-slate-400 mt-4 font-bold uppercase tracking-[0.2em]">
                                G-state Management System
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {/* CSS Khusus Print */}
            <style>{`
                @media print {
                    @page { 
                        size: A4; 
                        margin: 15mm; 
                    }
                    body { 
                        background: white !important; 
                        -webkit-print-color-adjust: exact;
                    }
                    .print\\:hidden { 
                        display: none !important; 
                    }
                    .grid {
                        gap: 1.5rem !important;
                    }
                    /* Pastikan kartu tidak terpotong antar halaman */
                    .break-inside-avoid {
                        break-inside: avoid;
                    }
                }
            `}</style>
        </div>
    );
}