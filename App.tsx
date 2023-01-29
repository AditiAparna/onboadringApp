import React, {useEffect, useState} from 'react';
import {SafeAreaView} from 'react-native';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import SplashScreen from 'react-native-splash-screen';
import SuccessScreen from './src/SuccessScreen';
import UserDetails from './src/UserDetails';
import VerificationScreen from './src/VerificationScreen';

const App = () => {
  const [page, setPage] = useState(1);

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  const handleNext = () => {
    if (page === 3) {
      setPage(1);
    } else {
      setPage(page + 1);
    }
    return;
  };

  const getCurrentPage = () => {
    switch (page) {
      case 1:
        return <UserDetails onNext={handleNext} />;
      case 2:
        return <VerificationScreen onNext={handleNext} />;
      case 3:
        return <SuccessScreen onNext={handleNext} />;
      default:
        return null;
    }
  };

  return (
    <SafeAreaView className="flex">
      <KeyboardAwareScrollView>{getCurrentPage()}</KeyboardAwareScrollView>
    </SafeAreaView>
  );
};

export default App;
