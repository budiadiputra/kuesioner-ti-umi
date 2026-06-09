import { useState } from "react";
import logo from "./assets/Logo.jpg";

const SHEET_URL = "https://script.google.com/macros/s/AKfycbys_sPbP5C-TnKc9KLQ1bArRLhtaC2nc8fufC0CfD9IKfouY0uiZNj8nA9ZlQSZRgZKHg/exec";

const WILAYAH = {
  "Aceh": [
    "Kab. Aceh Barat",
    "Kab. Aceh Barat Daya",
    "Kab. Aceh Besar",
    "Kab. Aceh Jaya",
    "Kab. Aceh Selatan",
    "Kab. Aceh Singkil",
    "Kab. Aceh Tamiang",
    "Kab. Aceh Tengah",
    "Kab. Aceh Tenggara",
    "Kab. Aceh Timur",
    "Kab. Aceh Utara",
    "Kab. Bener Meriah",
    "Kab. Bireuen",
    "Kab. Gayo Lues",
    "Kab. Nagan Raya",
    "Kab. Pidie",
    "Kab. Pidie Jaya",
    "Kab. Simeulue",
    "Kota Banda Aceh",
    "Kota Langsa",
    "Kota Lhokseumawe",
    "Kota Sabang",
    "Kota Subulussalam"
  ],
  "Sumatera Utara": [
    "Kab. Asahan",
    "Kab. Batu Bara",
    "Kab. Dairi",
    "Kab. Deli Serdang",
    "Kab. Humbang Hasundutan",
    "Kab. Karo",
    "Kab. Labuhanbatu",
    "Kab. Labuhanbatu Selatan",
    "Kab. Labuhanbatu Utara",
    "Kab. Langkat",
    "Kab. Mandailing Natal",
    "Kab. Nias",
    "Kab. Nias Barat",
    "Kab. Nias Selatan",
    "Kab. Nias Utara",
    "Kab. Padang Lawas",
    "Kab. Padang Lawas Utara",
    "Kab. Pakpak Bharat",
    "Kab. Samosir",
    "Kab. Serdang Bedagai",
    "Kab. Simalungun",
    "Kab. Tapanuli Selatan",
    "Kab. Tapanuli Tengah",
    "Kab. Tapanuli Utara",
    "Kab. Toba",
    "Kota Binjai",
    "Kota Gunungsitoli",
    "Kota Medan",
    "Kota Padangsidimpuan",
    "Kota Pematangsiantar",
    "Kota Sibolga",
    "Kota Tanjungbalai",
    "Kota Tebing Tinggi"
  ],
  "Sumatera Barat": [
    "Kab. Agam",
    "Kab. Dharmasraya",
    "Kab. Kepulauan Mentawai",
    "Kab. Lima Puluh Kota",
    "Kab. Padang Pariaman",
    "Kab. Pasaman",
    "Kab. Pasaman Barat",
    "Kab. Pesisir Selatan",
    "Kab. Sijunjung",
    "Kab. Solok",
    "Kab. Solok Selatan",
    "Kab. Tanah Datar",
    "Kota Bukittinggi",
    "Kota Padang",
    "Kota Padang Panjang",
    "Kota Pariaman",
    "Kota Payakumbuh",
    "Kota Sawahlunto",
    "Kota Solok"
  ],
  "Riau": [
    "Kab. Bengkalis",
    "Kab. Indragiri Hilir",
    "Kab. Indragiri Hulu",
    "Kab. Kampar",
    "Kab. Kepulauan Meranti",
    "Kab. Kuantan Singingi",
    "Kab. Pelalawan",
    "Kab. Rokan Hilir",
    "Kab. Rokan Hulu",
    "Kab. Siak",
    "Kota Dumai",
    "Kota Pekanbaru"
  ],
  "Kepulauan Riau": [
    "Kab. Bintan",
    "Kab. Karimun",
    "Kab. Kepulauan Anambas",
    "Kab. Lingga",
    "Kab. Natuna",
    "Kota Batam",
    "Kota Tanjungpinang"
  ],
  "Jambi": [
    "Kab. Batanghari",
    "Kab. Bungo",
    "Kab. Kerinci",
    "Kab. Merangin",
    "Kab. Muaro Jambi",
    "Kab. Sarolangun",
    "Kab. Tanjung Jabung Barat",
    "Kab. Tanjung Jabung Timur",
    "Kab. Tebo",
    "Kota Jambi",
    "Kota Sungaipenuh"
  ],
  "Sumatera Selatan": [
    "Kab. Banyuasin",
    "Kab. Empat Lawang",
    "Kab. Lahat",
    "Kab. Muara Enim",
    "Kab. Musi Banyuasin",
    "Kab. Musi Rawas",
    "Kab. Musi Rawas Utara",
    "Kab. Ogan Ilir",
    "Kab. Ogan Komering Ilir",
    "Kab. Ogan Komering Ulu",
    "Kab. Ogan Komering Ulu Selatan",
    "Kab. Ogan Komering Ulu Timur",
    "Kab. Penukal Abab Lematang Ilir",
    "Kota Lubuklinggau",
    "Kota Pagar Alam",
    "Kota Palembang",
    "Kota Prabumulih"
  ],
  "Bengkulu": [
    "Kab. Bengkulu Selatan",
    "Kab. Bengkulu Tengah",
    "Kab. Bengkulu Utara",
    "Kab. Kaur",
    "Kab. Kepahiang",
    "Kab. Lebong",
    "Kab. Mukomuko",
    "Kab. Rejang Lebong",
    "Kab. Seluma",
    "Kota Bengkulu"
  ],
  "Lampung": [
    "Kab. Lampung Barat",
    "Kab. Lampung Selatan",
    "Kab. Lampung Tengah",
    "Kab. Lampung Timur",
    "Kab. Lampung Utara",
    "Kab. Mesuji",
    "Kab. Pesawaran",
    "Kab. Pesisir Barat",
    "Kab. Pringsewu",
    "Kab. Tanggamus",
    "Kab. Tulang Bawang",
    "Kab. Tulang Bawang Barat",
    "Kab. Way Kanan",
    "Kota Bandar Lampung",
    "Kota Metro"
  ],
  "Kepulauan Bangka Belitung": [
    "Kab. Bangka",
    "Kab. Bangka Barat",
    "Kab. Bangka Selatan",
    "Kab. Bangka Tengah",
    "Kab. Belitung",
    "Kab. Belitung Timur",
    "Kota Pangkalpinang"
  ],
  "DKI Jakarta": [
    "Kab. Kepulauan Seribu",
    "Kota Jakarta Barat",
    "Kota Jakarta Pusat",
    "Kota Jakarta Selatan",
    "Kota Jakarta Timur",
    "Kota Jakarta Utara"
  ],
  "Jawa Barat": [
    "Kab. Bandung",
    "Kab. Bandung Barat",
    "Kab. Bekasi",
    "Kab. Bogor",
    "Kab. Ciamis",
    "Kab. Cianjur",
    "Kab. Cirebon",
    "Kab. Garut",
    "Kab. Indramayu",
    "Kab. Karawang",
    "Kab. Kuningan",
    "Kab. Majalengka",
    "Kab. Pangandaran",
    "Kab. Purwakarta",
    "Kab. Subang",
    "Kab. Sukabumi",
    "Kab. Sumedang",
    "Kab. Tasikmalaya",
    "Kota Bandung",
    "Kota Bekasi",
    "Kota Bogor",
    "Kota Cimahi",
    "Kota Cirebon",
    "Kota Depok",
    "Kota Sukabumi",
    "Kota Tasikmalaya"
  ],
  "Banten": [
    "Kab. Lebak",
    "Kab. Pandeglang",
    "Kab. Serang",
    "Kab. Tangerang",
    "Kota Cilegon",
    "Kota Serang",
    "Kota Tangerang",
    "Kota Tangerang Selatan"
  ],
  "DI Yogyakarta": [
    "Kab. Bantul",
    "Kab. Gunungkidul",
    "Kab. Kulon Progo",
    "Kab. Sleman",
    "Kota Yogyakarta"
  ],
  "Jawa Tengah": [
    "Kab. Banjarnegara",
    "Kab. Banyumas",
    "Kab. Batang",
    "Kab. Blora",
    "Kab. Boyolali",
    "Kab. Brebes",
    "Kab. Cilacap",
    "Kab. Demak",
    "Kab. Grobogan",
    "Kab. Jepara",
    "Kab. Karanganyar",
    "Kab. Kebumen",
    "Kab. Kendal",
    "Kab. Klaten",
    "Kab. Kudus",
    "Kab. Magelang",
    "Kab. Pati",
    "Kab. Pekalongan",
    "Kab. Pemalang",
    "Kab. Purbalingga",
    "Kab. Purworejo",
    "Kab. Rembang",
    "Kab. Semarang",
    "Kab. Sragen",
    "Kab. Sukoharjo",
    "Kab. Tegal",
    "Kab. Temanggung",
    "Kab. Wonogiri",
    "Kab. Wonosobo",
    "Kota Magelang",
    "Kota Pekalongan",
    "Kota Salatiga",
    "Kota Semarang",
    "Kota Surakarta",
    "Kota Tegal"
  ],
  "Jawa Timur": [
    "Kab. Bangkalan",
    "Kab. Banyuwangi",
    "Kab. Blitar",
    "Kab. Bojonegoro",
    "Kab. Bondowoso",
    "Kab. Gresik",
    "Kab. Jember",
    "Kab. Jombang",
    "Kab. Kediri",
    "Kab. Lamongan",
    "Kab. Lumajang",
    "Kab. Madiun",
    "Kab. Magetan",
    "Kab. Malang",
    "Kab. Mojokerto",
    "Kab. Nganjuk",
    "Kab. Ngawi",
    "Kab. Pacitan",
    "Kab. Pamekasan",
    "Kab. Pasuruan",
    "Kab. Ponorogo",
    "Kab. Probolinggo",
    "Kab. Sampang",
    "Kab. Sidoarjo",
    "Kab. Situbondo",
    "Kab. Sumenep",
    "Kab. Trenggalek",
    "Kab. Tuban",
    "Kab. Tulungagung",
    "Kota Batu",
    "Kota Blitar",
    "Kota Kediri",
    "Kota Madiun",
    "Kota Malang",
    "Kota Mojokerto",
    "Kota Pasuruan",
    "Kota Probolinggo",
    "Kota Surabaya"
  ],
  "Bali": [
    "Kab. Badung",
    "Kab. Bangli",
    "Kab. Buleleng",
    "Kab. Gianyar",
    "Kab. Jembrana",
    "Kab. Karangasem",
    "Kab. Klungkung",
    "Kab. Tabanan",
    "Kota Denpasar"
  ],
  "Nusa Tenggara Barat": [
    "Kab. Bima",
    "Kab. Dompu",
    "Kab. Lombok Barat",
    "Kab. Lombok Tengah",
    "Kab. Lombok Timur",
    "Kab. Lombok Utara",
    "Kab. Sumbawa",
    "Kab. Sumbawa Barat",
    "Kota Bima",
    "Kota Mataram"
  ],
  "Nusa Tenggara Timur": [
    "Kab. Alor",
    "Kab. Belu",
    "Kab. Ende",
    "Kab. Flores Timur",
    "Kab. Kupang",
    "Kab. Lembata",
    "Kab. Malaka",
    "Kab. Manggarai",
    "Kab. Manggarai Barat",
    "Kab. Manggarai Timur",
    "Kab. Nagekeo",
    "Kab. Ngada",
    "Kab. Rote Ndao",
    "Kab. Sabu Raijua",
    "Kab. Sikka",
    "Kab. Sumba Barat",
    "Kab. Sumba Barat Daya",
    "Kab. Sumba Tengah",
    "Kab. Sumba Timur",
    "Kab. Timor Tengah Selatan",
    "Kab. Timor Tengah Utara",
    "Kota Kupang"
  ],
  "Kalimantan Barat": [
    "Kab. Bengkayang",
    "Kab. Kapuas Hulu",
    "Kab. Kayong Utara",
    "Kab. Ketapang",
    "Kab. Kubu Raya",
    "Kab. Landak",
    "Kab. Melawi",
    "Kab. Mempawah",
    "Kab. Sambas",
    "Kab. Sanggau",
    "Kab. Sekadau",
    "Kab. Sintang",
    "Kota Pontianak",
    "Kota Singkawang"
  ],
  "Kalimantan Tengah": [
    "Kab. Barito Selatan",
    "Kab. Barito Timur",
    "Kab. Barito Utara",
    "Kab. Gunung Mas",
    "Kab. Kapuas",
    "Kab. Katingan",
    "Kab. Kotawaringin Barat",
    "Kab. Kotawaringin Timur",
    "Kab. Lamandau",
    "Kab. Murung Raya",
    "Kab. Pulang Pisau",
    "Kab. Seruyan",
    "Kab. Sukamara",
    "Kota Palangka Raya"
  ],
  "Kalimantan Selatan": [
    "Kab. Balangan",
    "Kab. Banjar",
    "Kab. Barito Kuala",
    "Kab. Hulu Sungai Selatan",
    "Kab. Hulu Sungai Tengah",
    "Kab. Hulu Sungai Utara",
    "Kab. Kotabaru",
    "Kab. Tabalong",
    "Kab. Tanah Bumbu",
    "Kab. Tanah Laut",
    "Kab. Tapin",
    "Kota Banjarbaru",
    "Kota Banjarmasin"
  ],
  "Kalimantan Timur": [
    "Kab. Berau",
    "Kab. Kutai Barat",
    "Kab. Kutai Kartanegara",
    "Kab. Kutai Timur",
    "Kab. Mahakam Ulu",
    "Kab. Paser",
    "Kab. Penajam Paser Utara",
    "Kota Balikpapan",
    "Kota Bontang",
    "Kota Samarinda"
  ],
  "Kalimantan Utara": [
    "Kab. Bulungan",
    "Kab. Malinau",
    "Kab. Nunukan",
    "Kab. Tana Tidung",
    "Kota Tarakan"
  ],
  "Sulawesi Utara": [
    "Kab. Bolaang Mongondow",
    "Kab. Bolaang Mongondow Selatan",
    "Kab. Bolaang Mongondow Timur",
    "Kab. Bolaang Mongondow Utara",
    "Kab. Kepulauan Sangihe",
    "Kab. Kepulauan Siau Tagulandang Biaro",
    "Kab. Kepulauan Talaud",
    "Kab. Minahasa",
    "Kab. Minahasa Selatan",
    "Kab. Minahasa Tenggara",
    "Kab. Minahasa Utara",
    "Kota Bitung",
    "Kota Kotamobagu",
    "Kota Manado",
    "Kota Tomohon"
  ],
  "Gorontalo": [
    "Kab. Boalemo",
    "Kab. Bone Bolango",
    "Kab. Gorontalo",
    "Kab. Gorontalo Utara",
    "Kab. Pohuwato",
    "Kota Gorontalo"
  ],
  "Sulawesi Tengah": [
    "Kab. Banggai",
    "Kab. Banggai Kepulauan",
    "Kab. Banggai Laut",
    "Kab. Buol",
    "Kab. Donggala",
    "Kab. Morowali",
    "Kab. Morowali Utara",
    "Kab. Parigi Moutong",
    "Kab. Poso",
    "Kab. Sigi",
    "Kab. Tojo Una-Una",
    "Kab. Toli-Toli",
    "Kota Palu"
  ],
  "Sulawesi Barat": [
    "Kab. Majene",
    "Kab. Mamasa",
    "Kab. Mamuju",
    "Kab. Mamuju Tengah",
    "Kab. Pasangkayu",
    "Kab. Polewali Mandar"
  ],
  "Sulawesi Selatan": [
    "Kab. Bantaeng",
    "Kab. Barru",
    "Kab. Bone",
    "Kab. Bulukumba",
    "Kab. Enrekang",
    "Kab. Gowa",
    "Kab. Jeneponto",
    "Kab. Kepulauan Selayar",
    "Kab. Luwu",
    "Kab. Luwu Timur",
    "Kab. Luwu Utara",
    "Kab. Maros",
    "Kab. Pangkajene dan Kepulauan",
    "Kab. Pinrang",
    "Kab. Sidenreng Rappang",
    "Kab. Sinjai",
    "Kab. Soppeng",
    "Kab. Takalar",
    "Kab. Tana Toraja",
    "Kab. Toraja Utara",
    "Kab. Wajo",
    "Kota Makassar",
    "Kota Palopo",
    "Kota Parepare"
  ],
  "Sulawesi Tenggara": [
    "Kab. Bombana",
    "Kab. Buton",
    "Kab. Buton Selatan",
    "Kab. Buton Tengah",
    "Kab. Buton Utara",
    "Kab. Kolaka",
    "Kab. Kolaka Timur",
    "Kab. Kolaka Utara",
    "Kab. Konawe",
    "Kab. Konawe Kepulauan",
    "Kab. Konawe Selatan",
    "Kab. Konawe Utara",
    "Kab. Muna",
    "Kab. Muna Barat",
    "Kab. Wakatobi",
    "Kota Bau-Bau",
    "Kota Kendari"
  ],
  "Maluku": [
    "Kab. Buru",
    "Kab. Buru Selatan",
    "Kab. Kepulauan Aru",
    "Kab. Maluku Barat Daya",
    "Kab. Maluku Tengah",
    "Kab. Maluku Tenggara",
    "Kab. Seram Bagian Barat",
    "Kab. Seram Bagian Timur",
    "Kab. Tanimbar",
    "Kota Ambon",
    "Kota Tual"
  ],
  "Maluku Utara": [
    "Kab. Halmahera Barat",
    "Kab. Halmahera Selatan",
    "Kab. Halmahera Tengah",
    "Kab. Halmahera Timur",
    "Kab. Halmahera Utara",
    "Kab. Kepulauan Sula",
    "Kab. Pulau Morotai",
    "Kab. Pulau Taliabu",
    "Kota Ternate",
    "Kota Tidore Kepulauan"
  ],
  "Papua Barat": [
    "Kab. Fakfak",
    "Kab. Kaimana",
    "Kab. Manokwari",
    "Kab. Manokwari Selatan",
    "Kab. Maybrat",
    "Kab. Pegunungan Arfak",
    "Kab. Raja Ampat",
    "Kab. Sorong",
    "Kab. Sorong Selatan",
    "Kab. Tambrauw",
    "Kab. Teluk Bintuni",
    "Kab. Teluk Wondama",
    "Kota Sorong"
  ],
  "Papua Barat Daya": [
    "Kab. Maybrat",
    "Kab. Raja Ampat",
    "Kab. Sorong",
    "Kab. Sorong Selatan",
    "Kab. Tambrauw",
    "Kota Sorong"
  ],
  "Papua": [
    "Kab. Asmat",
    "Kab. Biak Numfor",
    "Kab. Boven Digoel",
    "Kab. Deiyai",
    "Kab. Dogiyai",
    "Kab. Intan Jaya",
    "Kab. Jayapura",
    "Kab. Jayawijaya",
    "Kab. Keerom",
    "Kab. Kepulauan Yapen",
    "Kab. Lanny Jaya",
    "Kab. Mamberamo Raya",
    "Kab. Mamberamo Tengah",
    "Kab. Mappi",
    "Kab. Merauke",
    "Kab. Mimika",
    "Kab. Nabire",
    "Kab. Nduga",
    "Kab. Paniai",
    "Kab. Pegunungan Bintang",
    "Kab. Puncak",
    "Kab. Puncak Jaya",
    "Kab. Sarmi",
    "Kab. Supiori",
    "Kab. Tolikara",
    "Kab. Waropen",
    "Kab. Yahukimo",
    "Kab. Yalimo",
    "Kota Jayapura"
  ],
  "Papua Tengah": [
    "Kab. Deiyai",
    "Kab. Dogiyai",
    "Kab. Intan Jaya",
    "Kab. Mimika",
    "Kab. Nabire",
    "Kab. Paniai",
    "Kab. Puncak",
    "Kab. Puncak Jaya"
  ],
  "Papua Pegunungan": [
    "Kab. Jayawijaya",
    "Kab. Lanny Jaya",
    "Kab. Mamberamo Tengah",
    "Kab. Nduga",
    "Kab. Pegunungan Bintang",
    "Kab. Tolikara",
    "Kab. Yahukimo",
    "Kab. Yalimo"
  ],
  "Papua Selatan": [
    "Kab. Asmat",
    "Kab. Boven Digoel",
    "Kab. Mappi",
    "Kab. Merauke"
  ]
};

