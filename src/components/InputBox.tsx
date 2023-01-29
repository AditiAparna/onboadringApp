import {View, Text, TextInput, Image, TextInputProps} from 'react-native';
import React, {useState} from 'react';

type Props = {
  title: string;
  description: string;
  handleValidation?: Function;
  regCheck?: RegExp;
  onChangeText: (text: string) => void;
  setValidState?: Function;
} & TextInputProps;

export default function InputBox({
  title,
  description,
  handleValidation,
  regCheck,
  onChangeText,
  setValidState,
  ...rest
}: Props) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>('');

  const handleInputChange = (text: string) => {
    setInputValue(text);
    if (handleValidation) {
      setIsValid(handleValidation(text, regCheck, setValidState));
    }
    onChangeText(text);
  };
  return (
    <View className="w-full mb-3 ">
      <Text className="text-xs mb-1 text-black font-light">{title}</Text>
      <View className=" w-full">
        <TextInput
          className={`border rounded-md border-gray-400 focus:border-black text-black focus:bg-gray-300 ${
            inputValue.length > 0 &&
            (!isValid && regCheck ? 'border-red-500' : 'border-green-500')
          }`}
          placeholder={`${description}`}
          underlineColorAndroid="transparent"
          onChangeText={handleInputChange}
          value={inputValue}
          {...rest}
        />
        {isValid && regCheck && title !== 'Shop Owner Name' && (
          <Image
            source={require('../../assets/checked.png')}
            className="h-6 w-6 flex z-10 absolute top-3 right-2"
          />
        )}
      </View>
      {!isValid && inputValue.length > 0 ? (
        <Text className="text-xs text-red-600">Please enter a valid value</Text>
      ) : (
        <></>
      )}
    </View>
  );
}
