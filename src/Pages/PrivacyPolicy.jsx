import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/TermConditions.module.css";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import Footer from "../partials/Footer";

const PrivacyPolicy = () => {
  const [inView, setInview] = useState(1);
  const [firstLoad, setFirstLoad] = useState(false);

  const inViewRef = useRef();
  const inViewRef2 = useRef();
  const inViewRef3 = useRef();
  const inViewRef4 = useRef();
  const inViewRef5 = useRef();
  const inViewRef6 = useRef();
  const inViewRef7 = useRef();
  const inViewRef8 = useRef();
  const inViewRef9 = useRef();
  const inViewRef10 = useRef();

  useEffect(() => {
    if (!firstLoad) {
      window.addEventListener("scroll", () => {
        if (
          inViewRef.current &&
          inViewRef2.current &&
          inViewRef3.current &&
          inViewRef4.current &&
          inViewRef5.current &&
          inViewRef6.current &&
          inViewRef7.current &&
          inViewRef8.current &&
          inViewRef9.current &&
          inViewRef10.current
        ) {
          if (
            window.scrollY >=
            inViewRef9.current.scrollHeight +
              inViewRef8.current.scrollHeight +
              inViewRef7.current.scrollHeight +
              inViewRef6.current.scrollHeight +
              inViewRef5.current.scrollHeight +
              inViewRef4.current.scrollHeight +
              inViewRef3.current.scrollHeight +
              inViewRef2.current.scrollHeight +
              inViewRef.current.scrollHeight
          ) {
            setInview(10);
          } else if (
            window.scrollY >=
            inViewRef8.current.scrollHeight +
              inViewRef7.current.scrollHeight +
              inViewRef6.current.scrollHeight +
              inViewRef5.current.scrollHeight +
              inViewRef4.current.scrollHeight +
              inViewRef3.current.scrollHeight +
              inViewRef2.current.scrollHeight +
              inViewRef.current.scrollHeight
          ) {
            setInview(9);
          } else if (
            window.scrollY >=
            inViewRef7.current.scrollHeight +
              inViewRef6.current.scrollHeight +
              inViewRef5.current.scrollHeight +
              inViewRef4.current.scrollHeight +
              inViewRef3.current.scrollHeight +
              inViewRef2.current.scrollHeight +
              inViewRef.current.scrollHeight
          ) {
            setInview(8);
          } else if (
            window.scrollY >=
            inViewRef6.current.scrollHeight +
              inViewRef5.current.scrollHeight +
              inViewRef4.current.scrollHeight +
              inViewRef3.current.scrollHeight +
              inViewRef2.current.scrollHeight +
              inViewRef.current.scrollHeight
          ) {
            setInview(7);
          } else if (
            window.scrollY >=
            inViewRef5.current.scrollHeight +
              inViewRef4.current.scrollHeight +
              inViewRef3.current.scrollHeight +
              inViewRef2.current.scrollHeight +
              inViewRef.current.scrollHeight
          ) {
            setInview(6);
          } else if (
            window.scrollY >=
            inViewRef4.current.scrollHeight +
              inViewRef3.current.scrollHeight +
              inViewRef2.current.scrollHeight +
              inViewRef.current.scrollHeight
          ) {
            setInview(5);
          } else if (
            window.scrollY >=
            inViewRef3.current.scrollHeight +
              inViewRef2.current.scrollHeight +
              inViewRef.current.scrollHeight
          ) {
            setInview(4);
          } else if (
            window.scrollY >=
            inViewRef2.current.scrollHeight + inViewRef.current.scrollHeight
          ) {
            setInview(3);
          } else if (window.scrollY >= inViewRef.current.scrollHeight) {
            setInview(2);
          } else if (window.scrollY >= 0) {
            setInview(1);
          }
        }
      });
      setFirstLoad(true);
    }
  }, [firstLoad]);

  return (
    <div className={`content`}>
      <section>
        <div className={styles.Header}>
          <div className={styles.NavigationPanel}>
            <div className={styles.NavItemSecondary}>
              <Link to="/">Home</Link>
            </div>
            <div className={styles.NavItemSecondary}>
              <BiChevronRight />
            </div>
            <div
              className={styles.NavItemPrimary}
              style={{ marginRight: "100px" }}
            >
              Privacy Policy
            </div>
          </div>

          <h2>Kebijakan & Privasi</h2>
        </div>
        <div className={styles.MainBox}>
          <div className={styles.Sidebar}>
            <div className={styles.Menu}>
              <a href="#definition">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 1 ? styles.MenuItemActive : ""
                  }`}
                >
                  Definisi
                </div>
              </a>
              <a href="#collect-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 2 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pengumpulan Informasi Pribadi
                </div>
              </a>
              <a href="#use-of-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 3 ? styles.MenuItemActive : ""
                  }`}
                >
                  Penggunaan Informasi Pribadi
                </div>
              </a>
              <a href="#show-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 4 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pengungkapan Informasi Pribadi
                </div>
              </a>
              <a href="#access-correct-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 5 ? styles.MenuItemActive : ""
                  }`}
                >
                  Akses dan Koreksi Informasi Pribadi
                </div>
              </a>
              <a href="#store-loc-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 6 ? styles.MenuItemActive : ""
                  }`}
                >
                  Tempat Kami Menyimpan Informasi Pribadi Anda
                </div>
              </a>
              <a href="#security-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 7 ? styles.MenuItemActive : ""
                  }`}
                >
                  Keamanan Informasi Pribadi
                </div>
              </a>
              <a href="#conf-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 8 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pengakuan dan Persetujuan
                </div>
              </a>
              <a href="#sell-material-prom">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 9 ? styles.MenuItemActive : ""
                  }`}
                >
                  Materi Pemasaran dan Promosi
                </div>
              </a>
              <a href="#we-are-contact">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 10 ? styles.MenuItemActive : ""
                  }`}
                >
                  Cara Menghubungi Kami
                </div>
              </a>
            </div>
          </div>
          <div className={styles.MainContent}>
            <div className={styles.MenuCollpase}>
              <a href="#definition">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 1 ? styles.MenuItemActive : ""
                  }`}
                >
                  Definisi
                </div>
              </a>
              <a href="#collect-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 2 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pengumpulan Informasi Pribadi
                </div>
              </a>
              <a href="#use-of-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 3 ? styles.MenuItemActive : ""
                  }`}
                >
                  Penggunaan Informasi Pribadi
                </div>
              </a>
              <a href="#show-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 4 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pengungkapan Informasi Pribadi
                </div>
              </a>
              <a href="#access-correct-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 5 ? styles.MenuItemActive : ""
                  }`}
                >
                  Akses dan Koreksi Informasi Pribadi
                </div>
              </a>
              <a href="#store-loc-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 6 ? styles.MenuItemActive : ""
                  }`}
                >
                  Tempat Kami Menyimpan Informasi Pribadi Anda
                </div>
              </a>
              <a href="#security-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 7 ? styles.MenuItemActive : ""
                  }`}
                >
                  Keamanan Informasi Pribadi
                </div>
              </a>
              <a href="#conf-priv-info">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 8 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pengakuan dan Persetujuan
                </div>
              </a>
              <a href="#sell-material-prom">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 9 ? styles.MenuItemActive : ""
                  }`}
                >
                  Materi Pemasaran dan Promosi
                </div>
              </a>
              <a href="#we-are-contact">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 10 ? styles.MenuItemActive : ""
                  }`}
                >
                  Cara Menghubungi Kami
                </div>
              </a>
            </div>
            <div
              id="definition"
              class="bantuan-section"
              style={{ marginBottom: "20px" }}
              ref={inViewRef}
            >
              <h2>
                <b>Definisi</b>
              </h2>
              <p>
                Kebijakan Privasi berikut ini menjelaskan bagaimana Kami, (PT
                Cipta Wisata Medika, afiliasi-afiliasi Kami, dan pihak yang
                bekerjasama dengan Kami secara khusus untuk menyediakan layanan,
                produk dan/atau jasa kepada Anda, untuk selanjutnya disebut
                "Kami") mengumpulkan, menyimpan, menggunakan, mengolah,
                menguasai, mentransfer, mengungkapkan dan melindungi Informasi
                Pribadi Anda. Kebijakan Privasi ini berlaku bagi setiap
                pelanggan dan/atau pengguna (“Pelanggan”) dan penyedia tiket
                sebagai pemilik tiket dan/atau yang menyediakan tiket (“Penyedia
                Tiket”) pada situs agendakota (https://agendakota.id)
                ("Platform"), kecuali diatur pada kebijakan privasi yang
                terpisah. Mohon baca Kebijakan Privasi ini dengan seksama untuk
                memastikan bahwa Anda memahami bagaimana proses pengumpulan,
                penggunaan dan pengolahan data Kami. Kecuali didefinisikan lain,
                semua istilah dengan huruf kapital yang digunakan dalam
                Kebijakan Privasi ini memiliki arti yang sama dengan yang
                tercantum dalam Ketentuan Penggunaan Platform. Kebijakan Privasi
                ini mencakup hal-hal sebagai berikut:
              </p>
              <br />
              <ol>
                <li>Pengumpulan Informasi Pribadi</li>
                <li>Penggunaan Informasi Pribadi</li>
                <li>Pengungkapan Informasi Pribadi</li>
                <li>Penyimpanan Informasi Pribadi</li>
                <li>Akses dan koreksi Informasi Pribadi</li>
                <li>Tempat Kami menyimpan Informasi Pribadi Anda</li>
                <li>Keamanan Informasi Pribadi</li>
                <li>Perubahan atas Kebijakan Privasi</li>
                <li>Pengakuan dan Persetujuan</li>
                <li>Materi Pemasaran dan Promosi</li>
                <li>Data Anonim</li>
                <li>Platform Pihak Ketiga</li>
                <li>Cara untuk Menghubungi Kami</li>
              </ol>
            </div>
            <div
              id="collect-priv-info"
              style={{ marginBottom: "20px" }}
              ref={inViewRef2}
            >
              <h2>Pengumpulan Informasi Pribadi</h2>
              <p>
                Kami mengumpulkan informasi yang mengidentifikasikan atau dapat
                digunakan untuk mengidentifikasi, menghubungi, atau menemukan
                orang atau perangkat yang terkait dengan informasi tersebut
                ("Informasi Pribadi"). Kami dapat mengumpulkan informasi dalam
                berbagai macam bentuk dan tujuan (termasuk tujuan yang diizinkan
                berdasarkan peraturan perundang-undangan yang berlaku).
              </p>
              <br />
              <ol>
                <li>
                  <h5>Pengumpulan Informasi Pribadi Pelanggan</h5>
                  <p>
                    Ketika Anda membuat akun pada Platform, atau memberikan
                    Informasi Pribadi Anda melalui Platform, Informasi Pribadi
                    yang Kami kumpulkan dapat meliputi, namun tidak terbatas
                    pada: nama lengkap, alamat email, nomor telepon, tanggal
                    lahir, jenis kelamin, identifikasi (termasuk KTP, SIM,
                    paspor, atau jenis identifikasi lain), rekening bank, detail
                    kartu kredit, alamat domisili/alamat surat menyurat dan
                    keterangan lain yang dibutuhkan dari waktu ke waktu, sesuai
                    dengan keperluan bagi Kami untuk dapat menyediakan layanan,
                    produk dan/atau jasa kepada Anda serta sesuai dengan
                    Ketentuan Penggunaan yang disyaratkan masing-masing jenis
                    dan fungsi Platform.{" "}
                  </p>
                  <br />
                  <p>
                    Selain itu, untuk informasi lainnya, seperti nomor pengenal
                    unik, informasi e-voucher, informasi tiket elektronik
                    dan/atau informasi biometrik yang dikaitkan atau digabungkan
                    dengan Informasi Pribadi, maka informasi tersebut juga
                    dianggap sebagai Informasi Pribadi. Informasi Pribadi yang
                    Kami kumpulkan dapat diberikan oleh Anda secara langsung
                    atau oleh pihak ketiga (misalnya: ketika Anda mendaftar atau
                    menggunakan Platform, ketika Anda menghubungi layanan
                    pelanggan Kami, atau sebaliknya ketika Anda memberikan
                    Informasi Pribadi kepada Kami). Kami dapat mengumpulkan
                    informasi dalam berbagai macam bentuk dan tujuan (termasuk
                    tujuan yang diizinkan berdasarkan peraturan
                    perundang-undangan yang berlaku).
                  </p>
                </li>
                <br />
                <li>
                  <h5>Pengumpulan Informasi Pribadi Penyedia Tiket</h5>
                  <p>
                    Kami akan mengumpulkan Informasi Pribadi Penyedia Tiket pada
                    saat Penyedia Tiket melakukan pendaftaran pada Platform
                    Kami, bekerja sama dengan Kami dan menggunakan Platform,
                    layanan, produk dan/atau jasa Kami. Informasi Pribadi
                    Penyedia Tiket yang akan Kami kumpulkan, termasuk, namun
                    tidak terbatas pada: nama, alamat email, nomor telepon
                    Penyedia Tiket, nama resmi usaha atau perusahaan yang
                    didaftarkan Penyedia Tiket, dokumen korporasi, Nomor Pokok
                    Wajib Pajak, serta data rekening Penyedia Tiket, dan segala
                    informasi dan keterangan lain yang Kami butuhkan dan akan
                    Kami sampaikan kepada Penyedia Tiket dari waktu ke waktu.
                    Kami juga akan mengumpulkan seluruh informasi transaksi,
                    termasuk informasi pemesanan dan pembelian Tiket yang
                    terjadi di dalam Platform Kami setelah Penyedia Tiket
                    terhubung dengan Platform Kami.
                  </p>
                </li>
                <br />
                <li>
                  <h5>
                    Informasi yang Kami kumpulkan dari Anda atau perangkat
                    seluler Anda secara langsung
                  </h5>
                  <ul>
                    <li>
                      Ketika Anda mendaftar dan membuat akun serta menggunakan
                      Platform, Anda harus memberikan kepada Kami Informasi
                      Pribadi tertentu, antara lain nama, alamat fisik, alamat
                      email, nomor telepon Anda, dan/atau kata sandi yang akan
                      Anda gunakan untuk mengakses Platform setelah pendaftaran.
                    </li>
                    <li>
                      Apabila Anda adalah Pelanggan, ketika Anda menggunakan
                      Platform untuk membeli Tiket, Anda memberikan informasi
                      sebagaimana relevan, seperti, jenis Tiket, dan/atau total
                      biaya transaksi Tiket
                    </li>
                    <li>
                      Apabila Anda adalah Penyedia Tiket, Anda akan memberikan
                      kepada Kami data pesanan dan data terkait pengelolaan
                      Tiket, jumlah dana atas transaksi Tiket dan/atau data
                      lainnya sebagai pendukung ekosistem situs.
                    </li>
                    <li>
                      Sehubungan dengan pembayaran dengan fasilitas uang
                      elektronik yang tersedia dalam Platform Kami, Kami akan
                      mengumpulkan informasi terkait transaksi uang elektronik
                      tersebut oleh Anda, termasuk namun tidak terbatas pada
                      nama bank, nama pemegang rekening, nomor rekening dan
                      jumlah dana yang ditransaksikan melalui fasilitas uang
                      elektronik tersebut.
                    </li>
                    <li>
                      Apabila Anda adalah Pelanggan, Anda dapat memberikan kode
                      rujukan (referral code) kepada pihak lain, dalam bentuk
                      suatu pesan yang dapat Kami siapkan untuk Anda kirimkan
                      atau terbitkan melalui fasilitas pengiriman pesan
                      elektronik atau melalui penyedia media sosial. Anda dapat
                      mengubah kalimat pesan yang telah Kami siapkan sebelum
                      Anda mengirimkannya. Kami tidak akan mengumpulkan data
                      pihak yang Anda kirimi pesan tersebut.
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <h5>
                    Informasi yang dikumpulkan setiap kali Anda menggunakan
                    Platform atau mengunjungi website Kami
                  </h5>
                  <ul>
                    <li>
                      Setiap kali Anda menggunakan atau mengunjungi Platform
                      Kami, Kami dapat mengumpulkan data teknis tertentu
                      sehubungan dengan penggunaan Anda seperti, alamat protokol
                      internet, informasi halaman web yang sebelumnya atau
                      selanjutnya dilihat, durasi setiap kunjungan/sesi,
                      identitas perangkat internet atau alamat kontrol akses
                      media, dan informasi mengenai produsen, model, dan sistem
                      operasi dari perangkat yang Anda gunakan untuk mengakses
                      Platform Kami.
                    </li>
                    <li>
                      Ketika Anda menggunakan atau mengunjungi Platform Kami,
                      informasi tertentu juga dapat dikumpulkan secara otomatis
                      dengan menggunakan cookies. Cookies adalah berkas data
                      kecil yang tersimpan pada komputer atau perangkat seluler
                      Anda. Kami menggunakan cookies untuk melacak aktivitas
                      Pengguna dengan tujuan untuk meningkatkan antarmuka dan
                      pengalaman Pengguna dan mengingat preferensi penelusuran
                      Anda dalam Platform Kami. Sebagian besar perangkat seluler
                      dan peramban internet mendukung penggunaan cookies namun
                      Anda dapat menyesuaikan pengaturan pada perangkat seluler
                      atau peramban internet Anda untuk menolak beberapa jenis
                      cookies atau cookies spesifik tertentu. Perangkat seluler
                      dan/atau peramban Anda juga memungkinkan Anda untuk
                      menghapus cookies apa pun yang sebelumnya telah tersimpan.
                      Namun demikian, hal itu dapat mempengaruhi fungsi-fungsi
                      yang tersedia pada Platform atau situs web Kami.
                    </li>
                    <li>
                      Setiap kali Anda menggunakan Platform melalui perangkat
                      seluler, Kami akan melacak dan mengumpulkan informasi
                      lokasi geografis Anda dalam waktu sebenarnya. Dalam
                      beberapa kasus, Anda akan diminta atau diharuskan untuk
                      mengaktifkan Global Positioning System (GPS) pada
                      perangkat seluler Anda untuk memungkinkan Kami agar dapat
                      memberikan Anda pengalaman yang lebih baik dalam
                      menggunakan Platform. Anda dapat menonaktifkan informasi
                      pelacakan lokasi geografis pada perangkat seluler Anda
                      untuk sementara waktu. Namun, hal ini dapat mempengaruhi
                      fungsi-fungsi yang tersedia pada Platform.
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <h5>Informasi yang dikumpulkan dari pihak ketiga</h5>
                  <p>
                    Kami juga dapat mengumpulkan Informasi Pribadi Anda dari
                    pihak ketiga (termasuk afiliasi, agen, vendor, pemasok,
                    kontraktor, mitra, dan pihak lainnya yang memberikan layanan
                    kepada Kami, melakukan tugas atas nama Kami, atau dengan
                    siapa Kami melakukan kerja sama). Dalam kasus tersebut, Kami
                    hanya akan mengumpulkan Informasi Pribadi Anda untuk atau
                    sehubungan dengan tujuan yang melibatkan pihak ketiga
                    tersebut atau tujuan kerja sama Kami dengan pihak ketiga
                    tersebut (tergantung pada situasinya).
                  </p>
                </li>
                <br />
                <li>
                  <h5>
                    Informasi tentang pihak ketiga yang Anda berikan kepada Kami
                  </h5>
                  <p>
                    Anda dapat memberikan kepada Kami Informasi Pribadi yang
                    berkaitan dengan individu pihak ketiga lainnya (termasuk
                    Informasi Pribadi yang berkaitan dengan pasangan Anda,
                    anggota keluarga, teman, atau individu lain). Anda tentu
                    saja akan memerlukan persetujuan dari mereka terlebih dahulu
                    untuk melakukannya - lihat “Pengakuan dan Persetujuan”, di
                    bawah, untuk informasi lebih lanjut.
                  </p>
                </li>
              </ol>
            </div>
            <div
              id="use-of-priv-info"
              style={{ marginBottom: "20px" }}
              ref={inViewRef3}
            >
              <h2>
                <b>Penggunaan Informasi Pribadi</b>
              </h2>
              <br />
              <p>
                Anda setuju untuk memberikan Informasi Pribadi kepada Kami dan
                Kami dapat menggunakan Informasi Pribadi Anda untuk tujuan
                berikut maupun tujuan lain yang diizinkan oleh peraturan
                perundang-undangan yang berlaku:
              </p>
              <br />
              <ol>
                <li>
                  <p>
                    Jika Anda adalah Pengguna, Kami dapat menggunakan Informasi
                    Pribadi Anda:
                  </p>
                  <ul>
                    <li>
                      Untuk mengidentifikasi dan mendaftarkan Anda sebagai
                      Pengguna dan untuk mengadministrasikan, menonaktifkan,
                      atau mengelola akun Anda
                    </li>
                    <li>
                      Untuk memfasilitasi atau memungkinkan verifikasi apapun
                      yang menurut pertimbangan Kami diperlukan sebelum Kami
                      mendaftarkan Anda sebagai Pengguna, termasuk proses
                      Mengenal Pelanggan (Know Your Customer)
                    </li>
                    <li>
                      Untuk memfasilitasi penggunaan layanan, produk, jasa
                      dan/atau akses ke Platform
                    </li>
                    <li>
                      Untuk memproses pesanan yang Anda kirimkan melalui
                      Platform kepada penjual pihak ketiga. Pembayaran produk
                      yang Anda buat melalui Platform, baik yang penjual pihak
                      ketiga, akan diproses oleh agen Kami
                    </li>
                    <li>
                      Untuk mengirimkan produk yang telah dibeli melalui
                      Platform, yang dijual oleh penjual pihak ketiga. Kami
                      dapat menyampaikan Informasi Pribadi Anda kepada pihak
                      ketiga dalam rangka pengiriman produk kepada Anda
                      (misalnya untuk kurir atau supplier Kami), baik produk
                      tersebut dijual melalui Platform oleh Kami atau penjual
                      pihak ketiga
                    </li>
                    <li>
                      Untuk memberi informasi pengiriman produk pada Anda, baik
                      yang dijual melalui Platform oleh Kami atau penjual pihak
                      ketiga, dan untuk kebutuhan pendukung konsumen
                    </li>
                    <li>
                      Untuk membandingkan informasi, dan memverifikasinya dengan
                      pihak ketiga dalam rangka memastikan keakuratan informasi
                    </li>
                    <li>
                      Untuk memverifikasi dan melakukan transaksi keuangan dalam
                      kaitannya dengan pembayaran yang Anda buat secara online
                      mengaudit pengunduhan data dari Platform
                    </li>
                    <li>
                      Untuk memberitahu Anda mengenai segala pembaruan pada
                      Platform atau perubahan pada layanan yang disediakan,
                      memperbarui layout dan / atau konten dari halaman Platform
                      dan menyesuaikannya untuk Pengguna
                    </li>
                    <li>
                      {" "}
                      Untuk mengidentifikasi pengunjung pada Platform dan
                      melakukan penelitian tentang demografi dan perilaku
                      Pengguna Kami
                    </li>
                    <li>
                      Untuk memelihara, mengembangkan, menguji, meningkatkan,
                      dan mempersonalisasikan Platform untuk memenuhi kebutuhan
                      dan preferensi Anda sebagai Pengguna
                    </li>
                    <li>
                      Untuk memperluas dan/atau meningkatkan produk, layanan dan
                      jasa yang Kami sediakan, termasuk namun tidak terbatas
                      pada antarmuka dan pengalaman Anda menggunakan Platform
                      Kami
                    </li>
                    <li>
                      Untuk mengirimkan komunikasi pemasaran, materi promosi,
                      survei tentang produk dan layanan Kami atau penjual pihak
                      ketiga dari waktu ke waktu atau newsletter dari Kami dan
                      afiliasi dan mitra Kami
                    </li>
                    <li>
                      Untuk mengolah dan menanggapi pertanyaan dan saran yang
                      diterima dari Anda dan
                    </li>
                    <li>
                      Untuk penggunaan lain oleh Kami sesuai ketentuan peraturan
                      perundang-undangan yang berlaku.
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <p>
                    Jika Anda adalah Penyedia Tiket, Kami dapat menggunakan
                    Informasi Pribadi Anda untuk:
                  </p>
                  <ul>
                    <li>
                      {" "}
                      Untuk mengidentifikasi Anda dan mendaftarkan Anda sebagai
                      Penyedia Tiket dan untuk mengadministrasi, mengelola atau
                      memverifikasi Akun Anda
                    </li>
                    <li>
                      Untuk memfasilitasi atau memungkinkan verifikasi apapun
                      yang menurut pertimbangan Kami mungkin perlu dilakukan
                      sebelum Kami dapat mendaftarkan Anda sebagai Penyedia
                      Tiket
                    </li>
                    <li>
                      Untuk memungkinkan Anda memberikan produk Anda kepada
                      Pengguna
                    </li>
                    <li>
                      Untuk mengolah, memfasilitasi, dan menyelesaikan
                      pembayaran kepada Anda terkait dengan produk yang telah
                      Anda berikan
                    </li>
                    <li>
                      Untuk berkomunikasi dengan Anda dan mengirimkan Anda
                      informasi terkait dengan penyediaan produk Anda, termasuk
                      untuk menyampaikan pesanan Pengguna kepada Anda dan untuk
                      memfasilitasi penerimaan Anda atas pesanan tersebut
                    </li>
                    <li>
                      Untuk memberikan Anda pemberitahuan dan pembaruan pada
                      Platform atau perubahan cara penyediaan layanan, produk
                      dan/atau jasa
                    </li>
                    <li>
                      Untuk memberi Anda laporan terkait dengan produk yang
                      telah Anda sediakan
                    </li>
                    <li>
                      Untuk memproses dan menanggapi saran dari Pengguna
                      terhadap produk yang telah Anda berikan
                    </li>
                    <li>
                      Untuk memelihara, mengembangkan, menguji, meningkatkan,
                      dan mempersonalisasikan Platform untuk memenuhi kebutuhan
                      dan preferensi Anda sebagai Penyedia Tayanan
                    </li>
                    <li>
                      Untuk memantau dan menganalisis aktivitas, perilaku, dan
                      data demografis, termasuk kebiasaan dan daya tanggap
                      Penyedia Tiket untuk berbagai layanan yang tersedia pada
                      Platform
                    </li>
                    <li>
                      Untuk menawarkan atau menyediakan layanan dari afiliasi
                      atau mitra Kami
                    </li>
                    <li>
                      Untuk memperluas dan/atau meningkatkan produk, layanan dan
                      jasa yang Kami sediakan, termasuk namun tidak terbatas
                      pada antarmuka dan pengalaman Anda
                    </li>
                    <li>
                      Untuk mengirimkan Anda komunikasi pemasaran, iklan, promo,
                      survei, dan penawaran khusus atau promosi secara langsung
                      atau tertuju da
                    </li>
                    <li>
                      Untuk penggunaan lain oleh Kami sesuai ketentuan peraturan
                      perundang-undangan yang berlaku
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <p>
                    Baik Anda merupakan Pengguna atau pihak yang memberikan
                    Informasi Pribadi kepada Kami, Kami juga dapat menggunakan
                    Informasi Pribadi Anda secara lebih umum untuk tujuan-tujuan
                    sebagai berikut (walaupun dalam kasus tertentu Kami akan
                    bertindak secara wajar dan tidak menggunakan Informasi
                    Pribadi Anda lebih dari apa yang diperlukan untuk tujuan
                    tersebut):
                  </p>
                  <ul>
                    <li> Untuk melakukan proses dan fungsi bisnis terkait</li>
                    <li>
                      Untuk memantau penggunaan aplikasi dan mengelola,
                      mendukung serta meningkatkan efisiensi kinerja,
                      perkembangan, pengalaman Pengguna dan fungsi-fungsi
                      Platform
                    </li>
                    <li>
                      Untuk memberikan bantuan sehubungan dengan dan untuk
                      menyelesaikan kesulitan teknis atau masalah operasional
                      dengan Platform atau layanan
                    </li>
                    <li>
                      Untuk menghasilkan informasi statistik dan data analitik
                      anonim untuk tujuan pengujian, penelitian, analisis,
                      pengembangan produk, kemitraan komersial, dan kerja sama
                    </li>
                    <li>
                      Untuk mencegah, mendeteksi dan menyelidiki segala kegiatan
                      yang dilarang, ilegal, tidak sah, atau curang
                    </li>
                    <li>
                      Untuk memfasilitasi transaksi aset bisnis (yang dapat
                      berupa penggabungan, akuisisi, atau penjualan aset) yang
                      melibatkan Kami dan/atau afiliasi Kami dan
                    </li>
                    <li>
                      Untuk memungkinkan Kami mematuhi semua kewajiban
                      berdasarkan peraturan perundang-undangan yang berlaku,
                      (namun tidak terbatas pada menanggapi permintaan,
                      penyelidikan, atau arahan peraturan) dan melakukan
                      pemeriksaan audit, uji tuntas dan penyelidikan.
                    </li>
                  </ul>
                </li>
              </ol>
            </div>
            <div
              id="show-priv-info"
              style={{ marginBottom: "20px" }}
              ref={inViewRef4}
            >
              <h2>Pengungkapan Informasi Pribadi</h2>
              <br />
              <ol>
                <li>
                  <p>
                    Kami dapat mengungkapkan atau membagikan Informasi Pribadi
                    Anda dengan afiliasi dan pihak lain untuk tujuan sebagai
                    berikut ini serta untuk tujuan lain yang diizinkan oleh
                    peraturan perundang-undangan yang berlaku:
                  </p>
                  <ul>
                    <li>
                      {" "}
                      Jika Anda adalah Pengguna, untuk memungkinkan Penyedia
                      Tiket untuk memberikan layanan kepada Anda
                    </li>
                    <li>
                      Jika Anda adalah Penyedia Tiket, untuk memungkinkan
                      Pengguna menerima layanan dari Anda.
                    </li>
                    <li>
                      Untuk tujuan pemrosesan pembayaran, Kami dapat
                      mengungkapkan Informasi Pribadi Anda seperti nomor kartu
                      kredit, nama yang tertera dalam kartu kredit Anda atau
                      nomor rekening yang Anda gunakan untuk pembayaran
                      transaksi Anda melalui Platform, kepada bank terkait atau
                      bank penerbit kartu kredit Anda
                    </li>
                    <li>
                      Jika disyaratkan atau diotorisasikan oleh peraturan
                      perundang-undangan yang berlaku (termasuk namun tidak
                      terbatas pada menanggapi pertanyaan dari badan atau
                      otoritas terkait regulasi, penyelidikan atau pedoman, atau
                      mematuhi persyaratan atau ketentuan pengarsipan dan
                      pelaporan berdasarkan undang-undang), untuk tujuan yang
                      ditentukan dalam peraturan perundang-undangan yang berlaku
                    </li>
                    <li>
                      Jika terdapat proses hukum dalam bentuk apapun antara Anda
                      dengan Kami, atau antara Anda dengan pihak lain,
                      sehubungan dengan, atau terkait dengan layanan, untuk
                      keperluan proses hukum tersebut
                    </li>
                    <li>
                      Sehubungan dengan segala proses verifikasi yang menurut
                      Kami atau Penyedia Tiket perlu sebelum Kami mendaftarkan
                      Anda sebagai Pengguna, termasuk proses Mengenal Pelanggan
                      (Know Your Customer)
                    </li>
                    <li>
                      Dalam keadaan darurat terkait kesehatan dan/atau
                      keselamatan Anda (baik Anda adalah Pengguna atau Penyedia
                      Tiket) untuk keperluan menangani keadaan darurat tersebut
                    </li>
                    <li>
                      sehubungan dengan, penggabungan, penjualan aset
                      perusahaan, konsolidasi atau restrukturisasi, pembiayaan
                      atau akuisisi semua atau sebagian dari bisnis Kami oleh
                      atau ke perusahaan lain, untuk keperluan transaksi
                      tersebut (bahkan jika kemudian transaksi tidak
                      dilanjutkan)
                    </li>
                    <li>
                      Kepada pihak ketiga (termasuk agen, vendor, pemasok,
                      kontraktor, mitra, dan pihak lain yang memberikan layanan
                      kepada Kami atau Anda, melakukan tugas atas nama Kami,
                      atau pihak dengan siapa Kami mengadakan kerja sama
                      komersial), untuk atau sehubungan dengan tujuan di mana
                      pihak ketiga tersebut terlibat atau tujuan kerja sama Kami
                      dengan pihak ketiga tersebut (tergantung keadaannya), yang
                      dapat mencakup diperbolehkannya pihak ketiga tersebut
                      untuk memperkenalkan atau menawarkan produk atau layanan
                      kepada Anda, atau melakukan kegiatan lain termasuk
                      pemasaran, penelitian, analisis dan pengembangan produk
                      dan
                    </li>
                    <li>
                      Dalam hal Kami berbagi Informasi Pribadi dengan afiliasi,
                      Kami akan melakukannya dengan maksud agar mereka membantu
                      Kami dalam menyediakan Platform, untuk mengoperasikan
                      bisnis Kami (termasuk, ketika Anda berlangganan milis
                      Kami, untuk tujuan pemasaran langsung), atau untuk tujuan
                      pengolahan data atas nama Kami. Misalnya, sebuah afiliasi
                      Kami di negara lain dapat mengolah dan/atau menyimpan
                      Informasi Pribadi Anda atas nama perusahaan grup Kami di
                      negara Anda. Semua afiliasi Kami berkomitmen untuk
                      mengolah Informasi Pribadi yang mereka terima dari Kami
                      sesuai dengan Kebijakan Privasi dan peraturan
                      perundang-undangan yang berlaku ini.
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  <p>
                    Ketika Informasi Pribadi tidak perlu dikaitkan dengan Anda,
                    Kami akan melakukan upaya yang wajar untuk menghapus
                    dikaitkannya Informasi Pribadi tersebut dengan Anda sebagai
                    individu sebelum mengungkapkan atau berbagi informasi
                    tersebut.
                  </p>
                </li>
                <br />
                <li>
                  <p>
                    Kami tidak akan menjual atau menyewakan Informasi Pribadi
                    Anda.
                  </p>
                </li>
                <br />
                <li>
                  <p>
                    Selain sebagaimana diatur dalam Kebijakan Privasi ini, Kami
                    dapat mengungkapkan dan membagikan Informasi Pribadi Anda
                    jika Kami telah memberitahu Anda dan telah memperoleh
                    persetujuan Anda untuk pengungkapan atau pembagian tersebut.
                  </p>
                </li>
              </ol>
            </div>
            <div
              id="access-correct-priv-info"
              style={{ marginBottom: "20px" }}
              ref={inViewRef5}
            >
              <h2>Akses dan Koreksi Informasi Pribadi</h2>
              <br />
              <ol>
                <li>
                  {" "}
                  Tunduk pada peraturan perundang-undangan yang berlaku, Anda
                  dapat memperbarui Informasi Pribadi Anda kapan saja dengan
                  mengakses akun dalam Platform. Jika Anda tidak memiliki akun
                  dengan Kami, maka Anda dapat menghubungi Kami pada alamat
                  email di bawah.
                </li>
                <li>
                  Kami berhak mengambil langkah-langkah untuk berbagi pembaruan
                  Informasi Pribadi Anda dengan pihak ketiga dan afiliasi Kami
                  jika Informasi Pribadi Anda masih diperlukan untuk tujuan
                  tersebut di atas.
                </li>
                <li>
                  Jika Anda ingin melihat Informasi Pribadi Anda yang Kami
                  miliki atau menanyakan tentang Informasi Pribadi Anda yang
                  telah atau mungkin akan digunakan atau diungkapkan oleh Kami
                  dalam satu tahun terakhir, silahkan hubungi Kami di alamat
                  e-mail Kami di bawah. Kami berhak untuk membebankan biaya
                  administrasi yang wajar atas keperluan ini.
                </li>
                <li>
                  Jika Anda memiliki akun Platform, Anda dapat mengakses rincian
                  pesanan Anda dengan cara masuk ke akun Anda di Platform. Di
                  sini Anda dapat melihat rincian pesanan Anda yang telah
                  selesai, rincian yang masih terbuka, rincian yang segera akan
                  dikirim, dan pengelolaan alamat lengkap Anda, rincian bank,
                  dan setiap newsletter yang mungkin telah berlangganan dengan
                  Anda.
                </li>
              </ol>
            </div>
            <div
              id="store-loc-priv-info"
              style={{ marginBottom: "20px" }}
              ref={inViewRef6}
            >
              <h2>Tempat Kami Menyimpan Informasi Pribadi Anda</h2>
              <br />
              <ol>
                <li>
                  {" "}
                  Informasi Pribadi dari Anda yang Kami kumpulkan dapat
                  disimpan, ditransfer, atau diolah oleh Penyedia Tiket pihak
                  ketiga. Kami akan menggunakan semua upaya yang wajar untuk
                  memastikan bahwa semua Penyedia Tiket pihak ketiga tersebut
                  memberikan tingkat perlindungan yang sebanding dengan komitmen
                  Kami berdasarkan Kebijakan Privasi ini.
                </li>
                <li>
                  Informasi Pribadi Anda juga dapat disimpan atau diproses di
                  luar negara Anda oleh pihak yang bekerja untuk Kami di negara
                  lain, atau oleh Penyedia Tiket pihak ketiga, vendor, pemasok,
                  mitra, kontraktor, atau afiliasi Kami. Dalam hal tersebut,
                  Kami akan memastikan bahwa Informasi Pribadi tersebut tetap
                  menjadi subjek dari tingkat perlindungan yang sebanding dengan
                  apa yang disyaratkan dalam hukum negara Anda (dan, dalam hal
                  apapun, sejalan dengan komitmen Kami dalam Kebijakan Privasi
                  ini).
                </li>
              </ol>
              <br />
              <h2>Penyimpanan Informasi Pribadi</h2>
              <br />
              <ol>
                <li>
                  Informasi Pribadi Anda hanya akan disimpan selama diperlukan
                  untuk memenuhi tujuan dari pengumpulannya, atau selama
                  penyimpanan tersebut diperlukan atau diperbolehkan oleh
                  peraturan perundang-undangan yang berlaku. Kami akan berhenti
                  menyimpan Informasi Pribadi, atau menghapus maksud dari
                  dikaitkannya Informasi Pribadi tersebut dengan Anda sebagai
                  individu, segera setelah dianggap bahwa tujuan pengumpulan
                  Informasi Pribadi tersebut tidak lagi dibutuhkan dengan
                  menyimpan Informasi Pribadi dan penyimpanan tidak lagi
                  diperlukan untuk tujuan bisnis atau secara hukum.
                </li>

                <br />
                <li>
                  Mohon diperhatikan bahwa masih ada kemungkinan bahwa beberapa
                  Informasi Pribadi Anda disimpan oleh pihak lain (termasuk oleh
                  Penyedia Tiket jika Anda adalah Pengguna; atau oleh Pengguna,
                  jika Anda adalah Penyedia Tiket) dengan cara tertentu.
                  Informasi yang disampaikan melalui komunikasi antara Pengguna
                  dan Penyedia Tiket yang dilakukan selain melalui penggunaan
                  Platform (seperti melalui panggilan telepon, SMS, pesan
                  seluler atau cara komunikasi lainnya) juga dapat disimpan
                  dengan beberapa cara. Kami tidak mengizinkan dan mendorong
                  penyimpanan Informasi Pribadi dengan cara demikian dan Kami
                  tidak bertanggung jawab kepada Anda untuk hal tersebut. Kami
                  tidak akan bertanggung jawab atas penyimpanan Informasi
                  Pribadi Anda. Anda setuju untuk mengganti rugi, membela, dan
                  membebaskan Kami, pejabat, direktur, karyawan, agen, mitra,
                  pemasok, kontraktor, dan afiliasi Kami dari dan terhadap
                  setiap dan segala klaim, kerugian, kewajiban, biaya,
                  kerusakan, dan ongkos (termasuk tetapi tidak terbatas pada
                  biaya hukum dan pengeluaran biaya ganti rugi penuh) yang
                  dihasilkan secara langsung atau tidak langsung dari setiap
                  penyimpanan yang tidak sah atas Informasi Pribadi Anda.
                </li>
              </ol>
            </div>
            <div
              id="security-priv-info"
              style={{ marginBottom: "20px" }}
              ref={inViewRef7}
            >
              <h2>Keamanan Informasi Pribadi</h2>
              <br />
              <ol>
                <li>
                  Kerahasiaan Informasi Pribadi Anda adalah hal yang terpenting
                  bagi Kami. Kami akan memberlakukan upaya terbaik untuk
                  melindungi dan mengamankan data dan Informasi Pribadi Anda
                  dari akses, pengumpulan, penggunaan atau pengungkapan oleh
                  orang-orang yang tidak berwenang dan dari pengolahan yang
                  bertentangan dengan hukum, kehilangan yang tidak disengaja,
                  pemusnahan dan kerusakan atau risiko serupa. Namun, pengiriman
                  informasi melalui internet tidak sepenuhnya aman. Walau Kami
                  akan berusaha sebaik mungkin untuk melindungi Informasi
                  Pribadi Anda, Anda mengakui bahwa Kami tidak dapat menjamin
                  keutuhan dan keakuratan Informasi Pribadi apa pun yang Anda
                  kirimkan melalui Internet, atau menjamin bahwa Informasi
                  Pribadi tersebut tidak akan dicegat, diakses, diungkapkan,
                  diubah atau dihancurkan oleh pihak ketiga yang tidak
                  berwenang, karena faktor-faktor di luar kendali Kami. Anda
                  bertanggung jawab untuk menjaga rincian akun Anda termasuk
                  username, password, rincian pesanan Anda dan tidak
                  memberikannya kepada pihak ketiga yang tidak berwenang. Kami
                  tidak memiliki kewajiban menanggung penyalahgunaan username,
                  password, dan rincian pesanan Anda kecuali sebagaimana yang
                  tercantum dalam masing-masing Syarat & Ketentuan Platform.
                  Anda juga harus selalu menjaga dan bertanggung jawab atas
                  keamanan perangkat yang Anda gunakan.
                </li>
                <br />
                <li>
                  <p>
                    Kami memastikan bahwa seluruh informasi yang dikumpulkan
                    tersimpan dengan aman. Kami menjaga Informasi Pribadi Anda
                    dengan cara:
                  </p>
                  <ul>
                    <li> Membatasi akses ke informasi pribadi</li>
                    <li>
                      Mengikuti kemajuan teknologi pengamanan untuk mencegah
                      akses komputer tidak sah
                    </li>
                    <li>
                      Dengan aman menghilangkan Informasi Pribadi Anda ketika
                      tidak lagi digunakan untuk keperluan hukum atau bisnis.
                    </li>
                  </ul>
                </li>
                <br />
                <li>
                  Platform Kami menggunakan teknologi enkripsi 256-bit dan
                  2048-bit SSL (secure socket layer) saat memproses rincian
                  keuangan Anda. Teknologi enkripsi yang Kami gunakan merupakan
                  standar kemanan dalam industri.
                </li>
                <br />
                <li>
                  Password Anda adalah kunci untuk masuk akun Anda. Silakan
                  gunakan nomor unik, huruf dan karakter khusus, dan jangan
                  berbagi password akun Anda kepada siapa pun. Jika Anda berbagi
                  password Anda dengan orang lain, Anda akan bertanggung jawab
                  untuk semua tindakan dan konsekuensi yang diambil atas nama
                  akun Anda. Jika Anda kehilangan kontrol password Anda, Anda
                  mungkin kehilangan kontrol atas informasi pribadi Anda dan
                  informasi lainnya yang disampaikan dalam Platform. Anda juga
                  bisa dikenakan tindakan yang mengikat secara hukum yang
                  diambil atas nama Anda. Oleh karena itu, jika password Anda
                  terganggu untuk alasan apapun atau jika Anda memiliki alasan
                  yang dapat dipercaya bahwa password Anda telah terganggu, Anda
                  harus segera menghubungi Kami dan mengganti password Anda.
                  Anda diingatkan untuk selalu keluar (log off) dari akun Anda
                  dan menutup browser ketika selesai menggunakan komputer
                  bersama.
                </li>
                <br />
                <li>
                  Spam, spyware, atau virus tidak diperbolehkan dalam Platform.
                  Harap mengatur dan menjaga preferensi komunikasi Anda sehingga
                  Kami dapat mengirimkan komunikasi seperti yang Anda inginkan.
                  Anda tidak memiliki izin atau tidak diizinkan untuk
                  menambahkan Pengguna lain (bahkan pengguna yang telah membeli
                  item dari Anda) ke milis Anda (email atau surat fisik) tanpa
                  persetujuan mereka. Anda tidak boleh mengirim pesan yang
                  mengandung spam, spyware atau virus melalui Platform. Jika
                  Anda ingin melaporkan pesan yang mencurigakan, silahkan
                  hubungi Kami di alamat email Kami di bawah.
                </li>
              </ol>
            </div>
            <div
              id="conf-priv-info"
              style={{ marginBottom: "20px" }}
              ref={inViewRef8}
            >
              <h2>Pengakuan dan Persetujuan</h2>
              <br />
              <ol>
                <li>
                  {" "}
                  Dengan menyetujui Kebijakan Privasi, Anda mengakui bahwa Anda
                  telah membaca dan memahami Kebijakan Privasi ini dan
                  menyetujui segala ketentuannya. Secara khusus, Anda setuju dan
                  memberikan persetujuan kepada Kami untuk mengumpulkan,
                  menggunakan, membagikan, mengungkapkan, menyimpan,
                  mentransfer, dan/atau mengolah Informasi Pribadi Anda sesuai
                  dengan Kebijakan Privasi ini.
                </li>
                <li>
                  Dalam keadaan di mana Anda memberikan kepada Kami Informasi
                  Pribadi yang berkaitan dengan individu lain (seperti Informasi
                  Pribadi yang berkaitan dengan pasangan Anda, anggota keluarga,
                  teman, atau pihak lain), Anda menyatakan dan menjamin bahwa
                  Anda telah memperoleh persetujuan dari individu tersebut
                  untuk, dan dengan ini menyetujui atas nama individu tersebut
                  untuk, pengumpulan, penggunaan, pengungkapan dan pengolahan
                  Informasi Pribadi mereka oleh Kami.
                </li>
                <li>
                  Anda dapat menarik persetujuan Anda untuk setiap atau segala
                  pengumpulan, penggunaan atau pengungkapan Informasi Pribadi
                  Anda kapan saja dengan memberikan kepada Kami pemberitahuan
                  yang wajar secara tertulis menggunakan rincian kontak yang
                  disebutkan di bawah ini. Anda juga dapat menarik persetujuan
                  pengiriman komunikasi dan informasi tertentu dari Kami melalui
                  fasilitas "opt-out" atau pilihan "berhenti berlangganan" yang
                  tersedia dalam pesan Kami kepada Anda. Tergantung pada keadaan
                  dan sifat persetujuan yang Anda tarik, Anda harus memahami dan
                  mengakui bahwa setelah penarikan persetujuan tersebut, Anda
                  mungkin tidak lagi dapat menggunakan Platform atau layanan.
                  Penarikan persetujuan Anda dapat mengakibatkan penghentian
                  Akun Anda atau hubungan kontraktual Anda dengan Kami, dengan
                  semua hak dan kewajiban yang muncul sepenuhnya harus dipenuhi.
                  Setelah menerima pemberitahuan untuk menarik persetujuan untuk
                  pengumpulan, penggunaan atau pengungkapan Informasi Pribadi
                  Anda, Kami akan menginformasikan Anda tentang konsekuensi yang
                  mungkin terjadi dari penarikan tersebut sehingga Anda dapat
                  memutuskan apakah Anda tetap ingin menarik persetujuan.
                </li>
              </ol>
            </div>
            <div
              id="sell-material-prom"
              style={{ marginBottom: "20px" }}
              ref={inViewRef9}
            >
              <h2>Materi Pemasaran dan Promosi</h2>
              <br />
              <p>
                Anda memberikan persetujuan kepada Kami dan afiliasi atau pihak
                yang bekerja sama dengan Kami untuk dapat mengirimkan Anda
                pemasaran langsung, iklan, dan komunikasi promosi melalui
                aplikasi push-notification, pesan melalui Platform, pos,
                panggilan telepon, layanan pesan singkat (SMS), dan email
                (“Materi Pemasaran”).
              </p>
              <br />
              <p>
                Anda dapat memilih untuk tidak menerima komunikasi pemasaran
                tersebut kapan saja dengan mengklik pilihan “berhenti
                berlangganan” yang ada dalam pesan yang bersangkutan, atau
                menghubungi Kami melalui detail kontak yang tercantum di bawah
                ini. Mohon perhatikan bahwa jika Anda memilih untuk keluar, Kami
                masih dapat mengirimi Anda pesan-pesan non-promosi, seperti
                tanda terima atau informasi tentang Akun Anda.
              </p>
              <br />
              <p>DATA ANONIM</p>
              <p>
                Kami dapat membuat, menggunakan, melisensikan atau mengungkapkan
                Informasi Pribadi, yang tersedia, dengan catatan, (i) bahwa
                semua hal yang dapat mengidentifikasi telah dihapus sehingga
                data, baik sendiri atau dikombinasi dengan data lain yang
                tersedia, tidak dapat dihubungkan dengan atau dikaitkan dengan
                atau tidak dapat mengidentifikasi suatu individu, dan (ii) data
                serupa telah digabungkan sehingga data asli membentuk bagian
                dari kumpulan data yang lebih besar.
              </p>
              <br />
              <p>PLATFORM PIHAK KETIGA</p>
              <p>
                Platform, situs web, dan Materi Pemasaran dapat berisi tautan ke
                situs web yang dioperasikan oleh pihak ketiga. Kami tidak
                mengendalikan atau menerima pertanggungjawaban atau tanggung
                jawab untuk situs web ini dan untuk pengumpulan, penggunaan,
                pemeliharaan, berbagi, atau pengungkapan data dan informasi oleh
                pihak ketiga tersebut. Silakan baca syarat dan ketentuan dan
                kebijakan privasi dari situs web pihak ketiga tersebut untuk
                mengetahui bagaimana mereka mengumpulkan dan menggunakan
                Informasi Pribadi Anda.
              </p>
              <br />
              <p>
                Iklan yang terdapat pada Platform dan Materi Pemasaran Kami
                berfungsi sebagai tautan ke situs web pengiklan dan dengan
                demikian segala informasi yang mereka kumpulkan berdasarkan klik
                Anda pada tautan itu akan dikumpulkan dan digunakan oleh
                pengiklan yang relevan sesuai dengan kebijakan privasi pengiklan
                tersebut.
              </p>
            </div>

            <div
              id="we-are-contact"
              style={{ marginBottom: "20px" }}
              ref={inViewRef10}
            >
              <h2>Cara Untuk Menghubungi Kami</h2>
              <br />
              <span>
                Jika Anda ingin menarik persetujuan Anda dalam penggunaan
                informasi pribadi, meminta akses dan / atau koreksi dari
                Informasi Pribadi Anda, memiliki pertanyaan, komentar atau
                masalah, atau memerlukan bantuan mengenai hal-hal teknis, jangan
                ragu untuk hubungi Kami di{" "}
                <span>
                  <a href="mailto:help@agendakota.id">help@agendakota.id</a>
                </span>{" "}
                untuk agendakota.id.
              </span>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PrivacyPolicy;