const PROVINCES = Object.keys(WILAYAH).sort();

function WilayahSelect({ prefix, values, onChange }) {
  const prov = values[prefix + "_provinsi"] || "";
  const kab = values[prefix + "_kabupaten"] || "";
  const kec = values[prefix + "_kecamatan"] || "";
  const kel = values[prefix + "_kelurahan"] || "";
  const kabList = prov ? (WILAYAH[prov] || []).sort() : [];

  const baseInput = {
    width: "100%",
    padding: "0.75rem 1rem",
    background: "#f0f5fc",
    border: "1px solid #1e3a5f",
    borderRadius: "8px",
    color: "#1a2e4a",
    outline: "none",
    boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.88rem",
    marginBottom: "0.6rem",
  };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.1rem" }}>
      <label style={{ fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.2rem" }}>Provinsi</label>
      <select style={{ ...baseInput, cursor: "pointer", color: prov ? "#1a2e4a" : "#8aabcc" }}
        value={prov} onChange={(e) => { onChange(prefix + "_provinsi", e.target.value); onChange(prefix + "_kabupaten", ""); }}>
        <option value="">— Pilih Provinsi —</option>
        {PROVINCES.map(p => <option key={p} value={p} style={{ background: "#f0f5fc" }}>{p}</option>)}
      </select>

      <label style={{ fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.2rem" }}>Kabupaten / Kota</label>
      <select style={{ ...baseInput, cursor: prov ? "pointer" : "not-allowed", color: kab ? "#1a2e4a" : "#8aabcc", opacity: prov ? 1 : 0.5 }}
        value={kab} disabled={!prov} onChange={(e) => onChange(prefix + "_kabupaten", e.target.value)}>
        <option value="">— Pilih Kabupaten/Kota —</option>
        {kabList.map(k => <option key={k} value={k} style={{ background: "#f0f5fc" }}>{k}</option>)}
      </select>

      <label style={{ fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.2rem" }}>Kecamatan</label>
      <input style={baseInput} placeholder="Ketik nama kecamatan..." value={kec}
        onChange={(e) => onChange(prefix + "_kecamatan", e.target.value)}
        onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
        onBlur={(e) => (e.target.style.borderColor = "#c8ddf0")} />

      <label style={{ fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.2rem" }}>Kelurahan / Desa</label>
      <input style={baseInput} placeholder="Ketik nama kelurahan/desa..." value={kel}
        onChange={(e) => onChange(prefix + "_kelurahan", e.target.value)}
        onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
        onBlur={(e) => (e.target.style.borderColor = "#c8ddf0")} />
    </div>
  );
}

function RadioWithOther({ q, value, otherValue, onChange, onOtherChange }) {
  const base = { fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem" };
  const isOtherSelected = value === "Lainnya";
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {q.options.map((o) => {
        const selected = value === o;
        return (
          <label key={o} onClick={() => onChange(q.id, o)} style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.6rem 0.9rem", borderRadius: "8px",
            border: `1px solid ${selected ? "#0ea5e9" : "#c8ddf0"}`,
            background: selected ? "rgba(14,165,233,0.12)" : "transparent",
            cursor: "pointer", transition: "all 0.15s ease", userSelect: "none",
          }}>
            <div style={{
              width: "16px", height: "16px", borderRadius: "50%",
              border: `2px solid ${selected ? "#0ea5e9" : "#a8c8e8"}`,
              background: selected ? "#0ea5e9" : "transparent",
              flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {selected && <div style={{ width: "6px", height: "6px", borderRadius: "50%", background: "#fff" }} />}
            </div>
            <span style={{ ...base, color: selected ? "#1a2e4a" : "#5a7090" }}>{o}</span>
          </label>
        );
      })}
      {isOtherSelected && (
        <input
          style={{
            width: "100%", padding: "0.75rem 1rem", background: "#f0f5fc",
            border: "1px solid #0ea5e9", borderRadius: "8px", color: "#1a2e4a",
            outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
          }}
          placeholder="Tuliskan jawaban Anda..."
          value={otherValue || ""}
          onChange={(e) => onOtherChange(q.id + "_other", e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = "#38bdf8")}
          onBlur={(e) => (e.target.style.borderColor = "#0ea5e9")}
        />
      )}
    </div>
  );
}

function CheckboxWithOther({ q, value, otherValue, onChange, onOtherChange }) {
  const vals = value || [];
  const hasOther = q.options.includes("Lainnya");
  const isOtherChecked = vals.includes("Lainnya");
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.5rem" }}>
      {q.options.map((o) => {
        const checked = vals.includes(o);
        return (
          <label key={o} onClick={() => {
            const next = checked ? vals.filter((v) => v !== o) : [...vals, o];
            onChange(q.id, next);
          }} style={{
            display: "flex", alignItems: "center", gap: "0.75rem",
            padding: "0.6rem 0.9rem", borderRadius: "8px",
            border: `1px solid ${checked ? "#38bdf8" : "#c8ddf0"}`,
            background: checked ? "rgba(14,165,233,0.10)" : "transparent",
            cursor: "pointer", transition: "all 0.15s ease", userSelect: "none",
          }}>
            <div style={{
              width: "16px", height: "16px", borderRadius: "4px",
              border: `2px solid ${checked ? "#38bdf8" : "#a8c8e8"}`,
              background: checked ? "#38bdf8" : "transparent",
              flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              {checked && (
                <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
                  <path d="M1 4L3.5 6.5L9 1" stroke="#f0f5fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              )}
            </div>
            <span style={{ fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem", color: checked ? "#1a2e4a" : "#5a7090" }}>{o}</span>
          </label>
        );
      })}
      {hasOther && isOtherChecked && (
        <input
          style={{
            width: "100%", padding: "0.75rem 1rem", background: "#f0f5fc",
            border: "1px solid #38bdf8", borderRadius: "8px", color: "#1a2e4a",
            outline: "none", boxSizing: "border-box", fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem",
          }}
          placeholder="Tuliskan jawaban Anda..."
          value={otherValue || ""}
          onChange={(e) => onOtherChange(q.id + "_other", e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#38bdf8")}
        />
      )}
    </div>
  );
}

const sections = [
  {
    id: "identitas",
    title: "A. Identitas Responden",
    icon: "◈",
  },
  {
    id: "informasi",
    title: "B. Sumber Informasi",
    icon: "◉",
  },
  {
    id: "keputusan",
    title: "C. Pengambilan Keputusan",
    icon: "◇",
  },
  {
    id: "ekonomi",
    title: "D. Latar Belakang Ekonomi",
    icon: "◆",
  },
  {
    id: "harapan",
    title: "E. Harapan & Evaluasi",
    icon: "◎",
  },
];

function ProgressBar({ current, total }) {
  const pct = Math.round((current / total) * 100);
  return (
    <div style={{ marginBottom: "2rem" }}>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "0.4rem" }}>
        <span style={{ fontSize: "0.75rem", color: "#5a7090", letterSpacing: "0.08em", textTransform: "uppercase" }}>
          Seksi {current} dari {total}
        </span>
        <span style={{ fontSize: "0.72rem", color: "#2563eb", fontWeight: 700 }}>{pct}%</span>
      </div>
      <div style={{ height: "3px", background: "#dce8f5", borderRadius: "2px" }}>
        <div style={{
          height: "100%", width: `${pct}%`,
          background: "linear-gradient(90deg, #0ea5e9, #38bdf8)",
          borderRadius: "2px", transition: "width 0.5s cubic-bezier(.4,0,.2,1)",
        }} />
      </div>
    </div>
  );
}

const baseInput = {
  width: "100%", padding: "0.75rem 1rem", background: "#f0f5fc",
  border: "1px solid #1e3a5f", borderRadius: "8px", color: "#1a2e4a",
  outline: "none", boxSizing: "border-box",
  fontFamily: "'DM Sans', sans-serif", fontSize: "0.92rem",
};

const labelStyle = { fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.3rem", display: "block" };

function SectionA({ answers, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      {/* Nama */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>1.</span>Nama Lengkap
        </p>
        <input style={baseInput} placeholder="Tulis nama lengkap Anda"
          value={answers.q1 || ""} onChange={(e) => onChange("q1", e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#c8ddf0")} />
      </div>

      {/* Jenis Kelamin */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>2.</span>Jenis Kelamin
        </p>
        <RadioWithOther
          q={{ id: "q2", options: ["Laki-laki", "Perempuan"] }}
          value={answers.q2} otherValue={answers.q2_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>

      {/* Asal Sekolah */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>3.</span>Asal Sekolah / SMA / SMK
        </p>
        <input style={baseInput} placeholder="Nama sekolah asal"
          value={answers.q3 || ""} onChange={(e) => onChange("q3", e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#c8ddf0")} />
      </div>

      {/* Asal Daerah */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>4.</span>Asal Daerah
        </p>
        <WilayahSelect prefix="asal" values={answers} onChange={onChange} />
      </div>

      {/* Alamat Domisili */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>5.</span>Alamat Domisili Saat Ini
        </p>
        <WilayahSelect prefix="domisili" values={answers} onChange={onChange} />
      </div>

      {/* Status Mahasiswa */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>6.</span>Status Mahasiswa
        </p>
        <RadioWithOther
          q={{ id: "q5", options: ["Mahasiswa Baru (Semester 1–2)", "Mahasiswa Aktif (Semester 3–6)", "Mahasiswa Tingkat Akhir (Semester 7+)", "Lainnya"] }}
          value={answers.q5} otherValue={answers.q5_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
    </div>
  );
}

function SectionB({ answers, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      <div>
        <p style={{ fontSize: "0.9rem", color: "#1e3d6e", fontWeight: 600, marginBottom: "0.25rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>1.</span>Dari mana Anda pertama kali mengetahui Program Studi Teknik Industri UMI?
        </p>
        <p style={{ fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.75rem" }}>(Pilih semua yang sesuai)</p>
        <CheckboxWithOther
          q={{ id: "q6", options: ["Media sosial (Instagram, TikTok, Facebook, YouTube)", "Website resmi UMI", "Brosur / pamflet cetak", "Pameran pendidikan / expo", "Kunjungan kampus ke sekolah", "Teman / alumni yang sudah kuliah di sini", "Anggota keluarga", "Guru / konselor sekolah", "Iklan berbayar (Google Ads, Meta Ads)", "Lainnya"] }}
          value={answers.q6} otherValue={answers.q6_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>2.</span>Platform media sosial mana yang PALING BANYAK memberikan informasi tentang TI UMI?
        </p>
        <RadioWithOther
          q={{ id: "q7", options: ["Instagram", "TikTok", "Facebook", "YouTube", "WhatsApp / grup WA", "Twitter / X", "Tidak melalui media sosial", "Lainnya"] }}
          value={answers.q7} otherValue={answers.q7_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>3.</span>Seberapa lengkap informasi yang Anda dapatkan sebelum mendaftar?
        </p>
        <RadioWithOther
          q={{ id: "q8", options: ["Sangat lengkap — saya sudah tahu banyak tentang TI UMI", "Cukup — ada beberapa informasi yang masih kurang", "Kurang — saya mendaftar dengan informasi yang sangat terbatas", "Tidak tahu — saya langsung saja daftar"] }}
          value={answers.q8} otherValue={answers.q8_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
      <div>
        <p style={{ fontSize: "0.9rem", color: "#1e3d6e", fontWeight: 600, marginBottom: "0.25rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>4.</span>Informasi apa yang paling Anda butuhkan sebelum memilih jurusan ini?
        </p>
        <p style={{ fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.75rem" }}>(Pilih semua yang sesuai)</p>
        <CheckboxWithOther
          q={{ id: "q9", options: ["Prospek kerja lulusan TI", "Mata kuliah yang dipelajari", "Biaya kuliah dan beasiswa", "Fasilitas laboratorium", "Akreditasi program studi", "Kehidupan kampus dan organisasi", "Testimoni alumni", "Info dosen dan staf pengajar", "Lainnya"] }}
          value={answers.q9} otherValue={answers.q9_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
    </div>
  );
}

function SectionC({ answers, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>1.</span>Siapa yang paling berpengaruh dalam keputusan Anda memilih TI UMI?
        </p>
        <RadioWithOther
          q={{ id: "q10", options: ["Keputusan saya sendiri sepenuhnya", "Orang tua / wali", "Saudara kandung", "Teman / sahabat", "Guru / BK sekolah", "Alumni TI UMI", "Pasangan / orang dekat", "Lainnya"] }}
          value={answers.q10} otherValue={answers.q10_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>2.</span>Apakah Anda mendapat dukungan penuh dari orang tua untuk kuliah di TI UMI?
        </p>
        <RadioWithOther
          q={{ id: "q11", options: ["Ya, penuh — mereka sangat mendukung", "Ya, tapi awalnya ada keberatan kecil", "Orang tua sempat mengusulkan jurusan lain", "Tidak sepenuhnya — ada tekanan untuk pilihan lain", "Lainnya"] }}
          value={answers.q11} otherValue={answers.q11_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
      <div>
        <p style={{ fontSize: "0.9rem", color: "#1e3d6e", fontWeight: 600, marginBottom: "0.25rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>3.</span>Apa alasan utama Anda memilih Teknik Industri UMI?
        </p>
        <p style={{ fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.75rem" }}>(Pilih maksimal 3)</p>
        <CheckboxWithOther
          q={{ id: "q12", options: ["Prospek kerja yang luas", "Reputasi UMI sebagai PTM terbesar di KTI", "Lokasi strategis di Makassar", "Biaya kuliah terjangkau", "Rekomendasi dari orang sekitar", "Program studi sesuai minat / bakat", "Fasilitas dan laboratorium", "Ada teman / keluarga yang kuliah di sini", "Sudah tidak ada pilihan lain", "Lainnya"] }}
          value={answers.q12} otherValue={answers.q12_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>4.</span>Apakah TI UMI merupakan pilihan pertama Anda?
        </p>
        <RadioWithOther
          q={{ id: "q13", options: ["Ya, ini pilihan pertama dan satu-satunya", "Ya pilihan pertama, tapi ada pilihan cadangan", "Tidak, ini pilihan kedua", "Tidak, ini pilihan ketiga atau lebih"] }}
          value={answers.q13} otherValue={answers.q13_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
    </div>
  );
}

function SectionD({ answers, onChange }) {
  const subLabel = { fontSize: "0.82rem", color: "#2563eb", fontWeight: 700, marginBottom: "0.75rem", marginTop: "0.25rem", borderLeft: "3px solid #2563eb", paddingLeft: "0.6rem", textTransform: "uppercase", letterSpacing: "0.05em" };
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>

      {/* AYAH / WALI */}
      <div style={{ background: "rgba(14,165,233,0.06)", border: "1px solid #0f2a40", borderRadius: "10px", padding: "1.25rem" }}>
        <p style={subLabel}>Ayah / Wali</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
              <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>1.</span>Pekerjaan Utama Ayah / Wali
            </p>
            <RadioWithOther
              q={{ id: "q_ayah_kerja", options: ["PNS / ASN", "TNI / Polri", "Karyawan swasta", "Wiraswasta / pengusaha", "Petani / nelayan / buruh", "Pensiunan", "Tidak bekerja", "Lainnya"] }}
              value={answers.q_ayah_kerja} otherValue={answers.q_ayah_kerja_other}
              onChange={onChange} onOtherChange={onChange} />
          </div>
          <div>
            <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
              <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>2.</span>Estimasi Pendapatan Ayah / Wali per Bulan
            </p>
            <RadioWithOther
              q={{ id: "q_ayah_income", options: ["Di bawah Rp 1.500.000", "Rp 1.500.000 – Rp 3.000.000", "Rp 3.000.001 – Rp 5.000.000", "Rp 5.000.001 – Rp 10.000.000", "Di atas Rp 10.000.000", "Tidak ingin menyebutkan"] }}
              value={answers.q_ayah_income} otherValue={answers.q_ayah_income_other}
              onChange={onChange} onOtherChange={onChange} />
          </div>
        </div>
      </div>

      {/* IBU */}
      <div style={{ background: "rgba(56,189,248,0.06)", border: "1px solid #b8d4ee", borderRadius: "10px", padding: "1.25rem" }}>
        <p style={{ ...subLabel, borderColor: "#0ea5e9", color: "#0284c7" }}>Ibu</p>
        <div style={{ display: "flex", flexDirection: "column", gap: "1.25rem" }}>
          <div>
            <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
              <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>3.</span>Pekerjaan Utama Ibu
            </p>
            <RadioWithOther
              q={{ id: "q_ibu_kerja", options: ["PNS / ASN", "TNI / Polri", "Karyawan swasta", "Wiraswasta / pengusaha", "Petani / nelayan / buruh", "Pensiunan", "Ibu rumah tangga", "Tidak bekerja", "Lainnya"] }}
              value={answers.q_ibu_kerja} otherValue={answers.q_ibu_kerja_other}
              onChange={onChange} onOtherChange={onChange} />
          </div>
          <div>
            <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
              <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>4.</span>Estimasi Pendapatan Ibu per Bulan
            </p>
            <RadioWithOther
              q={{ id: "q_ibu_income", options: ["Di bawah Rp 1.500.000", "Rp 1.500.000 – Rp 3.000.000", "Rp 3.000.001 – Rp 5.000.000", "Rp 5.000.001 – Rp 10.000.000", "Di atas Rp 10.000.000", "Tidak bekerja / tidak berpenghasilan", "Tidak ingin menyebutkan"] }}
              value={answers.q_ibu_income} otherValue={answers.q_ibu_income_other}
              onChange={onChange} onOtherChange={onChange} />
          </div>
        </div>
      </div>

      {/* Jumlah Bersaudara */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>5.</span>Jumlah Bersaudara (termasuk Anda)
        </p>
        <select
          style={{ ...baseInput, cursor: "pointer", color: answers.q_saudara ? "#1a2e4a" : "#8aabcc" }}
          value={answers.q_saudara || ""}
          onChange={(e) => onChange("q_saudara", e.target.value)}>
          <option value="">— Pilih jumlah —</option>
          {[1,2,3,4,5,6,7,8,9,10].map(n => (
            <option key={n} value={String(n)} style={{ background: "#f0f5fc" }}>{n} orang</option>
          ))}
        </select>
      </div>

      {/* Beasiswa */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>6.</span>Apakah Anda menerima beasiswa atau bantuan biaya kuliah?
        </p>
        <RadioWithOther
          q={{ id: "q16", options: ["Ya, beasiswa pemerintah (KIP-K, Bidikmisi, dll.)", "Ya, beasiswa dari UMI", "Ya, beasiswa swasta / yayasan", "Tidak, biaya mandiri dari keluarga", "Sedang dalam proses pengajuan", "Lainnya"] }}
          value={answers.q16} otherValue={answers.q16_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>

      {/* Faktor biaya */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>7.</span>Faktor biaya, seberapa penting dalam keputusan memilih TI UMI?
        </p>
        <RadioWithOther
          q={{ id: "q17", options: ["Sangat penting — biaya adalah pertimbangan utama", "Penting — tapi bukan yang utama", "Cukup penting — ada pertimbangan lain yang lebih dominan", "Tidak terlalu penting — kualitas lebih utama"] }}
          value={answers.q17} otherValue={answers.q17_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
    </div>
  );
}

function SectionE({ answers, onChange }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "1.75rem" }}>
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>1.</span>Seberapa puas Anda dengan informasi promosi TI UMI sebelum mendaftar?
        </p>
        <RadioWithOther
          q={{ id: "q18", options: ["1 — Sangat Tidak Puas", "2", "3", "4", "5 — Sangat Puas"] }}
          value={answers.q18} otherValue={answers.q18_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
      <div>
        <p style={{ fontSize: "0.9rem", color: "#1e3d6e", fontWeight: 600, marginBottom: "0.25rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>2.</span>Media promosi apa yang menurut Anda paling efektif untuk menjangkau calon mahasiswa baru?
        </p>
        <p style={{ fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.75rem" }}>(Pilih semua yang sesuai)</p>
        <CheckboxWithOther
          q={{ id: "q19", options: ["Konten TikTok / Reels pendek", "Testimoni alumni (video / tulisan)", "Open House / hari kunjungan kampus", "Kunjungan langsung ke SMA/SMK", "Iklan di media lokal (koran, TV)", "Grup WhatsApp alumni SMA", "Podcast / webinar tentang karier TI", "Brosur fisik", "Lainnya"] }}
          value={answers.q19} otherValue={answers.q19_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>3.</span>Pesan atau saran untuk meningkatkan promosi Program Studi Teknik Industri UMI
        </p>
        <textarea
          style={{ ...baseInput, minHeight: "100px", resize: "vertical" }}
          placeholder="Tuliskan saran Anda di sini..."
          value={answers.q20 || ""}
          onChange={(e) => onChange("q20", e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#c8ddf0")} />
      </div>
    </div>
  );
}

function canProceedSection(step, answers) {
  if (step === 0) {
    return answers.q1?.trim() &&
      answers.q2 &&
      answers.q3?.trim() &&
      answers.asal_provinsi && answers.asal_kabupaten && answers.asal_kecamatan?.trim() && answers.asal_kelurahan?.trim() &&
      answers.domisili_provinsi && answers.domisili_kabupaten && answers.domisili_kecamatan?.trim() && answers.domisili_kelurahan?.trim() &&
      answers.q5;
  }
  if (step === 1) {
    return answers.q6?.length > 0 && answers.q7 && answers.q8 && answers.q9?.length > 0;
  }
  if (step === 2) {
    return answers.q10 && answers.q11 && answers.q12?.length > 0 && answers.q13;
  }
  if (step === 3) {
    return answers.q_ayah_kerja && answers.q_ayah_income && answers.q_ibu_kerja && answers.q_ibu_income && answers.q_saudara && answers.q16 && answers.q17;
  }
  if (step === 4) {
    return answers.q18 && answers.q19?.length > 0;
  }
  return true;
}

export default function App() {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const totalSteps = sections.length;

  const handleChange = (key, val) => {
    setAnswers((prev) => ({ ...prev, [key]: val }));
  };

  const ok = canProceedSection(step, answers);

  const handleSubmit = async () => {
    if (!ok) return;
    setIsLoading(true);
    try {
      await fetch(SHEET_URL, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(answers),
      });
    } catch (err) {
      console.error("Gagal kirim:", err);
    }
    setIsLoading(false);
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e8f0fc 0%, #dce8f8 100%)", display: "flex", alignItems: "center", justifyContent: "center", fontFamily: "'DM Sans', sans-serif", padding: "2rem" }}>
        <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <div style={{ textAlign: "center", maxWidth: "480px" }}>
          <div style={{ width: "72px", height: "72px", borderRadius: "50%", background: "linear-gradient(135deg, #0ea5e9, #38bdf8)", margin: "0 auto 1.5rem", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "2rem" }}>✓</div>
          <h2 style={{ fontFamily: "'DM Sans', sans-serif", color: "#1a3a6e", fontSize: "1.6rem", fontWeight: 700, marginBottom: "0.75rem" }}>Terima Kasih!</h2>
          <p style={{ color: "#5a7090", lineHeight: 1.7, marginBottom: "2rem" }}>Jawaban Anda telah kami terima. Informasi ini sangat berharga untuk pengembangan strategi promosi Program Studi Teknik Industri UMI.</p>
          <div style={{ padding: "1rem", background: "rgba(14,165,233,0.12)", border: "1px solid rgba(14,165,233,0.2)", borderRadius: "10px", color: "#4fc3f7", fontSize: "0.85rem" }}>
            Program Studi Teknik Industri · Universitas Muslim Indonesia
          </div>
        </div>
      </div>
    );
  }

  const section = sections[step];

  return (
    <div style={{ minHeight: "100vh", background: "linear-gradient(160deg, #e8f0fc 0%, #dce8f8 100%)", fontFamily: "'DM Sans', sans-serif", color: "#1a2e4a", padding: "2.5rem 1rem" }}>
      <link href="https://fonts.googleapis.com/css2?family=Nunito:wght@600;700;800;900&family=DM+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />
      <div style={{ maxWidth: "640px", margin: "0 auto" }}>

        {/* Header */}
        <div style={{ marginBottom: "2rem", borderBottom: "1px solid #0f2033", paddingBottom: "1.5rem" }}>
          <img src={logo} alt="Logo Teknik Industri UMI" style={{ height: "60px", objectFit: "contain", display: "block", margin: "0 auto 1.25rem auto" }} />
          <h1 style={{ fontFamily: "'Nunito', 'Avenir Next', 'Avenir', sans-serif", fontSize: "clamp(1.4rem, 3.5vw, 2rem)", fontWeight: 800, lineHeight: 1.4, color: "#0f2d6b", margin: "0", letterSpacing: "-0.01em", textAlign: "center" }}>
            Pemetaan Mahasiswa<br />Teknik Industri - UMI
          </h1>
        </div>

        <ProgressBar current={step + 1} total={totalSteps} />

        {/* Section Card */}
        <div style={{ background: "#ffffff", border: "1px solid #0f2a40", borderRadius: "16px", padding: "2rem", marginBottom: "1.5rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "1.75rem" }}>
            <span style={{ fontSize: "1.1rem", color: "#2563eb", lineHeight: 1 }}>{section.icon}</span>
            <h2 style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.78rem", fontWeight: 700, color: "#0f2d6b", margin: 0, letterSpacing: "0.12em", textTransform: "uppercase" }}>{section.title}</h2>
          </div>
          {step === 0 && <SectionA answers={answers} onChange={handleChange} />}
          {step === 1 && <SectionB answers={answers} onChange={handleChange} />}
          {step === 2 && <SectionC answers={answers} onChange={handleChange} />}
          {step === 3 && <SectionD answers={answers} onChange={handleChange} />}
          {step === 4 && <SectionE answers={answers} onChange={handleChange} />}
        </div>

        {/* Navigation */}
        <div style={{ display: "flex", justifyContent: "space-between", gap: "1rem" }}>
          {step > 0 ? (
            <button onClick={() => setStep((s) => s - 1)} style={{ flex: 1, padding: "0.85rem", background: "transparent", border: "1px solid #1e3a5f", borderRadius: "10px", color: "#5a7090", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", cursor: "pointer" }}
              onMouseEnter={(e) => { e.target.style.borderColor = "#38bdf8"; e.target.style.color = "#38bdf8"; }}
              onMouseLeave={(e) => { e.target.style.borderColor = "#c8ddf0"; e.target.style.color = "#5a7090"; }}>
              ← Sebelumnya
            </button>
          ) : <div style={{ flex: 1 }} />}

          {step < totalSteps - 1 ? (
            <button onClick={() => ok && setStep((s) => s + 1)} style={{ flex: 2, padding: "0.85rem", background: ok ? "linear-gradient(135deg, #0369a1, #0ea5e9)" : "#dce8f5", border: "none", borderRadius: "10px", color: ok ? "#fff" : "#a8c8e8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: ok ? "pointer" : "not-allowed" }}>
              Lanjut →
            </button>
          ) : (
            <button onClick={handleSubmit} disabled={!ok || isLoading} style={{ flex: 2, padding: "0.85rem", background: ok && !isLoading ? "linear-gradient(135deg, #059669, #10b981)" : "#dce8f5", border: "none", borderRadius: "10px", color: ok && !isLoading ? "#fff" : "#a8c8e8", fontFamily: "'DM Sans', sans-serif", fontSize: "0.9rem", fontWeight: 600, cursor: ok && !isLoading ? "pointer" : "not-allowed" }}>
              {isLoading ? "Mengirim..." : "Kirim Kuesioner ✓"}
            </button>
          )}
        </div>

        {/* Dots */}
        <div style={{ display: "flex", justifyContent: "center", gap: "0.5rem", marginTop: "1.5rem" }}>
          {sections.map((_, i) => (
            <div key={i} style={{ width: i === step ? "20px" : "6px", height: "6px", borderRadius: "3px", background: i <= step ? "#0ea5e9" : "#c8ddf0", transition: "all 0.3s ease" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
