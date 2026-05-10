import { Head, Link, router } from '@inertiajs/react';
import { QRCodeCanvas } from 'qrcode.react'; 
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Spinner } from '@/components/ui/spinner';

// --- KOMPONEN MODAL ZOOM QR ---
function QRPreviewModal({ isOpen, onClose, value, name }: any) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in duration-300" onClick={onClose}>
            <div className="bg-[#0b1120] p-10 rounded-[2.5rem] border border-slate-800 flex flex-col items-center gap-6 animate-in zoom-in duration-300 shadow-2xl" onClick={e => e.stopPropagation()}>
                <div className="text-center">
                    <h3 className="text-xl font-black text-white uppercase tracking-tighter">{name}</h3>
                    <p className="text-[10px] text-emerald-500 font-bold tracking-[0.3em] uppercase mt-1">Digital Identity Card</p>
                </div>
                <div className="bg-white p-6 rounded-3xl shadow-2xl ring-8 ring-emerald-500/10">
                    <QRCodeCanvas value={value} size={280} level="H" />
                </div>
                <button onClick={onClose} className="text-slate-500 hover:text-white font-black uppercase tracking-[0.4em] text-[10px] transition-colors mt-2">
                    [ Tap anywhere to close ]
                </button>
            </div>
        </div>
    );
}

// --- KOMPONEN MODAL DELETE ---
function DeleteModal({ isOpen, onClose, onConfirm, itemName, processing }: any) {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
            <div className="bg-[#1e1e2d] border border-slate-800 rounded-2xl p-6 max-w-sm w-full shadow-2xl animate-in zoom-in duration-200">
                <div className="mb-2">
                    <p className="text-zinc-500 text-[10px] tracking-widest uppercase">System Message</p>
                </div>
                <div className="mb-8">
                    <p className="text-slate-200 text-base">
                        Yakin mau hapus si <span className="font-bold text-emerald-400">{itemName}</span>, Wak?
                    </p>
                </div>
                <div className="flex justify-end gap-3">
                    <button 
                        onClick={onClose} 
                        className="text-zinc-400 hover:text-white text-sm font-medium transition-colors"
                        disabled={processing}
                    >
                        Batal
                    </button>
                    <Button 
                        onClick={onConfirm} 
                        className="bg-[#00cfd5] hover:bg-[#00b5ba] text-[#0f172a] font-bold rounded-lg px-6 border-none shadow-none"
                        disabled={processing}
                    >
                        {processing ? <Spinner className="mr-2 h-4 w-4" /> : 'OK'}
                    </Button>
                </div>
            </div>
        </div>
    );
}

