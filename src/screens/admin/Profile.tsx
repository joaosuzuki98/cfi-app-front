import Layout from './Layout'
import { View, Alert } from 'react-native'
import CustomerDetailsCard from '../../components/customer/CustomerDetailsCard'
import CustomerPersonalInfoCard from '../../components/customer/CustomerPersonalInfoCard'
import CustomerPasswordDetailsCard from '../../components/customer/CustomerPasswordDetailsCard'
import EditInvestmentProfileForm from '../../components/customer/EditInvestmentProfileForm'
import { globalStyles } from '../../styles/styles'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'

function Profile({ setUser }) {
    const [user, setUserState] = useState(null)

    useEffect(() => {
        const loadUser = async () => {
            try {
                const userJson = await AsyncStorage.getItem("user")
                if (userJson) {
                    setUserState(JSON.parse(userJson))
                }
            } catch (err) {
                console.error("Erro ao carregar usuário:", err)
                Alert.alert("Erro", "Não foi possível carregar os dados do usuário")
            }
        }
        loadUser()
    }, [])

    const updateUser = async (updatedUser) => {
        try {
            setUserState(updatedUser)
            await AsyncStorage.setItem("user", JSON.stringify(updatedUser))
        } catch (err) {
            console.error("Erro ao salvar usuário:", err)
        }
    }

    return (
        <Layout title='Seu perfil'>
            <View style={globalStyles.marginTop3}>
               <CustomerDetailsCard setUser={setUser} user={user} />
            </View>

            <View style={globalStyles.marginTop3}>
                <CustomerPersonalInfoCard user={user} updateUser={updateUser} />
            </View>

            <View style={globalStyles.marginTop2}>
                <CustomerPasswordDetailsCard user={user} updateUser={updateUser} />
            </View>

            <View style={globalStyles.marginTop2}>
                <EditInvestmentProfileForm />
            </View>
        </Layout>
    )
}

export default Profile
