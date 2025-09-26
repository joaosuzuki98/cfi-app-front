import { Button } from '@react-navigation/elements'
import { useNavigation } from '@react-navigation/native'
import Layout from './Layout'

function Dashboard() {
    const navigation = useNavigation()
    return (
        <Layout title='Dashboard'>
            <Button onPress={() => navigation.navigate('AdminProfile')}>
                Go to profile
            </Button>
        </Layout>
    )
}

export default Dashboard
