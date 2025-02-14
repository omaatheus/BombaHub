import { BottomTabBarProps } from '@react-navigation/bottom-tabs';
import { View, Text, TouchableOpacity, LayoutAnimationAnim, LayoutChangeEvent } from 'react-native';
import { styles } from './styles';
import { IconUser, IconBook, IconBrandSafari } from '@tabler/icons-react-native';
import { colors } from '@/src/styles/colors';
import { TabBarButton } from '../TabBarButton';
import { useState } from 'react';
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from 'react-native-reanimated';

function MyTabBar({ state, descriptors, navigation }: BottomTabBarProps) {
    const [dimensions, setDimensions] = useState({height: 20, width: 100})

    const buttonWidth = dimensions.width / state.routes.length

    const onTabbarLayout = (e:LayoutChangeEvent) => {
        setDimensions({
            height: e.nativeEvent.layout.height,
            width: e.nativeEvent.layout.width
        })
    }

    const tabPositionX = useSharedValue(0)
    const animatedStyle = useAnimatedStyle(() => {
        return {
            transform: [{
                translateX: tabPositionX.value
            }]
        }
    })

    return (
        <View onLayout={onTabbarLayout} style={styles.tabbar}>
                <Animated.View style={[animatedStyle, {
                    position: "absolute",
                    backgroundColor: colors.blue.base,
                    borderRadius: 30,
                    marginHorizontal: 12,
                    height: dimensions.height - 15,
                    width: buttonWidth -25
                }]} />
            {state.routes.map((route, index) => {
                const { options } = descriptors[route.key];
                const isFocused = state.index === index;
                const label = options.tabBarLabel ?? options.title ?? route.name;

                const onPress = () => {
                    tabPositionX.value = withSpring(buttonWidth * index, {duration: 1500})
                    const event = navigation.emit({
                        type: 'tabPress',
                        target: route.key,
                        canPreventDefault: true,
                    });

                    if (!isFocused && !event.defaultPrevented) {
                        navigation.navigate(route.name, route.params);
                    }
                };

                const onLongPress = () => {
                    navigation.emit({
                        type: 'tabLongPress',
                        target: route.key,
                    });
                };

                return (

                    <TabBarButton 
                    key={route.name}
                        onPress={onPress}
                        onLongPress={onLongPress}
                        isFocused={isFocused}
                        routeName={route.name}
                        color={isFocused ? '#fff' : '#222'}
                        label={label}
                    />

                );
            })}
        </View>
    );
}

export default MyTabBar;
