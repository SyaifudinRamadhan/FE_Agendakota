import React, { useEffect } from "react";
import styles from "./styles/Footer.module.css";
import {
  BiCopyright,
  BiEnvelope,
  BiLogoFacebook,
  BiLogoFacebookCircle,
  BiLogoInstagram,
  BiLogoLinkedin,
  BiLogoTiktok,
  BiLogoTwitter,
  BiLogoYoutube,
  BiPhone,
  BiX,
} from "react-icons/bi";
import config from "../config";

const Footer = () => {
  useEffect(() => {
    try {
      document.getElementsByClassName("content")[0].style.cssText =
        "padding-bottom: 0px !important; left: 0px;";
    } catch (error) {}
  });

  return (
    <div className={styles.Footer}>
      <div className={styles.Inner}>
        <div className={styles.FooterLeft}>
          <img
            src="/images/logo.png"
            alt="Logo Agendakota"
            className={styles.Logo}
          />
          <div className={styles.FooterLeftLink}>
            <a href="https://wa.me/+6288990079999" className={styles.Inline}>
              <div className={styles.IconedInfo}>
                <img src="/images/WhatsApp_icon.png" alt="" srcset="" />
                <div className={styles.IconedInfoText}>
                  <div>WhatsApp</div>
                  <div style={{ color: "blue" }}>+6288990079999</div>
                </div>
              </div>
            </a>
            <a href="mailto:halo@agendakota.id" className={styles.Inline}>
              <div className={styles.IconedInfo}>
                <img src="/images/email.png" alt="" srcset="" />
                <div className={styles.IconedInfoText}>
                  <div>Email</div>
                  <div>halo@agendakota.id</div>
                </div>
              </div>
            </a>
            <div className={styles.SocmedBox}>
              <div className={styles.SocmedTitle}>Ikuti Kami</div>
              <div className={styles.SocmedList}>
                <a href="https://facebook.com/agendakota">
                  <BiLogoFacebookCircle />
                </a>
                <a href="https://x.com/AgendaKotaID">
                  <BiX />
                </a>
                <a href="https://instagram.com/agendakota">
                  <BiLogoInstagram />
                </a>
                <a href="https://www.linkedin.com/company/agendakotaid">
                  <BiLogoLinkedin />
                </a>
                <a href="https://youtube.com/agendakotaTV">
                  <BiLogoYoutube />
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className={styles.LinkBox}>
          <div className={styles.Column}>
            <div className={styles.Title}>Perusahaan</div>
            <a
              href="https://media.agendakota.id/tentang-agendakota"
              className={styles.Link}
              target="_blank"
            >
              Tentang Agendakota
            </a>
            <a
              href="https://media.agendakota.id/"
              className={styles.Link}
              target="_blank"
            >
              Jadi Patner Kami
            </a>
            <a
              href="https://media.agendakota.id/fitur"
              className={styles.Link}
              target="_blank"
            >
              Fitur
            </a>
            <a
              href="https://media.agendakota.id/press-kit"
              className={styles.Link}
              target="_blank"
            >
              Harga
            </a>
            <a
              href="https://media.agendakota.id/"
              className={styles.Link}
              target="_blank"
            >
              Media
            </a>
            <a
              href="https://media.agendakota.id/hubungi-kami"
              className={styles.Link}
              target="_blank"
            >
              Hubungi Kami
            </a>
            <a
              href="https://media.agendakota.id/panduan"
              className={styles.Link}
              target="_blank"
            >
              Panduan
            </a>
            <a
              href="https://media.agendakota.id/karir"
              className={styles.Link}
              target="_blank"
            >
              Karir
            </a>
          </div>
          <div className={styles.Column}>
            <div className={styles.Title}>Produk</div>
            <a href="#" className={styles.Link} target="_blank">
              Virtual Event
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Onsite Event
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Hybrid Event
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Broadcast
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Event Activation
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Event Funding
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Event Marketing
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Point of Sale
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Perizinan Event
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Venue Event
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Sewa Alat Event
            </a>
            <a href="#" className={styles.Link} target="_blank">
              Man Power Event
            </a>
          </div>
          <div className={styles.Column}>
            <div className={styles.Title}>Pilih Kota</div>
            <a
              href="/explore?city=Surabaya"
              className={styles.Link}
              target="_blank"
            >
              Surabaya
            </a>
            <a
              href="/explore?city=Jakarta"
              className={styles.Link}
              target="_blank"
            >
              Jakarta
            </a>
            <a
              href="/explore?city=Bandung"
              className={styles.Link}
              target="_blank"
            >
              Bandung
            </a>
            <a
              href="/explore?city=Yogyakarta"
              className={styles.Link}
              target="_blank"
            >
              Yogyakarta
            </a>
            <a
              href="/explore?city=Malang"
              className={styles.Link}
              target="_blank"
            >
              Malang
            </a>
            <a
              href="/explore?city=Solo"
              className={styles.Link}
              target="_blank"
            >
              Solo
            </a>
            <a
              href="/explore?city=Semarang"
              className={styles.Link}
              target="_blank"
            >
              Semarang
            </a>
            <a
              href="/explore?city=Bali"
              className={styles.Link}
              target="_blank"
            >
              Bali
            </a>
          </div>
          <div className={styles.Column}>
            <div className={styles.Title}>Kategori Event</div>
            <a
              href="/explore?category=Seminar"
              className={styles.Link}
              target="_blank"
            >
              Seminar
            </a>
            <a
              href="/explore?category=Talkshow"
              className={styles.Link}
              target="_blank"
            >
              Talkshow
            </a>
            <a
              href="/explore?category=Workshop"
              className={styles.Link}
              target="_blank"
            >
              Workshop
            </a>
            <a
              href="/explore?category=Pameran, Expo"
              className={styles.Link}
              target="_blank"
            >
              Exhibition, Expo, Pameran
            </a>
            <a
              href="/explore?category=Pertunjukan"
              className={styles.Link}
              target="_blank"
            >
              Pertunjukan
            </a>
            <a
              href="/explore?category=Konferensi"
              className={styles.Link}
              target="_blank"
            >
              Konferensi
            </a>
            <a
              href="/explore?category=Pertandingan"
              className={styles.Link}
              target="_blank"
            >
              Pertandingan
            </a>
          </div>
        </div>
      </div>
      <div className={styles.Bottom}>
        {/* <BiCopyright />  */}
        <div
          style={{
            marginTop: "auto",
            marginBottom: "auto",
            flexDirection: "row",
          }}
        >
          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
            Agendakota
          </div>{" "}
          &nbsp;
          <BiCopyright
            style={{ marginTop: "auto", marginBottom: "auto" }}
          />{" "}
          &nbsp;
          <div style={{ marginTop: "auto", marginBottom: "auto" }}>
            2024 All rights reserved.
          </div>
        </div>
        <div style={{ marginLeft: "auto" }}>
          <a
            href="/term-conditions"
            className={`${styles.Link} ${styles.BottomLink}`}
          >
            Term & Conditions
          </a>
        </div>
      </div>
    </div>
  );
};

export default Footer;
