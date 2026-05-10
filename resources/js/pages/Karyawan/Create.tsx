import { useForm, Head, Link } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        name: '',
        kode_karyawan: '',
        masa_kerja: '',
        umur: '',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/karyawan');
    };

    return (
        <div className="min-h-screen bg-[#020617] text-slate-200 p-8 flex items-center justify-center">
            <Head title="Tambah Karyawan" />
            <div className="w-full max-w-md bg-[#0b1120] p-8 rounded-3xl border border-slate-800 shadow-2xl">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-emerald-500">Tambah Karyawan</h2>
                    <Link href="/dashboard" className="text-xs text-slate-500 hover:text-white">Batal</Link>
                </div>

                <form onSubmit={submit} className="space-y-5">
                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Nama Lengkap</label>
                        <input type="text" value={data.name} onChange={e => setData('name', e.target.value)} className="w-full bg-[#020617] border-slate-800 rounded-xl p-3 focus:border-emerald-500 outline-none transition-all" placeholder="Contoh: Bimo" />
                        {errors.name && <p className="text-red-500 text-[10px] mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Kode Karyawan</label>
                        <input type="text" value={data.kode_karyawan} onChange={e => setData('kode_karyawan', e.target.value)} className="w-full bg-[#020617] border-slate-800 rounded-xl p-3 focus:border-emerald-500 outline-none transition-all" placeholder="bsk-21" />
                        {errors.kode_karyawan && <p className="text-red-500 text-[10px] mt-1">{errors.kode_karyawan}</p>}
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Umur</label>
                            <input type="number" value={data.umur} onChange={e => setData('umur', e.target.value)} className="w-full bg-[#020617] border-slate-800 rounded-xl p-3 focus:border-emerald-500 outline-none transition-all" />
                            {errors.umur && <p className="text-red-500 text-[10px] mt-1">{errors.umur}</p>}
                        </div>
                        <div>
                            <label className="block text-xs font-bold text-slate-400 uppercase mb-2">Masa Kerja</label>
                            <input type="number" value={data.masa_kerja} onChange={e => setData('masa_kerja', e.target.value)} className="w-full bg-[#020617] border-slate-800 rounded-xl p-3 focus:border-emerald-500 outline-none transition-all" />
                            {errors.masa_kerja && <p className="text-red-500 text-[10px] mt-1">{errors.masa_kerja}</p>}
                        </div>
                    </div>

                    <button 
                        disabled={processing} 
                        className="w-full bg-emerald-500 text-slate-900 font-black py-4 rounded-2xl mt-4 hover:bg-emerald-400 transition-all shadow-lg shadow-emerald-500/20 disabled:opacity-50"
                    >
                        {processing ? 'MENYIMPAN...' : 'SIMPAN DATA'}
                    </button>
                </form>
            </div>
        </div>
    );
}