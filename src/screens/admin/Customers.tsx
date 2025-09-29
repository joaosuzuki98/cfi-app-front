import { useState, useEffect } from "react";
import { View, ActivityIndicator } from 'react-native';
import Layout from './Layout';
import { globalStyles } from '../../styles/styles';
import api from "../../api/api";

import CustomerList from '../../components/admin/CustomersList';
import CustomerForm from '../../components/admin/CustomerForm';

function Customers() {
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
            </View>
        </Layout>
    );
}

export default Customers;
