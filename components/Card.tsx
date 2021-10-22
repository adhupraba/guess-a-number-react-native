import React from "react";
import { StyleSheet, View, ViewStyle } from "react-native";

interface ICardProps {
  style?: ViewStyle;
  children?: React.ReactChild | React.ReactChild[];
}

const Card: React.FC<ICardProps> = ({ style, children }) => {
  return <View style={{ ...styles.card, ...style }}>{children}</View>;
};

export default Card;

const styles = StyleSheet.create({
  card: {
    borderRadius: 10,
    backgroundColor: "white",
    padding: 20,
    // --- ios ---
    shadowColor: "black",
    shadowOffset: {
      height: 2,
      width: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 2,
    // --- android ---
    elevation: 10,
  },
});
