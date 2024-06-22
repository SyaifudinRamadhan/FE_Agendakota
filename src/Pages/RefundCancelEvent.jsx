import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/TermConditions.module.css";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import Footer from "../partials/Footer";

const RefundCancelEvent = () => {
  const [inView, setInview] = useState(1);
  const [firstLoad, setFirstLoad] = useState(false);

  const inViewRef = useRef();
  const inViewRef2 = useRef();
  const inViewRef3 = useRef();

  useEffect(() => {
    if (!firstLoad) {
      window.addEventListener("scroll", () => {
        if (inViewRef.current && inViewRef2.current && inViewRef3) {
          if (
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
              Refund & Cancel Event
            </div>
          </div>

          <h2>Refund dan Pembatalan Event</h2>
        </div>
        <div className={styles.MainBox}>
          <div className={styles.Sidebar}>
            <div className={styles.Menu}>
              <a href="#cancel-event-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 1 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pembatalan Event
                </div>
              </a>
              <a href="#refund-org-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 2 ? styles.MenuItemActive : ""
                  }`}
                >
                  Fitur Refund (Organizer)
                </div>
              </a>
              <a href="#refund-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 3 ? styles.MenuItemActive : ""
                  }`}
                >
                  Fitur Refund (Buyer Ticket)
                </div>
              </a>
            </div>
          </div>
          <div className={styles.MainContent}>
            <div className={styles.MenuCollpase}>
              <a href="#cancel-event-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 1 ? styles.MenuItemActive : ""
                  }`}
                >
                  Pembatalan Event
                </div>
              </a>
              <a href="#refund-org-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 2 ? styles.MenuItemActive : ""
                  }`}
                >
                  Fitur Refund (Organizer)
                </div>
              </a>
              <a href="#refund-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 3 ? styles.MenuItemActive : ""
                  }`}
                >
                  Fitur Refund (Buyer Ticket)
                </div>
              </a>
            </div>
            <div
              id="cancel-event-policy"
              style={{ marginBottom: "20px" }}
              ref={inViewRef}
            >
              <h2>
                Prosedur Pembatalan Event ( Oleh Event Creator / Organizer)
              </h2>
              <br />
              <p>
                Jika event kamu batal, terdapat beberapa langkah yang harus kamu
                lakukan. Berikut prosedurnya:
              </p>
              <ol>
                <li>
                  {" "}
                  Pihak organizer melakukan pengajuan pembatalan Event melalui
                  menu “Hapus Event” di dalam page Event Management Organizer.
                </li>
                <li>
                  Apabila Event yang akan dibatalkan belum ada pembeli, maka
                  Event dapat langsung dihapus dengan klik menu hapus tersebut.
                  Namun jika sudah terdapat pembeli tiket, organizer akan
                  ditampilkan form pengajuan pembatalan event. Organizer wajib
                  mengisi formulir tersebut untuk membatalkan event yang sudah
                  terdapat pembeli tiketnya.
                </li>
                <li>
                  Adapun di dalam formulir tersebut, organizer diminta untuk
                  membuat dokumen pernyataan tertulis dan bertanda tangankan
                  dari organizer dalam format file PDF. File ini berisi: (1)
                  Nama event, (2) tanggal event, (3) alasan pembatalan event,
                  periode refund, (4) alamat email serta kontak organizer yang
                  bisa dihubungi. Organizer akan mendapatkan info status
                  pengajuan pembatalan event-nya melalui email atau kontak yang
                  bisa dihubungi. Apabila pengajuan disetujui, maka proses akan
                  berlanjut ke tahap 4.
                </li>
                <li>
                  Untuk organizer yang melakukan refund atas batalnya event,
                  AGENDAKOTA memiliki kebijakan untuk tetap mengenakan service
                  fee sebesar 3% atas transaksi yang telah dilakukan.
                  Pengembalian hanya termasuk harga tiket tanpa biaya
                  convenience fee (biaya platform) yang ditanggung customer atau
                  pembeli tiket.
                </li>
                <li>
                  Prosedur refund kepada customer akan mengikuti prosedur dari
                  AGENDAKOTA yang akan diinformasikan melalui email kepada
                  customer.
                </li>
                <li>
                  Email blast akan dikirimkan dari pihak AGENDAKOTA menyesuaikan
                  jadwal dari AGENDAKOTA.
                </li>
                <li>
                  Apabila AGENDAKOTA menerima pengajuan refund dari user pembeli
                  tiket/customer, maka pengajuan tersebut akan ditinjau kembali
                  dan akan dilakukan approve terhadap pengajuan refund tersebut.
                  Transfer dana kembali ke customer terjadi secara otomatis
                  ketika pengajuan refund disetujui oleh AGENDAKOTA.
                </li>
              </ol>
              <br />
              <b>Perlu Diingat :</b>
              <ol>
                <li>
                  {" "}
                  Organizer harus menentukan periode refund dengan jelas.
                </li>
                <li>
                  Apabila sampai periode refund ditutup masih terdapat dana yang
                  cukup, maka biaya pembatalan akan dikurangi dari dana tersebut
                  dan organizer dapat melakukan withdrawal.
                </li>
                <li>
                  Apabila sampai periode refund ditutup dana tidak cukup, maka
                  biaya pembatalan akan ditagihkan ke organizer. Sisa dana masih
                  dapat ditarik oleh organizer.
                </li>
                <li>
                  Semua proses refund di AGENDAKOTA telah memiliki sistem
                  terintegrasi di dalam program website agendakota.id. Sehingga
                  semua tahapan refund ataupun pengajuan pembatalan event akan
                  tersimpan di dalam basis data, dan akan masuk ke dalam
                  dashboard admin AGENDAKOTA untuk dilakukan peninjauan.
                </li>
                <li>
                  Untuk proses transfer dana saat refund juga dikendalikan oleh
                  sistem website secara otomatis, apabila pengajuan refund sudah
                  ditinjau dan disetujui (approve ) oleh admin AGENDAKOTA.
                </li>
              </ol>
              <br />
              <p>
                Itu dia prosedur pembatalan event di Agendakota. Masih ada yang
                kamu ingin tanyakan? Kamu bisa mengirimkan email ke
                help@agendakota.id atau hubungi +62 8899 007 9999
              </p>
            </div>
            <div
              id="refund-org-policy"
              style={{ marginBottom: "20px" }}
              ref={inViewRef2}
            >
              <h2>
                Mengaktifkan Fitur Refund dan Manajemen Refund (Oleh Event
                Creator / Organizer)
              </h2>
              <br />
              <p>
                AGENDAKOTA memiliki fitur refund terhadap tiket yang sudah
                dibeli. Fitur refund ini, tidak hanya berlaku saat terjadi
                pembatalan event. Namun juga bisa diaktifkan langsung oleh
                organizer secara mandiri sebagai fitur atas event yang
                diselenggarakannya.
              </p>
              <br />
              <p>
                Pengaktifannya dilakukan melalui menu Ticket Settings pada pop
                up Tickets di dalam page Event Management Organizer. Jadi ketika
                organizer telah mengaktifkan fitur tersebut, user selaku pembeli
                tiket dapat melakukan pengajuan refund tiket. Adapun prosedur
                pengaktifan dan manajemen data refundnya sebagai berikut:
              </p>
              <br />
              <ol>
                <li>
                  {" "}
                  Organizer masuk ke halaman event management
                  (https://agendakota.id/organizer/event/dashboard), lalu
                  mengklik menu “TIckets” pada bagian “Pamper your Event ”.
                </li>
                <li>
                  Setelah PopUp terbuka, klik tab “TIcket Settings”, dan temukan
                  opsi “Allow users to request refund “. Dan klik switch
                  button-nya untuk mengaktifkan fitur refund.
                </li>
                <li>
                  Untuk memanajemen data refund user, silahkan membuka tab
                  “More” di page event management. Temukan tabel dengan judul
                  “Refunds”. Tabel tersebut berisikan daftar pengajuan refund
                  oleh user pembeli tiket. Organizer memiliki wewenang untuk
                  menyetujui dan menolak pengajuan refund yang ada dengan
                  mempertimbangkan data - data seperti alasan dan waktu
                  pengajuan refund dibuat.
                </li>
              </ol>
              <br />
              <b>Perlu Diingat :</b>
              <ol>
                <li>
                  {" "}
                  Apabila refund dilakukan karena pembatalan event oleh
                  organizer, makan wewenang manajemen data refund ini sepenuhnya
                  dipegang oleh pihak AGENDAKOTA.
                </li>
                <li>
                  Setelah pengajuan refund disetujui oleh organizer, maka proses
                  akan diteruskan ke pihak AGENDAKOTA untuk ditinjau kembali.
                  Dan jika sudah benar, maka AGENDAKOTA akan menyetujui (approve
                  ) pengajuan refund, dan transfer pengambalian akan terjadi
                  secara otomatis saat approve dilakukan.
                </li>
                <li>
                  Semua proses refund di AGENDAKOTA telah memiliki sistem
                  terintegrasi di dalam program website agendakota.id. Sehingga
                  semua tahapan refund ataupun pengajuan pembatalan event akan
                  tersimpan di dalam basis data, dan akan masuk ke dalam
                  dashboard admin AGENDAKOTA untuk dilakukan peninjauan.{" "}
                </li>
                <li>
                  Untuk proses transfer dana saat refund juga dikendalikan oleh
                  sistem website secara otomatis, apabila pengajuan refund sudah
                  ditinjau dan disetujui (approve ) oleh admin AGENDAKOTA.
                </li>
              </ol>
              <br />
              <p>
                Itu dia tahapan untuk mengaktifkan fitur refund pada suatu event
                oleh event creator/organizer. Masih ada yang kamu ingin
                tanyakan? Kamu bisa mengirimkan email ke help@agendakota.id atau
                hubungi +62 8899 007 9999
              </p>
            </div>
            <div
              id="refund-policy"
              style={{ marginBottom: "20px" }}
              ref={inViewRef3}
            >
              <h2>
                Auto Refund: Cara Mudah Refund/Pengembalian Dana di
                Agendakota.id (Customer)
              </h2>
              <br />
              <p>
                Gimana cara refund atau pengembalian dana di Agendakota.id?
                Pertanyaan ini sering menjadi hal yang pertama kali kamu
                tanyakan, ketika event yang akan kamu datangi dibatalkan.
              </p>
              <br />
              <p>
                AGENDAKOTA berusaha untuk memberikan pelayanan terbaik kepada
                setiap pembeli tiket event. Oleh karena itu, kami juga
                membutuhkan kerjasama kamu untuk mengisi kebutuhan data dengan
                lengkap agar proses refund atau pengembalian dana bisa berjalan
                lancar.
              </p>
              <br />
              <b>
                <i>
                  Disclaimer: Cara refund ini hanya bisa dilakukan oleh pembeli
                  tiket jika event dibatalkan secara resmi oleh event creator
                  atau event tersebut memiliki fitur refund yang sudah
                  diaktifkan secara mandiri oleh event creator/organizer.
                </i>
              </b>
              <br />
              <b>Cara refund/pengembalian dana Agendakota.id ( Customer )</b>
              <ol>
                <li>
                  {" "}
                  Untuk studi kasus pembatalan event oleh event
                  creator/organizer, kamu akan menerima pengumuman pembatalan
                  event dan panduan untuk melakukan refund melalui email pribadi
                  yang kamu gunakan ketika membeli tiket event tersebut. Namun
                  untuk kamu yang ingin melakukan refund secara mandiri, kamu
                  bisa mengecek apakah menu refund tersedia pada tiket yang kamu
                  beli.
                </li>
                <li style={{ display: "flex", flexDirection: "column" }}>
                  <p>
                    Untuk mengakses menu refund, dapat dilakukan pada halaman
                    “MyTickets ” di menu “E-Ticket “ pada masing masing card
                    transaksinya. SIlahkan klik menu “E-Ticket” di salah satu
                    card transaksi yang ingin kamu lakukan refund. Setelahnya
                    sistem akan menampilkan detail transaksi dan daftar tiket
                    yang sudah dibeli pada transaksi tersebut.
                  </p>
                  <br />
                  <img
                    style={{ maxWidth: "350px", width: "100%", margin: "auto" }}
                    src="/images/ticket-box.png"
                    alt=""
                  />
                  <br />
                </li>
                <li>
                  Selanjutnya, silahkan klik tombol “See Ticket “ pada salah
                  satu daftar tiket yang sudah dibeli. Sehingga kamu akan
                  ditampilankan detail tiket tersebut yang berisikan QR TIket,
                  nama tiket beserta informasi penunjang lainnya. Apabila tiket
                  tersebut memiliki fitur refund baik karena adanya pembatalan
                  event maupun memang disediakan sedari awal, maka kamu akan
                  menemui formulir untuk mengajukan refund. Dengan tampilan
                  sebagai berikut.
                </li>
                <li style={{ display: "flex", flexDirection: "column" }}>
                  <p>
                    Silahkan mengisi formulir tersebut untuk mengajukan refund.
                    Pengisian cukup dilakukan satu kali pada salah satu tiket
                    dari daftar tiket sebelumnya. Sistem akan membaca dengan
                    sendirinya bahwa kamu telah mengajukan refund untuk satu
                    group transaksi event pada tiket tersebut. Namun lainnya
                    halnya jika kamu melakukan lebih dari satu kali transaksi
                    pembelian tiket event, maka kamu perlu mengulangi tahapan
                    pada poin 2 - 4 ini kembali untuk mengajukan refund pada
                    masing - masing transaksi.
                  </p>
                  <br />
                  <img
                    style={{ maxWidth: "750px", width: "100%" }}
                    src="/images/refund.png"
                    alt=""
                  />
                  <br />
                  <br />
                </li>
                <li>
                  Setelah refund diajukan, data tersebut akan ditinjau oleh
                  organizer (jika bukan dalam kasus pembatalan event ) dan admin
                  AGENDAKOTA. Jika pengajuan kamu disetujui maupun ditolak, maka
                  informasi akan disampaikan melalui email. Pengembalian dana
                  akan dilakukan secara otomatis oleh sistem setelah admin
                  AGENDAKOTA melakukan approve terhadap refund yang kamu ajukan.
                </li>
              </ol>
              <br />
              <b>Perlu Diingat :</b>
              <ol>
                <li>
                  {" "}
                  Semua proses refund di AGENDAKOTA telah memiliki sistem
                  terintegrasi di dalam program website agendakota.id. Sehingga
                  semua tahapan refund ataupun pengajuan pembatalan event akan
                  tersimpan di dalam basis data, dan akan masuk ke dalam
                  dashboard admin AGENDAKOTA untuk dilakukan peninjauan.{" "}
                </li>
                <li>
                  Untuk proses transfer dana saat refund juga dikendalikan oleh
                  sistem website secara otomatis, apabila pengajuan refund sudah
                  ditinjau dan disetujui (approve ) oleh admin AGENDAKOTA.
                </li>
              </ol>
              <br />
              <p>
                Gimana? Setelah mengikuti langkah mudah tersebut, kamu bisa
                dengan tenang menunggu proses refund dilakukan. Terima kasih
                atas kerjasamanya!
              </p>
              <br />
              <p>
                Jika ada pertanyaan lebih lanjut terkait cara refund di
                AGENDAKOTA, kamu bisa mengirimkan email ke help@agendakota.id
                atau hubungi +62 8899 007 9999.
              </p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default RefundCancelEvent;
