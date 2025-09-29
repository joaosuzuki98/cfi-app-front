import { View, Text, TextInput, Pressable, Alert } from "react-native"
import { useEffect, useState } from "react"
import { globalStyles } from "../../styles/styles"
import ContainerWithTitleAndSubtitle from "../ContainerWithTitleAndSubtitle"
import api from "../../api/api"

function CustomerPersonalInfoCard({ user, updateUser }) {
    const [name, setName] = useState("")
    const [email, setEmail] = useState("")
    const [phone, setPhone] = useState("")

    useEffect(() => {
        if (user) {
            setName(user.name || "")
            setEmail(user.email || "")
            setPhone(user.phone || "")
        }
    }, [user])

    const handleSave = async () => {
        try {
            if (!user) return;

            const response = await api.put(`/customer/${user.id}`, { name, email, phone });

            updateUser(response.data);
            Alert.alert("Sucesso", "Informações atualizadas!");
        } catch (err) {
            console.error("Erro ao salvar usuário:", err);
            Alert.alert("Erro", "Não foi possível salvar os dados");
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
