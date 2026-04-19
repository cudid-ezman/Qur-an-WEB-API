import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

const DetailSurat = () => {
  const { id } = useParams();
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataFromAPI = async (idSurat) => {
    try {
      const res = await fetch(`https://equran.id/api/v2/surat/${idSurat}`);
      const data = await res.json();
      setSurat(data.data || null);
    } catch (error) {
      console.error("Error fetching data:", error);
      setSurat(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    setLoading(true);
    getDataFromAPI(id);
  }, [id]);

  if (loading) {
    return <div className="p-4">Memuat data Al-Qur'an...</div>;
  }

  if (!surat) {
    return <div className="p-4">Surat tidak ditemukan.</div>;
  }

  return (
    <div className="container py-4">
      <div className="card shadow-sm border-0 mb-4">
        <div className="card-body">
          <h2 className="mb-3">
            {surat.namaLatin} ({surat.nama})
          </h2>
          <p className="mb-2">
            <strong>Jumlah Ayat:</strong> {surat.jumlahAyat}
          </p>
          <p className="mb-3">
            <strong>Arti:</strong> {surat.arti}
          </p>
          <div className="alert alert-info mb-0">
            <strong>Deskripsi:</strong> {parse(surat.deskripsi)}
          </div>
        </div>
      </div>

      <div className="d-flex flex-column gap-3">
        {surat.ayat.map((ayat) => (
          <div key={ayat.nomorAyat} className="card shadow-sm border-0">
            <div className="card-body">
              <div className="d-flex justify-content-between align-items-start gap-3 mb-3">
                <span className="badge text-bg-primary rounded-pill">
                  Ayat {ayat.nomorAyat}
                </span>
              </div>

              <div className="arabic-text text-end mb-3">
                {ayat.teksArab}
              </div>

              <p className="mb-1">
                <strong>Latin:</strong> {ayat.teksLatin}
              </p>
              <p className="mb-0">
                <strong>Arti:</strong> {ayat.teksIndonesia}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DetailSurat;