import { ReactNode } from "react"
import { globalStyles } from "../styles/styles"
import { View } from "react-native"

type ContainerProp = {
    children: ReactNode
}

function Container({ children }: ContainerProp) {
    return (
        <View style={globalStyles.container}>
            { children }
        </View>
    )
}

export default Container
