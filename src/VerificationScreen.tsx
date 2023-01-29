import {View, Text, Pressable, Image, ToastAndroid} from 'react-native';
import React, {useState} from 'react';
import InputOtp from './components/InputOtp';
import PDFViewer from './components/PDFViewer';

export default function VerificationScreen({onNext}: {onNext: () => void}) {
  const [otp, setOtp] = useState<string>('');

  return (
    <View className="flex h-screen justify-center pr-10 pl-10 bg-white">
      <Text className="text-black text-3xl font-black">Step 2</Text>
      <Text className="text-black text-lg mb-3">Please enter OTP</Text>
      <View className="flex h-4/5 w-full ">
        <PDFViewer />
      </View>
      <View className="bg-blue-800 h-52 bottom-0 absolute w-screen pl-10 pr-10 pt-7">
        <Text className="text-white text-xl font-black mb-5">Enter OTP</Text>
        <View className="flex flex-row justify-between">
          <InputOtp otp={otp} setOtp={setOtp} />
          <Pressable
            onPress={onNext}
            disabled={otp.length === 4 ? false : true}
            className={`h-10 w-10 rounded-full bg-white justify-center items-center ${
              otp.length !== 4 && 'opacity-70'
            }`}>
            <Image source={require('../assets/send.png')} className="h-7 w-7" />
          </Pressable>
        </View>
        <Text className="text-white text-sm mb-0.5 mt-4">
          Didn't get the OTP yet?
        </Text>
        <Pressable
          onPress={() => ToastAndroid.show('OTP Sent', ToastAndroid.SHORT)}>
          <Text className="text-white text-md mb-3 font-extrabold">RESEND</Text>
        </Pressable>
      </View>
    </View>
  );
}
