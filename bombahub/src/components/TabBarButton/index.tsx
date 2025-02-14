import { colors } from "@/src/styles/colors";
import { IconBook, IconBrandSafari, IconUser } from "@tabler/icons-react-native";
import { Pressable, TouchableOpacity, Text } from "react-native";
import { styles } from "./style";
import Animated, {interpolate, useAnimatedStyle, useSharedValue, withSpring} from "react-native-reanimated"
import { useEffect } from "react";

export function TabBarButton({onPress, onLongPress, isFocused, routeName, color, label}
    : {onPress: any, onLongPress: any, isFocused: boolean, routeName: string, color: string, label: any}) 
    {

        const scale = useSharedValue(0)

        const icons = {
                home: (props: any) => <IconBook size={24} color={'#222'} {...props} />,
                search: (props: any) => <IconBrandSafari size={24} color={'#222'} {...props} />,
                profile: (props: any) => <IconUser size={24} color={'#222'} {...props} />,
            };
        
            useEffect(()=>{
                scale.value = withSpring(typeof isFocused === 'boolean' ? (isFocused ? 1 : 0 ) : isFocused, {duration: 350})
            }, [
                scale, isFocused
            ])

            const animatedTextStyle = useAnimatedStyle(() => {
                const opacity = interpolate(scale.value, [0, 1], [1, 0])    

                return {
                    opacity
                }
            })

            const animatedIconStyle = useAnimatedStyle(()=>{
                const scaleValue = interpolate(scale.value, [0, 1], [1, 1.2]);

                const top = interpolate(scale.value, [0,1], [0, 9])

                return {
                    transform: [{
                        scale: scaleValue
                    }],
                    top: top
                }
            })

    return (
  <Pressable
    onPress={onPress}
    onLongPress={onLongPress}
    style={styles.item}
  >
    <Animated.View style={animatedIconStyle}>
    {icons[routeName as keyof typeof icons] &&
      icons[routeName as keyof typeof icons]({
        color: isFocused ? '#fff' : "#222",
      })}
    </Animated.View>
    <Animated.Text style={[{ color: isFocused ? colors.blue.base : "#222", fontSize: 12 }, animatedTextStyle]}>
      {label}
    </Animated.Text>
  </Pressable>
    

    )
}
