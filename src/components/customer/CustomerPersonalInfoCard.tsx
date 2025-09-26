import { View, Text, TextInput, Pressable } from "react-native"
import { globalStyles } from "../../styles/styles"
import ContainerWithTitleAndSubtitle from "../ContainerWithTitleAndSubtitle"

function CustomerPersonalInfoCard() {
    return (
        <ContainerWithTitleAndSubtitle title="Informações pessoais" subtitle="Atualize suas informações pessoais">
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, {marginBottom: 10}]}>
                    Nome
                </Text>
                <TextInput
                    style={globalStyles.input}
                    value="Fulano da silva"
                />
            </View>
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, {marginBottom: 10}]}>
                    Email
                </Text>
                <TextInput
                    style={globalStyles.input}
                    value="fulano@email.com"
                />
            </View>
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, {marginBottom: 10}]}>
                    Celular
                </Text>
                <TextInput
                    style={globalStyles.input}
                    value="fulano@email.com"
                />
            </View>

            <Pressable style={[globalStyles.submitButton, globalStyles.marginTop2]}>
                <Text style={globalStyles.text3}>
                    Salvar alterações
                </Text>
            </Pressable>
        </ContainerWithTitleAndSubtitle>
    )
}

export default CustomerPersonalInfoCard
