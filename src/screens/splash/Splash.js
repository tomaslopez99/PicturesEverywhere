import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {images} from '../../assets/images';
import {Routes} from '../../navigation/Routes';

const SplashScreen = () => {
  const [authLoaded, setAuthLoaded] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      setAuthLoaded(true);
    }, 3000);
  }, []);

  useEffect(() => {
    if (authLoaded) {
      navigation.navigate(Routes.Gallery);
    }
  }, [authLoaded, navigation]);

  return (
    <View style={styles.root}>
      <Image style={styles.image} source={images.logo} />
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: 150,
    height: 150,
  },
});

export default SplashScreen;
