import BodyText from "components/BodyText";
import Card from "components/Card";
import NumberContainer from "components/NumberContainer";
import TitleText from "components/TitleText";
import { colors } from "constants/colors";
import React from "react";
import { Button, Image, StyleSheet, View } from "react-native";

interface IGameOverScreenProps {
  guesses: number;
  selectedNum?: number;
  newGameHandler: () => void;
}

const GameOverScreen: React.FC<IGameOverScreenProps> = ({ guesses, selectedNum, newGameHandler }) => {
  return (
    <View style={styles.screen}>
      <Image source={require("assets/images/success.png")} style={styles.image} resizeMode="cover" />
      <TitleText style={styles.title}>Game Over!</TitleText>
      <Card style={styles.resultContainer}>
        <BodyText style={styles.subtitle}>The number you entered</BodyText>
        <NumberContainer number={selectedNum} />
      </Card>
      <Card style={styles.resultContainer}>
        <BodyText style={styles.subtitle}>Number of tries</BodyText>
        <NumberContainer number={guesses} />
      </Card>
      <View style={styles.buttonContainer}>
        <Button title="NEW GAME" color={colors.primary} onPress={newGameHandler} />
      </View>
    </View>
  );
};

export default GameOverScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: "space-evenly",
    alignItems: "center",
    position: "relative",
  },
  image: {
    width: "100%",
    height: "100%",
    position: "absolute",
    top: 0,
    left: 0,
  },
  title: {
    fontSize: 36,
    color: "gray",
  },
  resultContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
  subtitle: {
    marginTop: 10,
    fontSize: 16,
    color: "gray",
    textAlign: "center",
  },
  buttonContainer: {
    width: "80%",
  },
});
