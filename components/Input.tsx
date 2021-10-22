import React from "react";
import { StyleSheet, TextInput, TextInputProps, TextStyle } from "react-native";

interface IInputProps extends TextInputProps {
  style?: TextStyle;
}

const Input: React.FC<IInputProps> = ({ style, ...props }) => {
  return <TextInput {...props} style={{ ...styles.input, ...style }} />;
};

export default Input;

const styles = StyleSheet.create({
  input: {
    marginVertical: 20,
    borderBottomWidth: 1,
    borderColor: "gray",
  },
});
