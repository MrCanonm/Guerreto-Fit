import React from "react";

import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Image,
  Font,
} from "@react-pdf/renderer";
import { Customer } from "./customerInterfaces";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "white",
    padding: 30,
    fontFamily: "Roboto",
  },
  header: {
    backgroundColor: "#1f2937",
    height: 60,
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    marginBottom: 30,
  },
  icon: {
    width: 40,
    height: 40,
    alignSelf: "center",
    marginTop: 10,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 12,
    color: "#6b7280",
    textAlign: "center",
    marginBottom: 20,
  },
  infoContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  infoColumn: {
    flexDirection: "column",
  },
  infoLabel: {
    fontSize: 10,
    color: "#6b7280",
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 12,
    fontWeight: "medium",
  },
  summaryTitle: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 10,
  },
  summaryBox: {
    borderWidth: 1,
    borderColor: "#e5e7eb",
    borderRadius: 4,
    padding: 10,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 5,
  },
  summaryLabel: {
    color: "#6b7280",
    fontSize: 12,
  },
  summaryValue: {
    fontSize: 12,
    fontWeight: "medium",
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 5,
    paddingTop: 5,
    borderTopWidth: 1,
    borderTopColor: "#e5e7eb",
  },
  footer: {
    fontSize: 10,
    color: "#6b7280",
    textAlign: "center",
    marginTop: 30,
  },
});
Font.register({
  family: "Roboto",
  fonts: [
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-light-webfont.ttf",
      fontWeight: 300,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-regular-webfont.ttf",
      fontWeight: 400,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-medium-webfont.ttf",
      fontWeight: 500,
    },
    {
      src: "https://cdnjs.cloudflare.com/ajax/libs/ink/3.1.10/fonts/Roboto/roboto-bold-webfont.ttf",
      fontWeight: 700,
    },
  ],
});

export const MembershipReceiptPDF = ({
  customerData,
}: {
  customerData: Customer;
}) => {
  return (
    <Document>
      <Page size="A4" style={styles.page}>
        <View style={styles.header} />
        <Image style={styles.icon} src={"/images/guerrero_fit-rbg.png"} />
        <Text style={styles.title}>Guerrero Fit</Text>
        <Text style={styles.subtitle}>Recibo #{customerData.id}</Text>

        <View style={styles.infoContainer}>
          <View style={styles.infoColumn}>
            <Text style={styles.infoValue}>Pagado Por:</Text>
            <Text style={styles.infoLabel}>
              {customerData.name} {customerData.sureName}
            </Text>
          </View>
          <View style={styles.infoColumn}>
            <Text style={styles.infoValue}>Fecha de Pago:</Text>
            <Text style={styles.infoLabel}>
              {customerData.membership?.startDate
                ? new Date(
                    customerData.membership.startDate
                  ).toLocaleDateString()
                : "No disponible"}
            </Text>
          </View>

          <View style={styles.infoColumn}>
            <Text style={styles.infoValue}>Fecha de Vencimiento:</Text>
            <Text style={styles.infoLabel}>
              {customerData.membership?.endDate
                ? new Date(customerData.membership.endDate).toLocaleDateString()
                : "No disponible"}
            </Text>
          </View>
          {/* <View style={styles.infoColumn}>
            <Text style={styles.infoLabel}>Metodo de Pago</Text>
            <Text style={styles.infoValue}>{"Efectivo"}</Text>
          </View> */}
        </View>

        <Text style={styles.summaryTitle}>Servicio</Text>
        <View style={styles.summaryBox}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>
              Pago de {customerData.customerType}
            </Text>
            <Text style={styles.summaryValue}>
              RD${customerData.membership?.servicePrice.ammout}
            </Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Meses a Pagar</Text>
            <Text style={styles.summaryValue}>
              {customerData.membership?.monthsToPay}
            </Text>
          </View>
          <View style={styles.totalRow}>
            <Text style={[styles.summaryValue, { fontWeight: "bold" }]}>
              Monto Total
            </Text>
            <Text style={[styles.summaryValue, { fontWeight: "bold" }]}>
              RD${customerData.membership?.totalAmout}
            </Text>
          </View>
        </View>

        <Text style={styles.footer}>
          Si tiene alguna pregunta, contáctenos a cybergalaxyrd@gmail.com{"\n"}o
          llámenos al +1 (829) 359-2292
        </Text>
      </Page>
    </Document>
  );
};
