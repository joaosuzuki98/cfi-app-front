import { ReactNode } from 'react'
import { View, ScrollView } from 'react-native'
import { globalStyles } from '../../styles/styles'

type LayoutProp = {
    children: ReactNode
}

function Layout({ children }: LayoutProp) {
    return (
        <View style={globalStyles.blackBgContainer}>
            <ScrollView showsVerticalScrollIndicator={false}>
                { children }
            </ScrollView>
        </View>
    )
}

export default Layout