export default function Dashboard({ employees }: { employees: any[] }) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isQRPreviewOpen, setIsQRPreviewOpen] = useState(false);
    const [selectedEmp, setSelectedEmp] = useState<{id: number, name: string, kode: string} | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleLogout = () => router.post('/logout');

    const openDeleteModal = (id: number, name: string) => {
        setSelectedEmp({ id, name, kode: '' });
        setIsModalOpen(true);
    };

    const openQRPreview = (name: string, kode: string) => {
        setSelectedEmp({ id: 0, name, kode });
        setIsQRPreviewOpen(true);
    };

    const confirmDelete = () => {
        if (!selectedEmp) return;
        router.delete(`/users/${selectedEmp.id}`, {
            onBefore: () => setIsDeleting(true),
            onSuccess: () => {
                setIsModalOpen(false);
                setIsDeleting(false);
            },
            onError: () => setIsDeleting(false),
            preserveScroll: true,
        });
    };

    return (
        <>
            <Head title="Admin Dashboard" />
            
            <DeleteModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onConfirm={confirmDelete}
                itemName={selectedEmp?.name || ''}
                processing={isDeleting}
            />

            <QRPreviewModal 
                isOpen={isQRPreviewOpen}
                onClose={() => setIsQRPreviewOpen(false)}
                value={selectedEmp?.kode || ''}
                name={selectedEmp?.name || ''}
            />

            <div className="min-h-screen bg-[#020617] text-slate-200 font-sans">
                {/* Navbar */}
                <nav className="border-b border-slate-800 bg-[#0b1120]/80 backdrop-blur-md sticky top-0 z-50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                        <div className="flex justify-between h-16 items-center">
                            <div className="flex items-center gap-2">
                                <div className="bg-emerald-500 w-8 h-8 flex items-center justify-center rounded-lg shadow-[0_0_15px_rgba(16,185,129,0.3)]">
                                    <span className="text-slate-900 font-black text-xs">G-S</span>
                                </div>
                                <span className="font-bold tracking-wider text-slate-100 uppercase text-sm">G-STATE <span className="text-emerald-500">SYSTEM</span></span>
                            </div>
                            <div className="flex items-center gap-4">
                                <Link href="/absensi" className="text-[10px] font-black text-emerald-500 border border-emerald-500/20 px-4 py-2 rounded-xl hover:bg-emerald-500/5 transition-all uppercase tracking-widest">
                                    Scanner
                                </Link>
                                <Link href="/karyawan/create" className="text-[10px] font-black bg-emerald-500 text-slate-900 px-4 py-2 rounded-xl hover:bg-emerald-400 transition-all uppercase tracking-widest">
                                    ➕ TAMBAH
                                </Link>
                                <button onClick={handleLogout} className="text-red-500 text-[10px] font-black uppercase tracking-widest px-2 py-1 hover:text-red-400 transition-colors">
                                    Logout
                                </button>
                            </div>
                        </div>
                    </div>
                </nav>

                <main className="max-w-7xl mx-auto flex flex-col gap-8 p-6 lg:p-10">
                    <div className="px-2">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Employee QR Directory</h2>
                        <p className="text-xs font-bold text-emerald-500 italic mt-1 uppercase tracking-widest opacity-80">Database Management System</p>
                    </div>

                    <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                        {employees?.length > 0 ? (
                            employees.map((emp) => (
                                <div key={emp.id} className="group relative rounded-[2.5rem] border border-slate-800/60 bg-[#0b1120] p-8 flex flex-col items-center transition-all hover:border-emerald-500/40 hover:shadow-[0_0_40px_rgba(16,185,129,0.03)]">
                                    
                                    {/* QR Code Zoom Trigger */}
                                    <div 
                                        className="mb-6 rounded-[2rem] bg-white p-5 shadow-2xl cursor-zoom-in hover:scale-105 transition-transform duration-300"
                                        onClick={() => openQRPreview(emp.name, emp.kode_karyawan)}
                                    >
                                        <QRCodeCanvas 
                                            value={emp.kode_karyawan} 
                                            size={140} 
                                            level="H" 
                                        />
                                        <p className="text-[7px] text-center text-slate-400 mt-3 font-black uppercase tracking-[0.3em]">Tap to preview</p>
                                    </div>

                                    {/* Info Section */}
                                    <h3 className="font-bold text-slate-100 text-xl leading-tight text-center mb-1">{emp.name}</h3>
                                    <p className="font-mono text-[10px] text-emerald-500 uppercase tracking-[0.3em] font-bold mb-6">{emp.kode_karyawan}</p>
                                    
                                    <div className="flex gap-3 mb-8">
                                        <div className="rounded-full bg-slate-900/50 px-4 py-1.5 border border-slate-800 text-[10px] font-bold text-slate-400">
                                            {emp.masa_kerja} Thn
                                        </div>
                                        <div className="rounded-full bg-slate-900/50 px-4 py-1.5 border border-slate-800 text-[10px] font-bold text-slate-400">
                                            {emp.umur} Thn
                                        </div>
                                    </div>

                                    {/* Action Buttons (Clean Version) */}
                                    <div className="w-full pt-6 border-t border-slate-800/50 flex justify-center items-center gap-12">
                                        <Link 
                                            href={`/karyawan/${emp.id}/edit`}
                                            className="text-slate-500 hover:text-blue-500 transition-all duration-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        </Link>

                                        <button 
                                            onClick={() => openDeleteModal(emp.id, emp.name)}
                                            className="text-slate-500 hover:text-red-500 transition-all duration-300"
                                        >
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        </button>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-span-full py-24 text-center border border-dashed border-slate-800 rounded-[3rem] text-slate-600 uppercase tracking-[0.5em] text-[10px] font-black">
                                Database karyawan kosong
                            </div>
                        )}
                    </div>
                </main>
            </div>
        </>
    );
}