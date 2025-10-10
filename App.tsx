import * as React from 'react'
import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'
import Dashboard from './src/screens/admin/Dashboard'
import Profile from './src/screens/admin/Profile'
import { Home, User, Gavel, Briefcase } from 'lucide-react-native'

const Tab = createBottomTabNavigator()

const BottomTabs = () => {
	return (
		<Tab.Navigator
			screenOptions={{
				headerShown: false,
				tabBarStyle: {
					backgroundColor: '#17171C'
				},
				tabBarActiveTintColor: '#4ADE80',
				tabBarInactiveTintColor: '#A1A1AA'
			}}
		>
			<Tab.Screen
				name="Dashboard"
				component={Dashboard}
				options={{
					tabBarLabel: 'Início',
					tabBarIcon: ({ color }) => <Home color={color} size={22} />
				}}
			/>
			<Tab.Screen
				name="Opportunities"
				component={Dashboard}
				options={{
					tabBarLabel: 'Oportunidades',
					tabBarIcon: ({ color }) => <Briefcase color={color} size={22} />
				}}
			/>
			<Tab.Screen
				name="Auction"
				component={Dashboard}
				options={{
					tabBarLabel: 'Arrematações',
					tabBarIcon: ({ color }) => (
						<Gavel color={color} size={22} />
					),
				}}
			/>
			<Tab.Screen
				name="Profile"
				component={Profile}
				options={{
					tabBarLabel: 'Perfil',
					tabBarIcon: ({ color }) => <User color={color} size={22} />
				}}
			/>
		</Tab.Navigator>
	)
}

// const RootStack = createNativeStackNavigator({
// 	initialRouteName: 'AdminDashboard',
// 	screenOptions: {
// 		headerShown: false
// 	},
// 	screens: {
// 		AdminDashboard: {
// 			screen: Dashboard
// 		},
// 		AdminProfile: {
// 			screen: Profile
// 		}
// 	},
// })

// const Navigation = createStaticNavigation(RootStack)

export default function App() {
	return (
		<NavigationContainer>
			<BottomTabs />
		</NavigationContainer>
	)
}