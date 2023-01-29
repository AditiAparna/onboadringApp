import {View, Text, TextInput, Pressable} from 'react-native';
import React, {useRef, useState} from 'react';

export default function InputOtp({
  otp,
  setOtp,
}: {
  otp: string;
  setOtp: (value: string) => void;
}) {
  const inputRef = useRef<any>(null);
  const [arr, setArr] = useState(new Array(4).fill(''));
  const handleViewPress = () => {
    inputRef.current.focus();
  };

  const handleBlur = () => {
    inputRef.current.blur();
  };
  const handleOnChange = (value: string) => {
    const newArr = arr;
    if (value.length < otp.length) {
      newArr[value.length] = '';
    } else {
      newArr[value.length - 1] = value.slice(-1);
    }
    setArr(newArr);
    return setOtp(value);
  };

  return (
    <View className="w-4/5 flex flex-row justify-between">
      <>
        <TextInput
          ref={inputRef}
          className=" w-0 h-0 justify-center text-center opacity-0 "
          value={otp}
          onChangeText={handleOnChange}
          keyboardType="numeric"
          maxLength={4}
        />
        {arr.map((value, index) => {
          return (
            <Pressable
              key={`${value}-${index}`}
              onPress={handleViewPress}
              onBlur={handleBlur}
              className={`h-10 w-10 border border-black justify-center items-center ${
                otp.length === index ? 'bg-white' : 'bg-gray-400'
              }`}>
              <Text className="text-lg text-black">{value}</Text>
            </Pressable>
          );
        })}
      </>
    </View>
  );
}
