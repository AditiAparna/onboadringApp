import {View, Text, Image, Pressable} from 'react-native';
import React, {useEffect, useState} from 'react';
import InputBox from './components/InputBox';
import {validateDOB} from './utils';

export default function UserDetails({onNext}: {onNext: Function}) {
  const [isValid, setIsValid] = useState<boolean>(false);
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [aadhaar, setAadhaar] = useState<string>('');
  const [pan, setPan] = useState<string>('');
  const [formattedDate, setFormattedDate] = useState<string>('');
  const [isNameValid, setIsNameValid] = useState<string>('');
  const [isEmailValid, setIsEmailValid] = useState<boolean>(false);
  const [isAadhaarValid, setIsAadhaarValid] = useState<boolean>(false);
  const [isPanValid, setIsPanValid] = useState<boolean>(false);
  const [isDateValid, setIsDateValid] = useState<boolean>(false);

  const handleValidation = (
    value: string,
    regex: RegExp,
    setValidState: Function,
  ) => {
    const checkResult = regex.test(value);
    setValidState(checkResult);
    return checkResult;
  };

  useEffect(() => {
    if (
      isEmailValid &&
      isAadhaarValid &&
      isPanValid &&
      isDateValid &&
      isNameValid
    ) {
      setIsValid(true);
    } else {
      setIsValid(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, aadhaar, pan, formattedDate, name]);

  const handleAadhaarFormat = (text: string) => {
    let value = text.replace(/\s/g, '');
    value = value.replace(/(\d{4})(?=\d)/g, '$1 ');
    setAadhaar(value);
  };

  const handleDateChange = (text: string) => {
    setIsDateValid(validateDOB(text));
    let value = text;
    if (value.indexOf('/') === value.lastIndexOf('/')) {
      if (value.length > 2 && value[2] !== '/') {
        value = value.substring(0, 2) + '/' + value.substring(2);
      }
      if (value.length > 5 && value[5] !== '/') {
        value = value.substring(0, 5) + '/' + value.substring(5);
      }
    }
    setFormattedDate(value);
  };

  return (
    <View className="flex h-screen justify-center pr-10 pl-10 bg-white">
      <Image
        source={require('../assets/logo.png')}
        className="h-20 w-20 flex mt-10 mb-8"
      />
      <Text className="text-black text-3xl font-black">Step 1</Text>
      <Text className="text-black text-lg mb-3">Please enter your details</Text>
      <InputBox
        title="Shop Owner Name"
        description="Enter shop owner name"
        onChangeText={setName}
        regCheck={/\S+/}
        handleValidation={handleValidation}
        setValidState={setIsNameValid}
      />
      <InputBox
        title="Email Address"
        description="abcdefg@gmail.com"
        handleValidation={handleValidation}
        regCheck={/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/}
        onChangeText={setEmail}
        setValidState={setIsEmailValid}
      />
      <InputBox
        title="Aadhaar Number"
        description="1234 5678 0123"
        handleValidation={handleValidation}
        regCheck={/^\d{4}\s\d{4}\s\d{4}$/}
        onChangeText={handleAadhaarFormat}
        setValidState={setIsAadhaarValid}
        maxLength={14}
        keyboardType="numeric"
        value={aadhaar}
      />
      <InputBox
        title="Pan Number"
        description="ABCDE1234F"
        handleValidation={handleValidation}
        regCheck={/^[A-Za-z]{5}\d{4}[A-Za-z]{1}$/}
        onChangeText={setPan}
        setValidState={setIsPanValid}
        maxLength={10}
        autoCapitalize="characters"
      />
      {isPanValid && (
        <>
          <InputBox
            title="Enter D.O.B (DD/MM/YYYY)"
            description="DD/MM/YYYY"
            onChangeText={handleDateChange}
            maxLength={10}
            autoCapitalize="characters"
            keyboardType="numeric"
            value={formattedDate}
            className={`${
              formattedDate.length > 0 &&
              (!isDateValid ? 'border-red-500' : 'border-green-500')
            }`}
          />
        </>
      )}
      <Pressable
        className={` h-10 rounded-md flex justify-center items-center ${
          isValid ? 'bg-blue-800' : 'bg-gray-200'
        }`}
        disabled={!isValid}
        onPress={() => onNext()}>
        <Text
          className={`font-bold text-lg${
            isValid ? ' text-white' : ' text-stone-500'
          }`}>
          Continue
        </Text>
      </Pressable>
    </View>
  );
}
