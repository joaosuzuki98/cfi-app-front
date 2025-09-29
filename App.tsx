import React, { useEffect, useState } from 'react'
import { ActivityIndicator, View } from 'react-native'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { Home, User, Gavel, Briefcase } from 'lucide-react-native'

import Login from './src/screens/auth/Login'
import Dashboard from './src/screens/admin/Dashboard'
import Profile from './src/screens/admin/Profile'
import Opportunity from './src/screens/admin/Opportunity'
import Customers from './src/screens/admin/Customers'

const Stack = createNativeStackNavigator()
const Tab = createBottomTabNavigator()

function BottomTabs({ setUser, user }) {
    return (
        <Tab.Navigator
            screenOptions={{
                headerShown: false,
                tabBarStyle: { backgroundColor: '#17171C' },
                tabBarActiveTintColor: '#4ADE80',
                tabBarInactiveTintColor: '#A1A1AA',
            }}
        >
            <Tab.Screen
                name="Dashboard"
                component={Dashboard}
                options={{ tabBarLabel: 'Início', tabBarIcon: ({ color }) => <Home color={color} size={22} /> }}
            />
            <Tab.Screen
                name="Opportunities"
                component={Opportunity}
                options={{ tabBarLabel: 'Oportunidades', tabBarIcon: ({ color }) => <Briefcase color={color} size={22} /> }}
            />
            <Tab.Screen
                name="Auctions"
                component={Profile}
                options={{ tabBarLabel: 'Arrematações', tabBarIcon: ({ color }) => <Gavel color={color} size={22} /> }}
            />

            {user.userType === 'CUSTOMER' ? (
                <Tab.Screen
                    name="Profile"
                    component={(props) => <Profile {...props} setUser={setUser} />}
                    options={{ tabBarLabel: 'Perfil', tabBarIcon: ({ color }) => <User color={color} size={22} /> }}
                />
            ) : (
                <Tab.Screen
                    name="Clients"
                    component={Customers}
                    options={{ tabBarLabel: 'Clientes', tabBarIcon: ({ color }) => <User color={color} size={22} /> }}
                />
            )}
        </Tab.Navigator>
    )
}

export default function App() {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        async function checkUser() {
            try {
                const userJson = await AsyncStorage.getItem('user')
                if (userJson) setUser(JSON.parse(userJson))
            } catch (err) {
                console.error('Erro ao ler usuário:', err)
            } finally {
                setLoading(false)
            }
        }

        checkUser()
    }, [])

    if (loading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="#4ADE80" />
            </View>
        )
    }

    return (
        <NavigationContainer>
            <Stack.Navigator screenOptions={{ headerShown: false }}>
                {!user ? (
                    <Stack.Screen name="Login">
                        {(props) => <Login {...props} setUser={setUser} />}
                    </Stack.Screen>
                ) : (
                    <Stack.Screen name="AppTabs">
						{(props) => <BottomTabs {...props} setUser={setUser} user={user} />}
					</Stack.Screen>
                )}
            </Stack.Navigator>
        </NavigationContainer>
    )
}