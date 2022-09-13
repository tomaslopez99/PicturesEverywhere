import React from 'react';
import Splash from '../screens/splash/Splash';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {HeaderBackButton} from '@react-navigation/elements';
import Gallery from '../screens/gallery/Gallery';
import Camera from '../screens/camera/Camera';
import Picture from '../screens/picture/Picture';
import {Routes} from './Routes';

const Navigation = () => {
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{headerTitleAlign: 'center'}}>
        <Stack.Screen
          options={{headerShown: false}}
          name={Routes.Splash}
          component={Splash}
        />
        <Stack.Screen
          options={{headerBackVisible: false}}
          name={Routes.Gallery}
          component={Gallery}
        />
        <Stack.Screen name={Routes.Camera} component={Camera} />
        <Stack.Screen
          options={({navigation}) => ({
            headerLeft: props => (
              <HeaderBackButton
                {...props}
                onPress={() => {
                  navigation.navigate(Routes.Gallery);
                }}
              />
            ),
          })}
          name={Routes.Picture}
          component={Picture}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
