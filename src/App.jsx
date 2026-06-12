import { useState, useEffect } from "react";
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

const PROVINCES_API = [
  {id:"11",name:"Aceh"},{id:"12",name:"Sumatera Utara"},{id:"13",name:"Sumatera Barat"},
  {id:"14",name:"Riau"},{id:"15",name:"Jambi"},{id:"16",name:"Sumatera Selatan"},
  {id:"17",name:"Bengkulu"},{id:"18",name:"Lampung"},{id:"19",name:"Kepulauan Bangka Belitung"},
  {id:"21",name:"Kepulauan Riau"},{id:"31",name:"DKI Jakarta"},{id:"32",name:"Jawa Barat"},
  {id:"33",name:"Jawa Tengah"},{id:"34",name:"DI Yogyakarta"},{id:"35",name:"Jawa Timur"},
  {id:"36",name:"Banten"},{id:"51",name:"Bali"},{id:"52",name:"Nusa Tenggara Barat"},
  {id:"53",name:"Nusa Tenggara Timur"},{id:"61",name:"Kalimantan Barat"},
  {id:"62",name:"Kalimantan Tengah"},{id:"63",name:"Kalimantan Selatan"},
  {id:"64",name:"Kalimantan Timur"},{id:"65",name:"Kalimantan Utara"},
  {id:"71",name:"Sulawesi Utara"},{id:"72",name:"Sulawesi Tengah"},
  {id:"73",name:"Sulawesi Selatan"},{id:"74",name:"Sulawesi Tenggara"},
  {id:"75",name:"Gorontalo"},{id:"76",name:"Sulawesi Barat"},
  {id:"81",name:"Maluku"},{id:"82",name:"Maluku Utara"},
  {id:"91",name:"Papua Barat"},{id:"92",name:"Papua"},
  {id:"93",name:"Papua Selatan"},{id:"94",name:"Papua Tengah"},
  {id:"95",name:"Papua Pegunungan"},{id:"96",name:"Papua Barat Daya"}
];

