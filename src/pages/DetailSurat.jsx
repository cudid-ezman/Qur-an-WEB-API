import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import parse from "html-react-parser";

const DetailSurat = () => {
  const { id } = useParams(); // Mengambil nomor surat dari URL
  const [surat, setSurat] = useState(null);
  const [loading, setLoading] = useState(true);

  const getDataFromAPI = (idSurat) => {
    fetch(`https://equran.id/api/v2/surat/${idSurat}`)
      .then((res) => res.json())
      .then((data) => {
        setSurat(data.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
        setLoading(false);
      });
  };

  useEffect(() => {
    setLoading(true);
    getDataFromAPI(id);
  }, [id]);

  if (loading) return <div className="p-4">Memuat data Al-Quran...</div>;
  if (!surat) return <div className="p-4">Surat tidak ditemukan.</div>;

  return (
    <div className="vh-100 overflow-auto p-3">
      <h2>
        {surat.namaLatin} ({surat.nama})
      </h2>
      <hr />
      <div className="mb-4">
        <p><strong>Jumlah Ayat:</strong> {surat.jumlahAyat}</p>
        <p><strong>Arti:</strong> {surat.arti}</p>
        <div className="alert alert-info">
          <strong>Deskripsi:</strong> {parse(surat.deskripsi)}
        </div>
      </div>

      <ul className="list-group">
        {surat.ayat.map((ayat) => (
          <li
            key={ayat.nomorAyat}
            className="list-group-item d-flex justify-content-between align-items-center p-3"
          >
            {/* Class arabic-text diterapkan di sini agar font Uthmanic aktif */}
            <div className="arabic-text w-100 text-end pe-3">
              {ayat.teksArab}
            </div>
            <span className="badge text-bg-primary rounded-pill">
              {ayat.nomorAyat}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default DetailSurat;