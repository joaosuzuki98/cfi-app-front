import { View, Text } from "react-native"
import Container from "./Container"
import { ReactNode } from "react"
import { globalStyles } from "../styles/styles"

type ContainerWithTitleAndSubtitleProp = {
    title: string
    subtitle: string
    children: ReactNode
}

function ContainerWithTitleAndSubtitle({ title, subtitle, children }: ContainerWithTitleAndSubtitleProp) {
    return (
        <Container>
            <View style={{ alignItems: 'flex-start', width: '100%' }}>
                <Text style={globalStyles.heading2}>
                    { title }
                </Text>
                <Text style={globalStyles.altText}>
                    { subtitle }
                </Text>

                { children }
            </View>
        </Container>
    )
}

export default ContainerWithTitleAndSubtitle