import React from 'react';
import {Image, View, Text, Button, StyleSheet} from 'react-native';
import ImgToBase64 from 'react-native-image-base64';
import Share from 'react-native-share';
import {useRoute} from '@react-navigation/native';

const Picture = () => {
  const route = useRoute();
  const picture = route.params.picture;

  if (!picture) {
    return null;
  }

  const shareImage = async () => {
    const base64Image = await ImgToBase64.getBase64String(picture.uri);
    try {
      await Share.open({
        title: 'Sharing image from Pictures Everywhere',
        message: 'Hey! Take a look at the picture I captured.',
        url: `data:image/jpeg;base64,${base64Image}`,
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View style={styles.container}>
      <Image style={styles.image} source={{uri: picture?.uri || ''}} />
      <Text>
        Picture location: [{picture?.location?.latitude},{' '}
        {picture?.location.longitude}]
      </Text>
      <Button onPress={shareImage} title="Share" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  image: {
    height: '90%',
    width: '100%',
  },
});

export default Picture;
