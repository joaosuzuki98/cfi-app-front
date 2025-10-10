import { useState } from 'react'
import Layout from './Layout'
import { View, Text, TextInput, Image, Pressable, Alert } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { globalStyles } from '../../styles/styles'
import api from '../../api/api'

function Login({ setUser }) {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleLogin() {
        if (!email || !password) {
            Alert.alert('Erro', 'Preencha usuário e senha')
            return
        }

        try {
            setLoading(true)
            const response = await api.post('/login', { email, password })
            const userData = response.data

            await AsyncStorage.setItem('user', JSON.stringify(userData))
            setUser(userData)

            Alert.alert('Sucesso', `Seja bem-vindo`)
        } catch (err) {
            console.error(err)
            Alert.alert('Erro', 'Credenciais inválidas')
        } finally {
            setLoading(false)
        }
    }

    return (
        <Layout>
            <View style={[globalStyles.flex1, { width: "100%" }]}>
                <View style={{ alignItems: 'center' }}>
                    <Image
                        source={require('../../../assets/img/logo.png')}
                        style={{ width: 120, height: 120 }} 
                    />
                </View>
                <Text style={[globalStyles.text3, globalStyles.marginTop3, { marginBottom: 10 }]}>
                    Usuário
                </Text>
                <TextInput
                    style={globalStyles.input}
                    value={email}
                    onChangeText={setEmail}
                    autoCapitalize="none"
                />
            </View>
            <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>
                    Senha
                </Text>
                <TextInput
                    style={globalStyles.input}
                    secureTextEntry={true}
                    value={password}
                    onChangeText={setPassword}
                />
            </View>

            <Pressable
                style={[globalStyles.submitButton, globalStyles.marginTop2, { opacity: loading ? 0.7 : 1 }]}
                onPress={handleLogin}
                disabled={loading}
            >
                <Text style={[globalStyles.text3, { textAlign: 'center' }]}>
                    {loading ? 'Entrando...' : 'Entrar'}
                </Text>
            </Pressable>
        </Layout>
    )
}

export default Login
