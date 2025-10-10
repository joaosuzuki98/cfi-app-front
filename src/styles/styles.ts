import { StyleSheet } from "react-native"

// Root variables
const mainDarkColor = "#17171C"
const mainLightColor = "#FAFAFA"
const altDarkColor = "#303036"
const altLightColor = "#A1A1AA"
const mainGreenColor = "#09622A"
const lightGreenColor = "#4ADE80"

// Global styles
export const globalStyles = StyleSheet.create({
    mainContainer: {
        flex: 1,
        padding: 20,
        paddingTop: 60,
        backgroundColor: mainDarkColor
    },

    container: {
        borderColor: altDarkColor,
        borderWidth: 1,
        borderRadius: 12,
        alignItems: "center",
        padding: 20
    },

    iconContainer: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        color: altDarkColor
    },

    input: {
        borderColor: altDarkColor,
        borderWidth: 1,
        borderRadius: 12,
        paddingHorizontal: 14,
        paddingVertical: 10,
        flexDirection: "row",
        alignItems: "center",
        color: mainLightColor,
    },

    submitButton: {
        backgroundColor: mainGreenColor,
        color: mainLightColor,
        padding: 10,
        borderRadius: 8,
    },

    // Spacing
    marginTop1: {
        marginTop: 10,
    },

    marginTop2: {
        marginTop: 20,
    },

    marginTop3: {
        marginTop: 30,
    },

    // Sizing
    flex1: {
        flex: 1
    },

    flex2: {
        flex: 2
    },

    flex3: {
        flex: 3
    },

    heading1: {
        color: mainLightColor,
        fontSize: 24
    },

    heading2: {
        color: mainLightColor,
        fontSize: 20
    },

    text1: {
        color: mainLightColor,
        fontSize: 18,
        fontWeight: 300
    },
    
    text2: {
        color: mainLightColor,
        fontSize: 16,
        fontWeight: 300
    },
    
    text3: {
        color: mainLightColor,
        fontSize: 12,
        fontWeight: 300
    },

    altText: {
        color: altLightColor,
        fontSize: 12,
        fontWeight: 300
    },
})