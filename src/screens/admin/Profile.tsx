import { Button } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import Layout from './Layout'

function Profile() {
    const navigation = useNavigation()
    return (
        <Layout title='Perfil'>
            <Button onPress={() => navigation.navigate('AdminDashboard')}>
                Go to dashboard
            </Button>
        </Layout>
    )
}

export default Profile
