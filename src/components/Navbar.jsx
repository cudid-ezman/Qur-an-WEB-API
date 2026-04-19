import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [surat, setSurat] = useState([]);
  const [loading, setLoading] = useState(true);

  const getDataFromAPI = async () => {
    try {
      const res = await fetch("https://equran.id/api/v2/surat");
      const data = await res.json();
      setSurat(data.data || []);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDataFromAPI();
  }, []);

  return (
    <aside className="bg-dark text-white min-vh-100 p-3">
      <h4 className="text-center mb-4">Qur'an Web</h4>

      <ul className="nav flex-column">
        <li className="nav-item mb-2">
          <Link to="/" className="nav-link text-white">
            <i className="bi bi-house-door me-2"></i>
            Dashboard
          </Link>
        </li>

        <li className="nav-item">
          <button
            className="nav-link text-white btn btn-link text-start w-100 p-0 mb-2 text-decoration-none"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#submenu1"
            aria-expanded="true"
            aria-controls="submenu1"
          >
            <i className="bi bi-folder me-2"></i>
            Surat
          </button>

          <div className="collapse show" id="submenu1">
            <ul className="nav flex-column ms-3">
              {loading ? (
                <li className="nav-item text-white-50">Memuat data surat...</li>
              ) : (
                surat.map((surah) => (
                  <li key={surah.nomor} className="nav-item">
                    <Link
                      to={`/surat/${surah.nomor}`}
                      className="nav-link text-white"
                    >
                      <i className="bi bi-flower3 me-2"></i>
                      {surah.nomor}. {surah.namaLatin}
                    </Link>
                  </li>
                ))
              )}
            </ul>
          </div>
        </li>
      </ul>
    </aside>
  );
};

export default Navbar;