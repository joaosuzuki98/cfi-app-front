import { View, Text, TextInput, Pressable, Alert } from "react-native"
import { useState } from "react"
import { globalStyles } from "../../styles/styles"
import ContainerWithTitleAndSubtitle from "../ContainerWithTitleAndSubtitle"
import api from "../../api/api"

function CustomerPasswordDetailsCard({ user }) {
    const [currentPassword, setCurrentPassword] = useState("")
    const [newPassword, setNewPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")

    const handleSavePassword = async () => {
        if (!user) return
        if (newPassword !== confirmPassword) {
            Alert.alert("Erro", "As senhas não coincidem")
            return
        }

        try {
            await api.put(`/customer/password/${user.id}`, {
                currentPassword,
                password: newPassword,
                passwordConfirmation: confirmPassword
            });

            Alert.alert("Sucesso", "Senha atualizada!");
            setCurrentPassword("");
            setNewPassword("");
            setConfirmPassword("");
        } catch (err) {
            console.error("Erro ao atualizar senha:", err);
            Alert.alert("Erro", "Não foi possível atualizar a senha");
        }
    }

    return (
        <ContainerWithTitleAndSubtitle title="Alterar senha" subtitle="Atualize sua senha">
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, {marginBottom: 10}]}> Senha atual </Text>
                <TextInput 
                    style={globalStyles.input} 
                    secureTextEntry={true} 
                    value={currentPassword} 
                    onChangeText={setCurrentPassword} 
                />
            </View>
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, {marginBottom: 10}]}> Nova senha </Text>
                <TextInput 
                    style={globalStyles.input} 
                    secureTextEntry={true} 
                    value={newPassword} 
                    onChangeText={setNewPassword} 
                />
            </View>
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, {marginBottom: 10}]}> Confirmar nova senha </Text>
                <TextInput 
                    style={globalStyles.input} 
                    secureTextEntry={true} 
                    value={confirmPassword} 
                    onChangeText={setConfirmPassword} 
                />
            </View>
            <Pressable style={[globalStyles.submitButton, globalStyles.marginTop2]} onPress={handleSavePassword}>
                <Text style={globalStyles.text3}>Salvar alterações</Text>
            </Pressable>
        </ContainerWithTitleAndSubtitle>
    )
}

export default CustomerPasswordDetailsCard
