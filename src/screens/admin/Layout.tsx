import { ReactNode } from 'react'
import { View, Text, ScrollView } from 'react-native'
import { globalStyles } from '../../styles/styles'

type LayoutProp = {
    children: ReactNode
    title: string
}

function Layout({ children, title }: LayoutProp) {
    return (
        <View style={globalStyles.mainContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white", paddingBottom: 12 }}>{ title }</Text>
            <ScrollView showsVerticalScrollIndicator={false}>
                { children }
            </ScrollView>
        </View>
    )
}

export default Layout