const INDONESIA_KAB = {"Aceh": ["Kab. Aceh Barat", "Kab. Aceh Barat Daya", "Kab. Aceh Besar", "Kab. Aceh Jaya", "Kab. Aceh Selatan", "Kab. Aceh Singkil", "Kab. Aceh Tamiang", "Kab. Aceh Tengah", "Kab. Aceh Tenggara", "Kab. Aceh Timur", "Kab. Aceh Utara", "Kab. Bener Meriah", "Kab. Bireuen", "Kab. Gayo Lues", "Kab. Nagan Raya", "Kab. Pidie", "Kab. Pidie Jaya", "Kab. Simeulue", "Kota Banda Aceh", "Kota Langsa", "Kota Lhokseumawe", "Kota Sabang", "Kota Subulussalam"], "Sumatera Utara": ["Kab. Asahan", "Kab. Batu Bara", "Kab. Dairi", "Kab. Deli Serdang", "Kab. Humbang Hasundutan", "Kab. Karo", "Kab. Labuhanbatu", "Kab. Labuhanbatu Selatan", "Kab. Labuhanbatu Utara", "Kab. Langkat", "Kab. Mandailing Natal", "Kab. Nias", "Kab. Nias Barat", "Kab. Nias Selatan", "Kab. Nias Utara", "Kab. Padang Lawas", "Kab. Padang Lawas Utara", "Kab. Pakpak Bharat", "Kab. Samosir", "Kab. Serdang Bedagai", "Kab. Simalungun", "Kab. Tapanuli Selatan", "Kab. Tapanuli Tengah", "Kab. Tapanuli Utara", "Kab. Toba", "Kota Binjai", "Kota Gunungsitoli", "Kota Medan", "Kota Padangsidimpuan", "Kota Pematangsiantar", "Kota Sibolga", "Kota Tanjungbalai", "Kota Tebing Tinggi"], "Sumatera Barat": ["Kab. Agam", "Kab. Dharmasraya", "Kab. Kepulauan Mentawai", "Kab. Lima Puluh Kota", "Kab. Padang Pariaman", "Kab. Pasaman", "Kab. Pasaman Barat", "Kab. Pesisir Selatan", "Kab. Sijunjung", "Kab. Solok", "Kab. Solok Selatan", "Kab. Tanah Datar", "Kota Bukittinggi", "Kota Padang", "Kota Padang Panjang", "Kota Pariaman", "Kota Payakumbuh", "Kota Sawahlunto", "Kota Solok"], "Riau": ["Kab. Bengkalis", "Kab. Indragiri Hilir", "Kab. Indragiri Hulu", "Kab. Kampar", "Kab. Kepulauan Meranti", "Kab. Kuantan Singingi", "Kab. Pelalawan", "Kab. Rokan Hilir", "Kab. Rokan Hulu", "Kab. Siak", "Kota Dumai", "Kota Pekanbaru"], "Kepulauan Riau": ["Kab. Bintan", "Kab. Karimun", "Kab. Kepulauan Anambas", "Kab. Lingga", "Kab. Natuna", "Kota Batam", "Kota Tanjungpinang"], "Jambi": ["Kab. Batanghari", "Kab. Bungo", "Kab. Kerinci", "Kab. Merangin", "Kab. Muaro Jambi", "Kab. Sarolangun", "Kab. Tanjung Jabung Barat", "Kab. Tanjung Jabung Timur", "Kab. Tebo", "Kota Jambi", "Kota Sungaipenuh"], "Sumatera Selatan": ["Kab. Banyuasin", "Kab. Empat Lawang", "Kab. Lahat", "Kab. Muara Enim", "Kab. Musi Banyuasin", "Kab. Musi Rawas", "Kab. Musi Rawas Utara", "Kab. Ogan Ilir", "Kab. Ogan Komering Ilir", "Kab. Ogan Komering Ulu", "Kab. Ogan Komering Ulu Selatan", "Kab. Ogan Komering Ulu Timur", "Kab. Penukal Abab Lematang Ilir", "Kota Lubuklinggau", "Kota Pagar Alam", "Kota Palembang", "Kota Prabumulih"], "Bengkulu": ["Kab. Bengkulu Selatan", "Kab. Bengkulu Tengah", "Kab. Bengkulu Utara", "Kab. Kaur", "Kab. Kepahiang", "Kab. Lebong", "Kab. Mukomuko", "Kab. Rejang Lebong", "Kab. Seluma", "Kota Bengkulu"], "Lampung": ["Kab. Lampung Barat", "Kab. Lampung Selatan", "Kab. Lampung Tengah", "Kab. Lampung Timur", "Kab. Lampung Utara", "Kab. Mesuji", "Kab. Pesawaran", "Kab. Pesisir Barat", "Kab. Pringsewu", "Kab. Tanggamus", "Kab. Tulang Bawang", "Kab. Tulang Bawang Barat", "Kab. Way Kanan", "Kota Bandar Lampung", "Kota Metro"], "Kepulauan Bangka Belitung": ["Kab. Bangka", "Kab. Bangka Barat", "Kab. Bangka Selatan", "Kab. Bangka Tengah", "Kab. Belitung", "Kab. Belitung Timur", "Kota Pangkalpinang"], "DKI Jakarta": ["Kab. Kepulauan Seribu", "Kota Jakarta Barat", "Kota Jakarta Pusat", "Kota Jakarta Selatan", "Kota Jakarta Timur", "Kota Jakarta Utara"], "Jawa Barat": ["Kab. Bandung", "Kab. Bandung Barat", "Kab. Bekasi", "Kab. Bogor", "Kab. Ciamis", "Kab. Cianjur", "Kab. Cirebon", "Kab. Garut", "Kab. Indramayu", "Kab. Karawang", "Kab. Kuningan", "Kab. Majalengka", "Kab. Pangandaran", "Kab. Purwakarta", "Kab. Subang", "Kab. Sukabumi", "Kab. Sumedang", "Kab. Tasikmalaya", "Kota Bandung", "Kota Bekasi", "Kota Bogor", "Kota Cimahi", "Kota Cirebon", "Kota Depok", "Kota Sukabumi", "Kota Tasikmalaya"], "Banten": ["Kab. Lebak", "Kab. Pandeglang", "Kab. Serang", "Kab. Tangerang", "Kota Cilegon", "Kota Serang", "Kota Tangerang", "Kota Tangerang Selatan"], "DI Yogyakarta": ["Kab. Bantul", "Kab. Gunungkidul", "Kab. Kulon Progo", "Kab. Sleman", "Kota Yogyakarta"], "Jawa Tengah": ["Kab. Banjarnegara", "Kab. Banyumas", "Kab. Batang", "Kab. Blora", "Kab. Boyolali", "Kab. Brebes", "Kab. Cilacap", "Kab. Demak", "Kab. Grobogan", "Kab. Jepara", "Kab. Karanganyar", "Kab. Kebumen", "Kab. Kendal", "Kab. Klaten", "Kab. Kudus", "Kab. Magelang", "Kab. Pati", "Kab. Pekalongan", "Kab. Pemalang", "Kab. Purbalingga", "Kab. Purworejo", "Kab. Rembang", "Kab. Semarang", "Kab. Sragen", "Kab. Sukoharjo", "Kab. Tegal", "Kab. Temanggung", "Kab. Wonogiri", "Kab. Wonosobo", "Kota Magelang", "Kota Pekalongan", "Kota Salatiga", "Kota Semarang", "Kota Surakarta", "Kota Tegal"], "Jawa Timur": ["Kab. Bangkalan", "Kab. Banyuwangi", "Kab. Blitar", "Kab. Bojonegoro", "Kab. Bondowoso", "Kab. Gresik", "Kab. Jember", "Kab. Jombang", "Kab. Kediri", "Kab. Lamongan", "Kab. Lumajang", "Kab. Madiun", "Kab. Magetan", "Kab. Malang", "Kab. Mojokerto", "Kab. Nganjuk", "Kab. Ngawi", "Kab. Pacitan", "Kab. Pamekasan", "Kab. Pasuruan", "Kab. Ponorogo", "Kab. Probolinggo", "Kab. Sampang", "Kab. Sidoarjo", "Kab. Situbondo", "Kab. Sumenep", "Kab. Trenggalek", "Kab. Tuban", "Kab. Tulungagung", "Kota Batu", "Kota Blitar", "Kota Kediri", "Kota Madiun", "Kota Malang", "Kota Mojokerto", "Kota Pasuruan", "Kota Probolinggo", "Kota Surabaya"], "Bali": ["Kab. Badung", "Kab. Bangli", "Kab. Buleleng", "Kab. Gianyar", "Kab. Jembrana", "Kab. Karangasem", "Kab. Klungkung", "Kab. Tabanan", "Kota Denpasar"], "Nusa Tenggara Barat": ["Kab. Bima", "Kab. Dompu", "Kab. Lombok Barat", "Kab. Lombok Tengah", "Kab. Lombok Timur", "Kab. Lombok Utara", "Kab. Sumbawa", "Kab. Sumbawa Barat", "Kota Bima", "Kota Mataram"], "Nusa Tenggara Timur": ["Kab. Alor", "Kab. Belu", "Kab. Ende", "Kab. Flores Timur", "Kab. Kupang", "Kab. Lembata", "Kab. Malaka", "Kab. Manggarai", "Kab. Manggarai Barat", "Kab. Manggarai Timur", "Kab. Nagekeo", "Kab. Ngada", "Kab. Rote Ndao", "Kab. Sabu Raijua", "Kab. Sikka", "Kab. Sumba Barat", "Kab. Sumba Barat Daya", "Kab. Sumba Tengah", "Kab. Sumba Timur", "Kab. Timor Tengah Selatan", "Kab. Timor Tengah Utara", "Kota Kupang"], "Kalimantan Barat": ["Kab. Bengkayang", "Kab. Kapuas Hulu", "Kab. Kayong Utara", "Kab. Ketapang", "Kab. Kubu Raya", "Kab. Landak", "Kab. Melawi", "Kab. Mempawah", "Kab. Sambas", "Kab. Sanggau", "Kab. Sekadau", "Kab. Sintang", "Kota Pontianak", "Kota Singkawang"], "Kalimantan Tengah": ["Kab. Barito Selatan", "Kab. Barito Timur", "Kab. Barito Utara", "Kab. Gunung Mas", "Kab. Kapuas", "Kab. Katingan", "Kab. Kotawaringin Barat", "Kab. Kotawaringin Timur", "Kab. Lamandau", "Kab. Murung Raya", "Kab. Pulang Pisau", "Kab. Seruyan", "Kab. Sukamara", "Kota Palangka Raya"], "Kalimantan Selatan": ["Kab. Balangan", "Kab. Banjar", "Kab. Barito Kuala", "Kab. Hulu Sungai Selatan", "Kab. Hulu Sungai Tengah", "Kab. Hulu Sungai Utara", "Kab. Kotabaru", "Kab. Tabalong", "Kab. Tanah Bumbu", "Kab. Tanah Laut", "Kab. Tapin", "Kota Banjarbaru", "Kota Banjarmasin"], "Kalimantan Timur": ["Kab. Berau", "Kab. Kutai Barat", "Kab. Kutai Kartanegara", "Kab. Kutai Timur", "Kab. Mahakam Ulu", "Kab. Paser", "Kab. Penajam Paser Utara", "Kota Balikpapan", "Kota Bontang", "Kota Samarinda"], "Kalimantan Utara": ["Kab. Bulungan", "Kab. Malinau", "Kab. Nunukan", "Kab. Tana Tidung", "Kota Tarakan"], "Sulawesi Utara": ["Kab. Bolaang Mongondow", "Kab. Bolaang Mongondow Selatan", "Kab. Bolaang Mongondow Timur", "Kab. Bolaang Mongondow Utara", "Kab. Kepulauan Sangihe", "Kab. Kepulauan Siau Tagulandang Biaro", "Kab. Kepulauan Talaud", "Kab. Minahasa", "Kab. Minahasa Selatan", "Kab. Minahasa Tenggara", "Kab. Minahasa Utara", "Kota Bitung", "Kota Kotamobagu", "Kota Manado", "Kota Tomohon"], "Gorontalo": ["Kab. Boalemo", "Kab. Bone Bolango", "Kab. Gorontalo", "Kab. Gorontalo Utara", "Kab. Pohuwato", "Kota Gorontalo"], "Sulawesi Tengah": ["Kab. Banggai", "Kab. Banggai Kepulauan", "Kab. Banggai Laut", "Kab. Buol", "Kab. Donggala", "Kab. Morowali", "Kab. Morowali Utara", "Kab. Parigi Moutong", "Kab. Poso", "Kab. Sigi", "Kab. Tojo Una-Una", "Kab. Toli-Toli", "Kota Palu"], "Sulawesi Barat": ["Kab. Majene", "Kab. Mamasa", "Kab. Mamuju", "Kab. Mamuju Tengah", "Kab. Pasangkayu", "Kab. Polewali Mandar"], "Sulawesi Selatan": ["Kab. Bantaeng", "Kab. Barru", "Kab. Bone", "Kab. Bulukumba", "Kab. Enrekang", "Kab. Gowa", "Kab. Jeneponto", "Kab. Kepulauan Selayar", "Kab. Luwu", "Kab. Luwu Timur", "Kab. Luwu Utara", "Kab. Maros", "Kab. Pangkajene dan Kepulauan", "Kab. Pinrang", "Kab. Sidenreng Rappang", "Kab. Sinjai", "Kab. Soppeng", "Kab. Takalar", "Kab. Tana Toraja", "Kab. Toraja Utara", "Kab. Wajo", "Kota Makassar", "Kota Palopo", "Kota Parepare"], "Sulawesi Tenggara": ["Kab. Bombana", "Kab. Buton", "Kab. Buton Selatan", "Kab. Buton Tengah", "Kab. Buton Utara", "Kab. Kolaka", "Kab. Kolaka Timur", "Kab. Kolaka Utara", "Kab. Konawe", "Kab. Konawe Kepulauan", "Kab. Konawe Selatan", "Kab. Konawe Utara", "Kab. Muna", "Kab. Muna Barat", "Kab. Wakatobi", "Kota Bau-Bau", "Kota Kendari"], "Maluku": ["Kab. Buru", "Kab. Buru Selatan", "Kab. Kepulauan Aru", "Kab. Maluku Barat Daya", "Kab. Maluku Tengah", "Kab. Maluku Tenggara", "Kab. Seram Bagian Barat", "Kab. Seram Bagian Timur", "Kab. Tanimbar", "Kota Ambon", "Kota Tual"], "Maluku Utara": ["Kab. Halmahera Barat", "Kab. Halmahera Selatan", "Kab. Halmahera Tengah", "Kab. Halmahera Timur", "Kab. Halmahera Utara", "Kab. Kepulauan Sula", "Kab. Pulau Morotai", "Kab. Pulau Taliabu", "Kota Ternate", "Kota Tidore Kepulauan"], "Papua Barat": ["Kab. Fakfak", "Kab. Kaimana", "Kab. Manokwari", "Kab. Manokwari Selatan", "Kab. Maybrat", "Kab. Pegunungan Arfak", "Kab. Raja Ampat", "Kab. Sorong", "Kab. Sorong Selatan", "Kab. Tambrauw", "Kab. Teluk Bintuni", "Kab. Teluk Wondama", "Kota Sorong"], "Papua Barat Daya": ["Kab. Maybrat", "Kab. Raja Ampat", "Kab. Sorong", "Kab. Sorong Selatan", "Kab. Tambrauw", "Kota Sorong"], "Papua": ["Kab. Asmat", "Kab. Biak Numfor", "Kab. Boven Digoel", "Kab. Deiyai", "Kab. Dogiyai", "Kab. Intan Jaya", "Kab. Jayapura", "Kab. Jayawijaya", "Kab. Keerom", "Kab. Kepulauan Yapen", "Kab. Lanny Jaya", "Kab. Mamberamo Raya", "Kab. Mamberamo Tengah", "Kab. Mappi", "Kab. Merauke", "Kab. Mimika", "Kab. Nabire", "Kab. Nduga", "Kab. Paniai", "Kab. Pegunungan Bintang", "Kab. Puncak", "Kab. Puncak Jaya", "Kab. Sarmi", "Kab. Supiori", "Kab. Tolikara", "Kab. Waropen", "Kab. Yahukimo", "Kab. Yalimo", "Kota Jayapura"], "Papua Tengah": ["Kab. Deiyai", "Kab. Dogiyai", "Kab. Intan Jaya", "Kab. Mimika", "Kab. Nabire", "Kab. Paniai", "Kab. Puncak", "Kab. Puncak Jaya"], "Papua Pegunungan": ["Kab. Jayawijaya", "Kab. Lanny Jaya", "Kab. Mamberamo Tengah", "Kab. Nduga", "Kab. Pegunungan Bintang", "Kab. Tolikara", "Kab. Yahukimo", "Kab. Yalimo"], "Papua Selatan": ["Kab. Asmat", "Kab. Boven Digoel", "Kab. Mappi", "Kab. Merauke"]};

