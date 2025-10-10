import React, { useState, useEffect, useCallback } from "react"
import {
    View,
    Text,
    TextInput,
    Pressable,
    Alert,
    ActivityIndicator,
    ScrollView,
} from "react-native"
import { Check } from "lucide-react-native"
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useFocusEffect } from "@react-navigation/native"
import { globalStyles } from "../../styles/styles"
import ContainerWithTitleAndSubtitle from "../ContainerWithTitleAndSubtitle"
import api from "../../api/api"

function EditInvestmentProfileForm() {
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    const [profileId, setProfileId] = useState<number | null>(null);
    const [customerId, setCustomerId] = useState<number | null>(null);

    const [valueStart, setValueStart] = useState("");
    const [valueLimit, setValueLimit] = useState("");
    const [observation, setObservation] = useState("");
    const [meterSquare, setMeterSquare] = useState("");
    const [bedroomNumber, setBedroomNumber] = useState("");
    const [garageNumber, setGarageNumber] = useState("");

    const [selectedPaymentMethodIds, setSelectedPaymentMethodIds] = useState<number[]>([]);
    const [selectedPropertyTypeIds, setSelectedPropertyTypeIds] = useState<number[]>([]);

    const [paymentMethods, setPaymentMethods] = useState<{ id: number; name: string }[]>([]);
    const [propertyTypes, setPropertyTypes] = useState<{ id: number; name: string }[]>([]);
    const [regions, setRegions] = useState<any[]>([]);

    const loadData = useCallback(async () => {
        try {
            setLoading(true);
            const iPId = await AsyncStorage.getItem("investmentProfileId");
            if (!iPId) {
                Alert.alert("Erro", "Nenhum perfil encontrado.");
                return;
            }
            const id = parseInt(iPId, 10);
            setProfileId(id);

            const res = await api.get(`/investiment-profile/${id}`);
            const data = res.data;

            setCustomerId(data.customer.id);
            setValueStart(data.valueStart);
            setValueLimit(data.valueLimit);
            setObservation(data.observation);
            setMeterSquare(String(data.meterSquare));
            setBedroomNumber(String(data.bedroomNumber));
            setGarageNumber(String(data.garageNumber));
            setSelectedPaymentMethodIds(data.paymentMethods.map((pm: any) => pm.id));
            setSelectedPropertyTypeIds(data.propertyTypes.map((pt: any) => pt.id));
            setRegions(data.regionsOfInterest);

            const paymentRes = await api.get("/payment-method");
            setPaymentMethods(paymentRes.data._embedded?.paymentMethodResponseList || []);

            const propertyRes = await api.get("/property-type");
            setPropertyTypes(propertyRes.data._embedded?.propertyTypeResponseList || []);
        } catch (err) {
            console.error("Erro ao carregar perfil:", err);
            Alert.alert("Erro", "Não foi possível carregar os dados do perfil.");
        } finally {
            setLoading(false);
        }
    }, []);

    useFocusEffect(
        useCallback(() => {
            loadData();
        }, [loadData])
    );

    const togglePaymentMethod = (id: number) => {
        setSelectedPaymentMethodIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const togglePropertyType = (id: number) => {
        setSelectedPropertyTypeIds((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    const handleSubmitProfile = async () => {
        if (!profileId || !customerId) {
            Alert.alert("Erro", "Perfil ou cliente não encontrado.");
            return;
        }

        setSubmitting(true);
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
            };

            await api.put(`/investiment-profile/${profileId}`, payload);
            Alert.alert("Sucesso", "Perfil atualizado com sucesso!");
            await loadData();
        } catch (err: any) {
            console.error("Erro ao atualizar perfil:", err);
            Alert.alert("Erro", err.response?.data?.message || "Falha ao atualizar perfil.");
        } finally {
            setSubmitting(false);
        }
    };

    const handleUpdateRegion = async (regionId: number, state: string, city: string, neighborhood: string) => {
        if (!profileId) return;

        try {
            const payload = {
                state,
                city,
                neighborhood,
                investmentProfileId: profileId,
            };
            await api.put(`/region-of-interest/${regionId}`, payload);
            Alert.alert("Sucesso", "Região atualizada com sucesso!");
            await loadData();
        } catch (err: any) {
            console.error("Erro ao atualizar região:", err);
            Alert.alert("Erro", err.response?.data?.message || "Falha ao atualizar região.");
        }
    };

    const handleDeleteRegion = async (regionId: number) => {
        if (!profileId) return;

        try {
            await api.delete(`/region-of-interest/${regionId}`);
            Alert.alert("Sucesso", "Região removida com sucesso!");
            await loadData();
        } catch (err: any) {
            console.error("Erro ao remover região:", err);
            Alert.alert("Erro", err.response?.data?.message || "Falha ao remover região.");
        }
    };

    if (loading) {
        return (
            <ContainerWithTitleAndSubtitle title="Editar Perfil de Investimento" subtitle="Carregando dados...">
                <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />
            </ContainerWithTitleAndSubtitle>
        );
    }

    return (
        <ScrollView>
            <ContainerWithTitleAndSubtitle
                title="Editar Perfil de Investimento"
                subtitle="Atualize seus dados de investimento e regiões de interesse"
            >
                <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                    <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Valor Inicial (R$)</Text>
                    <TextInput style={globalStyles.input} value={valueStart} onChangeText={setValueStart} keyboardType="numeric" />
                </View>

                <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                    <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Valor Máximo (R$)</Text>
                    <TextInput style={globalStyles.input} value={valueLimit} onChangeText={setValueLimit} keyboardType="numeric" />
                </View>

                <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                    <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Observações</Text>
                    <TextInput
                        style={[globalStyles.input, { height: 80 }]}
                        value={observation}
                        onChangeText={setObservation}
                        multiline
                        textAlignVertical="top"
                    />
                </View>

                <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                    <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Área (m²)</Text>
                    <TextInput style={globalStyles.input} value={meterSquare} onChangeText={setMeterSquare} keyboardType="numeric" />
                </View>

                <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                    <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Nº de Quartos</Text>
                    <TextInput style={globalStyles.input} value={bedroomNumber} onChangeText={setBedroomNumber} keyboardType="numeric" />
                </View>

                <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                    <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Nº de Vagas</Text>
                    <TextInput style={globalStyles.input} value={garageNumber} onChangeText={setGarageNumber} keyboardType="numeric" />
                </View>

                <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                    <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Método de Pagamento</Text>
                    {paymentMethods.map((pm) => (
                        <Pressable key={pm.id} style={globalStyles.checkboxContainer} onPress={() => togglePaymentMethod(pm.id)}>
                            <Check size={24} color={selectedPaymentMethodIds.includes(pm.id) ? "#1e90ff" : "#ccc"} />
                            <Text style={globalStyles.checkboxLabel}>{pm.name}</Text>
                        </Pressable>
                    ))}
                </View>

                <View style={[globalStyles.marginTop2, { width: "100%" }]}>
                    <Text style={[globalStyles.text3, { marginBottom: 10 }]}>Tipo de Imóvel</Text>
                    {propertyTypes.map((pt) => (
                        <Pressable key={pt.id} style={globalStyles.checkboxContainer} onPress={() => togglePropertyType(pt.id)}>
                            <Check size={24} color={selectedPropertyTypeIds.includes(pt.id) ? "#1e90ff" : "#ccc"} />
                            <Text style={globalStyles.checkboxLabel}>{pt.name}</Text>
                        </Pressable>
                    ))}
                </View>

                <Pressable
                    onPress={handleSubmitProfile}
                    disabled={submitting}
                    style={[globalStyles.submitButton, globalStyles.marginTop2, submitting && { opacity: 0.6 }]}
                >
                    {submitting ? <ActivityIndicator color="#fff" /> : <Text style={globalStyles.text3}>Salvar Perfil</Text>}
                </Pressable>

                <View style={[globalStyles.marginTop3, { width: "100%" }]}>
                    <Text style={[globalStyles.text2, { marginBottom: 10 }]}>Regiões de Interesse</Text>
                    {regions.map((region) => (
                        <View key={region.id} style={[globalStyles.card, { marginBottom: 15 }]}>
                            <TextInput
                                style={globalStyles.input}
                                value={region.state}
                                onChangeText={(txt) => setRegions((prev) => prev.map((r) => (r.id === region.id ? { ...r, state: txt } : r)))}
                                placeholder="Estado"
                                maxLength={2}
                            />
                            <TextInput
                                style={globalStyles.input}
                                value={region.city}
                                onChangeText={(txt) => setRegions((prev) => prev.map((r) => (r.id === region.id ? { ...r, city: txt } : r)))}
                                placeholder="Cidade"
                            />
                            <TextInput
                                style={globalStyles.input}
                                value={region.neighborhood}
                                onChangeText={(txt) =>
                                    setRegions((prev) => prev.map((r) => (r.id === region.id ? { ...r, neighborhood: txt } : r)))
                                }
                                placeholder="Bairro"
                            />

                            <Pressable
                                style={[globalStyles.submitButton, globalStyles.marginTop1]}
                                onPress={() => handleUpdateRegion(region.id, region.state, region.city, region.neighborhood)}
                            >
                                <Text style={globalStyles.text3}>Salvar Região</Text>
                            </Pressable>

                            <Pressable
                                style={[globalStyles.submitButton, { backgroundColor: "#ff4d4f", marginTop: 5 }]}
                                onPress={() => handleDeleteRegion(region.id)}
                            >
                                <Text style={globalStyles.text3}>Remover Região</Text>
                            </Pressable>
                        </View>
                    ))}
                </View>
            </ContainerWithTitleAndSubtitle>
        </ScrollView>
    )
}

export default EditInvestmentProfileForm
