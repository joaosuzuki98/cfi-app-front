import { ReactNode } from 'react'
import { View, Text } from 'react-native'
import { globalStyles } from '../../styles/styles'

type LayoutProp = {
    children: ReactNode
    title: string
}

function Layout({ children, title }: LayoutProp) {
    return (
        <View style={globalStyles.mainContainer}>
            <Text style={{ fontWeight: "bold", fontSize: 20, color: "white" }}>{ title }</Text>
            <View>
                { children }
            </View>
        </View>
    )
}

export default Layout
