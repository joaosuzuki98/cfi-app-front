import { useState, useEffect } from "react"
import { View, Text, TextInput, Pressable, Alert, ActivityIndicator } from "react-native"
import { Check } from "lucide-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { globalStyles } from "../../styles/styles"
import ContainerWithTitleAndSubtitle from "../ContainerWithTitleAndSubtitle"
import api from "../../api/api"

function CustomerInvestimentProfileCard() {
    const [customerId, setCustomerId] = useState<number | null>(null)
    const [loading, setLoading] = useState(true)
    const [submitting, setSubmitting] = useState(false)

    const [valueStart, setValueStart] = useState('')
    const [valueLimit, setValueLimit] = useState('')
    const [observation, setObservation] = useState('')
    const [meterSquare, setMeterSquare] = useState('')
    const [bedroomNumber, setBedroomNumber] = useState('')
    const [garageNumber, setGarageNumber] = useState('')

    const [selectedPaymentMethodIds, setSelectedPaymentMethodIds] = useState<number[]>([])
    const [selectedPropertyTypeIds, setSelectedPropertyTypeIds] = useState<number[]>([])

    const [paymentMethods, setPaymentMethods] = useState<{ id: number; name: string }[]>([])
    const [propertyTypes, setPropertyTypes] = useState<{ id: number; name: string }[]>([])

    useEffect(() => {
        const loadData = async () => {
            try {
                const userJson = await AsyncStorage.getItem('user')
                if (userJson) {
                    const user = JSON.parse(userJson)
                    if (user.userType === 'CUSTOMER') {
                        setCustomerId(user.id);
                    } else {
                        Alert.alert('Erro', 'Apenas clientes podem configurar perfil de investimento.')
                        return
                    }
                } else {
                    Alert.alert('Erro', 'Usuário não autenticado.')
                    return
                }

                const paymentRes = await api.get('/payment-method')
                const paymentList = paymentRes.data._embedded?.paymentMethodResponseList || []
                setPaymentMethods(paymentList.map((item: any) => ({ id: item.id, name: item.name })))

                const propertyRes = await api.get('/property-type');
                const propertyList = propertyRes.data._embedded?.propertyTypeResponseList || []
                setPropertyTypes(propertyList.map((item: any) => ({ id: item.id, name: item.name })))
            } catch (err) {
                console.error('Failed to load data:', err)
                Alert.alert('Erro', 'Não foi possível carregar os dados necessários.')
            } finally {
                setLoading(false)
            }
        }

        loadData()
    }, [])

    const togglePaymentMethod = (id: number) => {
        setSelectedPaymentMethodIds(prev =>
        prev.includes(id)
            ? prev.filter(item => item !== id)
            : [...prev, id]
        )
    }

    const togglePropertyType = (id: number) => {
        setSelectedPropertyTypeIds(prev =>
        prev.includes(id)
            ? prev.filter(item => item !== id)
            : [...prev, id]
        )
    }

    const handleSubmit = async () => {
        if (customerId === null) {
            Alert.alert('Erro', 'ID do cliente não encontrado.')
            return
        }

        if (!valueStart || !valueLimit || !meterSquare || !bedroomNumber || !garageNumber) {
            Alert.alert('Erro', 'Preencha todos os campos obrigatórios.')
            return
        }

        if (selectedPaymentMethodIds.length === 0 || selectedPropertyTypeIds.length === 0) {
            Alert.alert('Erro', 'Selecione pelo menos um método de pagamento e um tipo de imóvel.')
            return
        }

        setSubmitting(true)

        try {
            const payload = {
                valueStart,
                valueLimit,
                observation,
                meterSquare: parseFloat(meterSquare),
                bedroomNumber: parseInt(bedroomNumber, 10),
                garageNumber: parseInt(garageNumber, 10),
                customerId,
                paymentMethodIds: selectedPaymentMethodIds,
                propertyTypeIds: selectedPropertyTypeIds,
            }

            const response = await api.post('/investiment-profile', payload)
            const profileId = response.data.id

            await AsyncStorage.setItem('investmentProfileId', String(profileId))
            Alert.alert('Sucesso', 'Perfil de investimento salvo com sucesso!')
        } catch (err: any) {
            console.error('Submission error:', err)
            Alert.alert('Erro', err.response?.data?.message || 'Falha ao salvar o perfil.')
        } finally {
            setSubmitting(false)
        }
    }

    if (loading) {
        return (
            <ContainerWithTitleAndSubtitle title="Perfil de investimento" subtitle="Carregando...">
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            </ContainerWithTitleAndSubtitle>
        )
    }
    return (
        <ContainerWithTitleAndSubtitle title="Perfil de investimento" subtitle="Gerencie seu perfil de investimento">
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Valor Inicial (R$)</Text>
                <TextInput
                    style={globalStyles.input}
                    value={valueStart}
                    onChangeText={setValueStart}
                    keyboardType="numeric"
                    placeholder="Ex: 100000"
                />
            </View>
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Valor Máximo (R$)</Text>
                <TextInput
                    style={globalStyles.input}
                    value={valueLimit}
                    onChangeText={setValueLimit}
                    keyboardType="numeric"
                    placeholder="Ex: 500000"
                />
            </View>
            <View style={[globalStyles.marginTop2, {width: "100%"}]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Observações</Text>
                <TextInput
                    style={[globalStyles.input, { height: 80 }]}
                    value={observation}
                    onChangeText={setObservation}
                    multiline
                    textAlignVertical="top"
                    placeholder="Ex: Procurando imóveis em bairros seguros"
                />
            </View>

            <View style={[globalStyles.marginTop2, { width: '100%' }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Área (m²)</Text>
                <TextInput
                    style={globalStyles.input}
                    value={meterSquare}
                    onChangeText={setMeterSquare}
                    keyboardType="numeric"
                    placeholder="Ex: 80.5"
                />
            </View>

            <View style={[globalStyles.marginTop2, { width: '100%' }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Nº de Quartos</Text>
                <TextInput
                    style={globalStyles.input}
                    value={bedroomNumber}
                    onChangeText={setBedroomNumber}
                    keyboardType="numeric"
                    placeholder="Ex: 3"
                />
            </View>

            <View style={[globalStyles.marginTop2, { width: '100%' }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Nº de Vagas</Text>
                <TextInput
                style={globalStyles.input}
                value={garageNumber}
                onChangeText={setGarageNumber}
                keyboardType="numeric"
                placeholder="Ex: 2"
                />
            </View>

            <View style={[globalStyles.marginTop2, { width: '100%' }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Método de Pagamento</Text>
                {paymentMethods.map((pm) => (
                <Pressable
                    key={pm.id}
                    style={globalStyles.checkboxContainer}
                    onPress={() => togglePaymentMethod(pm.id)}
                >
                    {selectedPaymentMethodIds.includes(pm.id) ? (
                        <Check  size={24} color="#1e90ff" />
                        ) : (
                        <Check size={24} color="#ccc" />
                    )}
                    <Text style={globalStyles.checkboxLabel}>{pm.name}</Text>
                </Pressable>
                ))}
            </View>

            <View style={[globalStyles.marginTop2, { width: '100%' }]}>
                <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Tipo de Imóvel</Text>
                {propertyTypes.map((pt) => (
                <Pressable
                    key={pt.id}
                    style={globalStyles.checkboxContainer}
                    onPress={() => togglePropertyType(pt.id)}
                >
                    {selectedPropertyTypeIds.includes(pt.id) ? (
                        <Check size={24} color="#1e90ff" />
                        ) : (
                        <Check size={24} color="#ccc" />
                    )}
                    <Text style={globalStyles.checkboxLabel}>{pt.name}</Text>
                </Pressable>
                ))}
            </View>

            <Pressable
                onPress={handleSubmit}
                disabled={submitting}
                style={[
                globalStyles.submitButton,
                globalStyles.marginTop2,
                submitting && { opacity: 0.6 },
                ]}
            >
                {submitting ? (
                    <ActivityIndicator color="#fff" />
                    ) : (
                    <Text style={globalStyles.text3}>Salvar alterações</Text>
                )}
            </Pressable>
        </ContainerWithTitleAndSubtitle>
    )
}

export default CustomerInvestimentProfileCard
