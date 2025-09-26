import * as React from 'react'
import { createStaticNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Dashboard from './src/screens/admin/Dashboard'
import Profile from './src/screens/admin/Profile'

const RootStack = createNativeStackNavigator({
	initialRouteName: 'AdminDashboard',
	screenOptions: {
		headerShown: false
	},
	screens: {
		AdminDashboard: {
			screen: Dashboard
		},
		AdminProfile: {
			screen: Profile
		}
	},
})

const Navigation = createStaticNavigation(RootStack);

export default function App() {
	return <Navigation />
}