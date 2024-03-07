import { Text, View, ScrollView, Dimensions } from "react-native";
import styled from "styled-components/native";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function App() {
  return (
    <View className=" flex-1 bg-red-500">
      <View className=" flex-1 items-center justify-center">
        <Text className=" font-medium text-7xl">Seoul</Text>
      </View>
      <ScrollView
        pagingEnabled
        horizontal
        showsHorizontalScrollIndicator={false}
      >
        <Day SCREEN_WIDTH={SCREEN_WIDTH}>
          <Text className=" text-[178px] mt-[50]">27</Text>
          <Text className=" text-[60px] -mt-[30]">Sunny</Text>
        </Day>
        <Day SCREEN_WIDTH={SCREEN_WIDTH}>
          <Text className=" text-[178px] mt-[50]">27</Text>
          <Text className=" text-[60px] -mt-[30]">Sunny</Text>
        </Day>
        <Day SCREEN_WIDTH={SCREEN_WIDTH}>
          <Text className=" text-[178px] mt-[50]">27</Text>
          <Text className=" text-[60px] -mt-[30]">Sunny</Text>
        </Day>
      </ScrollView>
    </View>
  );
}

type DayStyle = {
  SCREEN_WIDTH: number;
};
const Day = styled.View<DayStyle>`
  width: ${(props) => `${props.SCREEN_WIDTH}px`};
  align-items: center;
`;
