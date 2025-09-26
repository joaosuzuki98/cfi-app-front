import { View, Text, TextInput, Pressable } from "react-native"
import { globalStyles } from "../../styles/styles"
import ContainerWithTitleAndSubtitle from "../ContainerWithTitleAndSubtitle"

function CustomerPasswordDetailsCard() {
    return (
        <ContainerWithTitleAndSubtitle title="Alterar senha" subtitle="Atualize sua senha">
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, {marginBottom: 10}]}>
                    Senha atual
                </Text>
                <TextInput
                    style={globalStyles.input}
                    secureTextEntry={true}
                />
            </View>
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, {marginBottom: 10}]}>
                    Nova senha
                </Text>
                <TextInput
                    style={globalStyles.input}
                    secureTextEntry={true}
                />
            </View>
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, {marginBottom: 10}]}>
                    Confirmar nova senha
                </Text>
                <TextInput
                    style={globalStyles.input}
                    secureTextEntry={true}
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

export default CustomerPasswordDetailsCard
