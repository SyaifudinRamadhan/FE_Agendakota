import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/TermConditions.module.css";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import Footer from "../partials/Footer";

const TermConditions = () => {
  const [inView, setInview] = useState(1);
  const [firstLoad, setFirstLoad] = useState(false);

  const inViewRef = useRef();
  const inViiewRef2 = useRef();

  useEffect(() => {
    if (!firstLoad) {
      window.addEventListener("scroll", () => {
        if (inViewRef.current && inViiewRef2.current) {
          if (window.scrollY >= inViewRef.current.scrollHeight) {
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
              Term & Conditions
            </div>
          </div>

          <h2>Syarat & Ketentuan Pengguna</h2>
        </div>
        <div className={styles.MainBox}>
          <div className={styles.Sidebar}>
            <div className={styles.Menu}>
              <a href="#event-creator">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 1 ? styles.MenuItemActive : ""
                  }`}
                >
                  Event Creator
                </div>
              </a>
              <a href="#buyer">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 2 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pembeli / Buyer
                </div>
              </a>
            </div>
          </div>
          <div className={styles.MainContent}>
            <div className={styles.MenuCollpase}>
              <a href="#event-creator">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 1 ? styles.MenuItemActive : ""
                  }`}
                >
                  Event Creator
                </div>
              </a>
              <a href="#buyer">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 2 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pembeli / Buyer
                </div>
              </a>
            </div>
            <div
              id="event-creator"
              class="bantuan-section"
              style={{ marginBottom: "20px" }}
              ref={inViewRef}
            >
              <h2 class="uk-text-center">
                <b>Event Creator</b>
              </h2>
              <p>
                <span class="s1">
                  Halo, selamat datang di situs &nbsp;
                  <a href="http://agendakota.id">
                    <span class="s2">www.agendakota.id</span>
                  </a>{" "}
                  &nbsp; yang dikelola dan dimiliki oleh PT Cipta Wisata Medika,
                  selaku pemilik
                  <em>brand </em>AGENDAKOTA (“<strong>Situs</strong>”). PT Cipta
                  Wisata Medika adalah perseroan terbatas yang bergerak di
                  bidang teknologi yaitu penyediaan piranti lunak (
                  <em>software</em>) berupa
                  <em>platform</em> untuk memudahkan dan membuat pengalaman
                  penggunaan terbaik dalam menikmati <em>event</em> bagi kamu
                  dan
                  <em>event creator</em> (untuk selanjutnya disebut “
                  <strong>AGENDAKOTA</strong>” atau “<strong>Kami</strong>”).
                  Setiap orang atau badan hukum yang menggunakan, mengakses,
                  memanfaatkan dan/atau membuat akun di Situs Kami (untuk
                  selanjutnya disebut “<strong>Kamu</strong>”) dengan ini
                  dianggap telah memahami, membaca, menerima dan setuju akan
                  ketentuan penggunaan Situs dan layanan AGENDAKOTA, sebagaimana
                  akan diuraikan di bawah ini (untuk selanjutnya disebut “
                  <strong>Ketentuan Penggunaan</strong>”).
                </span>
              </p>
              <p>
                Ketentuan Penggunaan ini adalah perjanjian yang sah dan mengikat
                antara Kamu dan AGENDAKOTA. Silahkan untuk membatalkan akun Kamu
                dan/atau keluar dari Situs serta tidak menggunakan, mengakses
                dan/atau memanfaatkan Situs ini jika Kamu tidak setuju atau
                tidak ingin terikat dengan Ketentuan Penggunaan ini.
              </p>
              <p>
                <b>
                  MOHON MEMERIKSA KETENTUAN PENGGUNAAN AGENDAKOTA DENGAN SEKSAMA
                  SEBELUM MENGGUNAKAN SITUS DAN LAYANAN AGENDAKOTA UNTUK PERTAMA
                  KALI. DENGAN MENDAFTAR, MEMBUAT AKUN DAN/ATAU MENGGUNAKAN
                  SITUS ATAU LAYANAN AGENDAKOTA, KAMU SECARA PRIBADI DAN/ATAU
                  BADAN HUKUM YANG KAMU WAKILI TELAH MEMAHAMI DAN SETUJU UNTUK
                  TUNDUK SERTA TERIKAT PADA SELURUH SYARAT DAN KETENTUAN
                  PENGGUNAAN AGENDAKOTA. DENGAN INI KAMU MENYATAKAN SERTA
                  MENJAMIN KEPADA AGENDAKOTA BAHWA KAMU ADALAH PERORANGAN ATAU
                  PERWAKILAN BADAN HUKUM YANG SAH DAN BERHAK UNTUK BERTINDAK
                  SERTA MENGIKATKAN DIRI DALAM PERJANJIAN INI.
                </b>
              </p>
              <h3>
                <b> A. Definisi &amp; Interpretasi </b>
              </h3>
              <p>
                1. Kecuali konteksnya menentukan lain, ungkapan berikut akan
                memiliki arti sebagai berikut dalam Ketentuan Penggunaan ini:
              </p>
              <div class="uk-margin-small-left">
                <ol type="a">
                  <li>
                    <p>
                      <strong> "AGENDAKOTA", "kita”, </strong>atau
                      <strong> "kami"</strong>
                      merujuk kepada PT Cipta Wisata Medika, sebuah perseroan
                      terbatas yang didirikan berdasarkan hukum Indonesia dan
                      beralamat di Coridor Co-Working Space Lt. 3 Siola,
                      Surabaya Jawa Timur.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>“Kamu” </strong>atau “<strong>Pengguna</strong>”
                      <strong> </strong>merujuk pada setiap orang atau badan
                      hukum yang menggunakan, mengakses, memanfaatkan dan/atau
                      membuat akun di
                      <a href="http://agendakota.id">agendakota.id</a> termasuk
                      namun tidak terbatas pada Event Creator dan Pembeli.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>“Situs” </strong>berarti
                      <a href="http://agendakota.id">agendakota.id</a> yang
                      dikelola dan dimiliki oleh AGENDAKOTA.
                    </p>
                  </li>
                  <li>
                    <p>
                      “<strong>Platform</strong>” berarti Situs kami, versi{" "}
                      <em>mobile</em>
                      dari Situs kami, saluran suara dan data, teknologi,
                      piranti lunak, sistem dan media lain yang dimiliki dan
                      dikelola oleh AGENDAKOTA dari waktu ke waktu.
                    </p>
                  </li>
                  <li>
                    <p>
                      “<strong>Event</strong>” berarti suatu kegiatan yang
                      bersifat komersial maupun tidak komersial yang
                      diselenggarakan oleh
                      <em>Event Creator</em>
                      yang menggunakan jasa layanan Platform kami untuk
                      menunjang kegiatan acara tersebut.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>“Event Creator” </strong>berarti setiap individu,
                      perkumpulan, badan hukum, dan/atau berbagai badan hukum
                      lainnya yang menyelenggarakan Event sebagai penyelenggara,
                      promotor, panitia dan/atau pemilik yang bekerjasama dengan
                      kami menggunakan layanan Platform kami termasuk namun
                      tidak terbatas pada layanan yang kami sediakan di Situs.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>“Tiket” </strong>berarti tanda bukti hak yang sah
                      untuk memasuki tempat berlangsungnya Event, menikmati
                      suatu pertunjukan yang dipertunjukan oleh Event,
                      menggunakan dan/atau memanfaatkan suatu kegiatan yang
                      berhubungan dengan Event yang diselenggarakan Event
                      Creator sesuai dengan tanggal, waktu, tempat, jenis
                      dan/atau ketentuan lainnya yang melekat pada tiket masuk
                      tersebut yang telah dipilih, dipesan dan dibeli secara sah
                      oleh Pembeli, baik berbentuk fisik, elektronik atau bentuk
                      media lainnya yang digunakan oleh kami dari waktu ke waktu
                      dan telah dilengkapi dengan kode unik (<em>barcode</em>)
                      sebagai sistem pengamanan pada tiket tersebut.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>“Mitra</strong>” berarti pihak yang telah
                      mengadakan kerja sama dengan kami antara lain termasuk
                      namun tidak terbatas pada kerja sama penggunaan kembali
                      platform kami untuk menyediakan Tiket baik secara daring
                      maupun secara langsung tatap muka atau <em>offline</em>.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>“Pembeli</strong>” berarti setiap individua
                      dan/atau badan hukum yang membeli dengan harga tertentu
                      atau secara cuma-cuma Tiket yang diselenggarakan oleh
                      Event Creator secara sah dan sesuai dengan Ketentuan
                      Penggunaan ini, syarat dan ketentuan yang berlaku pada
                      tempat Event, syarat dan ketentuan yang ditetapkan oleh
                      Event Creator, serta peraturan perundang-undangan yang
                      berlaku.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>“agendakota.id </strong>berarti adalah layanan
                      yang kami sediakan untuk kamu Event Creator berupa
                      penyediaan platform untuk menunjang Event yang memberikan
                      kemudahan dengan penggunaan teknologi untuk Event Creator
                      guna membuat, memasarkan, menjual, dan/atau
                      mendistribusikan Event secara mandiri, dimana layanan
                      tersebut dapat berubah dari waktu ke waktu berdasarkan
                      kebijakan kami sendiri.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>“Biaya Jasa</strong>” berarti biaya jasa sebagai
                      imbalan kepada kami atas jasa atau produk layanan kami,
                      termasuk namun tidak terbatas pada penyediaan Platform
                      guna menunjang Event kamu, baik berupa uang, presentase
                      maupun jasa yang dapat dinilai, yang kami tetapkan dari
                      waktu ke waktu berdasarkan kebijakan kami sendiri.
                    </p>
                  </li>
                  <li>
                    <p>
                      <strong>“E-Voucher”</strong> atau{" "}
                      <strong>“E-Ticket”</strong> berarti tiket atau voucher
                      dalam bentuk elektronik untuk suatu acara pertunjukan,
                      konser, eksebisi, festival, pertandingan,
                      seminar/konferensi.
                    </p>
                  </li>
                </ol>
              </div>
              <h3>
                <b> B. Ketentuan Umum </b>
              </h3>
              <ol>
                <li>
                  Jika terjadi konflik atau inkonsistensi antara dua atau lebih
                  ketentuan dalam Ketentuan Penggunaan ini baik dengan ketentuan
                  penggunaan kami lainnya dan/atau ketentuan penggunaan Mitra
                  kami, apakah ketentuan tersebut tercantum dalam dokumen yang
                  sama atau berbeda, konflik atau inkonsistensi tersebut maka
                  AGENDAKOTA akan menentukan ketentuan yang berlaku.
                </li>
                <li>
                  Selain Ketentuan Penggunaan ini dan tergantung pada layanan
                  yang dipilih oleh Kamu, Kamu wajib untuk membaca dan menerima
                  aturan dan ketentuan layanan tersebut yang mungkin akan
                  berlaku untuk layanan tersebut.
                </li>
                <li>
                  Perjanjian ini berlaku selama Kamu, Event Creator menggunakan
                  jasa Kami, baik pada saat penyelenggaraan Event maupun pada
                  saat berakhirnya Event sampai dengan Kamu telah memenuhi
                  seluruh kewajiban Kamu berdasarkan perjanjian ini.
                </li>
                <li>
                  AGENDAKOTA akan mempublikasikan setiap perubahan yang bersifat
                  substansial atau amandemen dari Ketentuan Penggunaan ini
                  (apabila ada) melalui Platform. Event Creator diwajibkan untuk
                  membaca dengan baik setiap perubahan atau amandemen tersebut
                  sehingga apabila Event Creator tetap menggunakan, mengakses
                  atau memanfaatkan Platform, Event Creator dianggap telah
                  mengetahui, memahami dan menyetujui perubahan atau amandemen
                  tersebut.
                </li>
                <li>
                  Semua pemesanan Tiket oleh Pembeli untuk Event yang
                  diselenggarakan oleh Event Creator melalui Platform kami,
                  merupakan perikatan terpisah dengan perikatan yang timbul dari
                  perjanjian ini berdasarkan Ketentuan Penggunaan ini, yaitu
                  perikatan yang timbul antara Pembeli dengan Event Creator,
                  yang masing-masing pihak terikat dan tunduk pada perikatan
                  tersebut. Untuk menghindari keragu-raguan, Kami merupakan
                  penyedia Platform yang bekerja sama dengan Event Creator,
                  sedangkan keseluruhan Tiket yang dijual kepada Pembeli adalah
                  milik Event Creator. Segala bentuk data dan informasi mengenai
                  Tiket yang Event Creator sediakan kepada Kami, dan Kami
                  informasikan kepada calon Pembeli, merupakan penawaran dari
                  Event Creator kepada calon Pembeli tersebut dimana mengikat
                  untuk Event Creator dan Pembeli dalam hal terjadi pembelian
                  Tiket tersebut. Oleh sebab itu, Kami bukan termasuk dalam
                  pihak dalam hal terjadi sengketa, penuntutan hak, gugatan hak,
                  permintaan hak, penggantian rugi, kerugian yang timbul, cidera
                  yang timbul, kematian yang timbul dan/atau klaim hak atas hak
                  apapun yang timbul terkait secara langsung maupun tidak
                  langsung dari penyelenggaraan Event yang diminta oleh Event
                  Creator kepada Pembeli dan begitupun sebaliknya dari Pembeli
                  kepada Event Creator, termasuk oleh pihak ketiga manapun yang
                  merasa dirugikan oleh penyelenggaraan Event oleh Event
                  Creator.
                </li>
                <li>
                  Untuk menghindari keragu-raguan, Event Creator telah memahami
                  dan menyetujui bahwa AGENDAKOTA tidak memberikan jaminan dalam
                  bentuk apapun atas keberhasilan penyelenggaraan Event baik
                  dalam bentuk hasil penjualan Tiket maupun kelancaran
                  pelaksanaan Event. Event Creator dengan ini membebaskan dan
                  melepaskan AGENDAKOTA dan menanggung dari segala bentuk
                  tuntutan, gugatan, permintaan, kerugian, klaim, dan/atau
                  segala bentuk penggantian hak oleh pihak manapun termasuk
                  Event Creator sendiri yang timbul akibat dari termasuk namun
                  tidak terbatas pada hasil penjualan Tiket dan penyelenggaraan
                  Event.
                </li>
              </ol>
              <h3>
                <b> C. Akun Event Creator </b>
              </h3>
              <ol>
                <li>
                  Setiap Event Creator yang hendak menggunakan dan memanfaatkan
                  layanan kami, termasuk layanan agendakota.id, untuk menunjang
                  Event kamu, wajib membuat akun pada sistem AGENDAKOTA.
                </li>
                <li>
                  Syarat untuk membuat akun adalah pengisian data dan informasi
                  oleh Event Creator yang kebenaran, validitas, legalitas, dan
                  keabsahannya dijamin oleh Kamu.
                </li>
                <li>
                  Setiap perbuatan dan tindakan dengan menggunakan akun tersebut
                  merupakan tanggung jawab penuh Event Creator sebagai pembuat
                  dan pemilik akun tersebut, termasuk segala bentuk
                  penyalahgunaan yang dilakukan oleh pihak lain dan/atau Event
                  Creator sendiri. Oleh sebab itu, Event Creator diwajibkan
                  untuk menjaga kerahasiaan data dan informasi yang berkaitan
                  dengan akun tersebut. Event Creator membebaskan dan melepaskan
                  AGENDAKOTA dari tanggung jawab dalam bentuk apapun terkait
                  dengan penggunaan akun tersebut.
                </li>
                <li>
                  Dalam pembuatan akun tersebut, segala data dan informasi yang
                  diisi oleh Event Creator adalah dalam penguasaan dan
                  kepemilikan penuh dari Event Creator, di mana Event Creator
                  bertanggung jawab penuh atas kebenaran setiap data dan
                  informasi yang diisi oleh Event Creator, dan segala bentuk
                  kelalaian, kesalahan, kealpaan, <em>typo</em>, dan/atau
                  kesalahan dalam bentuk dan alasan apapun yang menyebabkan data
                  dan informasi tersebut menjadi tidak bermakna sebagaimana yang
                  akan dimaksud oleh Event Creator menjadi tanggung jawab penuh
                  Event Creator, baik yang menimbulkan kerugian maupun yang
                  tidak, termasuk namun tidak terbatas pada kesalahan nomor
                  rekening, jadwal acara, tempat acara akan menjadi tanggung
                  jawab Event Creator.
                  <strong>
                    Event Creator diwajibkan untuk mengisi segala informasi dan
                    data dalam pembuatan akun secara akurat, seksama, hati-hati
                    dan penuh ketelitian.
                  </strong>
                </li>
                <li>
                  Kamu sebagai Event Creator dengan ini menyatakan dan menjamin
                  kepada Kami bahwa kamu adalah badan hukum yang berhak,
                  perwakilan sah yang berwenang, pemilik hak, dan/atau telah
                  mendapat seluruh persetujuan yang diperlukan dalam membuat
                  akun serta mengisi segala data dan informasi dalam pembuatan
                  akun Kamu.
                </li>
                <li>
                  Kamu sebagai Event Creator dengan ini menyatakan dan menjamin
                  kepada Kami bahwa segala data dan informasi yang diberikan dan
                  diisi dalam pembuatan akun Kamu merupakan data dan informasi
                  yang legal, valid, sah, dan menjadi kewenangan Kamu untuk kamu
                  berikan kepada Kami.
                </li>
                <li>
                  Kamu dengan ini telah sepakat dan setuju bahwa AGENDAKOTA
                  berhak untuk melakukan tindakan yang diperlukan termasuk namun
                  tidak terbatas untuk menghapus, tidak memproses, memblokir,
                  menutup akun Kamu, baik untuk sementara (pembekuan akun
                  Pengguna) atau untuk selamanya dan/atau dengan cara-cara yang
                  Kami anggap perlu berdasarkan kebijakan Kami sendiri tanpa
                  memberikan pemberitahuan sebelumnya kepada Kamu dalam hal
                  diduga dan/atau terdapat kegiatan Event Creator yang
                  terindikasi seperti namun tidak terbatas pada pelanggaran
                  Ketentuan Penggunaan ini; ketentuan hukum yang berlaku;
                  penipuan, penyalahgunaan maupun pencurian (termasuk indikasi
                  adanya penipuan, penyalahgunaan maupun pencurian); pemesanan
                  yang mencurigakan; kecurigaan aktivitas tindak pidana,
                  pemberian informasi yang tidak akurat salah atau menyesatkan;
                  sulit dihubungi/dijangkau; terdaftar pada “daftar hitam” oleh
                  pemerintah atau organisasi internasional.
                </li>
                <li>
                  Dengan pembukaan dan penggunaan akun Kamu di Situs kami, maka
                  Kamu membebaskan kami atas segala tanggung jawab, kehilangan,
                  dan/atau kerugian yang timbul akibat penggunaan akun Kamu,
                  serta jika kami melaksanakan segala tindakan yang kami anggap
                  perlu dalam pelaksanaan ketentuan akun sebagaimana diatur
                  dalam poin 7 di atas.
                </li>
              </ol>
              <h3>
                <b> D. Konten Event </b>
              </h3>
              <ol>
                <li>
                  Event Creator yang telah membuat akun pada Situs kami, dapat
                  membuat Event dengan tunduk pada syarat dan ketentuan dalam
                  Ketentuan Penggunaan ini, norma susila, ketertiban umum dan
                  peraturan perundang-undangan yang berlaku.
                </li>
                <li>
                  Apabila berlaku sesuai layanan yang digunakan, sebelum
                  Pengguna memulai pemesanan/pembelian E-Ticket atau E-Voucher,
                  Pengguna diarahkan ke halaman antrean / waiting room (untuk
                  selanjutnya disebut “AGENDAKOTA Antrean”). Mengenai AGENDAKOTA
                  Antrean merujuk ke poin E.
                </li>
                <li>
                  Event Creator wajib menyediakan kepada Kami secara cuma-cuma
                  tanpa imbalan dalam bentuk apapun semua informasi dan data
                  mengenai Event dengan data dan informasi yang benar. valid,
                  legal, sah, akurat dan tidak melanggar hak kekayaan
                  intelektual pihak lain dalam bentuk apapun. Event Creator
                  dilarang membuat deskripsi mengenai Event yang melanggar
                  ketentuan peraturan perundang-undangan, ketertiban umum,
                  kesusilaan, norma yang berlaku, seperti namun tidak terbatas
                  pada provokasi terhadap suku, agama, ras dan antar golongan
                  (SARA) dan/atau golongan tertentu, pemerasan, pornografi,
                  vulgar, menyudutkan orang atau golongan tertentu, pengancaman,
                  penghinaan, pencemaran nama baik, kekerasan, menakut-nakuti,
                  menyesatkan, bohong, seruan yang menimbulkan rasa kebencian
                  atau permusuhan yang memecah belah, dan/atau seruan untuk
                  melanggar hukum yang berlaku.
                </li>
                <li>
                  Event yang Event Creator selenggarakan dilarang mengandung
                  unsur, baik dalam bentuk penamaan, isi dari Event, kegiatan
                  yang berada dalam Event, tempat dari Event, dan/atau segala
                  bentuk yang termasuk dari unsur-unsur Event tersebut yang
                  berkaitan dan menjadi suatu kesatuan yang saling terkait dalam
                  Event tersebut baik secara langsung maupun tidak langsung,
                  dimana termasuk dari unsur berupa pelanggaran dari ketentuan
                  peraturan perundang-undangan, pencucian uang, ketertiban umum,
                  kesusilaan, norma yang berlaku, seperti namun tidak terbatas
                  pada bentuk perjudian, prostitusi, provokasi terhadap suku,
                  agama, ras dan antar golongan (SARA) dan/atau golongan
                  tertentu, pemerasan, pornografi, pengancaman, penghinaan,
                  pencemaran nama baik, kekerasan, menakut-nakuti, menyesatkan,
                  bohong, seruan yang menimbulkan rasa kebencian atau permusuhan
                  yang memecah belah, yang seluruh kegiatannya hanya berbentuk
                  pengumpulan uang dan/atau barang tanpa adanya kegiatan acara
                  lain, dan/atau seruan untuk melanggar hukum yang berlaku.
                </li>
                <li>
                  Event Creator menyatakan dan menjamin kepada Kami bahwa:
                  <ol type="a">
                    <li>
                      Seluruh informasi dan data yang disediakan kepada Kami,
                      baik berupa poster, gambar, kata-kata, istilah dan/atau
                      segala bentuk ciptaan lainnya yang merupakan hak kekayaan
                      intelektual merupakan hak dan kewenangan dari Event
                      Creator untuk digunakan baik secara ekonomis maupun non
                      komersial bagi kepentingan Event oleh Event Creator;
                    </li>
                    <li>
                      Event yang diselenggarakan adalah hak, milik, kepunyaan,
                      dan kewenangan penuh dan/atau merupakan kuasa dengan telah
                      diterimanya semua bentuk persetujuan yang diperlukan untuk
                      Event Creator dalam mewakili penyelenggaraan Event;
                    </li>
                    <li>
                      Penyelenggaraan Event beserta isinya dan tunduknya Event
                      Creator pada perjanjian ini tidak melanggar ketentuan
                      apapun, baik berdasarkan peraturan perundang-undangan,
                      perjanjian lain, perintah pengadilan, perintah badan
                      pemerintahan dan kewajiban-kewajiban apapun dimana Event
                      Creator terikat untuk tunduk pada ketentuan tersebut;
                    </li>
                    <li>
                      Event Creator bertanggungjawab penuh atas keseluruhan
                      Event termasuk pada isinya, sampingannya ataupun
                      unsur-unsurnya yang terkait dan menjadi satu kesatuan baik
                      secara langsung maupun tidak langsung pada Event tidak
                      melanggar Ketentuan Penggunaan ini, peraturan
                      perundang-undangan, kesusilaan, ketertiban umum, hak
                      kekayaan intelektual pihak lain dan ketentuan-ketentuan
                      lainnya yang harus dipatuhi;
                    </li>
                    <li>
                      Event Creator telah memperoleh segala bentuk perizinan,
                      persetujuan, rekomendasi, dan/atau segala bentuk
                      dokumen-dokumen lainnya dalam pelaksanaan Event yang
                      diselenggarakan;
                    </li>
                    <li>
                      Isi dari Event, baik bentuk kegiatan, pengisi kegiatan,
                      jenis kegiatan, tipe kegiatan, acara kegiatan Event
                      termasuk jenis dan tipe Tiket dan segala bentuk yang
                      berkaitan dengan isi Event yang dibuat serta diisi pada
                      sistem AGENDAKOTA adalah benar dan sesuai dengan kenyataan
                      yang ada. Dalam hal terjadi perubahan mengenai Event dalam
                      bentuk apapun, termasuk namun tidak terbatas pada tempat,
                      jenis, waktu, kegiatan, sifat komersil menjadi non
                      komersil begitu pula sebaliknya, tipe dan klasifikasi
                      Tiket dan perubahan lainnya, Event Creator wajib untuk
                      memberitahu kepada AGENDAKOTA dan/atau Pembeli Tiket
                      terhadap perubahan tersebut.
                    </li>
                  </ol>
                </li>
                <li>
                  Event Creator dengan ini setuju untuk bertanggung jawab secara
                  penuh dan melepaskan dan membebaskan AGENDAKOTA dari segala
                  bentuk tanggung jawab, ganti kerugian, tuntutan, gugatan,
                  klaim hak, permintaan hak dari pihak manapun dan/atau segala
                  bentuk kewajiban yang harus ditanggung akibat dari pelanggaran
                  Ketentuan Penggunaan ini, pelanggaran peraturan
                  perundang-undangan, pelanggaran norma sosial, kesusilaan,
                  ketertiban umum, dan/atau pelanggaran atas hak-hak pihak lain
                  yang merasa haknya dilanggar oleh akibat pelaksanaan Event
                  dan/atau pelanggaran dari larangan, pernyataan dan jaminan,
                  kewajiban dan segala bentuk ketentuan dari Ketentuan
                  Penggunaan ini.
                </li>
                <li>
                  Event Creator bertanggung jawab penuh atas seluruh izin,
                  persetujuan, dispensasi, perintah, lisensi, pajak, pungutan,
                  persetujuan penggunaan hak kekayaan intelektual dan/atau
                  dokumen dalam bentuk apapun yang diperlukan berdasarkan
                  ketentuan peraturan perundang-undangan termasuk kebijakan
                  pemerintahan, yang diperlukan untuk keberlangsungan dan
                  penyelenggaraan Event tersebut.
                </li>
                <li>
                  Event Creator dengan ini telah sepakat dan menyetujui bahwa
                  AGENDAKOTA memiliki hak dan kewenangan penuh berdasarkan
                  kebijakan Kami sendiri, untuk menolak, menghapus, tidak
                  memproses, masukan ke daftar hitam, blokir, menghentikan kerja
                  sama secara sepihak, menuntut ganti rugi, menuntut berbagai
                  hak untuk memulihkan hak yang telah dilanggar dan/atau dengan
                  metode dan cara-cara yang Kami anggap perlu untuk menangani
                  setiap Event yang Kami anggap telah melanggar Ketentuan
                  Penggunaan ini, melakukan tindak pidana, melanggar ketentuan
                  peraturan perundang-undangan, ketertiban umum, kesusilaan,
                  penipuan, penyalahgunaan, kelalaian, kealpaan dan/atau
                  berdasarkan kebijakan Kami yang dapat dipertanggungjawabkan.
                </li>
              </ol>
              <h3>
                <b> E. ANTREAN/WAITING ROOM (“AGENDAKOTA Antrean”) </b>
              </h3>
              <ol>
                <li>
                  Mekanisme AGENDAKOTA Antrean ialah first come first served,
                  guna memberikan kesempatan yang adil kepada Pengguna. Urutan
                  pemesanan/pembelian tiket akan ditentukan berdasarkan urutan
                  kedatangan Pengguna di dalam antrean dan hal ini sangat
                  dipengaruhi oleh jaringan dan perangkat yang digunakan oleh
                  Pengguna.
                </li>
                <li>
                  Penentuan urutan Pengguna didasarkan pada data dan informasi
                  yang tercatat pada sistem AGENDAKOTA. AGENDAKOTA akan
                  melakukan upaya yang wajar untuk memastikan keakuratan dan
                  menyediakan layanan yang sama kepada setiap Pengguna namun
                  AGENDAKOTA tidak bertanggung jawab atas kesalahan teknis,
                  kegagalan jaringan, atau gangguan transmisi yang bisa terjadi.
                </li>
                <li>
                  Nomor antrean yang tertera di laman AGENDAKOTA Antrean tidak
                  merefleksikan jumlah kuota tiket yang tersedia dan tidak dapat
                  dijadikan dasar atas ketersediaan tiket. AGENDAKOTA tidak
                  menjamin ketersediaan tiket untuk semua Pengguna yang berada
                  pada AGENDAKOTA Antrean. Tiket mungkin saja bisa habis sebelum
                  Pengguna mencapai giliran pemesanan/pembelian tiket.
                </li>
                <li>
                  Pada saat Pengguna berada di halaman AGENDAKOTA Antrean,
                  Pengguna dianjurkan untuk tidak melakukan aktivitas lain pada
                  perangkat yang sedang digunakan untuk melakukan
                  pemesanan/pembelian tiket. Aktivitas lain yang dimaksud ialah
                  seperti namun tidak terbatas membuka website/aplikasi lain,
                  pindah ke tab lain, melakukan refresh laman, termasuk juga
                  adanya perubahan konfigurasi browser, perubahan jaringan,
                  penggunaan aplikasi/software pihak ketiga (plug-in/ads blocker
                  dan lain sebagainya), penggunaan VPN, dan lain-lain. Pengguna
                  wajib memperhatikan dan memahami hal-hal yang dimaksud
                  sebelumnya, karena sistem bisa mengeluarkan Pengguna dari
                  halaman antrean maupun halaman transaksi pemesanan/pembelian
                  tiket jika hal-hal dimaksud di atas terjadi.
                </li>
                <li>
                  Pengguna, baik Pembeli maupun Event Creator dengan ini setuju
                  dan memahami untuk bertanggung jawab secara penuh dan
                  melepaskan dan membebaskan AGENDAKOTA dari segala bentuk
                  tanggung jawab, ganti rugi, tuntutan, gugatan, klaim,
                  permintaan hak dan/atau segala bentuk kewajiban yang harus
                  ditanggung akibat hal-hal yang menyebabkan Pengguna keluar
                  dari laman AGENDAKOTA Antrean maupun halaman transaksi.
                </li>
              </ol>
              <h3>
                <b> F. Ketentuan Pembayaran </b>
              </h3>
              <ol>
                <li>
                  Setiap Event yang diselenggarakan oleh Event Creator dalam
                  Platform kami, maka Kami berhak atas Biaya Jasa sebesar
                  sebagaimana tercantum di
                  <a href="https://agendakota.id/panduan">
                    https://agendakota.id/panduan
                  </a>
                  .
                </li>
                <li>
                  Sebelum melakukan penagihan atas uang hasil penjualan Tiket
                  Event yang terjual melalui sistem AGENDAKOTA, Event Creator
                  wajib untuk mengisi dan menyediakan data dan informasi yang
                  diperlukan oleh Kami sekurang-kurangnya sebagaimana tercantum
                  di
                  <a href="https://agendakota.id/panduan">
                    https://agendakota.id/panduan
                  </a>
                  .
                </li>
                <li>
                  Event Creator dapat melakukan penagihan atas uang hasil
                  penjualan Tiket Event yang terjual melalui sistem AGENDAKOTA
                  setelah Event berakhir dan telah memenuhi semua syarat dan
                  ketentuan yang berlaku.
                </li>
                <li>
                  AGENDAKOTA baru akan melakukan proses pembayaran atas tagihan
                  sebagaimana dimaksud pada ayat (2) dan (3) di atas maksimal 10
                  (sepuluh) hari kerja sejak diterimanya dan telah lengkapnya
                  seluruh persyaratan yang diperlukan yang disediakan oleh Event
                  Creator.
                </li>
                <li>
                  Pembayaran atas hasil penjualan Tiket akan dilakukan oleh
                  AGENDAKOTA dengan cara transfer dana ke rekening Event Creator
                  berdasarkan data dan informasi yang telah diisi oleh Event
                  Creator. Segala bentuk kesalahan dari pengisian data dan
                  informasi rekening Event Creator yang menyebabkan
                  keterlambatan, kegagalan, kerugian, pengurangan dan segala
                  bentuk akibat yang timbul akibat dari hal tersebut, bukan
                  merupakan tanggung jawab dari AGENDAKOTA sehingga Event
                  Creator setuju dan memahami untuk melepaskan dan membebaskan
                  AGENDAKOTA atas tanggung jawab terhadap hal tersebut. Oleh
                  karena itu, Event Creator wajib secara seksama, akurat,
                  teliti, cermat, hati-hati dan benar terhadap rekening milik
                  Event Creator.
                </li>
                <li>
                  Event Creator menjamin dan bertanggung jawab penuh bahwa data
                  dan informasi rekening merupakan rekening yang sah, valid,
                  legal dan milik dari Event Creator yang mewakili Event
                  tersebut. Untuk menghindari keragu-raguan, Event Creator
                  melepaskan dan membebaskan AGENDAKOTA dan akan menanggung
                  segala bentuk tuntutan, gugatan, permintaan, perintah dan
                  klaim oleh pihak manapun termasuk oleh Event Creator sendiri
                  atas hasil penjualan Tiket yang AGENDAKOTA kirim pada rekening
                  berdasarkan data dan informasi yang Event Creator isi
                  tersebut.
                </li>
                <li>
                  Event Creator bertanggung jawab penuh atas seluruh pajak,
                  pungutan, kontribusi, retribusi, biaya, bunga dan/atau tagihan
                  dalam bentuk apapun yang menjadi kewajiban yang harus
                  dilakukan dalam pelaksanaan dan penyelenggaraan Event.
                </li>
                <li>
                  Pembayaran atas penjualan Tiket Event yang diberikan kepada
                  Event Creator berdasarkan laporan penjualan yang tercantum
                  dalam sistem AGENDAKOTA, akan dibayarkan setelah dipotong
                  dengan Biaya Jasa kami, termasuk pajak pertambahan nilai
                  (PPN).
                </li>
                <li>
                  Kecuali ditentukan lain dalam perjanjian ini, semua jenis
                  pajak, biaya ataupun pungutan lainnya, baik yang ada saat ini
                  maupun yang ada dikemudian hari, yang wajib dibayarkan ke
                  pemerintah yang berkaitan dengan transaksi berdasarkan
                  perjanjian ini, wajib pajak ditanggung oleh Event Creator
                  sesuai ketentuan perundang-undangan yang berlaku.
                </li>
                <li>
                  <strong></strong>
                  Dalam hal Event Creator tidak melakukan penagihan haknya,
                  termasuk hasil penjualan Tiket, yang berada pada Kami
                  selambat-lambatnya 30 hari kalender sejak berakhirnya Event,
                  maka dengan ini Event Creator telah menyetujui untuk
                  memberikan hak tersebut kepada Kami, dan hak tersebut menjadi
                  hak dan milik AGENDAKOTA sepenuhnya.
                </li>
              </ol>
              <h3>
                <b> G. Perubahan dan Pembatalan Acara </b>
              </h3>
              <ol>
                <li>
                  Dalam hal terjadi perubahan kegiatan Event yang diakibatkan
                  oleh satu dan lain hal, maka Event Creator wajib
                  memberitahukan kepada Kami dan Pembeli secara resmi paling
                  lambat 7 (tujuh) hari sebelum perubahan kegiatan Event
                  tersebut.
                </li>
                <li>
                  Dalam hal terjadi pembatalan Event, AGENDAKOTA tetap berhak
                  atas Biaya Jasa yang telah dilakukannya dan biaya-biaya
                  lainnya yang telah dikeluarkan Pihak Kedua yang berkaitan
                  dengan pelaksanaan kerja sama, termasuk biaya administrasi
                  bank untuk transfer pengembalian uang kepada Pembeli (
                  <em>refund</em>) dan biaya-biaya lainnya, yang akan ditagihkan
                  kepada Event Creator.
                </li>
                <li>
                  Dalam hal terjadi pembatalan Event, Event Creator bertanggung
                  jawab secara penuh untuk mengembalikan uang hasil pembelian
                  Tiket oleh Pembeli kepada Pembeli melalui AGENDAKOTA dengan
                  melakukan pembayaran biaya-biaya sebagaimana di maksud Huruf
                  (G) poin (2) di atas dengan ditambah dengan total uang
                  pengembalian Tiket, dimana total tersebut akan dikurangkan
                  dengan uang hasil pembelian Tiket dan kekurangan uang tersebut
                  wajib dibayar oleh Event Creator paling lambat 7 (tujuh) hari
                  melalui rekening Kami yang akan kami berikan beserta jumlah
                  yang harus dibayar kepada Event Creator.
                </li>
                <li>
                  Jumlah uang pengembalian atas pembatalan Event kepada Pembeli
                  adalah sebesar 100% (seratus persen) dari harga Tiket dan
                  tidak termasuk
                  <em>platform fee</em> atau biaya-biaya lainnya yang akan
                  ditanggung oleh Event Creator, sesuai sebagaimana dimaksud
                  dalam Huruf (G) poin (2) dan (3) di atas.
                </li>
              </ol>
              <h3>
                <b> H. Perizinan </b>
              </h3>
              <ol>
                <li>
                  Dengan tergantung pada kepatuhan Pengguna pada Ketentuan
                  Penggunaan, kami memberikan Pengguna ijin yang terbatas,
                  non-eksklusif, tidak dapat dipindahtangankan, tidak dapat
                  dialihkan, tidak dapat disublisensikan, ijin yang dapat
                  ditarik untuk mengunduh dan memasang salinan Situs pada suatu
                  perangkat bergerak tunggal yang Pengguna miliki atau kontrol
                  dan menjalankan salinan Situs semata-mata untuk kebutuhan
                  pribadi, non-komersial Pengguna sendiri.
                </li>
                <li>
                  Pengguna tidak diperkenankan (i) menyalin, memodifikasi,
                  mengadaptasi, menerjemahkan, membuat karya turunan dari,
                  mendistribusikan, memberikan lisensi, menjual, mengalihkan,
                  menampilkan di muka umum, membuat ulang, mentransmisikan,
                  memindahkan, menyiarkan, menguraikan, atau membongkar bagian
                  manapun dari atau dengan cara lain yang mungkin
                  mengeksploitasi Situs, kecuali sebagaimana diperbolehkan dalam
                  Ketentuan Penggunaan ini, (ii) memberikan lisensi,
                  mensublisensikan, menjual, menjual kembali, memindahkan,
                  mengalihkan, mendistribusikan atau mengeksploitasi secara
                  komersial atau membuat tersedia kepada pihak ketiga Situs dan
                  / atau perangkat lunak dengan cara; (iii) menciptakan
                  "link"internet ke Situs atau "frame" atau "mirror" setiap
                  perangkat lunak pada server lain atau perangkat nirkabel atau
                  yang berbasis internet; (iv) merekayasa ulang atau mengakses
                  perangkat lunak kami untuk (a) membangun produk atau layanan
                  tandingan, (b) membangun produk dengan menggunakan ide, fitur,
                  fungsi atau grafis sejenis Situs, atau (c) menyalin ide,
                  fitur, fungsi atau grafis Situs, (v) meluncurkan program
                  otomatis atau script, termasuk, namun tidak terbatas pada, web
                  spiders, web crawlers, web robots, web ants, web indexers,
                  bots, virus atau worm, atau segala program apapun yang mungkin
                  membuat beberapa permintaan server per detik, atau menciptakan
                  beban berat atau menghambat operasi dan/atau kinerja Situs,
                  (vi) menggunakan robot, spider, pencarian situs/Situs
                  pengambilan kembali, atau perangkat manual atau otomatis
                  lainnya atau proses untuk mengambil, indeks, "tambang data"
                  (data mine), atau dengan cara apapun memperbanyak atau
                  menghindari struktur navigasi atau presentasi dari Situs atau
                  isinya; (vii) menerbitkan, mendistribusikan atau memperbanyak
                  dengan cara apapun materi yang dilindungi hak cipta, merek
                  dagang, atau informasi yang dimiliki lainnya tanpa memperoleh
                  persetujuan terlebih dahulu dari pemilik hak milik, (viii)
                  menghapus setiap hak cipta, merek dagang atau pemberitahuan
                  hak milik lainnya yang terkandung dalam Situs. Tidak ada
                  lisensi atau hak yang diberikan kepada Pengguna dengan
                  implikasi berdasarkan hak kekayaan intelektual dimiliki atau
                  dikendalikan oleh kami atau pemberi lisensi kami, kecuali
                  untuk lisensi dan hak tersebut secara tegas diberikan dalam
                  Ketentuan Penggunaan ini.
                </li>
                <li>
                  Pengguna tidak diperkenankan (i) menyalin, memodifikasi,
                  mengadaptasi, menerjemahkan,membuat karya turunan dari,
                  mendistribusikan, memberikan lisensi, menjual, mengalihkan,
                  menampilkan di muka umum, membuat ulang, mentransmisikan,
                  memindahkan, menyiarkan, menguraikan, atau membongkar bagian
                  manapun dari atau dengan cara lain yang mungkin
                  mengeksploitasi Situs, kecuali sebagaimana diperbolehkan dalam
                  Ketentuan Penggunaan ini, (ii) memberikan lisensi,
                  mensublisensikan, menjual, menjual kembali, memindahkan,
                  mengalihkan, mendistribusikan atau mengeksploitasi secara
                  komersial atau membuat tersedia kepada pihak ketiga Situs dan
                  / atau perangkat lunak dengan cara; (iii) menciptakan "link"
                  internet ke Situs atau "frame" atau "mirror" setiap perangkat
                  lunak pada server lain atau perangkat nirkabel atau yang
                  berbasis internet; (iv) merekayasa ulang atau mengakses
                  perangkat lunak kami untuk (a) membangun produk atau layanan
                  tandingan, (b) membangun produk dengan menggunakan ide, fitur,
                  fungsi atau grafis sejenis Situs, atau (c) menyalin ide,
                  fitur, fungsi atau grafis Situs, (v) meluncurkan program
                  otomatis atau script, termasuk, namun tidak terbatas pada, web
                  spiders, web crawlers, web robots, web ants, web indexers,
                  bots, virus atau worm, atau segala program apapun yang mungkin
                  membuat beberapa permintaan server per detik, atau menciptakan
                  beban berat atau menghambat operasi dan/atau kinerja Situs,
                  (vi) menggunakan robot, spider, pencarian situs/Situs
                  pengambilan kembali, atau perangkat manual atau otomatis
                  lainnya atau proses untuk mengambil, indeks, "tambang data"
                  (data mine), atau dengan cara apapun memperbanyak atau
                  menghindari struktur navigasi atau presentasi dari Situs atau
                  isinya; (vii) menerbitkan, mendistribusikan atau memperbanyak
                  dengan cara apapun materi yang dilindungi hak cipta, merek
                  dagang, atau informasi yang dimiliki lainnya tanpa memperoleh
                  persetujuan terlebih dahulu dari pemilik hak milik, (viii)
                  menghapus setiap hak cipta, merek dagang atau pemberitahuan
                  hak milik lainnya yang terkandung dalam Situs. Tidak ada
                  lisensi atau hak yang diberikan kepada Pengguna dengan
                  implikasi berdasarkan hak kekayaan intelektual dimiliki atau
                  dikendalikan oleh kami atau pemberi lisensi kami, kecuali
                  untuk lisensi dan hak tersebut secara tegas diberikan dalam
                  Ketentuan Penggunaan ini.
                </li>
                <li>
                  Pengguna tidak diperkenankan (i) menyalin, memodifikasi,
                  mengadaptasi, menerjemahkan, membuat karya turunan dari,
                  mendistribusikan, memberikan lisensi, menjual, mengalihkan,
                  menampilkan di muka umum, membuat ulang, mentransmisikan,
                  memindahkan, menyiarkan, menguraikan, atau membongkar bagian
                  manapun dari atau dengan cara lain yang mungkin
                  mengeksploitasi Situs, kecuali sebagaimana diperbolehkan dalam
                  Ketentuan Penggunaan ini, (ii) memberikan lisensi,
                  mensublisensikan, menjual, menjual kembali, memindahkan,
                  mengalihkan, mendistribusikan atau mengeksploitasi secara
                  komersial atau membuat tersedia kepada pihak ketiga Situs dan
                  / atau perangkat lunak dengan cara; (iii) menciptakan "link"
                  internet ke Situs atau "frame" atau "mirror" setiap perangkat
                  lunak pada server lain atau perangkat nirkabel atau yang
                  berbasis internet; (iv) merekayasa ulang atau mengakses
                  perangkat lunak kami untuk (a) membangun produk atau layanan
                  tandingan, (b) membangun produk dengan menggunakan ide, fitur,
                  fungsi atau grafis sejenis Situs, atau (c) menyalin ide,
                  fitur, fungsi atau grafis Situs, (v) meluncurkan program
                  otomatis atau script, termasuk, namun tidak terbatas pada, web
                  spiders, web crawlers, web robots, web ants, web indexers,
                  bots, virus atau worm, atau segala program apapun yang mungkin
                  membuat beberapa permintaan server per detik, atau menciptakan
                  beban berat atau menghambat operasi dan/atau kinerja Situs,
                  (vi) menggunakan robot, spider, pencarian situs/Situs
                  pengambilan kembali, atau perangkat manual atau otomatis
                  lainnya atau proses untuk mengambil, indeks, "tambang data"
                  (data mine), atau dengan cara apapun memperbanyak atau
                  menghindari struktur navigasi atau presentasi dari Situs atau
                  isinya; (vii) menerbitkan, mendistribusikan atau memperbanyak
                  dengan cara apapun materi yang dilindungi hak cipta, merek
                  dagang, atau informasi yang dimiliki lainnya tanpa memperoleh
                  persetujuan terlebih dahulu dari pemilik hak milik, (viii)
                  menghapus setiap hak cipta, merek dagang atau pemberitahuan
                  hak milik lainnya yang terkandung dalam Situs. Tidak ada
                  lisensi atau hak yang diberikan kepada Pengguna dengan
                  implikasi berdasarkan hak kekayaan intelektual dimiliki atau
                  dikendalikan oleh kami atau pemberi lisensi kami, kecuali
                  untuk lisensi dan hak tersebut secara tegas diberikan dalam
                  Ketentuan Penggunaan ini.
                </li>
                <li>
                  Pengguna tidak diperkenankan (i) menyalin, memodifikasi,
                  mengadaptasi, menerjemahkan, membuat karya turunan dari,
                  mendistribusikan, memberikan lisensi, menjual, mengalihkan,
                  menampilkan di muka umum, membuat ulang, mentransmisikan,
                  memindahkan, menyiarkan, menguraikan, atau membongkar bagian
                  manapun dari atau dengan cara lain yang mungkin
                  mengeksploitasi Situs, kecuali sebagaimana diperbolehkan dalam
                  Ketentuan Penggunaan ini, (ii) memberikan lisensi,
                  mensublisensikan, menjual, menjual kembali, memindahkan,
                  mengalihkan, mendistribusikan atau mengeksploitasi secara
                  komersial atau membuat tersedia kepada pihak ketiga Situs dan
                  / atau perangkat lunak dengan cara; (iii) menciptakan "link"
                  internet ke Situs atau "frame" atau "mirror" setiap perangkat
                  lunak pada server lain atau perangkat nirkabel atau yang
                  berbasis internet; (iv) merekayasa ulang atau mengakses
                  perangkat lunak kami untuk (a) membangun produk atau layanan
                  tandingan, (b) membangun produk dengan menggunakan ide, fitur,
                  fungsi atau grafis sejenis Situs, atau (c) menyalin ide,
                  fitur, fungsi atau grafis Situs, (v) meluncurkan program
                  otomatis atau script, termasuk, namun tidak terbatas pada, web
                  spiders, web crawlers, web robots, web ants, web indexers,
                  bots, virus atau worm, atau segala program apapun yang mungkin
                  membuat beberapa permintaan server per detik, atau menciptakan
                  beban berat atau menghambat operasi dan/atau kinerja Situs,
                  (vi) menggunakan robot, spider, pencarian situs/Situs
                  pengambilan kembali, atau perangkat manual atau otomatis
                  lainnya atau proses untuk mengambil, indeks, "tambang data"
                  (data mine), atau dengan cara apapun memperbanyak atau
                  menghindari struktur navigasi atau presentasi dari Situs atau
                  isinya; (vii) menerbitkan, mendistribusikan atau memperbanyak
                  dengan cara apapun materi yang dilindungi hak cipta, merek
                  dagang, atau informasi yang dimiliki lainnya tanpa memperoleh
                  persetujuan terlebih dahulu dari pemilik hak milik, (viii)
                  menghapus setiap hak cipta, merek dagang atau pemberitahuan
                  hak milik lainnya yang terkandung dalam Situs.Tidak ada
                  lisensi atau hak yang diberikan kepada Pengguna dengan
                  implikasi berdasarkan hak kekayaan intelektual dimiliki atau
                  dikendalikan oleh kami atau pemberi lisensi kami, kecuali
                  untuk lisensi dan hak tersebut secara tegas diberikan dalam
                  Ketentuan Penggunaan ini.
                </li>
              </ol>
              <h3>
                <b> I. Hak Kekayaan Intelektual </b>
              </h3>
              <ol>
                <li>
                  Kami menyediakan Kamu dengan konten seperti suara, foto,
                  gambar, video atau materi lain yang terkandung dalam iklan
                  disponsori atau informasi. Bahan ini dapat dilindungi oleh hak
                  cipta, merek dagang atau hak kekayaan intelektual lainnya dan
                  undang- undang. Kamu dapat menggunakan bahan ini hanya secara
                  tegas diizinkan oleh AGENDAKOTA dan tidak akan menyalin,
                  mengirimkan atau membuat karya turunan dari materi tersebut
                  tanpa izin tertulis dari AGENDAKOTA.
                </li>
                <li>
                  Kamu mengakui dan setuju bahwa Kamu tidak akan mengunduh,
                  posting, memperbanyak atau mendistribusikan konten apapun atau
                  melalui Platform yang dilindungi oleh hak cipta atau hak milik
                  lainnya dari pihak ketiga, tanpa memperoleh izin dari pemilik
                  hak tersebut. Setiap konten eksklusif hak cipta atau lainnya
                  didistribusikan atau melalui Platform dengan persetujuan dari
                  pemilik harus berisi hak cipta yang sesuai atau pemberitahuan
                  hak kepemilikan lainnya. Pengajuan atau distribusi konten
                  eksklusif hak cipta atau lainnya yang tidak sah adalah ilegal
                  dan bisa dikenai tanggung jawab pribadi atau penuntutan
                  pidana.
                </li>
              </ol>
              <h3>
                <b> J. MATERI PEMASARAN </b>
              </h3>
              <p>
                Event Creator memberikan persetujuan kepada AGENDAKOTA dan
                afiliasi atau pihak yang bekerja sama dengan AGENDAKOTA untuk
                dapat melakukan promosi dan/atau kegiatan pemasaran yang
                diadakan oleh Kami, afiliasi kami dan/atau pihak yang bekerja
                sama dengan Kami pada AGENDAKOTA Antrean dan E-Voucher Event
                Kamu. AGENDAKOTA dapat menempatkan materi pemasaran dan promosi
                dalam [AGENDAKOTA Antrean], [E-Voucher], [E-Tiket] dan/atau
                bagian manapun yang menjadi satu kesatuan dengan [Platform]
                AGENDAKOTA.
              </p>
              <h3>
                <b> K. Jaminan </b>
              </h3>
              <p>
                Kami tidak memberikan pernyataan, jaminan atau garansi untuk
                dapat diandalkannya, ketepatan waktu, kualitas, kesesuaian,
                ketersediaan, akurasi atau kelengkapan dari layanan, Situs kami
                dan/atau Platform kami, termasuk namun tidak terbatas pada
                Layanan yang diperoleh atau berasal dari Mitra kami melalui
                penggunaan Platform tersebut. Kami tidak menyatakan atau
                menjamin bahwa (a) penggunaan Platform akan aman, tepat waktu,
                tanpa gangguan atau terbebas dari kesalahan atau beroperasi
                dengan kombinasi dengan perangkat keras lain, perangkat lunak,
                sistem atau data, (b) layanan akan memenuhi kebutuhan atau
                harapan Kamu, (c) setiap data yang tersimpan akan akurat atau
                dapat diandalkan, (d) kualitas produk, layanan, informasi, atau
                bahan-bahan lain yang dibeli atau diperoleh oleh Kamu melalui
                Platform akan memenuhi kebutuhan atau harapan Kamu, (e)
                kesalahan atau kecacatan dalam Platform akan diperbaiki, atau
                (f) Platform atau server(-server) yang menyediakan Platform
                terbebas dari virus atau komponen berbahaya lainnya. Layanan
                disediakan untuk Kamu terbatas hanya pada dasar "sebagaimana
                adanya". Semua kondisi, pernyataan dan jaminan, baik tersurat,
                tersirat, yang diwajibkan oleh undang-undang atau sebaliknya,
                termasuk, namun tidak terbatas pada, jaminan yang tersirat
                mengenai jual beli, kesesuaian untuk tujuan tertentu, atau tidak
                adanya pelanggaran hak pihak ketiga, dengan ini dikecualikan dan
                dikesampingkan dengan batas tertinggi dan maksimum. Kamu
                mengakui dan menyetujui bahwa seluruh risiko yang timbul dari
                penggunaan Platform oleh Kamu tetap semata-mata dan sepenuhnya
                ada pada Kamu dan Kamu tidak akan memiliki hak untuk meminta
                ganti rugi apapun dari Kami.
              </p>
              <h3>
                <b> L. Larangan </b>
              </h3>
              <p>
                Sebagai kondisi penggunaan platform, Kamu menjamin bahwa Kamu
                tidak akan menggunakan Platform ini untuk tujuan apapun yang
                melanggar hukum atau ilegal di bawah hukum untuk saat ini
                berlaku dalam atau di luar Indonesia atau dilarang oleh syarat
                dan ketentuan dan / atau Ketentuan Penggunaan ini termasuk
                secara spesifik dan/atau tersirat. Selain itu, Platform tidak
                boleh digunakan dengan cara apapun, yang dapat merusak,
                melumpuhkan, membebani atau mengganggu penggunaan pihak lain
                dan/atau pengguna Platform. Kamu harus patuh dan taat untuk
                memperoleh atau mencoba untuk memperoleh bahan atau informasi
                melalui cara yang dibuat dan tersedia atau disediakan melalui
                Platform ini dengan iktikad baik.
              </p>
              <h3>
                <b> M. Pelanggaran </b>
              </h3>
              <ol>
                <li>
                  Tanpa mengurangi aturan lain yang tersedia pada Ketentuan
                  Penggunaan ini, peraturan Kami atau berdasarkan hukum yang
                  berlaku, Kami dapat membatasi aktivitas anda, memperingatkan
                  Pembeli ataupun pihak lain dari tindakan anda, menurunkan
                  dan/atau membatalkan Event Kamu, sifatnya sementara/selamanya
                  menangguhkan atau menghentikan pendaftaran dan/atau Event
                  Kamu, termasuk namun tidak terbatas pada akun dan/atau Event
                  anda, dan/atau menolak untuk memberikan akses ke Platform,
                  dan/atau tindakan-tindakan lainnya berdasarkan kebijakan Kami,
                  jika:
                  <ol type="a">
                    <li>
                      Kamu melanggar Ketentuan Penggunaan ini, peraturan
                      perundang-undangan dan/atau dokumen lain yang terkait;
                    </li>
                    <li>
                      data dan/atau informasi yang diberikan oleh Kamu tidak
                      sah, valid, legal, palsu dan/atau tidak dapat
                      terverifikasi oleh Kami; atau
                    </li>
                    <li>
                      Kami percaya bahwa tindakan Kamu mungkin dapat melanggar
                      hak pihak ketiga atau melanggar hukum yang berlaku atau
                      mengakibatkan kewajiban bagi kita, Kamu dan / atau
                      pengguna lainnya termasuk calon Pembeli.
                    </li>
                  </ol>
                </li>
                <li>
                  Dengan tunduk dengan peraturan lainnya dalam Ketentuan
                  Penggunaan ini, dalam hal Event Kamu dibatalkan oleh
                  AGENDAKOTA karena melanggar salah satu dari Ketentuan
                  Penggunaan ini dan/atau peraturan perundang-undangan yang
                  berlaku, maka uang yang terkumpul akan AGENDAKOTA berikan
                  kepada Pembeli.
                </li>
              </ol>
              <h3>
                <b> N. Batasan Tanggung Jawab </b>
              </h3>
              <ol>
                <li>
                  Kami tidak bertanggung jawab atas setiap cedera, kematian,
                  kerusakan atau kerugian yang terjadi di Event dan/atau
                  penggunaan Platform. Kami juga tidak bertanggung jawab atas
                  kesalahan, termasuk pelanggaran, atau tindakan kriminal yang
                  dilakukan oleh Pembeli ataupun pihak lain yang berada dalam
                  tempat Event berlangsung selama pelaksanaan Event, termasuk
                  Event Creator sendiri.
                </li>
                <li>
                  Kami tidak bertanggung jawab dan Kamu menjamin dan membebaskan
                  Kami, Mitra kami, dan perusahaan afiliasi Kami dari tanggung
                  jawab atas setiap kerugian,tuntutan, gugatan dan/atau
                  permintaan hak-hak apapun oleh Kamu, Pembeli, pengunjung acara
                  dan/atau pihak ketiga atas penyalahgunaan, penipuan
                  <em>(fraud)</em>, perbuatan curang dan/atau tindakan-tindakan
                  lainnya akibat dari penyebaran informasi dan/atau data Event,
                  termasuk data/informasi Tiket Event, yang Kamu lakukan sendiri
                  dan/atau akibat dari kelalaian, kealpaan dan/atau kesengajaan
                  Kamu. Oleh karena itu, Kamu diwajibkan untuk menjaga dan tidak
                  menyebarkan informasi dan data pribadi Kamu sendiri, termasuk
                  akun Kamu.
                </li>
                <li>
                  Setiap tuntutan terhadap Kami dalam hal apapun oleh Kamu, akan
                  dibatasi dengan jumlah total yang sebenarnya dibayar oleh
                  dan/atau terutang pada Kamu ketika menggunakan layanan Kami
                  selama peristiwa yang menimbulkan klaim tersebut. Dalam hal
                  apapun Kami dan/atau pemberi lisensi Kami tidak akan
                  bertanggung jawab kepada Kamu atau siapa pun atas biaya,
                  bunga, kerusakan atau kerugian dalam segala jenis atau bentuk
                  (termasuk cedera pribadi, gangguan emosi dan hilangnya data,
                  barang, pendapatan, keuntungan, penggunaan atau keuntungan
                  ekonomi lainnya). Kami tidak akan bertanggung jawab atas
                  kerugian, kerusakan atau cedera yang mungkin ditimbulkan oleh
                  atau disebabkan oleh Kamu pada saat Event berlangsung ataupun
                  dalam rangka pelaksanaan perjanjian ini atau pada setiap orang
                  untuk siapa Kamu telah memesan layanan, termasuk namun tidak
                  terbatas pada kerugian, kerusakan atau cedera yang timbul
                  dari, atau dengan cara apapun sehubungan dengan layanan
                  dan/atau Platform, termasuk namun tidak terbatas pada
                  penggunaan atau ketidakmampuan untuk menggunakan layanan
                  dan/atau Platform dan/atau Situs Kami.
                </li>
                <li>
                  Kamu secara tegas mengesampingkan dan melepaskan kami dari
                  setiap dan semua kewajiban, tuntutan atau kerusakan yang
                  timbul dari atau dengan cara apapun sehubungan dengan Pembeli,
                  mitra Kamu, Mitra, pengunjung Event, pihak yang berada pada
                  Event dan/atau Event. Kami dan perusahaan afiliasi Kami tidak
                  akan menjadi pihak dalam sengketa, negosiasi sengketa antara
                  Kamu dengan pihak manapun. Tanggung jawab untuk keputusan yang
                  Kamu buat atas Event merupakan tanggung jawab dan melekat
                  seutuhnya dengan dan pada Kamu. Kamu secara tegas
                  mengesampingkan dan melepaskan kami dari setiap dan semua
                  kewajiban, tuntutan, penyebab tindakan, atau kerusakan yang
                  timbul dari penggunaan Platform, pelaksanaan Event, perangkat
                  lunak dan/atau Platform, atau dengan cara apapun terkait
                  dengan Kami dan Mitra Kami yang diperkenalkan kepada Kamu
                  melalui Platform.
                </li>
                <li>
                  Kami akan mengambil langkah yang sifatnya wajar untuk mencegah
                  penipuan internet dan memastikan data yang dikumpulkan oleh
                  Kami dan disimpan supaya aman. Namun, kami tidak bertanggung
                  jawab dalam hal dari pelanggaran di server komputer Kamu, Kami
                  tidak bertanggung jawab sebagai pihak ketiga.
                </li>
              </ol>
              <h3>
                <b> O. Ganti Rugi </b>
              </h3>
              <p>
                Dengan menggunakan layanan Kami ini, Kamu setuju bahwa Kamu akan
                membela, memberikan ganti rugi dan membebaskan Kami, pemberi
                lisensi, afiliasi, dan masing-masing dari petugas, direktur,
                komisaris, karyawan, pengacara dan agen kami dari dan terhadap
                setiap dan semua klaim, biaya, kerusakan, kerugian, kewajiban
                dan biaya (termasuk biaya dan ongkos pengacara) yang timbul dari
                atau sehubungan dengan: (a) penggunaan layanan pada Situs Kami
                dan/atau Platform oleh Kamu, hubungan Kamu dengan Pembeli,
                penyedia pihak ketiga, mitra, pemasang iklan dan/atau sponsor,
                atau (b) pelanggaran atas atau tidak dipatuhinya salah satu
                Ketentuan Penggunaan atau peraturan perundang-undangan yang
                berlaku, baik yang disebutkan di sini atau tidak atau (c)
                pelanggaran Kamu terhadap hak-hak pihak ketiga, termasuk mitra
                pihak ketiga dan Mitra Kami, atau (d) penggunaan atau
                penyalahgunaan layanan Platform Kami. Kewajiban pembelaan dan
                pemberian ganti rugi ini akan tetap berlaku walaupun Ketentuan
                Penggunaan dan penggunaan Situs oleh Kamu dan Event telah
                berakhir.
              </p>
              <h3>
                <b> P. Ketentuan Lain </b>
              </h3>
              <ol>
                <li>
                  Jika ada ketentuan dalam Ketentuan Penggunaan ini yang
                  ditentukan secara tidak sah atau tidak dapat diterapkan secara
                  keseluruhan atau sebagian, cacat atau harus diterjemahkan
                  hanya untuk ketentuan tersebut atau bagian dari ketentuan
                  tersebut dan sisa bagian dari ketentuan tersebut dan semua
                  ketentuan lain dari syarat ini kondisi akan terus berada dan
                  berlaku sepenuhnya, sedangkan ketentuan tersebut akan Kami
                  sesuaikan sehingga dapat dilaksanakan dan sepenuhnya disetujui
                  oleh Kamu.
                </li>
                <li>
                  Syarat dan ketentuan ini diatur sesuai dengan hukum Republik
                  Indonesia.
                </li>
                <li>
                  Setiap dan seluruh perselisihan yang timbul dari penggunaan
                  Situs ini akan diselesaikan secara musyawarah selama 30 (tiga
                  puluh) hari kalender. Apabila sengketa tersebut tidak dapat
                  diselesaikan secara musyawarah setelah adanya surat
                  pemberitahuan sengketa, maka AGENDAKOTA dan Pengguna setuju
                  untuk menyelesaikan sengketa tersebut melalui yurisdiksi
                  eksklusif Pengadilan Negeri Jakarta Selatan, dengan tidak
                  mengurangi hak AGENDAKOTA untuk mengajukan laporan, gugatan,
                  atau tuntutan baik perdata maupun pidana melalui Pengadilan
                  Negeri, Kepolisian atau instansi terkait lainnya yang
                  berwenang dalam wilayah Negara Republik Indonesia.
                </li>
                <li>
                  Dari waktu ke waktu, Kami dapat secara sepihak merubah,
                  merevisi, memperbaiki, menghapus, menambahkan dan/atau merubah
                  dengan bentuk apapun dari syarat dan ketentuan yang tertuang
                  dalam Ketentuan Penggunaan ini berdasarkan kebijakan dan
                  kewenangan Kami.
                </li>
              </ol>
            </div>
            <hr />
            <div
              id="buyer"
              class="bantuan-section"
              style={{ marginTop: "20px" }}
              ref={inViiewRef2}
            >
              <h2 class="uk-text-center">
                <b>Pembeli/Buyer</b>
              </h2>
              <p>
                <b>
                  Syarat &amp; Ketentuan ini menjadi perjanjian yang mengikat
                  antara PT Cipta Wisata Medika ("AGENDAKOTA") dengan Anda
                  ("Pengguna"). Untuk itu, Pengguna WAJIB MEMBACA TERLEBIH
                  DAHULU Syarat &amp; Ketentuan ini. Dengan menggunakan situs
                  AGENDAKOTA.ID, maka Pengguna SETUJU dan TUNDUK serta TERIKAT
                  SECARA LANGSUNG dengan Syarat &amp; Ketentuan dan Kebijakan
                  Privasi ini.
                </b>
              </p>
              <h3>
                {" "}
                <b> A. PENGGUNAAN SITUS AGENDAKOTA.ID </b>{" "}
              </h3>
              <ol>
                <li>
                  Situs AGENDAKOTA.ID ("Situs") dan layanan yang tersedia di
                  dalamnya hanya dapat digunakan oleh Pengguna untuk penggunaan
                  pribadi dan bertujuan untuk pemesanan dan/atau pembayaran.
                </li>
                <li>
                  Syarat dan Ketentuan merupakan satu kesatuan dengan &nbsp;
                  <a
                    href="https://agendakota.id/term-conditions"
                    target="_blank"
                  >
                    {" "}
                    Kebijakan Privasi.{" "}
                  </a>
                  Pengguna setuju untuk tunduk pada ketentuan Syarat dan
                  Ketentuan ini dan{" "}
                  <a
                    href="https://agendakota.id/term-conditions"
                    target="_blank"
                  >
                    {" "}
                    Kebijakan Privasi{" "}
                  </a>
                  sebagaimana dimaksud di halaman ini.
                </li>
                <li>
                  Situs ini dan produk-produk, teknologi dan proses yang
                  terdapat atau terkandung di dalamnya, dimiliki oleh AGENDAKOTA
                  dan/atau pihak ketiga yang memberi hak kepada AGENDAKOTA.
                  Kecuali untuk penggunaan yang secara tegas diijinkan dan
                  diperbolehkan dalam Syarat dan Ketentuan ini, Pengguna tidak
                  memiliki ataupun menerima dan AGENDAKOTA tidak memberikan hak
                  lain apapun ke Pengguna atas Situs ini, berikut dengan segala
                  data, informasi dan konten di dalamnya.
                </li>
                <li>
                  Dengan menggunakan Situs ini atau layanan yang tersedia di
                  dalamnya, maka Pengguna menyatakan setuju tidak akan:
                  <ol type="a">
                    <li>
                      <p>
                        Menggunakan Situs untuk menggunakan untuk tujuan lain
                        apapun.
                      </p>
                    </li>
                    <li>
                      <p>
                        Mengakses, memonitor atau menyalin isi atau informasi
                        apapun dari Situs dengan menggunakan robot, spider atau
                        scraper atau cara otomatis apapun atau proses manual
                        apapun untuk tujuan apapun tanpa izin tertulis secara
                        tegas dari AGENDAKOTA terlebih dahulu.
                      </p>
                    </li>
                    <li>
                      <p>
                        Melanggar larangan dalam setiap judul pengecualian robot
                        pada Situs atau melewati atau menghindari upaya lainnya
                        yang digunakan untuk mencegah atau membatasi akses
                        kepada Situs.
                      </p>
                    </li>
                    <li>
                      <p>
                        Mengambil tindakan apapun yang memberikan, atau dapat
                        memberikan, menurut pendapat AGENDAKOTA, suatu beban
                        besar yang tidak wajar atau tidak proporsional pada
                        infrastruktur AGENDAKOTA.
                      </p>
                    </li>
                    <li>
                      <p>
                        Melakukan deep-link kepada setiap bagian dari Situs
                        (termasuk tetapi tidak terbatas pada jalur pembelian)
                        untuk tujuan apapun tanpa ijin tertulis secara tegas
                        dari AGENDAKOTA terlebih dahulu.
                      </p>
                    </li>
                    <li>
                      <p>
                        Menjual kembali, menggunakan, memonitor (misalnya
                        spider, scrape), menampilkan, mengunduh atau
                        mereproduksi setiap isi atau informasi, perangkat lunak,
                        produk atau layanan yang tersedia dalam Situs untuk
                        kegiatan atau tujuan komersial atau kompetitif apapun.
                      </p>
                    </li>
                    <li>
                      <p>
                        Melakukan "frame", "mirror" atau dengan cara lain
                        mencantumkan setiap bagian dari Situs ke situs lainnya
                        tanpa persetujuan tertulis dari AGENDAKOTA terlebih
                        dahulu.
                      </p>
                    </li>
                    <li>
                      <p>
                        Mengirimkan pesan yang melanggar hukum (menurut
                        peraturan perundangan yang berlaku) kepada atau di
                        seluruh Situs, atau pesan yang mencerminkan kegiatan
                        yang melanggar hukum.
                      </p>
                    </li>
                    <li>
                      <p>
                        Mengirimkan, atau menyediakan hubungan kepada, pesan
                        yang mencantumkan materi yang dapat dianggap mengandung
                        hal yang merugikan, amoral, pornografi, hal yang tidak
                        patut, hal yang menyinggung, bersifat kekerasan,
                        penganiayaan, melanggar kesopanan, rasisme,
                        diskriminasi, penghinaan, ancaman, pelecehan, kebencian.
                      </p>
                    </li>
                    <li>
                      <p>
                        Mengirimkan atau menyediakan hubungan kepada, pesan yang
                        mengandung materi yang menghina, mencemarkan seseorang
                        atau suatu pihak.
                      </p>
                    </li>
                    <li>
                      <p>
                        Mengirimkan pesan apapun yang melanggar atau merugikan
                        setiap hak atas kekayaan intelektual atau hak lain dari
                        setiap badan atau orang, termasuk tetapi tidak terbatas
                        pada hak cipta, paten, merek, hukum yang mengatur
                        rahasia dagang, hak kerahasiaan pribadi atau publikasi.
                      </p>
                    </li>
                    <li>
                      <p>
                        Mengirimkan setiap pesan dimana Pengguna tidak memiliki
                        hak berdasarkan hukum yang berlaku.
                      </p>
                    </li>
                    <li>
                      <p>
                        berpura-pura menjadi orang atau badan lain atau
                        menyatakan dengan tidak benar, atau menyatakan dengan
                        tidak benar mengenai hubungan Pengguna dengan seseorang
                        atau suatu badan, atau menggunakan identitas palsu jika
                        tujuannya adalah untuk menyesatkan, menipu atau
                        mengelabui pihak lain.
                      </p>
                    </li>
                    <li>
                      <p>
                        Melakukan manipulasi, termasuk dengan memalsukan judul,
                        untuk menyamarkan asal dari pesan yang Pengguna
                        kirimkan.
                      </p>
                    </li>
                    <li>
                      <p>
                        Menggunakan Situs dengan cara apapun yang dapat merusak,
                        melumpuhkan, terlalu membebani, atau merugikan atau
                        mengganggu penggunaan Situs atau peralatan komputer
                        pengguna lainnya, atau menyebabkan kerusakan, gangguan
                        atau membatasi fungsi dari setiap perangkat lunak,
                        perangkat keras atau peralatan telekomunikasi.
                      </p>
                    </li>
                    <li>
                      <p>
                        Mencoba untuk memperoleh akses tanpa wewenang ke Situs,
                        setiap situs yang terkait, akun lain, sistem komputer
                        atau jaringan yang terhubung dengan Situs, melalui
                        pembajakan, pengambilan kata sandi, atau dengan cara
                        lain apapun.
                      </p>
                    </li>
                    <li>
                      <p>
                        Memperoleh atau mencoba untuk memperoleh setiap materi
                        atau informasi melalui cara apapun yang tidak dengan
                        sengaja disediakan melalui Situs, termasuk mengambil
                        atau dengan cara lain mengumpulkan informasi mengenai
                        pihak lain seperti alamat e-mail.
                      </p>
                    </li>
                    <li>
                      <p>
                        Terlibat dalam setiap praktik penipuan yang ditujukan
                        untuk memanipulasi Search Engine Results Page ("SERP")
                        organik atau menggunakan teknik Search Engine
                        Optimization ("SEO") yang dianggap bertentangan dengan
                        pedoman mesin pencari yang lazim. Praktek SEO yang
                        dianggap tidak etis, atau "Black Hat" atau "spamdexing",
                        termasuk tetapi tidak terbatas pada cloaking, metadata
                        dan title tags, content scraping, link schemes, Google
                        bombs, keyword stuffing, hidden text dan links, doorway
                        dan cloaked pages, link farming atau schemes, blog
                        comment spam, dan lain-lain.
                      </p>
                    </li>
                    <li>
                      <p>
                        Melakukan hal-hal lain apapun yang dapat menyebabkan
                        kerugian pada Situs, kelompok perusahaan AGENDAKOTA dan
                        para direksi serta karyawannya, reputasi AGENDAKOTA atau
                        yang dapat memberikan dampak negatif lainnya.
                      </p>
                    </li>
                  </ol>
                </li>
                <li>
                  Dalam Situs ini mungkin terdapat tautan (link) ke situs yang
                  dikelola oleh pihak ketiga ("Situs Eksternal"). Situs
                  Eksternal disediakan hanya untuk referensi dan kenyamanan
                  saja. AGENDAKOTA tidak mengoperasikan, mengendalikan atau
                  mendukung dalam bentuk apapun Situs Eksternal yang
                  bersangkutan maupun konten/isinya. Pengguna bertanggung jawab
                  penuh atas penggunaan Situs Eksternal tersebut dan wajib
                  mempelajari syarat dan ketentuan dari Situs Eksternal tersebut
                  secara seksama.
                </li>
                <li>
                  Layanan yang tersedia dalam Situs ini secara umum menggunakan
                  sistem re-marketing dan sistem cookies yang memungkinkan pihak
                  ketiga (termasuk dan tidak terbatas pada Google dan Yahoo)
                  mengakses dan menggunakan data kunjungan dalam sistem cookies
                  Situs ini untuk menampilkan dan menayangkan kembali tiap iklan
                  AGENDAKOTA melalui internet.
                </li>
              </ol>
              <h3>
                {" "}
                <b> B. LAYANAN AGENDAKOTA </b>{" "}
              </h3>
              <ol>
                <li>
                  AGENDAKOTA menyediakan dan menyelenggarakan sistem dan
                  fasilitas pemesanan tiket atau voucher dalam bentuk tiket
                  elektronik ("E-Ticket") atau voucher elektronik ("E-Voucher")
                  untuk suatu pertunjukan, konser, eksebisi, festival,
                  pertandingan, seminar/konferensi ("Acara"), serta melakukan
                  pembelian dan sekaligus melakukan pembayaran secara online dan
                  aman melalui berbagai sistem dan fasilitas pembayaran yang
                  tersedia.
                </li>
                <li>
                  Layanan AGENDAKOTA secara umum dapat tersedia secara online
                  selama dua puluh empat jam sehari dan tujuh hari dalam
                  seminggu; kecuali dalam hal adanya perbaikan, peningkatan atau
                  pemeliharaan pada Situs.
                </li>
                <li>
                  Acara diselenggarakan oleh pihak ketiga ("Mitra") yang telah
                  mengadakan kerjasama dan telah mengadakan ikatan perjanjian,
                  baik secara langsung ataupun tidak langsung, dengan
                  AGENDAKOTA.
                </li>
                <li>
                  Pengguna memahami dan mengakui bahwa:
                  <ol>
                    <li>
                      <p>
                        Pemesanan/pembelian yang Pengguna lakukan melalui
                        AGENDAKOTA, merupakan hubungan hukum dan kontraktual
                        yang mengikat antara Pengguna dan Mitra. Dalam hal ini,
                        AGENDAKOTA bertindak sebagai perantara yang bertugas
                        untuk memfasilitasi transaksi antara Pengguna dan Mitra.
                      </p>
                    </li>
                    <li>
                      <p>
                        Data dan informasi terkait dengan Acara yang AGENDAKOTA
                        cantumkan pada Situs merupakan data dan informasi yang
                        AGENDAKOTA terima dari Mitra, dan AGENDAKOTA akan
                        mempublikasikan data dan informasi tersebut dengan
                        itikad baik sesuai dengan data dan informasi yang
                        AGENDAKOTA terima.
                      </p>
                    </li>
                    <li>
                      <p>
                        AGENDAKOTA tidak memiliki kendali atas data dan
                        informasi yang diberikan oleh Mitra, dan AGENDAKOTA
                        tidak menjamin bahwa data dan informasi yang disajikan
                        adalah akurat, lengkap, atau benar, dan bebas dari
                        kesalahan.
                      </p>
                    </li>
                    <li>
                      <p>
                        Pengguna tidak diperbolehkan untuk menjual kembali
                        E-Ticket atau E-Voucher, menggunakan, menyalin,
                        mengawasi, menampilkan, mengunduh, atau mereproduksi
                        konten atau informasi, piranti lunak, atau Layanan apa
                        pun yang tersedia di Situs untuk kegiatan atau tujuan
                        komersial apapun, tanpa persetujuan tertulis dari
                        AGENDAKOTA sebelumnya.
                      </p>
                    </li>
                    <li>
                      <p>
                        Pengguna hanya dapat menggunakan Situs dan Layanan yang
                        tersedia untuk membuat pemesanan/pembelian yang sah.
                        Pengguna tidak diperbolehkan untuk membuat
                        pemesanan/pembelian untuk tujuan spekulasi, tidak benar
                        atau melanggar hukum. Jika AGENDAKOTA menemukan atau
                        sewajarnya menduga bahwa pemesanan/pembelian yang
                        Pengguna buat ternyata tidak sah, maka AGENDAKOTA berhak
                        untuk membatalkan pemesanan/pembelian E-Ticket atau
                        E-Voucher.
                      </p>
                    </li>
                    <li>
                      <p>
                        Pengguna juga menjamin bahwa data dan informasi yang
                        Pengguna berikan ke AGENDAKOTA, baik sehubungan dengan
                        pemesanan/pembelian pada AGENDAKOTA, adalah data dan
                        informasi yang akurat, terkini dan lengkap.
                      </p>
                    </li>
                    <li>
                      <p>
                        Pengguna setuju dan memahami bahwa AGENDAKOTA tidak
                        bertanggung jawab atas seluruh dan setiap data dan
                        informasi yang diberikan oleh Mitra penyelenggara Acara,
                        beserta seluruh perubahannya (apabila ada). Pengguna
                        membebaskan AGENDAKOTA dari segala bentuk tuntutan atas
                        hal tersebut.
                      </p>
                    </li>
                  </ol>
                </li>
              </ol>
              <h3>
                {" "}
                <b> C. PEMESANAN/PEMBELIAN &amp; PEMBAYARAN </b>{" "}
              </h3>
              <ol>
                <li>
                  <p>
                    Pengguna dapat melakukan pemesanan/pembelian E-Ticket atau
                    E-Voucher yang tersedia melalui situs resmi AGENDAKOTA.
                    Dalam keadaan apapun, AGENDAKOTA tidak bertanggung jawab
                    untuk pemesanan/pembelian E-Ticket atau E-Voucher yang
                    dilakukan melalui situs lain yang bukan merupakan situs
                    resmi AGENDAKOTA. Untuk itu, Pengguna wajib memeriksa dengan
                    cermat alamat situs resmi AGENDAKOTA ketika melakukan
                    pemesanan/pembelian.
                  </p>
                </li>
                <li>
                  <p>
                    Sebelum Pengguna memulai pemesanan/pembelian E-Ticket atau
                    E-Voucher, Pengguna diarahkan ke halaman antrean/ waiting
                    room (untuk selanjutnya disebut “AGENDAKOTA Antrean”).
                    Mengenai AGENDAKOTA Antrean merujuk ke butir D.
                  </p>
                </li>
                <li>
                  <p>
                    Mitra penyelenggara Acara dapat memberlakukan E-Ticket atau
                    E-Voucher dalam berbagai kategori atau kelas, tanggal dan
                    jam Acara, serta memberlakukan jenis E-Ticket atau E-Voucher
                    untuk satu kali masuk ke tempat Acara (single entry) atau
                    berkali-kali masuk ke tempat Acara (multiple entry). Oleh
                    karena itu, sebelum melakukan pemesanan/pembelian E-Ticket
                    atau E-Voucher, Pengguna wajib memperhatikan kategori atau
                    kelas, tanggal dan jam Acara serta jenis E-Ticket atau
                    E-Voucher yang Pengguna kehendaki.
                  </p>
                </li>
                <li>
                  <p>
                    Dalam hal Pengguna melakukan pemesanan/pembelian E-Voucher,
                    maka untuk dapat memasuki tempat Acara, Pengguna wajib
                    menukarkan E-Voucher dengan tiket atau tiket dengan barcode
                    atau gelang dengan barcode atau gelang dengan Radio
                    Frequency Identification (RFID) sebagaimana berlaku, pada
                    waktu dan tempat yang ditentukan oleh Mitra penyelenggara
                    Acara. AGENDAKOTA mewajibkan Pengguna untuk menukarkan
                    sendiri E-Voucher dengan tiket atau tiket dengan barcode
                    atau gelang dengan barcode atau gelang dengan Radio
                    Frequency Identification (RFID). Apabila Pengguna meminta
                    pihak ketiga untuk melakukan penukaran E-Voucher, maka
                    Pengguna dengan ini bertanggung jawab penuh dan oleh
                    karenanya membebaskan serta melindungi AGENDAKOTA dari
                    segala bentuk tuntutan apabila pihak ketiga tersebut gagal
                    atau lalai atau tidak menyerahkan tiket atau tiket dengan
                    barcode atau gelang dengan barcode atau gelang dengan Radio
                    Frequency Identification (RFID) kepada Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Untuk melakukan pemesanan/pembelian E-Ticket atau E-Voucher,
                    Pengguna wajib mengisi data diri sesuai dengan data yang
                    tertera pada kartu identitas Pengguna (Kartu Tanda
                    Penduduk/Surat Izin Mengemudi/Paspor) yang sah dan masih
                    berlaku. AGENDAKOTA dan/atau Mitra penyelenggara Acara
                    berhak untuk setiap saat membatalkan pemesanan/pembelian
                    E-Ticket atau E-Voucher apabila diketahui Pengguna
                    menggunakan data yang tidak sesuai atau kartu identitas
                    palsu atau yang telah habis masa berlakunya.
                  </p>
                </li>
                <li>
                  <p>
                    Untuk Pertunjukan/Acara yang bertanda minimal usia (misal:
                    17+, 18+, 21+), maka pengguna tiket yang berusia kurang dari
                    usia minimum yang tertera tidak diperkenankan memasuki area
                    pertunjukan dengan alasan apapun. Tidak ada penggantian dana
                    atau ganti rugi dalam bentuk apapun. Validasi usia hanya
                    dapat dilakukan dengan menunjukan kartu identitas asli milik
                    pengguna yang masih berlaku.
                  </p>
                </li>
                <li>
                  <p>
                    Pemesanan/pembelian E-Ticket atau E-Voucher dianggap
                    berhasil atau selesai setelah AGENDAKOTA menerima konfirmasi
                    pelunasan pembayaran pemesanan/pembelian E-Ticket atau
                    E-Voucher secara sukses di sistem AGENDAKOTA, dan AGENDAKOTA
                    akan menerbitkan serta mengirimkan e-mail konfirmasi
                    pemesanan/pembelian E-Ticket atau E-Voucher ke alamat e-mail
                    Pengguna. Untuk menghindari keragu-raguan, AGENDAKOTA akan
                    mengirimkan e-mail konfirmasi ke alamat e-mail Pengguna
                    melalui akun support@agendakota.id. E-mail konfirmasi yang
                    dikirimkan selain dari akun tersebut bukan merupakan e-mail
                    konfirmasi yang diterbitkan dan dikirimkan oleh AGENDAKOTA
                    dan menjadi bukti yang sah dan mengikat bahwa Pengguna tidak
                    melakukan pemesanan/pembelian E-Ticket atau E-Voucher
                    melalui situs resmi AGENDAKOTA.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna dengan ini mengakui bahwa kegagalan transaksi
                    pembayaran dapat setiap saat terjadi karena kegagalan sistem
                    perbankan, dan Pengguna dengan ini setuju bahwa dalam hal
                    terjadi kegagalan sistem perbankan, maka pemesanan/pembelian
                    E-Ticket atau E-Voucher dianggap tidak berhasil. Apabila
                    terjadi perselisihan di kemudian hari sehubungan dengan
                    pemesanan/pembelian E-Ticket atau E-Voucher, maka Pengguna
                    dengan ini setuju bahwa data yang terdapat pada sistem
                    AGENDAKOTA yang menjadi satu-satunya bukti yang sah dan
                    mengikat AGENDAKOTA dan Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna dapat melakukan pelunasan pembayaran menggunakan
                    kartu kredit, transfer antar rekening serta antar bank atau
                    virtual account di bank-bank yang tercantum di Situs atau
                    metode pembayaran lain. Untuk melindungi informasi kartu
                    kredit Pengguna, AGENDAKOTA menggunakan fasilitas teknologi
                    enkripsi; namun demikian, AGENDAKOTA tidak memberikan
                    jaminan apapun mengenai efektivitas teknologi enkripsi, dan
                    Pengguna dengan ini setuju bahwa AGENDAKOTA tidak
                    bertanggung jawab atas masalah yang terjadi akibat
                    pengaksesan tanpa ijin dari informasi yang Pengguna
                    sediakan.
                  </p>
                </li>
                <li>
                  <p>
                    Dalam hal terjadi kasus penipuan kartu kredit atau
                    penyalahgunaan sistem pembayaran oleh pihak ketiga manapun,
                    maka kejadian tersebut harus segera dilaporkan kepada
                    AGENDAKOTA dan bank penerbit kartu kredit Pengguna dalam
                    waktu 1x24 jam.
                  </p>
                </li>
                <li>
                  <p>
                    Untuk pelunasan pembayaran pemesanan/pembelian E-Ticket atau
                    E-Voucher melalui mekanisme transfer antar rekening atau
                    virtual account, maka Pengguna wajib melakukan pelunasan
                    pembayaran paling lambat 3 (tiga) jam sejak waktu
                    pemesanan/pembelian E-Ticket atau E-Voucher dilakukan.
                    AGENDAKOTA berhak untuk membatalkan pemesanan/pembelian
                    E-Ticket atau E-Voucher yang dilakukan oleh Pengguna, jika
                    AGENDAKOTA belum menerima konfirmasi pelunasan pembayaran
                    secara sukses di sistem AGENDAKOTA pada waktu yang
                    ditentukan.
                  </p>
                </li>
                <li>
                  <p>
                    Dengan tunduk pada ketentuan butir C.9 di atas, dalam hal
                    Mitra menerapkan sistem penjualan "Pre-Sale" atau "Early
                    Bird", maka Pengguna wajib melakukan pelunasan pembayaran
                    pada hari yang sama ketika Pengguna melakukan
                    pemesanan/pembelian E-Ticket atau E-Voucher. Apabila
                    Pengguna, karena alasan atau sebab apapun, gagal melakukan
                    transaksi pelunasan pembayaran pada waktu yang ditentukan,
                    maka AGENDAKOTA berhak membatalkan pemesanan/pembelian yang
                    dilakukan oleh Pengguna, dan Pengguna dapat melakukan
                    pemesanan/pembelian ulang sepanjang E-Ticket atau E-Voucher
                    Pre-Sale atau Early Bird tersebut masih tersedia.
                  </p>
                </li>
                <li>
                  <p>
                    Dengan menyelesaikan pemesanan/pembelian, maka Pengguna
                    dianggap setuju:
                  </p>
                </li>
                <ol type="a">
                  <li>
                    <p>
                      Untuk menerima e-mail yang akan AGENDAKOTA kirim segera
                      setelah Pengguna menyelesaikan pemesanan/pembelian
                      E-Ticket atau E-Voucher, memberikan Pengguna informasi
                      tentang E-Ticket atau E-Voucher yang Pengguna pesan/beli,
                      dan menyediakan Pengguna informasi dan penawaran tertentu
                      (termasuk penawaran pihak ketiga yang Pengguna pilih
                      sendiri) yang terkait dengan pemesanan/pembelian Pengguna
                    </p>
                  </li>
                  <li>
                    <p>
                      Untuk menerima e-mail yang akan AGENDAKOTA kirim untuk
                      mengundang Pengguna untuk melengkapi formulir ulasan
                      pengguna jasa AGENDAKOTA. Selain e-mail mengenai
                      konfirmasi pemesanan/pembelian E-Ticket atau E-Voucher dan
                      e-mail penawaran pihak ketiga yang telah Pengguna pilih
                      sendiri, AGENDAKOTA tidak akan mengirimkan kepada Pengguna
                      pemberitahuan (yang diinginkan maupun yang tidak), e-mail,
                      korespondensi lebih lanjut, kecuali jika diminta secara
                      khusus oleh Pengguna.
                    </p>
                  </li>
                </ol>
                <li>
                  <p>
                    E-Ticket atau E-Voucher yang sudah dipesan/dibeli dan
                    dibayar oleh Pengguna, tidak dapat dibatalkan atau
                    dikembalikan atau diuangkan atau dijual kembali atau
                    dialihkan dengan cara apapun kepada orang lain dengan alasan
                    apapun. Pengguna dengan ini setuju untuk mengganti segala
                    kerugian yang diderita oleh AGENDAKOTA, serta membebaskan
                    dan melindungi AGENDAKOTA dari segala bentuk tuntutan yang
                    diajukan oleh pihak manapun yang timbul sehubungan dengan
                    penjualan kembali atau pengalihan E-Ticket atau E-Voucher
                    oleh Pengguna kepada orang lain.
                  </p>
                </li>
                <li>
                  <p>
                    Dalam hal Acara dibatalkan oleh Mitra penyelenggara Acara,
                    maka Pengguna dengan ini setuju bahwa kebijakan pengembalian
                    uang pembelian E-Ticket atau E-Voucher sepenuhnya merupakan
                    wewenang Mitra penyelenggara Acara, dan Pengguna dengan ini
                    setuju untuk tidak mengajukan tuntutan dalam bentuk apapun
                    kepada AGENDAKOTA sehubungan dengan pembatalan Acara dan
                    pengembalian uang pembelian E-Ticket atau E-Voucher. Biaya
                    bank dan biaya administrasi yang telah dibebankan kepada
                    Pengguna saat pemesanan/pembelian E-Ticket atau E-Voucher,
                    tidak akan dikembalikan.
                  </p>
                </li>
                <li>
                  <p>
                    Ketentuan pengembalian tiket (refund) akan mengikuti
                    ketentuan sebagaimana diatur oleh Mitra penyelenggara Acara
                    yang akan disampaikan oleh AGENDAKOTA kepada Pengguna sesuai
                    dengan kondisi penyelenggaraan Acara.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna setuju bahwa pengembalian tiket (refund) yang
                    dilakukan tidak melalui AGENDAKOTA adalah bukan menjadi
                    tanggung jawab AGENDAKOTA.
                  </p>
                </li>
                <li>
                  <p>
                    Dalam hal terjadi pengembalian tiket (refund) maka nilai
                    yang dikembalikan adalah sesuai harga tiket yang dibayar
                    oleh Pengguna. Dalam hal Pengguna menggunakan kode unik,
                    voucher, kode diskon,kode promo dan/atau
                    pengurangan-pengurangan lain sebagaimana disediakan oleh
                    AGENDAKOTA dan/atau pihak lain, maka pengurangan tersebut
                    tidak akan dikembalikan kepada Pengguna. AGENDAKOTA akan
                    mengembalikan kepada pihak penerbit pengurangan tersebut
                    atau sesuai ketentuan AGENDAKOTA.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna dengan ini membebaskan AGENDAKOTA dari segala
                    bentuk tuntutan dalam hal terjadi pengembalian tiket
                    (refund).
                  </p>
                </li>
              </ol>
              <h3>
                {" "}
                <b> D. Antrean/Waiting Room (“AGENDAKOTA Antrean”) </b>{" "}
              </h3>
              <ol>
                <li>
                  <p>
                    Mekanisme AGENDAKOTA Antrean ialah first come first served,
                    guna memberikan kesempatan yang adil kepada Pengguna. Urutan
                    pemesanan/pembelian tiket akan ditentukan berdasarkan urutan
                    kedatangan Pengguna di dalam antrean dan hal ini sangat
                    dipengaruhi oleh jaringan dan perangkat yang digunakan oleh
                    Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Penentuan urutan Pengguna didasarkan pada data dan informasi
                    yang tercatat pada sistem AGENDAKOTA. AGENDAKOTA akan
                    melakukan upaya yang wajar untuk memastikan keakuratan dan
                    menyediakan layanan yang sama kepada setiap Pengguna namun
                    AGENDAKOTA tidak bertangung jawab atas kesalahan teknis,
                    kegagalan jaringan, atau gangguan transmisi yang bisa
                    terjadi.
                  </p>
                </li>
                <li>
                  <p>
                    Nomor antrean yang tertera di laman AGENDAKOTA Antrean tidak
                    merefleksikan jumlah kuota tiket yang tersedia dan tidak
                    dapat dijadikan dasar atas ketersediaan tiket. AGENDAKOTA
                    tidak menjamin ketersediaan tiket untuk semua Pengguna yang
                    berada pada AGENDAKOTA Antrean. Tiket mungkin saja bisa
                    habis sebelum Pengguna mencapai giliran pemesanan/pembelian
                    tiket.
                  </p>
                </li>
                <li>
                  <p>
                    Pada saat Pengguna berada di halaman AGENDAKOTA Antrean,
                    Pengguna dianjurkan untuk tidak melakukan aktivitas lain
                    pada perangkat yang sedang digunakan untuk melakukan
                    pemesanan/pembelian tiket. Aktivitas lain yang dimaksud
                    ialah seperti namun tidak terbatas membuka website/aplikasi
                    lain, pindah ke tab lain, melakukan refresh laman, termasuk
                    juga adanya perubahan konfigurasi browser, perubahan
                    jaringan, penggunaan aplikasi/software pihak ketiga
                    (plug-in/ads blocker dan lain sebagainya), penggunaan VPN,
                    dan lain-lain. Pengguna wajib memperhatikan dan memahami
                    hal-hal yang dimaksud sebelumnya, karena sistem bisa
                    mengeluarkan Pengguna dari halaman antrean maupun halaman
                    transaksi pemesanan/pembelian tiket jika hal-hal di atas
                    terjadi
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna dengan ini setuju dan memahami untuk bertanggung
                    jawab secara penuh dan melepaskan dan membebaskan AGENDAKOTA
                    dari segala bentuk tanggung jawab, ganti rugi, tuntutan,
                    gugatan, klaim, permintaan hak dan/atau segala bentuk
                    kewajiban yang harus ditanggung akibat hal-hal yang
                    menyebabkan Pengguna keluar dari laman AGENDAKOTA Antrean
                    maupun halaman transaksi.
                  </p>
                </li>
              </ol>
              <h3>
                {" "}
                <b> E. HARGA </b>{" "}
              </h3>
              <p>
                Harga yang tertera di dalam Situs belum termasuk platform fee
                sebagaimana tertera dalam e-mail konfirmasi atau konfirmasi
                elektronik lainnya.
              </p>
              <h3>
                {" "}
                <b>
                  {" "}
                  F. PENGGUNAAN E-TICKET ATAU E-VOUCHER &amp; KETENTUAN UNTUK
                  MEMASUKI TEMPAT ACARA{" "}
                </b>{" "}
              </h3>
              <p> Pengguna dengan ini mengakui dan setuju bahwa: </p>
              <ol>
                <li>
                  <p>
                    AGENDAKOTA hanya akan mengirimkan E-Ticket atau E-Voucher
                    melalui akun resmi AGENDAKOTA yaitu ke alamat e-mail
                    dan/atau media lain milik Pengguna yang disampaikan oleh
                    Pengguna kepada AGENDAKOTA saat pemesanan/pembelian
                    dilakukan.
                  </p>
                </li>
                <li>
                  <p>
                    AGENDAKOTA hanya akan mengirimkan E-Ticket atau E-Voucher
                    tersebut, setelah transaksi pemesanan/pembelian dianggap
                    berhasil atau selesai dan AGENDAKOTA telah menerima
                    konfirmasi pelunasan pembayaran pemesanan/pembelian E-Ticket
                    atau E-Voucher secara sukses di sistem AGENDAKOTA.
                  </p>
                </li>
                <li>
                  <p>
                    Untuk menghindari penggandaan atau penyalahgunaan E-Ticket
                    dan E-Voucher, hanya Pengguna yang dapat mengakses e-mail
                    Pengguna dan Pengguna hanya akan mencetak E-Ticket atau
                    E-Voucher tersebut sebanyak 1 (satu) kali untuk digunakan
                    sendiri oleh Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    1 (satu) E-Ticket atau E-Voucher hanya berlaku untuk 1
                    (satu) orang dan 1 (satu) kali penggunaan, sesuai dengan
                    kategori atau kelas, tanggal dan jam Acara yang diatur oleh
                    Mitra penyelenggara Acara. Mitra penyelenggara Acara berhak
                    menolak Pengguna untuk memasuki tempat Acara yang tidak
                    sesuai dengan E-Ticket atau E-Voucher yang dipesan/dibeli
                    oleh Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna wajib menjaga kerahasiaan serta dilarang untuk
                    mempublikasikan E-Ticket atau E-Voucher yang sudah
                    dipesan/dibeli, termasuk mempublikasikan melalui sosial
                    media, untuk menghindari duplikasi/penggandaan atau
                    penggunaan E-Ticket atau E-Voucher atau barcode yang tertera
                    pada E-Ticket atau E-Voucher oleh pihak ketiga.
                  </p>
                </li>
                <li>
                  <p>
                    AGENDAKOTA dan/atau Mitra penyelenggara Acara dalam keadaan
                    apapun tidak bertanggung jawab apabila E-Ticket atau
                    E-Voucher atau barcode yang tertera pada E-Ticket atau
                    E-Voucher tersebut yang dicetak lebih dari 1 (satu) kali
                    atau diduplikasi/digandakan oleh pihak ketiga atau jatuh ke
                    tangan pihak ketiga atau berada dalam penguasaan pihak
                    ketiga untuk kemudian digunakan oleh pihak ketiga tersebut
                    untuk memasuki tempat Acara.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna wajib memperlihatkan kartu identitas (Kartu Tanda
                    Penduduk/Surat Izin Mengemudi/Paspor) yang sah dan masih
                    berlaku, yang digunakan oleh Pengguna untuk melakukan
                    pemesanan/pembelian E-Ticket atau E-Voucher. Mitra
                    penyelenggara Acara berhak untuk menolak Pengguna untuk
                    memasuki tempat Acara apabila Pengguna gagal memperlihatkan
                    kartu identitasnya.
                  </p>
                </li>
                <li>
                  <p>
                    Dalam hal pembayaran pelunasan E-Ticket atau E-Voucher
                    menggunakan kartu kredit, Pengguna wajib membawa serta
                    memperlihatkan fisik dari kartu kredit yang digunakan untuk
                    melakukan pemesanan/pembelian kepada Mitra penyelenggara
                    Acara untuk memasuki tempat Acara. Mitra penyelenggara Acara
                    berhak untuk menolak Pengguna untuk memasuki tempat Acara
                    apabila Pengguna gagal memperlihatkan kartu kredit tersebut.
                  </p>
                </li>
                <li>
                  <p>
                    Mitra penyelenggara Acara berhak untuk menolak Pengguna yang
                    berusia di bawah 18 tahun dan/atau yang belum memiliki kartu
                    identitas, yang tidak didampingi oleh sedikitnya 1 (satu)
                    orang dewasa, untuk memasuki tempat Acara. Lebih lanjut,
                    AGENDAKOTA dan/atau Mitra penyelenggara Acara tidak
                    berkewajiban untuk melakukan pengembalian uang kepada
                    Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Apabila Acara disponsori oleh perusahaan rokok dan/atau
                    perusahaan minuman beralkohol dan/atau perusahaan alat
                    kontrasepsi, maka Mitra penyelenggara Acara berhak untuk
                    menolak Pengguna yang berusia di bawah 18 tahun untuk
                    memasuki tempat Acara. Lebih lanjut, AGENDAKOTA dan/atau
                    Mitra penyelenggara Acara tidak berkewajiban untuk melakukan
                    pengembalian uang kepada Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Mitra penyelenggara Acara berhak untuk menolak Pengguna
                    untuk memasuki tempat Acara dalam hal Pengguna dianggap
                    berpotensi mengganggu keamanan dan kenyamanan
                    penyelenggaraan Acara, berada dalam keadaan mabuk, di bawah
                    pengaruh obat-obatan, membawa/memiliki narkotika dan obat
                    terlarang, membawa senjata tajam (atau yang dipersamakan
                    dengan itu), membawa senjata api (atau yang dipersamakan
                    dengan itu). Dalam hal yang demikian, Mitra penyelenggara
                    Acara berhak untuk melaporkan dan menyerahkan Pengguna
                    kepada pihak yang berwenang. Lebih lanjut, AGENDAKOTA
                    dan/atau Mitra penyelenggara Acara tidak berkewajiban untuk
                    melakukan pengembalian uang kepada Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna dilarang untuk membawa makanan dan/atau minuman
                    dari luar tempat Acara. Mitra penyelenggara Acara berhak
                    untuk menyita makanan dan/atau minuman dari luar tempat
                    Acara yang dibawa oleh Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Mitra penyelenggara Acara berhak untuk menolak Pengguna
                    untuk memasuki tempat Acara atau mengeluarkan Pengguna dari
                    tempat Acara apabila Pengguna berperilaku tidak tertib,
                    menyulut perselisihan, atau menolak instruksi/peringatan
                    dari staff Mitra penyelenggara Acara. Lebih lanjut,
                    AGENDAKOTA dan/atau Mitra penyelenggara Acara tidak
                    berkewajiban untuk melakukan pengembalian uang kepada
                    Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna wajib menjaga barang-barang pribadinya selama Acara
                    berlangsung. AGENDAKOTA dan/atau Mitra penyelenggara Acara
                    dalam keadaan apapun tidak bertanggung jawab atas kehilangan
                    yang dialami oleh Pengguna.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna dengan ini membebaskan AGENDAKOTA dan/atau Mitra
                    penyelenggara Acara dari segala bentuk tuntutan dalam hal
                    terjadi pembatalan Acara yang dilakukan secara sepihak oleh
                    artis atau pemerintah atau karena sebab-sebab lain di luar
                    kemampuan dan kehendak pihak AGENDAKOTA dan/atau Mitra
                    penyelenggara Acara.
                  </p>
                </li>
                <li>
                  <p>
                    Pengguna dengan ini membebaskan AGENDAKOTA dari segala
                    bentuk tuntutan dalam hal terjadi pembatalan Acara dan/atau
                    penundaan Acara.
                  </p>
                </li>
              </ol>
              <h3>
                {" "}
                <b> G. TANGGUNG JAWAB </b>{" "}
              </h3>
              <ol>
                <li>
                  <p>
                    Seluruh isi Situs, termasuk tetapi tidak terbatas pada
                    perangkat lunak, informasi, materi, teks, dan grafis
                    disediakan kepada Pengguna sebagaimana adanya.
                  </p>
                </li>
                <li>
                  <p>
                    AGENDAKOTA tidak membuat pernyataan atau jaminan dalam
                    bentuk apapun, baik secara tersirat maupun tersurat,
                    sehubungan dengan operasi atau informasi atau materi atau
                    teks atau grafis dari Situs ini. AGENDAKOTA juga tidak
                    membuat pernyataan atau jaminan dalam bentuk apapun, baik
                    secara tersirat maupun tersurat, bahwa informasi atau materi
                    atau teks atau grafis dari Situs ini bebas dari pelanggaran
                    hak pihak ketiga.
                  </p>
                </li>
                <li>
                  <p>
                    AGENDAKOTA tidak membuat pernyataan atau jaminan dalam
                    bentuk apapun, baik secara tersirat maupun tersurat, bahwa
                    Situs ini akan beroperasi tanpa kesalahan atau gangguan,
                    bahwa segala cacat akan diperbaiki, bahwa Situs dan/atau
                    servernya bebas dari virus dan/atau komponen berbahaya
                    lainnya.
                  </p>
                </li>
                <li>
                  <p>
                    AGENDAKOTA tidak membuat pernyataan atau jaminan dalam
                    bentuk apapun, baik secara tersirat maupun tersurat,
                    mengenai kecocokan, ketersediaan, keakuratan, kehandalan,
                    kelengkapan, ketepatan waktu dari seluruh operasi atau
                    informasi atau materi atau teks atau grafis dari Situs ini.
                  </p>
                </li>
                <li>
                  <p>
                    AGENDAKOTA tidak bertanggung jawab atas setiap kegagalan
                    yang disebabkan karena kesalahan server, transmisi yang
                    salah diarahkan atau diarahkan kembali, kegagalan koneksi
                    internet, gangguan transmisi, kegagalan penerimaan, virus
                    atau cacat lainnya, baik yang bersifat kesalahan manusia
                    atau kesalahan teknis.
                  </p>
                </li>
                <li>
                  <p>
                    Sejauh yang diizinkan oleh hukum, dalam keadaan apapun,
                    AGENDAKOTA (termasuk direksinya, komisarisnya, pejabatnya,
                    karyawannya, perwakilannya, afiliasinya, distributor,
                    pemasok, pemberi lisensi, agennya, atau pihak lain manapun
                    yang terlibat dalam menciptakan, mensponsori, mempromosikan
                    atau dengan cara lain menyediakan Situs dan isinya ("Pihak
                    Yang Dilindungi"), tidak akan bertanggung jawab kepada
                    siapapun atau entitas manapun untuk kerugian langsung,
                    kerugian tidak langsung, insidentil, khusus, umum, yang
                    merupakan akibat atau yang bersifat hukuman atau setiap
                    kerugian atau kehilangan dalam bentuk apapun, termasuk namun
                    tidak terbatas pada kehilangan produksi, kehilangan
                    keuntungan, kehilangan pendapatan, kehilangan kontrak,
                    kehilangan reputasi, kehilangan klaim, gangguan usaha,
                    kehilangan atau kerusakan atau gangguan data, kerugian tidak
                    berwujud lainnya, ketidakmampuan Pengguna untuk menggunakan
                    Situs, akses tanpa izin terhadap informasi pribadi Pengguna,
                    kesalahan atau ketidakakuratan materi atau informasi atau
                    teks atau grafis pada Situs, setiap kerusakan properti,
                    termasuk kerusakan komputer Pengguna yang disebabkan oleh
                    virus atau komponen berbahaya lainnya, selama atau karena
                    mengakses atau menggunakan Situs ini. Pembatasan tanggung
                    jawab ini berlaku tanpa memandang bentuk tindakan, baik
                    berdasarkan kontrak, perbuatan melawan hukum, kelalaian,
                    kewajiban, atau hal-hal lain.
                  </p>
                </li>
                <li>
                  <p>
                    Dalam hal terjadi keadaan kahar, maka Pihak Yang Dilindungi
                    dibebaskan dari segala bentuk kewajiban berdasarkan Syarat
                    dan Ketentuan ini. Keadaan kahar adalah suatu peristiwa yang
                    terjadi di luar kendali Pihak Yang Dilindungi, dan dapat
                    mencakup, namun tidak terbatas pada, bencana alam, kondisi
                    cuaca, kebakaran, insiden nuklir, getaran elektromagnetik,
                    tindakan teroris, kerusuhan, perang, serangan yang
                    menyebabkan kebakaran, huru-hara, pemberontakan, kekerasan
                    bersenjata dalam bentuk apapun, sengketa perburuhan,
                    lock-out, pemogokan, kekurangan, tindakan atau larangan
                    pemerintah, pencurian, kepailitan, rusaknya mesin,
                    terputusnya atau gangguan jaringan atau sistem, terputusnya
                    koneksi internet dan komunikasi, karantina, epidemi,
                    pandemi, dan lain-lain.
                  </p>
                </li>
                <li>
                  <p>
                    Sepanjang dimungkinkan oleh hukum, AGENDAKOTA hanya
                    bertanggung jawab atas kerugian yang secara langsung
                    diderita oleh Pengguna, sebagai akibat dari kesalahan
                    langsung AGENDAKOTA. Dalam keadaan apapun, tanggung jawab
                    AGENDAKOTA hanya terbatas sampai dengan jumlah total
                    pembayaran yang telah dilunasi oleh Pengguna sesuai dengan
                    rincian yang tercantum dalam e-mail konfirmasi
                    pemesanan/pembelian.
                  </p>
                </li>
              </ol>
              <h3>
                {" "}
                <b> H. HAK ATAS KEKAYAAN INTELEKTUAL </b>{" "}
              </h3>
              <ol>
                <li>
                  <p>
                    AGENDAKOTA memiliki hak cipta terhadap Situs. Pengguna tidak
                    dapat menggunakan hak atas kekayaan intelektual dari
                    AGENDAKOTA tanpa persetujuan AGENDAKOTA.
                  </p>
                </li>
                <li>
                  <p>
                    Nama produk dan perusahaan yang disebutkan dalam Situs dapat
                    berupa nama, merek dagang, nama dagang, merek jasa, logo,
                    simbol atau hal lain yang menjadi hak milik lainnya dari
                    AGENDAKOTA, pemberi lisensinya, atau perusahaan terasosiasi
                    atau pihak ketiga. Penggunaan dalam Situs atas setiap nama,
                    nama dagang, merek dagang, merek jasa, logo, simbol atau hal
                    lain yang menjadi hak milik lainnya atau penandaan dari atau
                    kepemilikan pihak ketiga, tidak dapat diartikan sebagai
                    suatu dukungan atau sponsor dari AGENDAKOTA, atau
                    keikutsertaan dari pihak ketiga tersebut dalam Situs.
                  </p>
                </li>
                <li>
                  <p>
                    Situs mengandung materi hak cipta, nama dagang dan informasi
                    hak milik lainnya, termasuk, namun tidak terbatas pada teks,
                    perangkat lunak, foto, grafis, video, musik dan suara.
                    Seluruh isi dari Situs dilindungi oleh undang-undang hak
                    cipta. Pengguna tidak berhak mengubah, membuat, mengirim,
                    mengalihkan, menjual, menciptakan karya turunan, atau dengan
                    cara apapun mengeksploitasi, setiap konten Situs, baik
                    secara keseluruhan atau sebagian.
                  </p>
                </li>
                <li>
                  <p>
                    Kecuali dinyatakan lain, perangkat lunak yang diperlukan
                    untuk layanan Kami atau tersedia di, atau digunakan oleh
                    Situs dan hak atas kekayaan intelektual (termasuk merek
                    dagang, merek jasa, logo, desain, hak cipta, dan lain-lain)
                    atas konten dan informasi serta materi di Situs dimiliki
                    oleh AGENDAKOTA, afiliasinya, para pemberi lisensinya, para
                    pemasoknya. AGENDAKOTA tidak bertanggung jawab atas materi
                    hak cipta apapun yang diberikan oleh pihak ketiga atau
                    pelanggaran atas hak atas kekayaan intelektual apapun oleh
                    pihak ketiga tersebut.
                  </p>
                </li>
                <li>
                  <p>
                    Kecuali ditentukan lain secara tegas berdasarkan
                    undang-undang hak cipta, Pengguna dilarang untuk
                    menggandakan, mendistribusikan kembali, mengirimkan kembali,
                    mempublikasikan atau mengeksploitasi secara komersial setiap
                    materi yang telah Pengguna unduh dalam bentuk apapun, tanpa
                    izin tertulis dari AGENDAKOTA.
                  </p>
                </li>
              </ol>
              <h3>
                {" "}
                <b> I. MATERI PEMASARAN </b>{" "}
              </h3>
              <p>
                Pengguna memberikan persetujuan kepada AGENDAKOTA dan afiliasi
                atau pihak yang bekerja sama dengan AGENDAKOTA untuk dapat
                mengirimkan Pengguna pemasaran langsung, iklan, dan komunikasi
                promosi melalui aplikasi push-notification, pesan atau
                penempatan melalui agendakota.id, pos, panggilan telepon,
                layanan pesan singkat (SMS), E-Voucher, dalam tayangan
                AGENDAKOTA Live atau media streaming, dan email (“Materi
                Pemasaran”). Pengguna dapat memilih untuk tidak menerima
                komunikasi pemasaran tersebut kapan saja dengan mengklik pilihan
                “berhenti berlangganan” yang ada dalam pesan yang bersangkutan,
                metode lain sebagaimana diberikan atau menghubungi AGENDAKOTA
                melalui detail kontak yang tercantum di bawah ini. Mohon
                perhatikan bahwa jika Pengguna memilih untuk keluar, Kami masih
                dapat mengirimi Pengguna pesan-pesan non-promosi, seperti tanda
                terima atau informasi tentang Akun Pengguna.
              </p>
              <h3>
                {" "}
                <b> J. PENYELESAIAN SENGKETA </b>{" "}
              </h3>
              <p>
                Segala sengketa yang timbul diantara AGENDAKOTA dan Pengguna
                sehubungan dengan penggunaan Situs dan/atau pemesanan/pembelian
                E-Ticket atau E-Voucher, pertama-tama akan diselesaikan secara
                musyawarah untuk mencapai mufakat. Apabila sengketa tersebut
                tidak dapat diselesaikan dalam waktu 30 (tiga) puluh hari
                kalender setelah adanya surat pemberitahuan sengketa, maka
                AGENDAKOTA dan Pengguna setuju untuk menyelesaikan sengketa
                tersebut melalui Pengadilan Negeri Jakarta Selatan di Jakarta.
              </p>
              <h3>
                {" "}
                <b> K. LAIN-LAIN </b>{" "}
              </h3>
              <ol>
                <li>
                  <p>
                    Syarat dan Ketentuan ini dibuat dalam bahasa Indonesia.
                    Segala terjemahan ke dalam bahasa lain hanya untuk kemudahan
                    saja dan bukan merupakan terjemahan resmi. Dalam hal
                    terdapat perbedaan antara versi bahasa Indonesia dengan
                    bahasa lainnya, maka versi bahasa Indonesia yang berlaku.
                  </p>
                </li>
                <li>
                  <p>
                    Syarat dan Ketentuan ini tunduk pada hukum Republik
                    Indonesia.
                  </p>
                </li>
                <li>
                  <p>
                    Apabila ada bagian tertentu di dalam Syarat dan Ketentuan
                    ini yang karena sebab apapun dianggap tidak sah atau tidak
                    berlaku, maka bagian-bagian lainnya di dalam Syarat dan
                    Ketentuan ini tetap sah dan berlaku mengikat.
                  </p>
                </li>
                <li>
                  <p>
                    Ketentuan Penggunaan ini dapat Kami ubah, modifikasi,
                    tambah, hapus atau koreksi (“perubahan”) dari waktu ke
                    waktu. Kami akan menggunakan upaya dan jangka waktu yang
                    wajar untuk memberitahu Kamu tentang segala perubahan
                    material pada Ketentuan Penggunaan ini secara elektronik
                    dimana Kamu dapat memilih untuk melanjutkan penggunaan Situs
                    atau menolak untuk tunduk dengan menghentikan penggunaan
                    Situs ini dengan segera. Namun, Kamu memahami dan setuju
                    bahwa Kamu bertanggung jawab untuk meninjau Ketentuan
                    Penggunaan ini secara berkala dan penggunaan Situs oleh Kamu
                    yang berkelanjutan merupakan bentuk penerimaan Kamu terhadap
                    setiap perubahan atas Ketentuan Penggunaan Situs.
                  </p>
                </li>
              </ol>
              <h3>
                {" "}
                <b> L. PUSAT BANTUAN </b>{" "}
              </h3>
              <ol>
                <li>
                  <p>
                    Cara terbaik menghubungi Kami adalah melalui surat
                    elektronik di alamat support
                    <a href="mailto:halo@agendakota.id">halo@agendakota.id</a>.
                    Nomor telepon yang dapat Anda hubungi adalah +621 80600822.
                    <br />
                  </p>
                </li>
                <li>
                  <p>
                    Layanan Pengaduan Konsumen
                    <br />
                    <b>
                      DIREKTORAT JENDERAL PERLINDUNGAN KONSUMEN DAN TERTIB NIAGA
                      KEMENTERIAN PERDAGANGAN RI
                    </b>
                    <br />
                    WhatsApp: +6288990079999
                    <br />
                  </p>
                </li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default TermConditions;