const SULSEL_DATA = {"Kota Makassar": {"Biringkanaya": ["Pai", "Sudiang", "Sudiang Raya", "Bulurokeng", "Untia", "Daya"], "Bontoala": ["Bontoala", "Bontoala Parang", "Bontoala Tua", "Bunga Ejaya", "Gaddong", "Jongaya", "Layang", "Malimongan", "Malimongan Baru", "Parang", "Timungan Lompoa", "Wajo Baru"], "Kep. Sangkarrang": ["Barrang Caddi", "Barrang Lompo", "Kodingareng"], "Makassar": ["Baju Bodoa", "Ballaparang", "Bara-Baraya", "Bara-Baraya Selatan", "Bara-Baraya Timur", "Bara-Baraya Utara", "Barana", "Lariang Bangi", "Maccini", "Maccini Gusung", "Maccini Parang"], "Mamajang": ["Baji Mappakasunggu", "Bonto Lebang", "Karang Anyar", "Labuang Baji", "Lette", "Mamajang Dalam", "Mamajang Luar", "Mandala", "Maricaya Baru", "Pa'batang", "Tamparang Keke", "Ujung Pandang Baru"], "Manggala": ["Antang", "Batua", "Borong", "Buntusu", "Manggala", "Tamangapa"], "Mariso": ["Bontorannu", "Kunjung Mae", "Lette", "Mariso", "Mario", "Pa'baeng-baeng", "Panambungan", "Tamarunang", "Mattoangin"], "Panakkukang": ["Karampuang", "Karuwisi", "Karuwisi Utara", "Masale", "Pampang", "Pandang", "Panaikang", "Paropo", "Sinrijala", "Tamamaung", "Toddopuli"], "Rappocini": ["Ballaparang", "Banta-Bantaeng", "Bontomakkio", "Buakana", "Gunung Sari", "Karunrung", "Kassi-Kassi", "Mappala", "Rappocini", "Tidung"], "Tallo": ["Bunga Ejaya", "Kaluku Bodoa", "Lakkang", "La'latang", "Pannampu", "Rappojawa", "Rappokalling", "Suangga", "Tallo", "Tambua", "Wala-Walaya"], "Tamalanrea": ["Bira", "Kapasa", "Kapasa Raya", "Parangloe", "Tamalanrea", "Tamalanrea Indah", "Tamalanrea Jaya"], "Tamalate": ["Balang Baru", "Barombong", "Bongaya", "Jongaya", "Maccini Sombala", "Mangasa", "Mannuruki", "Pa'baeng-baeng", "Parang Tambung", "Tanjung Merdeka"], "Ujung Pandang": ["Bulo Gading", "Lae-Lae", "Lajangiru", "Losari", "Maloku", "Mangkura", "Pisang Selatan", "Pisang Utara"], "Ujung Tanah": ["Buloa", "Cambaya", "Gusung", "Totaka", "Tabaringan", "Ujung Tanah"], "Wajo": ["Ende", "Melayu", "Melayu Baru", "Pattunuang", "Mampu", "Butung"]}, "Kab. Gowa": {"Somba Opu": ["Batangkaluku", "Bontoramba", "Katangka", "Limbung", "Mawang", "Pandang-Pandang", "Romang Lompoa", "Romang Polong", "Samata", "Sungguminasa", "Tompobalang"], "Barombong": ["Barombong", "Biringala", "Kanjilo", "Lembang Parang", "Moncobalang", "Tinggimae"], "Pallangga": ["Bontoramba", "Julukanaya", "Julubori", "Julupamai", "Kampili", "Pallangga", "Pangkabinanga", "Parangbanoa", "Panyangkalang", "Taeng"], "Bajeng": ["Baju Bodoa", "Bone", "Bone-Bone", "Gentungan", "Lempangang", "Maccini Baji", "Maradekaya", "Paraikatte", "Parangluara", "Tangkebajeng", "Tubajeng"], "Bajeng Barat": ["Borimatangkasa", "Bontosunggu", "Gentungan", "Kalebajeng", "Manjalling", "Pabundukang"], "Bontonompo": ["Bontobiraeng", "Bontobiraeng Selatan", "Bontojaya", "Bontolangkasa", "Bontolangkasa Utara", "Bontonompo", "Kalaserena", "Romanglasa", "Salajangki", "Tinggimae"], "Bontonompo Selatan": ["Bontoramba", "Kalebarembang", "Loka", "Manjapai", "Pa'la'la", "Salajangki", "Sengka", "Tindang"], "Bontomarannu": ["Borongloe", "Bontomarannu", "Bontosunggu", "Bontotangnga", "Dobayya", "Nirannuang", "Sokkolia"], "Pattallassang": ["Borong Pa'la'la", "Jenemadinging", "Paccelekang", "Pallantikang", "Pattallassang", "Saukang", "Timbuseng"], "Parangloe": ["Belapunranga", "Borisallo", "Lanna", "Lonjoboko", "Malino", "Moncongloe", "Parangloe"], "Manuju": ["Bilalang", "Bolaromang", "Manuju", "Moncongloe", "Pa'bentengang", "Pattalikang", "Tamalatea"], "Tinggimoncong": ["Buluttana", "Gantarang", "Garassi", "Malino", "Pattapang", "Tompo Bulu"], "Tombolopao": ["Balassuka", "Erelembang", "Kanreapia", "Mamampang", "Tabbinjai", "Tombolopao", "Tonasa"], "Parigi": ["Bilanrengi", "Jonjo", "Majannang", "Manimbahoi", "Paralang", "Parigi"], "Bungaya": ["Bungaya", "Bungaya Barat", "Bissoloro", "Julubori", "Mangempang", "Rannaloe"], "Bontolempangan": ["Bontolempangan", "Bontomatene", "Bontosunggu", "Datara", "Eremerasa", "Mataallo", "Parangloe"], "Tompobulu": ["Balang", "Bontobiraeng", "Garing", "Malleleng", "Rappolemba", "Rappoala", "Tompobulu"], "Biringbulu": ["Baturappe", "Berutallasa", "Biringbulu", "Bontocini", "Buakkang", "Lauwa", "Parangloe"]}, "Kab. Maros": {"Mandai": ["Hasanuddin", "Baji Pamai", "Bontoa", "Bontomatene", "Tenrigangkae"], "Moncongloe": ["Bonto Bunga", "Lekopancing", "Moncongloe", "Moncongloe Bulu", "Moncongloe Lappara"], "Maros Baru": ["Adatongeng", "Allepolea", "Baju Bodoa", "Borikamase", "Pallantikang", "Sabila", "Taroada"], "Marusu": ["Alatengae", "Boto", "Marumpa", "Nisombalia", "Pattontongan", "Temmapaduae"], "Turikale": ["Adatongeng", "Alliritengae", "Borikamase", "Pettuadae", "Raya", "Taroada", "Turikale"], "Lau": ["Allepolea", "Alu Bilayya", "Barugae", "Bontomarannu", "Maccini Baji", "Soreang"], "Bontoa": ["Ampekale", "Bontoa", "Minasa Te'ne", "Pajukukang", "Salenrang", "Tunikamaseang"], "Bantimurung": ["Alatengae", "Bantimurung", "Baruga", "Leang-Leang", "Minasa Baji", "Pattanyamang", "Tukamasea"], "Simbang": ["Jenetaesa", "Minasa Baji", "Sambueja", "Simbang", "Tanete", "Toddolimae"], "Tanralili": ["Allaere", "Ammarang", "Benteng", "Borong", "Lekopancing", "Tanralili"], "Tompobulu": ["Benteng Gajah", "Bonto Manurung", "Pucak", "Tompobulu"], "Camba": ["Camba", "Cenrana", "Kelara", "Pattiro Deceng", "Sawaru", "Timpuseng"], "Cenrana": ["Cenrana", "Labuaja", "Limapoccoe", "Rompegading", "Samaenre", "Timpuseng"], "Mallawa": ["Barugae", "Benteng", "Bonto Manai", "Gattareng", "Laiya", "Mallawa"]}, "Kab. Takalar": {"Pattallassang": ["Bajeng", "Bontomanai", "Galesong", "Kalukuang", "Mappakasunggu", "Pattallassang", "Pa'la'la", "Soreang"], "Galesong": ["Galesong", "Galesong Baru", "Galesong Selatan", "Mappakalompo", "Tamalate"], "Galesong Utara": ["Aeng Batu-Batu", "Aeng Towa", "Bontokaddopepe", "Bonto Manai", "Mappakalompo", "Tamasaju", "Tamalate"], "Galesong Selatan": ["Bontomarannu", "Bonto Pa'la'la", "Kadatong", "Kalenna", "Mangalli", "Pa'la'la", "Towata"], "Sanrobone": ["Bontomanai", "Paddinging", "Sanrobone", "Ujung Baji"], "Mappakasunggu": ["Cikoang", "Laikang", "Manjapai", "Mappakasunggu", "Tamasaju"], "Mangarabombang": ["Aeng Batu-Batu", "Balangdatu", "Bentang", "Bilo", "Bontoparang", "Lengkese", "Laikang", "Punagaya"], "Polombangkeng Utara": ["Barugaya", "Bulukunyi", "Kale Ko'mara", "Ko'mara", "Massamaturu", "Palleko", "Pappa", "Tarowang"], "Polombangkeng Selatan": ["Bontokassi", "Borong Pa'la'la", "Lantang", "Lassang", "Lassang Barat", "Lengkese", "Malewang", "Pa'la'la", "Sabintang"]}, "Kab. Jeneponto": {"Binamu": ["Balang", "Bontoa", "Empoang", "Empoang Selatan", "Empoang Utara", "Kapita", "Pabiringa", "Sidenre", "Tanjung"], "Arungkeke": ["Arungkeke", "Arungkeke Pallantikang", "Baji Pa'mai", "Bulo-Bulo", "Kalumpang Loe", "Palajau"], "Bangkala": ["Bangkala", "Bontomanai", "Bontorannu", "Jenetallasa", "Kaluku", "Karassing", "Lebang Manai", "Lebang Manai Utara", "Mallasoro", "Mangepong"], "Bangkala Barat": ["Bontomanai", "Bontorea", "Kayuloe Barat", "Kayuloe Timur", "Laikang", "Pakka", "Tarowang"], "Batang": ["Arajang", "Baraya", "Batang", "Bontomanai", "Bululoe", "Sidenre", "Togo-Togo"], "Bontoramba": ["Bontoramba", "Kale Rante", "Kassi", "Lebang", "Lentu", "Maccini Baji", "Rumbia", "Sapanang"], "Kelara": ["Bontorea", "Jenetallasa", "Kapita", "Kelara", "Rumbia", "Tompobulu"], "Rumbia": ["Bontomanai", "Bontominasa", "Datara", "Kassi", "Lebang", "Rumbia", "Tompobulu"], "Tamalatea": ["Bontosunggu", "Calabae", "Kayuloe", "Pallantikang", "Panaikang", "Tamalatea", "Tanjung"], "Turatea": ["Bontoa", "Borong", "Bulogading", "Labuang Baji", "Lopa", "Pabiringa", "Turatea"]}, "Kab. Bantaeng": {"Bantaeng": ["Bonto Atu", "Bonto Lebang", "Lamalaka", "Letta", "Pallantikang", "Tappanjeng"], "Bissappu": ["Batu Karaeng", "Biangloe", "Bissappu", "Bonto Cinde", "Bonto Jai", "Bonto Langkasa", "Bonto Manurung", "Bonto Salluang", "Karaeng", "Kindang", "Pa'bentengang"], "Eremerasa": ["Barua", "Bonto Bulaeng", "Bonto Loe", "Bonto Manurung", "Kampala", "Papanloe", "Parangloe"], "Gantarangkeke": ["Bonto Marannu", "Bonto Matene", "Bonto Tangnga", "Gantarangkeke", "Mamampang", "Taccorong"], "Pajukukang": ["Bonto Jai", "Bonto Langkasa", "Bonto Lebang", "Bonto Sunggu", "Pajukukang", "Rappoa", "Tombolo"], "Sinoa": ["Bonto Bulaeng", "Bonto Loe", "Bonto Tiro", "Gunung Sejuk", "Sinoa"], "Tompobulu": ["Bonto Bulaeng", "Bonto Loe", "Bonto Marannu", "Bonto Tallasa", "Campaga", "Lembang Lohe", "Pattaneteang"], "Uluere": ["Bonto Bulaeng", "Bonto Karaeng", "Bonto Loe", "Bonto Marannu", "Ereng-Ereng", "Moti"]}, "Kab. Bulukumba": {"Ujung Bulu": ["Bintarore", "Caile", "Ela-Ela", "Kalumeme", "Loka", "Matekko", "Terang-Terang"], "Ujung Loe": ["Balleangin", "Balong", "Bontobulaeng", "Dannuang", "Garanta", "Lonrong", "Manyampa", "Padang", "Tamatto"], "Bonto Bahari": ["Ara", "Benjala", "Bira", "Darubiah", "Lembanna", "Tanaberu"], "Bonto Tiro": ["Batang", "Bontotiro", "Herlang", "Manjalling", "Onto", "Tri Tiro"], "Kajang": ["Batu Nilamung", "Bonto Baji", "Lembanna", "Lolisang", "Possi Tanah", "Sangkala", "Tambangan", "Tanah Jaya", "Tana Toa"], "Kindang": ["Borong", "Kindang", "Manjapai", "Mattoanging", "Tamatto", "Tibona"], "Rilau Ale": ["Bajiminasa", "Bontomacinna", "Bulo-Bulo", "Bulolohe", "Harapan", "Lonrong", "Palampang", "Pattaneteang", "Rilau Ale"], "Bulukumpa": ["Barugae", "Bontominasa", "Bulukumpa", "Jojjolo", "Kambuno", "Salassae", "Sapobonto"], "Gantarang": ["Bonto Tiro", "Bukit Harapan", "Gantarang", "Maccini Ayo", "Matekko", "Salajangki", "Sapo", "Tanah Harapan"]}, "Kab. Sinjai": {"Sinjai Utara": ["Bioa", "Bongki", "Bongki Lengkese", "Lappa", "Lamatti Riaja", "Lamatti Riattang", "Panciro", "Samaenre", "Tassililu"], "Sinjai Timur": ["Akkotengeng", "Biroro", "Lasiai", "Patalassang", "Pulau Harapan", "Saukang", "Saohiring", "Tongke-Tongke"], "Sinjai Selatan": ["Alenangka", "Batu Belerang", "Bikeru", "Bulupoddo", "Dairi", "Gareccing", "Palae", "Puncak", "Sangiasseri", "Turungan Baji"], "Sinjai Barat": ["Arabika", "Balakia", "Bonto Lempangan", "Gunung Perak", "Manipi", "Tassililu"], "Sinjai Tengah": ["Baru", "Bonto Katute", "Bukit Harapan", "Kanrung", "Kompang", "Loka", "Pattongko", "Saotengah"], "Sinjai Borong": ["Batu Belerang", "Biji Nangka", "Bonto Sinala", "Bulu Tellue", "Kassi", "Palangka"], "Bulupoddo": ["Bontosunggu", "Bulupoddo", "Duampanua", "Lamatti", "Mannanti"], "Tellu Limpoe": ["Baru-Baru", "Bikeru", "Bonto Tengnga", "Duampanua", "Mannanti", "Pattongko"], "Pulau Sembilan": ["Balocci Baru", "Kambara", "Kanalo I", "Kanalo II", "Padaelo", "Pulau Harapan"]}, "Kab. Bone": {"Tanete Riattang": ["Bajoe", "Biru", "Bukaka", "Macege", "Manurungnge", "Ta"], "Tanete Riattang Barat": ["Bulu Tempe", "Lappassi", "Macanang", "Majang", "Masumpu", "Polewali", "Tibojong"], "Tanete Riattang Timur": ["Bajoe", "Cellu", "Lonrae", "Panyula", "Toro"], "Awangpone": ["Awang Tangka", "Cabalu", "Cabbeng", "Mallari", "Pammase", "Pompanua", "Pompanua Riattang", "Pude", "Tobenteng"], "Barebbo": ["Apala", "Balle", "Barakkae", "Barebbo", "Binuang", "Biru", "Kading", "Lampoko", "Macanre", "Palakka", "Pattiro", "Samaenre", "Watang Palakka"], "Kahu": ["Arallae", "Balle", "Biru", "Garessi", "Hulo", "Jompie", "Kahu", "Kanuku", "Lalepo", "Lemo", "Mattaro Purae", "Palaka"], "Kajuara": ["Angkue", "Bulu Sirua", "Buareng", "Kajuara", "Laburasseng", "Massangkae", "Matajang", "Pao", "Pude", "Tuju"], "Lamuru": ["Barakkae", "Batu Putih", "Bojo", "Lalebata", "Lamuru", "Mattaro Walie", "Pakkasalo", "Poleonro", "Sengkang"], "Mare": ["Arallae", "Batu Gading", "Bonto Masunggu", "Bulie", "Kading", "Lappa", "Mare", "Mattaro Purae", "Pakkasalo", "Salomekko", "Tellongeng"], "Palakka": ["Bacu", "Cinnong", "Lemo", "Mattiro Walie", "Palakka", "Paccing", "Pattiro"], "Salomekko": ["Batu Gading", "Bulie", "Kading", "Lappa", "Palakka", "Salomekko"], "Ulaweng": ["Ajanglalo", "Bola Bulu", "Cege", "Cinnong", "Lilina Ajangale", "Poleonro", "Welado"], "Bengo": ["Batu Gading", "Bengo", "Cege", "Lonrae", "Lallatang", "Mattaro Walie", "Pallime"], "Tellu Siattinge": ["Ajangale", "Awo", "Cege", "Cinnong", "Timurung", "Tokaseng", "Watang Cina"]}, "Kab. Luwu": {"Belopa": ["Bassiang", "Bassiang Timur", "Belopa", "Belopa Utara", "Pabbaresseng", "Senga", "Senga Selatan"], "Bua": ["Bua", "Bua Cina", "Bua Setia", "Cakkeawo", "Jawi-Jawi", "Murante", "Posi Dama", "Suli Barat"], "Kamanre": ["Kamanre", "Kendekan", "Mario", "Minna", "Sabe", "Walenrang"], "Lamasi": ["Buntu Batu", "Bosso Timur", "Lamasi", "Lamasi Timur", "Posi Dama", "Pompengan Pantai"], "Larompong": ["Boneposi", "Larompong", "Larompong Selatan", "Mario", "Posi Dama", "Tobajeng"], "Noling": ["Buntu Batu", "Mario", "Noling", "Posi Dama", "Rante Belu", "Suli"], "Ponrang": ["Buntu Batu", "Mario", "Padang Subur", "Ponrang", "Ponrang Selatan", "Rante Belu"], "Suli": ["Buntu Batu", "Mario", "Posi Dama", "Suli", "Suli Barat"], "Walenrang": ["Buntu Batu", "Kamanre", "Mario", "Tirowali", "Walenrang"], "Walenrang Barat": ["Buntu Batu", "Mario", "Tirowali", "Walenrang Barat"], "Walenrang Timur": ["Buntu Batu", "Mario", "Suli", "Walenrang Timur"], "Walenrang Utara": ["Buntu Batu", "Mario", "Suli", "Walenrang Utara"]}, "Kota Palopo": {"Bara": ["Battang", "Battang Barat", "Bukit Indah", "Lebang", "Rampoang", "Salubulo"], "Mungkajang": ["Latuppa", "Mungkajang", "Murante", "Songka", "Tomarundung"], "Sendana": ["Binturu", "Jaya", "Ponjalae", "Sendana", "Takkalasi"], "Telluwanua": ["Boting", "Maroangin", "Salubattang", "Sumarambu", "Telluwanua"], "Wara": ["Amassangan", "Boting", "Dangerakko", "Lagaligo", "Pentojangan", "Ponjalae", "To Bulung", "Ulu Daya"], "Wara Barat": ["Battang", "Dangerakko", "Mancani", "Salupao", "Takkalasi"], "Wara Selatan": ["Batupasi", "Boting", "Limbong", "Penggoli", "Sampoddo", "To Bulung"], "Wara Timur": ["Ararangan", "Balandai", "Benteng", "Lagaligo", "Malatunrung", "Ponjalae"], "Wara Utara": ["Balandai", "Binturu", "Bone", "Bukit Indah", "Ponjalae", "Sabbamparu"]}, "Kota Parepare": {"Bacukiki": ["Galung Maloang", "Kampung Baru", "Lompoe", "Sumpang Minangae"], "Bacukiki Barat": ["Cappa Galung", "Labukkang", "Lakessi", "Lumpue", "Soreang", "Tiro Sompe"], "Soreang": ["Bukit Harapan", "Kampung Baru", "Lapadde", "Lemoe", "Madising Na Mario", "Watang Soreang"], "Ujung": ["Bumi Harapan", "Cempae", "Lakessi", "Mallusetasi", "Sumpang Minangae", "Ujung Lare", "Ujung Sabbang"]}, "Kab. Wajo": {"Tempe": ["Atakkae", "Lapongkoda", "Maddukelleng", "Pakkanna", "Pattirosompe", "Siengkang", "Sompe", "Tancung", "Tobarakka", "Wiring Tasi"], "Belawa": ["Akkajeng", "Belawa", "Botto", "Coppobulu", "Mamminasae", "Menge", "Paroto", "Siwa"], "Bola": ["Bola", "Cinnong", "Lawa", "Pallima", "Paria", "Peneki", "Tempangeng"], "Gilireng": ["Arajang", "Gilireng", "Kalola", "Leppangeng", "Maddukelleng", "Sarapao"], "Majauleng": ["Botto", "Cina", "Laerung", "Lapajung", "Larokenga", "Leppangeng", "Macero", "Mamminasae", "Paria", "Pattirosompe", "Sabbangparu", "Ureng"], "Pammana": ["Botto", "Cinnong", "Laburasseng", "Lampulung", "Lempa", "Pammana", "Simpursia", "Tobatang"], "Pitumpanua": ["Abbokongeng", "Barang", "Bulete", "Cinnongtabi", "Lagoari", "Pitumpanua", "Tobarakka", "Ujung Baru"], "Sabbangparu": ["Cinnong", "Laburasseng", "Lapajung", "Maddukelleng", "Mario", "Paropo", "Sabbangparu"], "Sajoanging": ["Gilireng", "Maddukelleng", "Matingang", "Pattirosompe", "Sajoanging", "Tinco"], "Takkalalla": ["Cinnong", "Leppangeng", "Sabbangparu", "Takkalalla", "Tocina", "Toddang Pulu"], "Tanasitolo": ["Atakkae", "Botto", "Cinnong", "Kampiri", "Maccirinna", "Mattirowalie", "Pising", "Tancung", "Tobarakka"]}, "Kab. Soppeng": {"Lalabata": ["Bila", "Botto", "Lalabata Riaja", "Lalabata Rilau", "Ompo", "Salokaraja", "Lapajung", "Mattabulu"], "Lilirilau": ["Baringeng", "Belo", "Cabenge", "Kebo", "Limpomajang", "Pesse", "Tetewatu"], "Liliriaja": ["Gattareng", "Labokong", "Marioriwawo", "Matingang", "Panca Rijang", "Timusu"], "Marioriawa": ["Attang Salo", "Bulue", "Labokong", "Manorang Salo", "Marioriawa", "Pising"], "Marioriwawo": ["Belo", "Gattareng", "Goarie", "Labokong", "Marioriwawo", "Timusu"], "Donri-Donri": ["Pesse", "Donri-Donri", "Lalabata Riaja", "Sering", "Soga", "Sunggumanai"], "Ganra": ["Enrekang", "Ganra", "Kebo", "Labokong", "Lompulle"], "Citta": ["Barang", "Citta", "Labokong", "Limpomajang", "Paseno"]}, "Kab. Barru": {"Barru": ["Coppo", "Mangkoso", "Palakka", "Siawung", "Sumpang Binangae", "Tompo"], "Balusu": ["Balusu", "Binuang", "Madello", "Palludda", "Pujananting"], "Mallusetasi": ["Cilellang", "Kupa", "Lawallu", "Mallawa", "Palanro", "Sumpang Binangae"], "Pujananting": ["Gattareng", "Harapan", "Jangan-Jangan", "Pujananting", "Palattae"], "Tanete Rilau": ["Lalolang", "Lipukasi", "Pancana", "Tanete", "Tellu Limpoe"], "Tanete Riaja": ["Benteng", "Harapan", "Kading", "Lompo Tengah", "Lompo Riaja", "Palakka"], "Soppeng Riaja": ["Ajakkang", "Batupute", "Cilellang", "Jangan-Jangan", "Mangkoso", "Siddo"], "Palanro": ["Palanro", "Sepe", "Siddo", "Sumpang Binangae", "Tompo"]}, "Kab. Pangkajene dan Kepulauan": {"Pangkajene": ["Bonto Perak", "Bungoro", "Jagong", "Mappasaile", "Padoang-Doangan", "Pampanua", "Sibatua", "Tekolabbua"], "Bungoro": ["Boriappaka", "Bowong Cindea", "Bungoro", "Mangilu", "Samalewa", "Sapanang", "Tabo-Tabo"], "Labakkang": ["Bonto Manai", "Bonto Manurung", "Boriappaka", "Labakkang", "Mangallekana", "Patallassang", "Taraweang"], "Ma'rang": ["Attang Salo", "Boriappaka", "Bungoro", "Ma'rang", "Paddoang-Doangan", "Tamangapa", "Taraweang"], "Segeri": ["Bone", "Boriappaka", "Segeri", "Bone-Bone", "Pitue", "Polewali", "Talaka"], "Minasatene": ["Boriappaka", "Kabba", "Mangilu", "Minasatene", "Panaikang", "Parenreng", "Samalewa"], "Mandalle": ["Boriappaka", "Coppo", "Kana", "Mandalle", "Pitue", "Talaka"], "Balocci": ["Balleangin", "Balocci Baru", "Bentenge", "Kassi", "Tompo Bulu"], "Tondong Tallasa": ["Bantimurung", "Malaka", "Tondong Tallasa", "Tompo Bulu"], "Liukang Tupabbiring": ["Mattiro Baji", "Mattiro Bombang", "Mattiro Deceng", "Mattiro Dolangeng", "Mattiro Kanja", "Mattiro Langi", "Mattiro Sompe", "Mattiro Ujung"], "Liukang Kalmas": ["Kalmas", "Kanyunyung", "Liukang Kalmas", "Massalima"], "Liukang Tangaya": ["Bala-Balakang", "Bangko-Bangkoang", "Doang-Doangange", "Gondong Bali", "Jinato", "Satanger", "Tambolongang"]}, "Kab. Pinrang": {"Watang Sawitto": ["Maccorawalie", "Penrang", "Sawitto", "Salo", "Sepang", "Siparappe", "Tatae"], "Paleteang": ["Benteng", "Mamminasae", "Maroala", "Mattirotasi", "Paria", "Teppo"], "Tiroang": ["Bababulo", "Bababulo Utara", "Massewae", "Teppo", "Tiroang"], "Lembang": ["Betteng", "Bulo", "Kariango", "Lembang", "Massewae", "Sabbang Paru", "Sali-Sali"], "Batulappa": ["Batulappa", "Massepe", "Mattirowalie", "Pananrang", "Suppa"], "Suppa": ["Lotang Salo", "Mace", "Maritengngae", "Suppa", "Tasiwalie", "Wiring Tasi"], "Lanrisang": ["Amar", "Lanrisang", "Massewae", "Pananrang", "Sabbangparu"], "Mattiro Sompe": ["Langnga", "Lotang Salo", "Manisa", "Mattiro Sompe", "Pallameang", "Tasiwalie"], "Duampanua": ["Alitta", "Bababulo", "Benteng", "Bungi", "Cempa", "Duampanua", "Maroneng"], "Cempa": ["Cempa", "Cero", "Lanrisang", "Passeno", "Pincara"], "Mattiro Bulu": ["Alitta", "Cempa", "Langnga", "Mattiro Bulu", "Pallameang", "Sigi"], "Patampanua": ["Laleng Bata", "Massewae", "Patampanua", "Pincara", "Salipolo", "Sabbang Paru", "Sogi"]}, "Kab. Sidenreng Rappang": {"Maritengngae": ["Allakuang", "Bina", "Duampanua", "Kanyunyung", "Lakessi", "Massepe", "Rijang Pittu", "Siletto", "Tonrong Rijang", "Wala"], "Panca Rijang": ["Bina", "Lalabata", "Lawawoi", "Lemo", "Mappadeceng", "Rappang"], "Pitu Riawa": ["Bola Bulu", "Dua Pitue", "Mojong", "Pitu Riawa", "Talawe"], "Pitu Riase": ["Benteng", "Betao", "Betao Riase", "Dua Pitue", "Padangloang", "Pitu Riase"], "Dua Pitue": ["Bantisi", "Damai", "Dua Pitue", "Polewali", "Rappang", "Wanio"], "Baranti": ["Baranti", "Duampanua", "Kanyunyung", "Passeno", "Rijang Pittu", "Tonronge"], "Watang Pulu": ["Bola Bulu", "Duampanua", "Mojong", "Watang Pulu", "Bina"], "Kulo": ["Kulo", "Lawawoi", "Polewali", "Sereang", "Tonronge"], "Tellu Limpoe": ["Amparita", "Empagae", "Lawawoi", "Lerang-Lerang", "Tellu Limpoe"], "Wattang Sidenreng": ["Allakuang", "Damai", "Kanyunyung", "Massepe", "Paseno", "Wattang Sidenreng"], "Enrekang": ["Galonta", "Juppandang", "Kambiolangi", "Lewaja", "Puserren", "Ranga", "Talungeng"]}, "Kab. Luwu Utara": {"Masamba": ["Bone-Bone", "Kamiri", "Masamba", "Radda", "Tarobok"], "Sabbang": ["Kalotok", "Laba", "Padang Raya", "Pincara", "Sabbang", "Sabbang Selatan"], "Malangke": ["Bungadidi", "Kapidi", "Malangke", "Mario", "Patila", "Pombakka"], "Baebunta": ["Baebunta", "Baebunta Selatan", "Mario", "Tarobok", "Uraso"], "Sukamaju": ["Bone-Bone", "Cendana Hijau", "Harapan", "Polewali", "Sukamaju", "Wonorejo"]}, "Kab. Luwu Timur": {"Malili": ["Balantang", "Harapan", "Lakawali", "Malili", "Manggalung", "Wewangriu"], "Wotu": ["Bahoruru", "Dannuang", "Lampenai", "Ledu-Ledu", "Lera", "Manurung", "Tarengge", "Wotu"], "Burau": ["Bone Pute", "Burau", "Jalajja", "Lera", "Lewonu", "Libukan Mandiri", "Lumbewe", "Minanga", "Bone Lohe"], "Tomoni": ["Bayondo", "Harapan", "Manggala", "Oroue", "Tomoni", "Wonorejo"], "Tomoni Timur": ["Bayondo", "Cendana Hijau", "Harapan", "Puncak Indah", "Tomoni Timur", "Wonorejo"], "Kalaena": ["Harapan", "Kalena Kiri", "Kalaena", "Manggala", "Wanasari"], "Towuti": ["Asuli", "Baruga", "Bienaju", "Buangin", "Langkea Raya", "Mahalona", "Matompi", "Pekaloa", "Pewusoi", "Tokalimbo", "Towuti"], "Nuha": ["Magani", "Matano", "Nikkel", "Nuha", "Sorowako"], "Wasuponda": ["Bambalu", "Kawata", "Ledu-Ledu", "Wasuponda"], "Mangkutana": ["Harapan", "Kalosi", "Karambua", "Mangkutana", "Sindu", "Wonorejo"]}, "Kab. Toraja Utara": {"Rantepao": ["Buntu Datu", "Buntu Nanna", "Buntu Pepasan", "Kadundung", "Kole", "Mentirotiku", "Paniki", "Sarira", "Tallunglipu", "Tandung", "Tikala", "Tinoring"], "Sopai": ["Bamba", "Benteng Mamullu", "Lempo", "Pitung Penanian", "Sa'dan", "Sa'dan Malimbong", "Sa'dan Matallo", "Sapan", "Tallobamba"], "Balusu": ["Balusu", "Bebo", "Kaero", "Pangden", "Pitung Penanian", "Rantelemo"], "Nanggala": ["Deri", "Eran Batu", "Kalimbuang", "Nanggala", "Pitung Penanian", "Tallunglipu"], "Buntao": ["Buntao", "Dua Datu", "Kadundung", "Palangi", "Sarira", "Sereale"], "Sesean": ["Bori", "Bori Ranteletok", "Nonongan", "Sesean", "Sesean Suloara", "Sereale", "Tallunglipu"], "Tikala": ["Baruppu", "Benteng Mamullu", "Tikala", "Tikala Assing", "Tikala Baru", "Tikala Lembang"], "Tondon": ["Minanga", "Tondon", "Tondon Mamullu", "Tondon Paesana"], "Sa'dan": ["Bamba", "Benteng Mamullu", "Sa'dan", "Sa'dan Malimbong", "Sa'dan Matallo", "Sapan"], "Tallunglipu": ["Kadundung", "Paniki", "Tandung", "Tallunglipu", "Tallunglipu Matallo", "Tallunglipu Tengan"], "Kesu'": ["Bebo", "Buntu Pune", "Ke'te", "Kesu'", "Rante", "Singki"], "Rindingallo": ["Bakti", "Bamba", "Rindingallo", "Sapan", "Tallunglipu"], "Awan Rante Karua": ["Awan", "Rante Karua", "Sapan"], "Kapala Pitu": ["Benteng", "Kapala Pitu", "Sapan", "Tendan"], "Dende' Piongan Napo": ["Dende", "Napo", "Piongan", "Sapan"], "Buntu Pepasan": ["Buntu Pepasan", "Kaero", "Sapan", "Tallunglipu"], "Bangkel Rending": ["Bangkel", "Rending", "Sapan"], "Baruppu": ["Baruppu", "Baruppu Utara", "Sapan"], "Rantebua": ["Buntu Pune", "Rantebua", "Sapan", "Sullukan"], "Bori'": ["Bori", "Kadundung", "Paniki", "Sapan"], "Piongan": ["Benteng", "Kadundung", "Piongan", "Sapan"]}, "Kab. Tana Toraja": {"Makale": ["Ariang", "Buntu Burake", "Marinding", "Salu", "Tampo"], "Makale Utara": ["Bebo", "Makale", "Palipu", "Sandur"], "Makale Selatan": ["Botang", "Lando", "Makale", "Randang", "Sandur"], "Sangalla": ["Bamba Puang", "Kadundung", "Sangalla", "Sangalla Selatan", "Sangalla Utara"], "Sangalla Selatan": ["Kadundung", "Sangalla Selatan", "Sapan"], "Sangalla Utara": ["Kadundung", "Sangalla Utara", "Sapan"], "Mengkendek": ["Bebo", "Mengkendek", "Paehean", "Sandur", "Sapan"], "Gandang Batu Sillanan": ["Bebo", "Gandang Batu", "Paehean", "Sillanan"], "Rano": ["Babo", "Bau", "Rano", "Sapan"], "Malimbong Balepe": ["Balepe", "Bebo", "Malimbong", "Sapan"], "Bonggakaradeng": ["Bonggakaradeng", "Bebo", "Sapan", "Tondok Bakaru"], "Simbuang": ["Bebo", "Simbuang", "Tondok Bakaru"], "Kurra": ["Bebo", "Kurra", "Sapan"], "Mappak": ["Bebo", "Mappak", "Sapan"], "Bittuang": ["Bittuang", "Bebo", "Mengkendek", "Sapan"], "Masanda": ["Bebo", "Masanda", "Sapan", "Tobu"], "Saluputti": ["Bebo", "Saluputti", "Sapan"], "Denpina": ["Bebo", "Denpina", "Sapan"], "Rembon": ["Bebo", "Rembon", "Sapan", "Tobu"], "Rantetayo": ["Bebo", "Rantetayo", "Sapan"], "Suaya": ["Bebo", "Suaya", "Sapan"]}, "Kab. Enrekang": {"Enrekang": ["Galonta", "Juppandang", "Kambiolangi", "Lewaja", "Puserren", "Ranga", "Talungeng"], "Anggeraja": ["Bamba", "Bambapuang", "Buttu Batu", "Cakke", "Cendana", "Lakawan", "Mataran", "Saruran"], "Alla": ["Buntu Sugi", "Limbong", "Malalin", "Sumbang", "Taulo", "Tibussan"], "Bungin": ["Bambang", "Bungin", "Karrang", "Lewak", "Panta"], "Baraka": ["Balambano", "Baraka", "Bone-Bone", "Kadato", "Kendekan", "Pana", "Parinding", "Salukanan", "Tibussan"], "Buntu Batu": ["Banti", "Banua", "Buntu Batu", "Ledan", "Lunjen"], "Curio": ["Curio", "Latimojong", "Rante Angin", "Rante Baru", "Sumbang"], "Maiwa": ["Baringin", "Kaluppang", "Lebani", "Maiwa", "Pasang", "Rante", "Salu Dewata"], "Malua": ["Batuganda", "Bulan-Bulan", "Kadato", "Malua", "Singki", "Taulo"], "Masalle": ["Buntu Sugi", "Kadato", "Masalle", "Salukanan", "Singki", "Taulo"], "Baroko": ["Baroko", "Buntu Sugi", "Singki", "Taulo"], "Cendana": ["Bone-Bone", "Buntu Sugi", "Cendana", "Kadato", "Singki", "Taulo"]}, "Kab. Kepulauan Selayar": {"Benteng": ["Batangmata", "Batangmata Sapo", "Benteng", "Bontobangun", "Bontomatene", "Bontousa", "Mekar", "Onto", "Patikarya"], "Bontoharu": ["Bontoharu", "Bontolebang", "Bontomalling", "Kayuadi", "Kelepadang", "Laiyolo", "Laiyolo Baru", "Massungke"], "Bontomanai": ["Bontomanai", "Bontomarannu", "Bontona Saluk", "Bontousa", "Majapahit", "Mekar", "Padang", "Polebungin"], "Bontomatene": ["Bontobulaeng", "Bontolempangan", "Bontomatene", "Bontousa", "Kahu-Kahu", "Kawasara", "Mekar", "Onto"], "Bontosikuyu": ["Bontosikuyu", "Bontoborusu", "Bontobulaeng", "Kaburu", "Lalemban", "Patikarya"], "Pasilambena": ["Jinato", "Majapahit", "Pasilambena", "Sambali", "Tambolongang"], "Pasimarannu": ["Bonerate", "Kalao", "Kalaotoa", "Lambego", "Pasimarannu"], "Pasimasunggu": ["Bontobulaeng", "Bontolempangan", "Pasimasunggu", "Pasimasunggu Timur"], "Pasimasunggu Timur": ["Bontousa", "Lalemban", "Pasimasunggu Timur"], "Takabonerate": ["Jinato", "Latondu", "Pulo Madu", "Rajuni", "Tarupa", "Tarupa Kecil"]}};

