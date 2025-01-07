import {Image, Text, View} from 'react-native'
import { styles } from './style'

const img = require('@/src/assets/logo.png')

export function Welcome() {
    return (
        <View>
            <Image source={img} style={styles.logo} />

            <Text style={styles.title}>Boas Vindas ao BombaHub!</Text>
            <Text style={styles.subtitle}>Tenha um catálogo completo de bombas industriais e de saneamento na palma da sua mão.</Text>
        </View>
        
    )
}