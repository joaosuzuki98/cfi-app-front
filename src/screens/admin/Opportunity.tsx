import Layout from './Layout'
import { View } from 'react-native'
import CustomerInvestimentProfileCard from '../../components/customer/CustomerInvestimentProfileCard'
import { globalStyles } from '../../styles/styles'

function Opportunity() {
    return (
        <Layout title='Oportunidades de imóveis'>
            <View style={globalStyles.marginTop2}>
                <CustomerInvestimentProfileCard />
            </View>
        </Layout>
    )
}

export default Opportunity
