import { useRef, useEffect } from "react";
import { StatusBar } from "react-native";
import {
  useFonts,
  Inter_400Regular,
  Inter_600SemiBold,
  Inter_700Bold,
  Inter_900Black,
} from "@expo-google-fonts/inter";
import * as Notifications from "expo-notifications";
import { Subscription } from "expo-modules-core";

import { Background, Loading } from "./src/components";

import { Routes } from "./src/routes";

import { getPushNotificationToken } from "./src/services/getPushNotificationToken";

export default function App() {
  const getPushNotificationListener = useRef<Subscription>();
  const responseNotificationListener = useRef<Subscription>();
  useEffect(() => {
    getPushNotificationToken();
  }, []);
  useEffect(() => {
    getPushNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((notifications) =>
        console.log(notifications)
      );
    responseNotificationListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      if (
        getPushNotificationListener.current &&
        responseNotificationListener.current
      ) {
        Notifications.removeNotificationSubscription(
          getPushNotificationListener.current
        );
        Notifications.removeNotificationSubscription(
          responseNotificationListener.current
        );
      }
    };
  }, []);
  const [fontsLoaded] = useFonts({
    Inter_400Regular,
    Inter_600SemiBold,
    Inter_700Bold,
    Inter_900Black,
  });
  return (
    <Background>
      <StatusBar
        barStyle="light-content"
        backgroundColor="transparent"
        translucent
      />
      {fontsLoaded ? <Routes /> : <Loading />}
    </Background>
  );
}
