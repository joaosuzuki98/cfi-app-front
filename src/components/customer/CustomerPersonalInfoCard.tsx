import { View, Text, TextInput, Pressable, Alert } from "react-native"
import { useEffect, useState } from "react"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { globalStyles } from "../../styles/styles"
import ContainerWithTitleAndSubtitle from "../ContainerWithTitleAndSubtitle"

function CustomerPersonalInfoCard() {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userJson = await AsyncStorage.getItem("user")
                if (userJson) {
                    const user = JSON.parse(userJson)
                    setName(user.name || "")
                    setEmail(user.email || "")
                    setPhone(user.phone || "")
                }
            } catch (err) {
                console.error("Erro ao carregar usuário:", err)
                Alert.alert("Erro", "Não foi possível carregar os dados do usuário")
            }
        }
        loadUser()
    }, [])

    const handleSave = async () => {
        try {
            const userJson = await AsyncStorage.getItem("user")
            if (!userJson) return
            const user = JSON.parse(userJson)
            const updatedUser = { ...user, name, email, phone }

            await AsyncStorage.setItem("user", JSON.stringify(updatedUser))
            Alert.alert("Sucesso", "Informações atualizadas!")
        } catch (err) {
            console.error("Erro ao salvar usuário:", err)
            Alert.alert("Erro", "Não foi possível salvar os dados")
        }
    }

    return (
        <ContainerWithTitleAndSubtitle title="Informações pessoais" subtitle="Atualize suas informações pessoais">
            <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Nome</Text>
                <TextInput
                    style={globalStyles.input}
                    value={name}
                    onChangeText={setName}
                />
            </View>

            <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Email</Text>
                <TextInput
                    style={globalStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                />
            </View>

            <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Celular</Text>
                <TextInput
                    style={globalStyles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>

            <Pressable style={[globalStyles.submitButton, globalStyles.marginTop2]} onPress={handleSave}>
                <Text style={globalStyles.text3}>Salvar alterações</Text>
            </Pressable>
        </ContainerWithTitleAndSubtitle>
    )
}

export default CustomerPersonalInfoCard
