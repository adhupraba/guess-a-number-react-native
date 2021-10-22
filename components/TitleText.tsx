import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

interface ITitleTextProps extends TextProps {
  style?: TextStyle;
}

const TitleText: React.FC<ITitleTextProps> = ({ style, children, ...props }) => {
  return (
    <Text {...props} style={{ ...styles.text, ...style }}>
      {children}
    </Text>
  );
};

export default TitleText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans-bold",
  },
});
