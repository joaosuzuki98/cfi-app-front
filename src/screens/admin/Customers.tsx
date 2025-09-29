import { useState, useEffect } from "react";
import { View, ActivityIndicator, Pressable, Text, Alert } from 'react-native';
import Layout from './Layout';
import { globalStyles } from '../../styles/styles';
import api from "../../api/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

import CustomerList from '../../components/admin/CustomersList';
import CustomerForm from '../../components/admin/CustomerForm';

function Customers({ setUser }) {
    const [customers, setCustomers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        async function fetchCustomers() {
            try {
                const response = await api.get("/customer");
                const customerList = response.data._embedded?.customerWithInvestmentProfileResponseList || [];
                setCustomers(customerList);
            } catch (err) {
                console.error("Erro ao buscar clientes:", err);
            } finally {
                setLoading(false);
            }
        }
        fetchCustomers();
    }, []);

    const handleCustomerAdded = (newCustomer) => {
        setCustomers(prev => [newCustomer, ...prev]);
    };

    const handleLogout = async () => {
        try {
            await AsyncStorage.removeItem('user');
            setUser(null);
        } catch (err) {
            console.error('Erro ao sair: ', err);
            Alert.alert('Erro', 'Não foi possível sair da conta');
        }
    };

    if (loading) {
        return (
            <View style={[globalStyles.flex1, { justifyContent: "center", alignItems: "center" }]}>
                <ActivityIndicator size="large" color="#4ADE80" />
            </View>
        );
    }

    return (
        <Layout title='Clientes'>
            <View style={globalStyles.marginTop3}>
                <CustomerList customers={customers} />
                <CustomerForm onCustomerAdded={handleCustomerAdded} />

                <Pressable
                    style={[globalStyles.marginTop3, {borderColor: '#303036', borderWidth: 1, borderRadius: 8, padding: 12, width: '100%'}]}
                    onPress={handleLogout}
                >
                    <Text style={{color: '#FAFAFA', textAlign: 'center'}}>Sair da conta</Text>
                </Pressable>
            </View>
        </Layout>
    );
}

export default Customers;
