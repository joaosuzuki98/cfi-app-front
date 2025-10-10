import { View } from "react-native"
import { globalStyles } from "../styles/styles"
import { ReactNode } from "react"

type CircleIconProp = {
    icon: ReactNode
    backgroundColor: string,
    size: number
}

function CircleIcon({ icon, backgroundColor, size }: CircleIconProp) {
    const borderRadiusSize = size / 2
    return (
        <View style={[globalStyles.iconContainer, {backgroundColor: backgroundColor, height: size, width: size, borderRadius: borderRadiusSize}]}>
            { icon }
        </View>
    )
}

export default CircleIcon
