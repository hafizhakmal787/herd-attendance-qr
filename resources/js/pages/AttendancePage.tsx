import { Head, Link } from '@inertiajs/react';
import React, { useEffect, useState } from 'react';
import { Scanner } from '@yudiel/react-qr-scanner'; 

export default function AttendancePage({ auth }: { auth: any }) {
    const [mounted, setMounted] = useState(false);
    const [isScanning, setIsScanning] = useState(true);

    useEffect(() => {
        setMounted(true);
    }, []);

    const handleScan = async (result: any) => {
        if (result && result.length > 0 && isScanning) {
            const rawValue = result[0].rawValue;
            setIsScanning(false); 

            const token = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content');

            try {
                const response = await fetch('/scan-qr', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json',
                        'X-CSRF-TOKEN': token || '', 
                    },
                    body: JSON.stringify({ qr_code: rawValue })
                });

                const data = await response.json();

                if (response.ok) {
                    alert(`BERHASIL!\nHalo ${data.nama}\nStatus: ${data.status}`);
                } else {
                    alert(`GAGAL: ${data.message}`);
                }

            } catch (error) {
                alert("Terjadi kesalahan koneksi ke server.");
            } finally {
                // Jeda 3 detik sebelum bisa scan lagi
                setTimeout(() => setIsScanning(true), 3000);
            }
        }
    };

    return (
        <div className="min-h-screen w-full bg-[#0b0f1a] text-white flex flex-col">
            <Head title="Scanner Absensi G-STATE" />

            {/* Navbar */}
            <nav className="p-6 border-b border-slate-800 flex justify-between items-center bg-[#0b0f1a]/80 backdrop-blur-md sticky top-0 z-10">
                <div className="flex items-center gap-5">
                    <Link 
                        href="/dashboard" 
                        className="group flex items-center gap-2 text-slate-400 hover:text-white transition-colors"
                    >
                        <div className="p-2 rounded-full group-hover:bg-slate-800 transition-all">
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                <path d="m15 18-6-6 6-6"/>
                            </svg>
                        </div>
                        <span className="text-sm font-medium">Kembali</span>
                    </Link>

                    <div className="h-6 w-[1px] bg-slate-800"></div>

                    <div className="flex items-center gap-2">
                        <div className="p-2 bg-emerald-500/10 rounded-lg">
                            <span className="text-emerald-500 font-bold tracking-tighter">STATE</span>
                        </div>
                    </div>
                </div>

                <div className="hidden sm:block px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
                    <span className="text-[10px] font-bold text-emerald-500 uppercase tracking-widest text-center">System Active</span>
                </div>
            </nav>

            <main className="flex-1 flex flex-col items-center justify-center p-4">
                <div className="w-full max-w-2xl space-y-6 text-center">
                    <div>
                        <h2 className="text-3xl font-light tracking-tight text-slate-200">
                            Scan <span className="font-black text-emerald-500 text-4xl">QR CODE</span>
                        </h2>
                        <p className="text-slate-500 text-base mt-2">Arahkan kode karyawan ke area kotak di bawah</p>
                    </div>
                    
                    {/* Area Scanner Diperbesar (max-w-2xl) */}
                    <div className="relative aspect-square w-full bg-black rounded-[2rem] overflow-hidden border-4 border-slate-800 shadow-[0_0_50px_-12px_rgba(16,185,129,0.3)]">
                        {mounted && (
                            <Scanner 
                                onScan={handleScan}
                                scanDelay={3000} 
                                styles={{ 
                                    container: { width: '100%', height: '100%' },
                                    video: { objectFit: 'cover' } 
                                }}
                            />
                        )}
                        
                        {/* Overlay Frame Statis (Tanpa Animasi) */}
                        <div className="absolute inset-0 pointer-events-none border-[40px] border-[#0b0f1a]/60"></div>
                        
                        {/* Sudut Frame Fokus */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 pointer-events-none">
                            {/* Pojok Kiri Atas */}
                            <div className="absolute top-0 left-0 w-12 h-12 border-t-4 border-l-4 border-emerald-500 rounded-tl-2xl"></div>
                            {/* Pojok Kanan Atas */}
                            <div className="absolute top-0 right-0 w-12 h-12 border-t-4 border-r-4 border-emerald-500 rounded-tr-2xl"></div>
                            {/* Pojok Kiri Bawah */}
                            <div className="absolute bottom-0 left-0 w-12 h-12 border-b-4 border-l-4 border-emerald-500 rounded-bl-2xl"></div>
                            {/* Pojok Kanan Bawah */}
                            <div className="absolute bottom-0 right-0 w-12 h-12 border-b-4 border-r-4 border-emerald-500 rounded-br-2xl"></div>
                        </div>
                    </div>

                    <div className="inline-block bg-slate-900/80 px-6 py-3 rounded-2xl border border-slate-800">
                        <p className="text-slate-400 text-xs uppercase font-bold tracking-[0.2em]">
                            Silahkan scan QR Code karyawan untuk melakukan absensi. Pastikan QR Code dalam kondisi baik.
                        </p>
                    </div>
                </div>
            </main>
        </div>
    );
}