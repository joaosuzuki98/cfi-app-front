import Layout from './Layout'
import { View } from 'react-native'
import CustomerDetailsCard from '../../components/customer/CustomerDetailsCard'
import CustomerPersonalInfoCard from '../../components/customer/CustomerPersonalInfoCard'
import CustomerPasswordDetailsCard from '../../components/customer/CustomerPasswordDetailsCard'
import EditInvestmentProfileForm from '../../components/customer/EditInvestmentProfileForm'
import { globalStyles } from '../../styles/styles'

function Profile({ setUser }) {
    return (
        <Layout title='Seu perfil'>
            <View style={globalStyles.marginTop3}>
               <CustomerDetailsCard setUser={setUser} />
            </View>

            <View style={globalStyles.marginTop3}>
                <CustomerPersonalInfoCard />
            </View>

            <View style={globalStyles.marginTop2}>
                <CustomerPasswordDetailsCard />
            </View>

            <View style={globalStyles.marginTop2}>
                <EditInvestmentProfileForm />
            </View>
        </Layout>
    )
}

export default Profile
