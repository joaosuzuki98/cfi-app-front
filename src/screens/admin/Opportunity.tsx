import Layout from './Layout'
import { View } from 'react-native'
import CustomerInvestimentProfileCard from '../../components/customer/CustomerInvestimentProfileCard'
import RegionOfInterestForm from '../../components/customer/RegionOfInterestForm'
import { globalStyles } from '../../styles/styles'

function Opportunity() {
    return (
        <Layout title='Oportunidades de imóveis'>
            <View style={globalStyles.marginTop2}>
                <CustomerInvestimentProfileCard />
            </View>
            <View style={globalStyles.marginTop2}>
                <RegionOfInterestForm />
            </View>
        </Layout>
    )
}

export default Opportunity
