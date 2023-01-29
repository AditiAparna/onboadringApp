import {View, Text, Image, Animated, Pressable} from 'react-native';
import React, {useRef} from 'react';

export default function SuccessScreen({onNext}: {onNext: () => void}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const pulsate = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 1.2,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
    ]).start(() => pulsate());
  };

  pulsate();

  return (
    <View className="bg-green-700 h-screen w-full flex justify-center items-center">
      <Animated.View
        style={{
          transform: [{scale: fadeAnim}],
        }}>
        <View className="bg-green-500 rounded-full h-32 w-32 flex justify-center items-center">
          <Pressable onPress={onNext}>
            <View className="h-20 w-20 flex justify-center items-center rounded-full bg-white">
              <Image
                source={require('../assets/checkmark.png')}
                className="h-10 w-10"
              />
            </View>
          </Pressable>
        </View>
      </Animated.View>
      <Text className="text-white text-2xl font-sans mt-10">
        Onboarding Successfull
      </Text>
    </View>
  );
}
