import Container from "../Container"
import { View, Text, Pressable } from "react-native"
import { globalStyles } from "../../styles/styles"
import { User, Clock, Gavel } from "lucide-react-native"
import CircleIcon from "../CircleIcon"

function CustomerDetailsCard() {
    return (
        <Container>
            <CircleIcon
                icon={
                    <User size={32} />
                }
                size={64}
                backgroundColor="#FAFAFA"
            />
            <Text style={{color: '#FAFAFA', fontWeight: '500', marginTop: 20, fontSize: 18}}>Fulano da Silva</Text>
            <Text style={{color: '#A1A1AA', fontSize: 12}}>fulano@email.com</Text>

            <View style={[globalStyles.marginTop3, {width: '100%'}]}>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Gavel size={16} color={'#fff'} />
                    <Text style={{color: '#FAFAFA', marginLeft: 10}}>
                        2 imóveis arrematados
                    </Text>
                </View>
                <View style={{flexDirection: 'row', justifyContent: 'flex-start'}}>
                    <Clock size={16} color={'#fff'} />
                    <Text style={{color: '#FAFAFA', marginLeft: 10}}>
                        Membro desde Jan 2024
                    </Text>
                </View>
            </View>

            <Pressable style={[globalStyles.marginTop3, {borderColor: '#303036', borderWidth: 1, borderRadius: 8, padding: 12, width: '100%'}]}>
                <Text style={{color: '#FAFAFA', textAlign: 'center'}}>Sair da conta</Text>
            </Pressable>
        </Container>
    )
}

export default CustomerDetailsCard
