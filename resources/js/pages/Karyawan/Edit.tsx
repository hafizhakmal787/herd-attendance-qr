import { useForm, Head, Link } from '@inertiajs/react';

export default function Edit({ employee }: { employee: any }) {
    // Inisialisasi data dengan semua kolom yang ada di database
    const { data, setData, put, processing, errors } = useForm({
        name: employee.name || '',
        kode_karyawan: employee.kode_karyawan || '',
        masa_kerja: employee.masa_kerja || '',
        umur: employee.umur || '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        // Mengirim data ke route update
        put(`/karyawan/${employee.id}`, {
            onSuccess: () => alert('Data Berhasil Diperbarui!'),
        });
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-8 flex items-center justify-center">
            <Head title="Edit Karyawan" />
            <div className="w-full max-w-md bg-[#0b1120] p-8 rounded-3xl border border-slate-800 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-blue-400">Edit Data: {employee.name}</h2>
                    <Link href="/dashboard" className="text-xs text-slate-500 hover:text-white">Batal</Link>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    {/* Nama */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nama Lengkap</label>
                        <input 
                            type="text" 
                            value={data.name} 
                            onChange={e => setData('name', e.target.value)} 
                            className="w-full bg-[#020617] border-slate-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" 
                        />
                        {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                    </div>

                    {/* Kode Karyawan */}
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Kode Karyawan</label>
                        <input 
                            type="text" 
                            value={data.kode_karyawan} 
                            onChange={e => setData('kode_karyawan', e.target.value)} 
                            className="w-full bg-[#020617] border-slate-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" 
                        />
                        {errors.kode_karyawan && <p className="text-red-500 text-[10px] mt-1">{errors.kode_karyawan}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        {/* Umur */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Umur</label>
                            <input 
                                type="number" 
                                value={data.umur} 
                                onChange={e => setData('umur', e.target.value)} 
                                className="w-full bg-[#020617] border-slate-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" 
                            />
                            {errors.umur && <p className="text-red-500 text-[10px] mt-1">{errors.umur}</p>}
                        </div>
                        {/* Masa Kerja */}
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Masa Kerja</label>
                            <input 
                                type="number" 
                                value={data.masa_kerja} 
                                onChange={e => setData('masa_kerja', e.target.value)} 
                                className="w-full bg-[#020617] border-slate-800 rounded-xl p-3 focus:border-blue-500 outline-none transition-all" 
                            />
                            {errors.masa_kerja && <p className="text-red-500 text-[10px] mt-1">{errors.masa_kerja}</p>}
                        </div>
                    </div>

                    <button 
                        disabled={processing} 
                        className="w-full bg-blue-600 text-white font-black py-4 rounded-2xl mt-4 hover:bg-blue-500 transition-all shadow-lg shadow-blue-500/20 disabled:opacity-50"
                    >
                        {processing ? 'MEMPROSES...' : 'UPDATE DATA'}
                    </button>
                </form>
            </div>
        </div>
    );
}