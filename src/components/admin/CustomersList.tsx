import { useState, useEffect } from "react";
import { View, Text, TextInput, FlatList, Pressable, StyleSheet, Modal, ScrollView } from "react-native";
import { globalStyles } from "../../styles/styles";

function CustomerList({ customers }) {
    const [filteredCustomers, setFilteredCustomers] = useState([]);
    const [searchName, setSearchName] = useState('');
    const [searchEmail, setSearchEmail] = useState('');
    const [searchState, setSearchState] = useState('');
    const [searchCity, setSearchCity] = useState('');
    const [searchNeighborhood, setSearchNeighborhood] = useState('');
    const [searchValueStart, setSearchValueStart] = useState('');
    const [searchValueLimit, setSearchValueLimit] = useState('');
    const [searchGarageNumber, setSearchGarageNumber] = useState('');
    const [searchPaymentMethod, setSearchPaymentMethod] = useState('');
    const [searchPropertyType, setSearchPropertyType] = useState('');

    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 5;

    const [selectedCustomer, setSelectedCustomer] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const filtered = customers.filter(c => {
            const ip = c.investmentProfile;

            const matchName = c.name.toLowerCase().includes(searchName.toLowerCase());
            const matchEmail = c.email.toLowerCase().includes(searchEmail.toLowerCase());

            const matchState = !searchState || ip?.regionsOfInterest?.some(r => r.state.toLowerCase().includes(searchState.toLowerCase()));
            const matchCity = !searchCity || ip?.regionsOfInterest?.some(r => r.city.toLowerCase().includes(searchCity.toLowerCase()));
            const matchNeighborhood = !searchNeighborhood || ip?.regionsOfInterest?.some(r => r.neighborhood.toLowerCase().includes(searchNeighborhood.toLowerCase()));
            const matchValueStart = !searchValueStart || ip?.valueStart?.includes(searchValueStart);
            const matchValueLimit = !searchValueLimit || ip?.valueLimit?.includes(searchValueLimit);
            const matchGarageNumber = !searchGarageNumber || ip?.garageNumber?.toString() === searchGarageNumber;
            const matchPaymentMethod = !searchPaymentMethod || ip?.paymentMethods?.some(p => p.name.toLowerCase().includes(searchPaymentMethod.toLowerCase()));
            const matchPropertyType = !searchPropertyType || ip?.propertyTypes?.some(p => p.name.toLowerCase().includes(searchPropertyType.toLowerCase()));

            return matchName && matchEmail &&
                matchState && matchCity && matchNeighborhood &&
                matchValueStart && matchValueLimit &&
                matchGarageNumber && matchPaymentMethod && matchPropertyType;
        });

        setFilteredCustomers(filtered);
        setCurrentPage(1);
    }, [
        searchName, searchEmail,
        searchState, searchCity, searchNeighborhood,
        searchValueStart, searchValueLimit,
        searchGarageNumber, searchPaymentMethod, searchPropertyType,
        customers
    ]);

    const paginatedCustomers = filteredCustomers.slice((currentPage - 1) * pageSize, currentPage * pageSize);

    const openModal = (customer) => {
        setSelectedCustomer(customer);
        setModalVisible(true);
    };

    return (
        <View style={[globalStyles.flex1, { padding: 10 }]}>
            <ScrollView horizontal={false} showsVerticalScrollIndicator={false}>
                <View style={{ marginBottom: 10, flexDirection: "row", flexWrap: "wrap", gap: 5 }}>
                    <TextInput
                        style={[globalStyles.input, { flex: 1, minWidth: "48%" }]}
                        placeholder="Filtrar por nome"
                        value={searchName}
                        onChangeText={setSearchName}
                    />
                    <TextInput
                        style={[globalStyles.input, { flex: 1, minWidth: "48%" }]}
                        placeholder="Filtrar por email"
                        value={searchEmail}
                        onChangeText={setSearchEmail}
                    />
                    <TextInput
                        style={[globalStyles.input, { flex: 1, minWidth: "48%" }]}
                        placeholder="Filtrar por estado"
                        value={searchState}
                        onChangeText={setSearchState}
                    />
                    <TextInput
                        style={[globalStyles.input, { flex: 1, minWidth: "48%" }]}
                        placeholder="Filtrar por cidade"
                        value={searchCity}
                        onChangeText={setSearchCity}
                    />
                    <TextInput
                        style={[globalStyles.input, { flex: 1, minWidth: "48%" }]}
                        placeholder="Filtrar por bairro"
                        value={searchNeighborhood}
                        onChangeText={setSearchNeighborhood}
                    />
                    <TextInput
                        style={[globalStyles.input, { flex: 1, minWidth: "48%" }]}
                        placeholder="Valor Inicial"
                        value={searchValueStart}
                        onChangeText={setSearchValueStart}
                    />
                    <TextInput
                        style={[globalStyles.input, { flex: 1, minWidth: "48%" }]}
                        placeholder="Valor Limite"
                        value={searchValueLimit}
                        onChangeText={setSearchValueLimit}
                    />
                    <TextInput
                        style={[globalStyles.input, { marginTop: 5 }]}
                        placeholder="Vagas"
                        value={searchGarageNumber}
                        onChangeText={setSearchGarageNumber}
                    />
                    <TextInput
                        style={[globalStyles.input, { marginTop: 5 }]}
                        placeholder="Método de Pagamento"
                        value={searchPaymentMethod}
                        onChangeText={setSearchPaymentMethod}
                    />
                    <TextInput
                        style={[globalStyles.input, { marginTop: 5 }]}
                        placeholder="Tipo de Imóvel"
                        value={searchPropertyType}
                        onChangeText={setSearchPropertyType}
                    />
                </View>

                <View style={styles.tableHeader}>
                    <Text style={styles.cell}>Nome</Text>
                    <Text style={styles.cell}>Email</Text>
                    <Text style={styles.cell}>Telefone</Text>
                    <Text style={styles.cell}>Investimento</Text>
                </View>

                <FlatList
                    data={paginatedCustomers}
                    keyExtractor={(item) => item.id.toString()}
                    renderItem={({ item }) => (
                        <Pressable style={styles.tableRow} onPress={() => openModal(item)}>
                            <Text style={styles.cell}>{item.name}</Text>
                            <Text style={styles.cell}>{item.email}</Text>
                            <Text style={styles.cell}>{item.phone}</Text>
                            <Text style={styles.cell}>{item.investmentProfile ? "Sim" : "Não"}</Text>
                        </Pressable>
                    )}
                    ListEmptyComponent={
                        <Text style={{ color: "#aaa", textAlign: "center", marginTop: 20 }}>
                            Nenhum cliente encontrado
                        </Text>
                    }
                />

                <View style={styles.pagination}>
                    <Pressable
                        onPress={() => setCurrentPage(p => Math.max(p - 1, 1))}
                        style={[styles.pageButton, currentPage === 1 && { opacity: 0.5 }]}
                    >
                        <Text style={{ color: "#fff" }}>Anterior</Text>
                    </Pressable>
                    <Text style={{ color: "#fff", marginHorizontal: 10 }}>{currentPage}</Text>
                    <Pressable
                        onPress={() => setCurrentPage(p => (p * pageSize < filteredCustomers.length ? p + 1 : p))}
                        style={[styles.pageButton, currentPage * pageSize >= filteredCustomers.length && { opacity: 0.5 }]}
                    >
                        <Text style={{ color: "#fff" }}>Próximo</Text>
                    </Pressable>
                </View>
            </ScrollView>

            <Modal
                visible={modalVisible}
                animationType="slide"
                transparent={true}
                onRequestClose={() => setModalVisible(false)}
            >
                <View style={styles.modalBackground}>
                    <View style={styles.modalContainer}>
                        <ScrollView>
                            <Text style={styles.modalTitle}>{selectedCustomer?.name}</Text>
                            <Text style={styles.modalText}>Email: {selectedCustomer?.email}</Text>
                            <Text style={styles.modalText}>Telefone: {selectedCustomer?.phone}</Text>
                            <Text style={styles.modalText}>ID: {selectedCustomer?.id}</Text>

                            {selectedCustomer?.investmentProfile ? (
                                <>
                                    <Text style={[styles.modalTitle, { marginTop: 10 }]}>Perfil de Investimento</Text>
                                    <Text style={styles.modalText}>Valor Inicial: {selectedCustomer.investmentProfile.valueStart}</Text>
                                    <Text style={styles.modalText}>Valor Limite: {selectedCustomer.investmentProfile.valueLimit}</Text>
                                    <Text style={styles.modalText}>Observação: {selectedCustomer.investmentProfile.observation}</Text>
                                    <Text style={styles.modalText}>Área: {selectedCustomer.investmentProfile.meterSquare} m²</Text>
                                    <Text style={styles.modalText}>Quartos: {selectedCustomer.investmentProfile.bedroomNumber}</Text>
                                    <Text style={styles.modalText}>Vagas: {selectedCustomer.investmentProfile.garageNumber}</Text>
                                    <Text style={styles.modalText}>
                                        Métodos de Pagamento: {selectedCustomer.investmentProfile.paymentMethods.map(p => p.name).join(", ")}
                                    </Text>
                                    <Text style={styles.modalText}>
                                        Tipos de Imóvel: {selectedCustomer.investmentProfile.propertyTypes.map(p => p.name).join(", ")}
                                    </Text>

                                    {selectedCustomer.investmentProfile.regionsOfInterest?.length > 0 ? (
                                        <>
                                            <Text style={[styles.modalTitle, { marginTop: 10 }]}>Regiões de Interesse</Text>
                                            {selectedCustomer.investmentProfile.regionsOfInterest.map((region, index) => (
                                                <Text key={index} style={styles.modalText}>
                                                    {region.city}, {region.state} - {region.neighborhood}
                                                </Text>
                                            ))}
                                        </>
                                    ) : (
                                        <Text style={styles.modalText}>Sem regiões de interesse cadastradas</Text>
                                    )}
                                </>
                            ) : (
                                <Text style={styles.modalText}>Sem perfil de investimento</Text>
                            )}

                            <Pressable
                                onPress={() => setModalVisible(false)}
                                style={[styles.pageButton, { alignSelf: "center", marginTop: 15 }]}
                            >
                                <Text style={{ color: "#fff" }}>Fechar</Text>
                            </Pressable>
                        </ScrollView>
                    </View>
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    tableHeader: {
        flexDirection: "row",
        borderBottomWidth: 1,
        borderBottomColor: "#4ADE80",
        paddingBottom: 5,
        marginBottom: 5,
    },
    tableRow: {
        flexDirection: "row",
        paddingVertical: 8,
        borderBottomWidth: 1,
        borderBottomColor: "#303036",
    },
    cell: {
        flex: 1,
        color: "#FAFAFA",
        fontSize: 12,
    },
    pagination: {
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        marginTop: 15,
    },
    pageButton: {
        paddingHorizontal: 15,
        paddingVertical: 8,
        backgroundColor: "#09622A",
        borderRadius: 5,
    },
    modalBackground: {
        flex: 1,
        backgroundColor: "rgba(0,0,0,0.7)",
        justifyContent: "center",
        alignItems: "center",
    },
    modalContainer: {
        width: "90%",
        maxHeight: "80%",
        backgroundColor: "#17171C",
        borderRadius: 12,
        padding: 20,
    },
    modalTitle: {
        fontSize: 18,
        fontWeight: "bold",
        color: "#4ADE80",
        marginBottom: 5,
    },
    modalText: {
        fontSize: 14,
        color: "#FAFAFA",
        marginBottom: 3,
    },
});

export default CustomerList;