function WilayahSelect({ prefix, values, onChange }) {
  const provId = values[prefix + "_provinsi_id"] || "";
  const prov   = values[prefix + "_provinsi"] || "";
  const kab    = values[prefix + "_kabupaten"] || "";
  const kec    = values[prefix + "_kecamatan"] || "";
  const kel    = values[prefix + "_kelurahan"] || "";

  const isSulsel = prov === "Sulawesi Selatan";
  const kabList  = prov && INDONESIA_KAB[prov] ? INDONESIA_KAB[prov] : [];
  const kecList  = isSulsel && kab && SULSEL_DATA[kab] ? Object.keys(SULSEL_DATA[kab]).sort() : [];
  const kelList  = isSulsel && kab && kec && SULSEL_DATA[kab]?.[kec] ? SULSEL_DATA[kab][kec].sort() : [];

  const sel = {
    width: "100%", padding: "0.75rem 1rem", background: "#f8fafd",
    border: "1.5px solid #d0e2f4", borderRadius: "10px", color: "#1a2e4a",
    outline: "none", boxSizing: "border-box",
    fontFamily: "'DM Sans', sans-serif", fontSize: "0.88rem", marginBottom: "0.6rem",
  };
  const inp = { ...sel };
  const lbl = { fontSize: "0.78rem", color: "#5a7090", marginBottom: "0.3rem", fontWeight: 600, display: "block" };
  const hint = { fontSize: "0.72rem", color: "#0ea5e9", marginTop: "-0.3rem", marginBottom: "0.4rem", fontStyle: "italic" };

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: "0.4rem" }}>
      <label style={lbl}>Provinsi</label>
      <select style={{ ...sel, cursor: "pointer" }} value={provId}
        onChange={(e) => {
          const opt = e.target.options[e.target.selectedIndex];
          onChange(prefix + "_provinsi", opt.text);
          onChange(prefix + "_provinsi_id", e.target.value);
          onChange(prefix + "_kabupaten", "");
          onChange(prefix + "_kecamatan", "");
          onChange(prefix + "_kelurahan", "");
        }}>
        <option value="">— Pilih Provinsi —</option>
        {PROVINCES_API.map(p => <option key={p.id} value={p.id}>{p.name}</option>)}
      </select>

      <label style={lbl}>Kabupaten / Kota</label>
      {kabList.length > 0 ? (
        <select style={{ ...sel, cursor: prov ? "pointer" : "not-allowed", opacity: prov ? 1 : 0.5 }}
          value={kab} disabled={!prov}
          onChange={(e) => {
            onChange(prefix + "_kabupaten", e.target.value);
            onChange(prefix + "_kecamatan", "");
            onChange(prefix + "_kelurahan", "");
          }}>
          <option value="">— Pilih Kabupaten/Kota —</option>
          {kabList.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      ) : (
        <input style={inp} placeholder="Ketik kabupaten/kota..." value={kab}
          onChange={(e) => onChange(prefix + "_kabupaten", e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#d0e2f4")} />
      )}

      <label style={lbl}>Kecamatan</label>
      {isSulsel && kecList.length > 0 ? (
        <select style={{ ...sel, cursor: kab ? "pointer" : "not-allowed", opacity: kab ? 1 : 0.5 }}
          value={kec} disabled={!kab}
          onChange={(e) => {
            onChange(prefix + "_kecamatan", e.target.value);
            onChange(prefix + "_kelurahan", "");
          }}>
          <option value="">— Pilih Kecamatan —</option>
          {kecList.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      ) : (
        <>
          <input style={inp} placeholder="Ketik nama kecamatan..." value={kec}
            onChange={(e) => onChange(prefix + "_kecamatan", e.target.value)}
            onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
            onBlur={(e) => (e.target.style.borderColor = "#d0e2f4")} />
          {prov && !isSulsel && <p style={hint}>* Ketik manual untuk provinsi di luar Sulawesi Selatan</p>}
        </>
      )}

      <label style={lbl}>Kelurahan / Desa</label>
      {isSulsel && kelList.length > 0 ? (
        <select style={{ ...sel, cursor: kec ? "pointer" : "not-allowed", opacity: kec ? 1 : 0.5 }}
          value={kel} disabled={!kec}
          onChange={(e) => onChange(prefix + "_kelurahan", e.target.value)}>
          <option value="">— Pilih Kelurahan/Desa —</option>
          {kelList.map(k => <option key={k} value={k}>{k}</option>)}
        </select>
      ) : (
        <input style={inp} placeholder="Ketik nama kelurahan/desa..." value={kel}
          onChange={(e) => onChange(prefix + "_kelurahan", e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#d0e2f4")} />
      )}
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

      {/* NIM */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>2.</span>NIM (Nomor Induk Mahasiswa)
        </p>
        <input
          style={baseInput}
          placeholder="Contoh: 09320220001"
          inputMode="numeric"
          value={answers.nim || ""}
          onChange={(e) => onChange("nim", e.target.value.replace(/[^0-9]/g, ""))}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#c8ddf0")}
        />
      </div>

      {/* Jenis Kelamin */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>3.</span>Jenis Kelamin
        </p>
        <RadioWithOther
          q={{ id: "q2", options: ["Laki-laki", "Perempuan"] }}
          value={answers.q2} otherValue={answers.q2_other}
          onChange={onChange} onOtherChange={onChange} />
      </div>

      {/* Asal Sekolah */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>4.</span>Asal Sekolah / SMA / SMK
        </p>
        <input style={baseInput} placeholder="Nama sekolah asal"
          value={answers.q3 || ""} onChange={(e) => onChange("q3", e.target.value)}
          onFocus={(e) => (e.target.style.borderColor = "#0ea5e9")}
          onBlur={(e) => (e.target.style.borderColor = "#c8ddf0")} />
      </div>

      {/* Asal Daerah */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>5.</span>Asal Daerah
        </p>
        <WilayahSelect prefix="asal" values={answers} onChange={onChange} />
      </div>

      {/* Alamat Domisili */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>6.</span>Alamat Domisili Saat Ini
        </p>
        <WilayahSelect prefix="domisili" values={answers} onChange={onChange} />
      </div>

      {/* Status Mahasiswa */}
      <div>
        <p style={{ fontSize: "0.92rem", color: "#1e3d6e", fontWeight: 500, marginBottom: "0.75rem" }}>
          <span style={{ color: "#0ea5e9", marginRight: "0.4rem" }}>7.</span>Status Mahasiswa
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
              q={{ id: "q_ayah_income", options: ["Di bawah Rp 1.500.000", "Rp 1.500.000 – Rp 3.000.000", "Rp 3.000.001 – Rp 5.000.000", "Rp 5.000.001 – Rp 10.000.000", "Di atas Rp 10.000.000"] }}
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
              q={{ id: "q_ibu_income", options: ["Di bawah Rp 1.500.000", "Rp 1.500.000 – Rp 3.000.000", "Rp 3.000.001 – Rp 5.000.000", "Rp 5.000.001 – Rp 10.000.000", "Di atas Rp 10.000.000", "Tidak bekerja / tidak berpenghasilan"] }}
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
      answers.nim?.trim() &&
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
