import Layout from './Layout'
import { View } from 'react-native'
import CustomerList from '../../components/admin/CustomersList'
import { globalStyles } from '../../styles/styles'

function Customers() {
    return (
        <Layout title='Clientes'>
            <View style={globalStyles.marginTop3}>
               <CustomerList />
            </View>
        </Layout>
    )
}

export default Customers
