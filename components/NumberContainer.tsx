import React from "react";
import { StyleSheet } from "react-native";
import { colors } from "constants/colors";
import TitleText from "./TitleText";

interface INumberContainerProps {
  number?: number;
}

const NumberContainer: React.FC<INumberContainerProps> = ({ number }) => {
  return <TitleText style={styles.chosenText}>{number}</TitleText>;
};

export default NumberContainer;

const styles = StyleSheet.create({
  chosenText: {
    marginVertical: 10,
    fontSize: 40,
    textAlign: "center",
    textTransform: "uppercase",
    color: colors.secondary,
  },
});
