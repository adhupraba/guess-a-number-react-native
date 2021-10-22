import React from "react";
import { StyleSheet, Text, TextProps, TextStyle } from "react-native";

interface IBodyTextProps extends TextProps {
  style?: TextStyle;
}

const BodyText: React.FC<IBodyTextProps> = ({ style, children, ...props }) => {
  return (
    <Text {...props} style={{ ...styles.text, ...style }}>
      {children}
    </Text>
  );
};

export default BodyText;

const styles = StyleSheet.create({
  text: {
    fontFamily: "open-sans",
  },
});
