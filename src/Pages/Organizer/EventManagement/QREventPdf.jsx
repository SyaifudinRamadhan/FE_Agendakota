import React, { useEffect, useState } from "react";
import {
	Circle,
	Defs,
	Document,
	Image,
	LinearGradient,
	Page,
	Stop,
	StyleSheet,
	Svg,
	Text,
	View,
} from "@react-pdf/renderer";

const styles = StyleSheet.create({
	pageBackground: {
		position: "absolute",
		minWidth: "100%",
		minHeight: "100%",
		display: "block",
		height: "100%",
		width: "100%",
	},
	BoxContent: {
		padding: "20px",
	},
	PreviewQR: {
		display: "flex",
		flexDirection: "column",
		padding: "20px",
		border: "1px solid #ddd",
		borderRadius: "8px",
		gap: 10,
		// backgroundColor: LinearGradient,
		// backgroundColor: "linear-gradient(351deg, #f59abf69, transparent)",
	},
	TitleBox: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: "20px",
		marginBottom: "50px",
	},
	PreviewTitle: {
		textAlign: "center",
		fontWeight: "bold",
		fontSize: "23px",
	},
	QRBox: {
		width: "50%",
		aspectRatio: "1/1",
		marginLeft: "auto",
		marginRight: "auto",
	},
	QRImage: {},
	Sponsor: {
		display: "flex",
		flexDirection: "row",
		gap: "10px",
		marginLeft: "auto",
		marginRight: "auto",
		marginTop: "20px",
		marginBottom: "30px",
	},
	SponsorText: {
		fontSize: "11pt",
		marginLeft: "auto",
		marginTop: "auto",
		marginBottom: "auto",
	},
	SponsorIcon: {
		width: "120px",
		marginRight: "auto",
	},
	Instruction: {
		marginTop: "30px",
		fontSize: "18pt",
	},
	InstructionTitle: {
		fontWeight: "bold",
	},
});

const QREventPdf = ({ title, eventId }) => {
	return (
		<Document>
			<Page size={"A4"} style={styles.PreviewQR}>
				<View style={styles.BoxContent}>
					<View style={styles.TitleBox}>
						<Text style={styles.PreviewTitle}>{title}</Text>
					</View>
					<View style={styles.QRBox}>
						<Image source={eventId} style={styles.QRImage} />
					</View>
					<View style={styles.Sponsor}>
						<Text style={styles.SponsorText}>Powered By </Text>
						<Image style={styles.SponsorIcon} source={"/images/logo.png"} />
					</View>
					<View style={styles.Instruction}>
						<Text style={styles.InstructionTitle}>Petunjuk Scan QR</Text>
						<Text>
							1. Buka dan login web agendakota.id, kemudian masuk ke menu QR
							Check-in.
						</Text>
						<Text>
							2. Menu QR Check-in berada pada header web, atau ditampilan mobile
							ada di side menu.
						</Text>
						<Text>3. Scan QR stelah camera terbuka.</Text>
						<Text>4. Tunjukkan hasil scan pada petugas penjaga.</Text>
						<Text>
							5. Jangan tutup hasil scan, karena scan hanya berlaku satu kali
							tiap tiket.
						</Text>
					</View>
				</View>
			</Page>
		</Document>
		// <div className={styles.PreviewQR} id="pdf-to-print">
		// 	<div className={styles.PreviewQRContent}>
		// 		<div className={styles.PreviewTitle}>{title}</div>
		// 		<div className={styles.QRBox}>
		// 			<QRCode size={256} value={eventId} viewBox={`0 0 256 256`} />
		// 		</div>
		// 		<div className={styles.Sponsor}>
		// 			<span>Powered By</span>
		// 			<img src="/images/logo.png" alt="" srcset="" />
		// 		</div>
		// 		<div className={styles.Instruction}>
		// 			<b>Petunjuk Scan QR</b>
		// 			<p>
		// 				1. Buka dan login web agendakota.id, kemudian masuk ke menu QR
		// 				Check-in.
		// 			</p>
		// 			<p>
		// 				2. Menu QR Check-in berada pada header web, atau ditampilan mobile
		// 				ada di side menu.
		// 			</p>
		// 			<p>3. Scan QR stelah camera terbuka.</p>
		// 			<p>4. Tunjukkan hasil scan pada petugas penjaga.</p>
		// 			<p>
		// 				5. Jangan tutup hasil scan, karena scan hanya berlaku satu kali tiap
		// 				tiket.
		// 			</p>
		// 		</div>
		// 	</div>
		// </div>
	);
};

export default QREventPdf;
