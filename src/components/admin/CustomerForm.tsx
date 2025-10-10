import { useState } from "react";
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from "react-native";
import { globalStyles } from "../../styles/styles";
import ContainerWithTitleAndSubtitle from "../ContainerWithTitleAndSubtitle";
import api from "../../api/api";

function CustomerForm({ onCustomerAdded }) {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirmation, setPasswordConfirmation] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async () => {
        if (!name || !email || !phone || !password || !passwordConfirmation) {
            Alert.alert("Erro", "Preencha todos os campos");
            return;
        }

        if (password !== passwordConfirmation) {
            Alert.alert("Erro", "As senhas não coincidem");
            return;
        }

        setLoading(true);
        try {
            const payload = { name, email, phone, password, passwordConfirmation };
            const response = await api.post("/customer", payload);
            Alert.alert("Sucesso", "Cliente cadastrado com sucesso!");

            setName(""); setEmail(""); setPhone(""); setPassword(""); setPasswordConfirmation("");
            onCustomerAdded && onCustomerAdded(response.data);
        } catch (err) {
            console.error(err);
            Alert.alert("Erro", "Falha ao cadastrar cliente");
        } finally {
            setLoading(false);
        }
    };

    return (
        <ContainerWithTitleAndSubtitle title="Adicionar Cliente" subtitle="Preencha os dados do cliente">
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
                    autoCapitalize="none"
                    keyboardType="email-address"
                />
            </View>

            <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Telefone</Text>
                <TextInput
                    style={globalStyles.input}
                    value={phone}
                    onChangeText={setPhone}
                    keyboardType="phone-pad"
                />
            </View>

            <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Senha</Text>
                <TextInput
                    style={globalStyles.input}
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
            </View>

            <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Confirmar senha</Text>
                <TextInput
                    style={globalStyles.input}
                    value={passwordConfirmation}
                    onChangeText={setPasswordConfirmation}
                    secureTextEntry
                />
            </View>

            <Pressable
                onPress={handleSubmit}
                disabled={loading}
                style={[globalStyles.submitButton, globalStyles.marginTop2, loading && { opacity: 0.7 }]}
            >
                {loading ? (
                    <ActivityIndicator color="#fff" />
                ) : (
                    <Text style={globalStyles.text3}>Cadastrar Cliente</Text>
                )}
            </Pressable>
        </ContainerWithTitleAndSubtitle>
    );
}

export default CustomerForm;
