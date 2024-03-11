import { SetStateAction, useEffect, useState } from "react";
import {
  Text,
  View,
  ScrollView,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import styled from "styled-components/native";
import * as Location from "expo-location";
import { Daily } from "./type";
import { Fontisto } from "@expo/vector-icons";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const WEATHER_API = process.env.EXPO_PUBLIC_WEATHER_KEY;
const icons: Record<string, keyof typeof Fontisto.glyphMap> = {
  Clouds: "cloudy",
  Clear: "day-sunny",
  Atmosphere: "cloudy-gusts",
  Snow: "snow",
  Rain: "rains",
  Drizzle: "rain",
  Thunderstorm: "lightning",
};

export default function App() {
  const [city, setCity] = useState<String | undefined>("Loading...");
  const [ok, setOk] = useState(true);
  const [days, setDays] = useState<Daily[]>([]);
  const getWeather = async () => {
    const { granted } = await Location.requestForegroundPermissionsAsync();
    if (!granted) {
      setOk(false);
    }
    const {
      coords: { latitude, longitude },
    } = await Location.getCurrentPositionAsync({ accuracy: 3 });
    const location = await Location.reverseGeocodeAsync(
      { latitude, longitude },
      { useGoogleMaps: false }
    );
    setCity(location[0].city?.toString());
    const res = await fetch(
      `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=alerts&appid=${WEATHER_API}&units=metric`
    );
    const json = await res.json();
    setDays(json.daily);
  };
  useEffect(() => {
    getWeather();
  }, []);
  return (
    <View className=" flex-1 bg-red-500">
      <View className=" flex-1 items-center justify-center">
        <Text className=" font-medium text-7xl">{city?.toString()}</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        {days.length === 0 ? (
          <Day SCREEN_WIDTH={SCREEN_WIDTH}>
            <ActivityIndicator color="white" size={"large"}></ActivityIndicator>
          </Day>
        ) : (
          days.map((v) => (
            <Day SCREEN_WIDTH={SCREEN_WIDTH} key={v.dew_point}>
              <View className=" flex flex-row items-center justify-between w-full">
                <Text className=" text-[140px] mt-[50]">
                  {parseFloat(v.temp.day.toString()).toFixed(1)}
                </Text>
                <Fontisto
                  name={icons[v.weather[0].main]}
                  size={68}
                  color="black"
                  className=" "
                />
              </View>
              <Text className=" text-[60px]">{v.weather[0].main}</Text>
              <Text className=" text-[20px]">{v.weather[0].description}</Text>
            </Day>
          ))
        )}
      </ScrollView>
    </View>
  );
}

type DayStyle = {
  SCREEN_WIDTH: number;
};
const Day = styled.View<DayStyle>`
  width: ${(props) => `${props.SCREEN_WIDTH}px`};
  padding-left: 24px;
  padding-right: 24px;
`;
