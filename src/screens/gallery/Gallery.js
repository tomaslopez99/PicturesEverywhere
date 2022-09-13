import React from 'react';
import {
  Button,
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {useStorage} from '../../hooks/useStorage';
import {Routes} from '../../navigation/Routes';

const Gallery = () => {
  const [pictures] = useStorage('pictures', []);
  const navigation = useNavigation();

  return (
    <View style={styles.root}>
      <FlatList
        numColumns={3}
        keyExtractor={(item, index) => index.toString()}
        data={pictures}
        style={styles.imageContainer}
        renderItem={({item}) => (
          <TouchableOpacity
            style={styles.imageContainerStyle}
            onPress={() =>
              navigation.navigate(Routes.Picture, {picture: item})
            }>
            <Image
              style={styles.image}
              resizeMode="cover"
              source={{uri: item.uri}}
            />
          </TouchableOpacity>
        )}
        ListEmptyComponent={
          <Text style={styles.noImagesText}>
            Gallery is empty, take your first picture!
          </Text>
        }
      />
      <View style={styles.button}>
        <Button
          onPress={() => navigation.navigate(Routes.Camera)}
          title="Take Picture"
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    flex: 1,
  },
  noImagesText: {
    textAlign: 'center',
    marginTop: 30,
    fontSize: 16,
  },
  imageContainer: {
    margin: 3,
  },
  imageContainerStyle: {
    flex: 1,
    margin: 6,
  },
  image: {
    height: 130,
    width: '100%',
  },
  button: {
    marginVertical: 10,
    width: '40%',
    borderRadius: 12,
    alignSelf: 'center',
  },
});

export default Gallery;
