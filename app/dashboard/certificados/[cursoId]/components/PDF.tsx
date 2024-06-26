'use client'
import React, { useEffect, useState } from "react";
import {
    Page,
    Text,
    Document,
    StyleSheet,
    Image,
    Svg,
    View,
    Rect,
    PDFViewer,
} from "@react-pdf/renderer";
import { useSession } from "next-auth/react";
interface CertificadoProps {
    profesor: string;
    curso: string;
    director: string;
    urlFirma: string
}
const styles = StyleSheet.create({
    page: {
        padding: 60,
        flexDirection: "column",
        backgroundSize: "cover",
    },

    header: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        marginBottom: 20,
    },
    headerText: {
        fontSize: 24,
        fontWeight: "bold",
        marginRight: 10,
    },
    headerRect: {
        borderRadius: 15,
        borderWidth: 2,
        paddingVertical: 5,
        paddingHorizontal: 10,
    },

    body: {
        padding: 20,
        alignItems: "center",
        justifyContent: "center",
    },
    bodyGlobal: {
        borderRadius: 30,
        borderWidth: 3,
        borderColor: "#794CFF",
        padding: 15,

    },
    bodyText: {
        fontSize: 18,
        marginBottom: 10,
    },
    bodyTextDos: {
        fontSize: 18,
        marginTop: 20,
    },

    signature: {
        flexDirection: "column",
        alignItems: "flex-end",
    },
    signatureText: {
        fontSize: 15,
        marginBottom: 5,
    },
    image: {
        width: 200,
        height: 50,

    },
    imageFirma: {
        width: 125,
        height: 75,
    },
});


const Certificado: React.FC<CertificadoProps> = ({ 
    curso,
    profesor,
    director,
    urlFirma
}) => {
    const user = useSession()
    
   
     return (
        <PDFViewer style={{ width: '100%', height: '100vh' }}>
            <Document>
                <Page style={styles.page} size="A4" orientation="landscape">
                    <Image src={"/images/logoWith.png"} style={styles.image} />

                    <View style={styles.header}>
                        <View style={styles.headerRect}>
                            <Text style={styles.headerText}>RECONOCIMIENTO</Text>
                        </View>
                    </View>

                    <View style={styles.bodyGlobal}>
                        <View style={styles.body}>
                            <Text style={styles.bodyText}>
                                Se le otorga el presente certificado a:
                            </Text>
                            <Text style={styles.bodyText}>{user.data?.user?.name}</Text>

                            <Text style={styles.bodyTextDos}>
                                Por concluir satisfactoriamente el curso de: {curso}, con el
                                profesor: {profesor}. Esperamos sea de su agrado y pueda realizar
                                más estudios con nosotros.
                            </Text>
                        </View>

                        <View style={styles.signature}>
                            <Image src={{ uri: urlFirma, method: 'GET', headers: {}, body: '' }} style={styles.imageFirma} />
                            <Text style={styles.signatureText}>Firma _________________</Text>
                            <Text style={styles.signatureText}>{director}</Text>
                            <Text style={styles.signatureText}>
                                Director general de educaconecta
                            </Text>
                        </View>
                    </View>
                </Page>
            </Document>
        </PDFViewer>
    )
}
    ;

export default Certificado;