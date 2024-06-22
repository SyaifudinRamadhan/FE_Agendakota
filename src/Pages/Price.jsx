import React, { useEffect, useRef, useState } from "react";
import styles from "./styles/TermConditions.module.css";
import { Link } from "react-router-dom";
import { BiChevronRight } from "react-icons/bi";
import Footer from "../partials/Footer";

const Price = () => {
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
              Transaction Price
            </div>
          </div>

          <h2>Biaya Transaksi</h2>
        </div>
        <div className={styles.MainBox}>
          <div className={styles.Sidebar}>
            <div className={styles.Menu}>
              <a href="#ticket-trx-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 1 ? styles.MenuItemActive : ""
                  }`}
                >
                  Biaya Transaksi Tiket
                </div>
              </a>
              <a href="#withdraw-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 2 ? styles.MenuItemActive : ""
                  }`}
                >
                  Biaya Withdraw
                </div>
              </a>
            </div>
          </div>
          <div className={styles.MainContent}>
            <div className={styles.MenuCollpase}>
              <a href="#ticket-trx-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 1 ? styles.MenuItemActive : ""
                  }`}
                >
                  Biaya Transaksi Tiket
                </div>
              </a>
              <a href="#withdraw-policy">
                <div
                  className={`${styles.MenuItem} ${
                    inView === 2 ? styles.MenuItemActive : ""
                  }`}
                >
                  Biaya Withdraw
                </div>
              </a>
            </div>
            <div
              id="ticket-trx-policy"
              style={{ marginBottom: "20px" }}
              ref={inViewRef}
            >
              <h2>Biaya Transaksi Tiket</h2>
              <br />
              <p>
                Biaya transaksi tiket merupakan biaya tambahan yang dibebankan
                kepada customer saat membeli tiket. Adapun biaya tambahan
                tersebut meliputi :
              </p>
              <ol>
                <li> PPN 11% dari total harga tiket</li>
                <li>Biaya Admin (Rp. 3000,-)</li>
                <li>
                  Biaya platform ( Dinamis sesuai dengan metode pembayaran yang
                  dipilih )
                </li>
              </ol>
              <br />
              <p>
                Besaran admin fee berbeda beda tergantung dengan metode
                pembayaran yang dipilih oleh customer. Untuk metode pembayaran
                via VA Bank, admin fee tertinggi berkisar pada Rp. 5000,- .
                Sedangkan untuk pembayaran via E-Wallet dan QRIS, admin fee
                tertinggi berkisar pada 2% dari total pemebelian tiket + PPN
                11%.
              </p>
              <br />
              <b>Perlu Diingat : </b>
              <ol>
                <li>
                  {" "}
                  Apabila terjadi refund pada suatu transaksi, maka biaya yang
                  dapat dikembalikan kepada customer adalah harga pokok dari
                  tiket dan PPN 11%. Sedangkan untuk biaya platform tidak dapat
                  dikembalikan
                </li>
                <li>
                  Biaya platform di bebankan pada customer tergantung motode
                  pembayaran yang di gunakan.
                </li>
              </ol>
              <br />
              <p>Contoh :</p>
              <p>
                Dani ingin membeli 3 tiket basic dan 1 tiket premium konser A.
                Dengan harga masing - masing tiket adalah Rp. 100.000,- dan Rp
                300.000,-. Untuk metode pembayaran, Dani menggunakan VA BCA,
                biaya platform Rp. 8.000,-.
              </p>
              <br />
              <p>Maka perhitungan biaya yang harus dibayarkan :</p>
              <table>
                <tr>
                  <td>Biaya Pokok</td>
                  <td>
                    <span>= ( 3 x 100.000 ) + ( 1 x 300 000)</span>
                    <br />
                    <span>= 600.000</span>
                  </td>
                </tr>
                <tr>
                  <td>PPN</td>
                  <td>
                    <span>= 11% x 600.000</span>
                    <br />
                    <span>= 66.000</span>
                  </td>
                </tr>
                <tr>
                  <td>Total Biaya</td>
                  <td>
                    <span>= 666.000 + 3.000 + 8.000</span>
                    <br />
                    <span>= Rp. 677.000,-</span>
                  </td>
                </tr>
              </table>
              <br />
              <p>
                Jadi total biaya yang harus dibayarkan Dani adalah sebesar Rp.
                677.000,-
              </p>
            </div>
            <div
              id="withdraw-policy"
              style={{ marginBottom: "20px" }}
              ref={inViiewRef2}
            >
              <h2>Biaya Withdraw</h2>
              <br />
              <table className={styles.TableBox}>
                <tr class="c8">
                  <td class="c48" colspan="1" rowspan="1">
                    <h3 class="c6 c18" id="h.ajbk953xu8od">
                      <span class="c23">
                        Event Atraksi, Daily Activities, Travel Agent
                      </span>
                    </h3>
                    <h3 className={styles.SubTitle1} id="h.jp4p4jn7z14">
                      <span class="c17">Tidak Berbayar / Gratis</span>
                    </h3>
                  </td>
                  <td class="c25" colspan="1" rowspan="1">
                    <h3 class="c6" id="h.yb63p3kauw5u">
                      <span class="c23">
                        Event Atraksi Daily, Activities, Travel Agent{" "}
                      </span>
                    </h3>
                    <h3 className={styles.SubTitle2} id="h.yb63p3kauw5u-1">
                      <span class="c39">Berbayar</span>
                    </h3>
                  </td>
                </tr>
                <tr class="c8">
                  <td className={styles.Content} colspan="1" rowspan="1">
                    <p class="c9">
                      <span className={styles.ContentTitle}>IDR</span>
                    </p>
                    <p class="c9">
                      <span className={styles.ContentMain}>&nbsp; 0,-</span>
                    </p>
                    <p class="c9">
                      <span className={styles.ContentDesc}>/tix</span>
                    </p>
                    <p class="c5">
                      <span class="c21"></span>
                    </p>
                  </td>
                  <td className={styles.Content} colspan="1" rowspan="1">
                    <p class="c9">
                      <span className={styles.ContentTitle}>IDR</span>
                    </p>
                    <p class="c9">
                      <span className={styles.ContentMain}>3%</span>
                    </p>
                    <p class="c9">
                      <span className={styles.ContentDesc}>/tix</span>
                    </p>
                    <p class="c33">
                      <span class="c19"></span>
                    </p>
                  </td>
                </tr>
              </table>
              <br />
              <p>
                <span>
                  Ketika Event Creator/Organizer melakukan withdraw dari hasil
                  penjualan tiket, maka Event Creator/Organizer tersebut akan
                  dikenai potongan pendapatan sebesar 3%{" "}
                  <b>
                    (Potongan 3% merupakan biaya penjualan tiket AGENDAKOTA)
                  </b>{" "}
                  dari setiap tiket berbayar yang terjual. Sedangkan untuk tiket
                  gratis tidak dikenai biaya potongan.
                </span>
                <br />
                <span>Contoh :</span>
                <br />
                <span>
                  Organizer A mengadakan konser musik. Dengan menjual 2 jenis
                  tiket. Satu tiket VIP (Tiket A) Rp. 300.000,- dan satu tiket
                  Reguler (Tiket B) seharga Rp. 100.000,-. Setelah event selesai
                  didapati sebanyak 100 TIket A dan 200 TIket B telah terjual,
                  Maka perhitungan withdrawnya sebagai berikut :
                </span>
                <br />
              </p>
              <table>
                <tr>
                  <td>Tiket A</td>
                  <td>
                    <span>: (100.000 x 300)</span>
                    <br />
                    <span>= Rp. 30.000.000,-</span>
                  </td>
                </tr>
                <tr>
                  <td>Tiket B</td>
                  <td>
                    <span>: (100.000 x 200)</span>
                    <br />
                    <span>= Rp. 20.000.000,-</span>
                  </td>
                </tr>
                <tr>
                  <td>Total Pendapatan</td>
                  <td>
                    <span>: 30.000.000 + 20.000.000</span>
                    <br />
                    <span>= Rp. 50.000.000,-</span>
                  </td>
                </tr>
                <tr>
                  <td>Admin Fee</td>
                  <td>
                    <span>: 3% x 50.000.000</span>
                    <br />
                    <span>= Rp. 1.500.000,-</span>
                  </td>
                </tr>
                <tr>
                  <td>Pendapatan Bersih</td>
                  <td>
                    <span>: 50.000.000 - 1.500.000</span>
                    <br />
                    <span>= Rp. 48.500.000,-</span>
                  </td>
                </tr>
              </table>
              <br />
              <b>Layanan yang Anda Dapatkan</b>
              <br />
              <ol>
                <li>
                  {" "}
                  Pengaturan Event, Daily activities, & Atraksi secara mandiri
                </li>
                <li>
                  Membuat Unlimited organizer, 1 user dapat membuat beberapa
                  jenis organizer dan dapat tergabung di beberapa organizer
                  lain.
                </li>
                <li>
                  Pengaturan tiket lengkap tidak hanya event berbayar, tapi juga
                  event gratis maupun event bayar melalui donasi (support event)
                </li>

                <li>
                  Pengelolaan customer / Pengunjung event dilengkapi dengan
                  fitur auto check-in menggunakan QR Check-in maupun Check-in
                  manual
                </li>

                <li>
                  Fitur Self Check-in , khusus event tertentu untuk memecah
                  keramaian ( crowd) event. contoh : Event Pameran, Pertandingan
                  dll
                </li>
                <li>Dapat memantau hasil penjualan dengan laporan lengkap.</li>
                <li>
                  Event creator dapat memanfaatkan Fitur Refund, dapat di
                  aktifkan atau tidak tergantung kebijakan dari event creator.
                </li>
                <li>
                  Fitur Ubah Jadwal ( Schedule) khusus event / aktivitas
                  tertentu{" "}
                </li>
                <li>Kostumisasi formulir pemesanan.</li>
                <li>Penagihan dan pembayaran otomatis </li>
                <li>
                  Team Collaboration, anda dapat mengundang tim anda untuk
                  setiap event berbeda
                </li>
                <li>
                  <p>Marketing channel:</p>
                  <ul>
                    <li> Aplikasi Mobile</li>
                    <li> Website</li>
                    <li> Media Sosial</li>
                    <li> Email Marketing</li>
                    <li> WhatsApp Broadcast</li>
                  </ul>
                </li>
                <li>Bantuan Customer Service Agendakota</li>
              </ol>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default Price;
