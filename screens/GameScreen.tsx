import React, { useState, useRef, useEffect } from "react";
import Card from "components/Card";
import NumberContainer from "components/NumberContainer";
import { colors } from "constants/colors";
import { Alert, StyleSheet, View } from "react-native";
import BodyText from "components/BodyText";
import { MaterialIcons } from "@expo/vector-icons";

interface IGameScreenProps {
  userChoice: number;
  gameOverHandler: (numRounds: number) => void;
}

const generateRandomBetween = (min: number, max: number, exclude: number): number => {
  min = Math.ceil(min);
  max = Math.floor(max);
  const rand = Math.floor(Math.random() * (max - min)) + min;
  if (rand === exclude) {
    return generateRandomBetween(min, max, exclude);
  } else {
    return rand;
  }
};

const GameScreen: React.FC<IGameScreenProps> = ({ userChoice, gameOverHandler }) => {
  const currentLow = useRef(1);
  const currentHight = useRef(100);

  const [currentGuess, setCurrentGuess] = useState<number>(generateRandomBetween(1, 100, userChoice));
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    if (currentGuess === userChoice) {
      gameOverHandler(count);
    }
  }, [currentGuess, userChoice]);

  const nextGuessHandler = (direction: "lower" | "greater") => {
    if (
      (direction === "lower" && currentGuess < userChoice) ||
      (direction === "greater" && currentGuess > userChoice)
    ) {
      Alert.alert("Don't lie!", "You know that this is wrong...", [{ text: "Sorry!", style: "cancel" }]);
      return;
    }

    if (direction === "lower") {
      currentHight.current = currentGuess;
    } else {
      currentLow.current = currentGuess + 1;
    }
    const nextNumber = generateRandomBetween(currentLow.current, currentHight.current, currentGuess);
    setCurrentGuess(nextNumber);
    setCount((prevState) => prevState + 1);
  };

  return (
    <View style={styles.screen}>
      <BodyText style={{ fontSize: 15 }}>Opponent's Guess</BodyText>
      <NumberContainer number={currentGuess} />
      <Card style={styles.buttonContainer}>
        <MaterialIcons
          name="arrow-circle-down"
          size={64}
          color={colors.secondary}
          onPress={() => nextGuessHandler("lower")}
        />
        <MaterialIcons
          name="arrow-circle-up"
          size={64}
          color={colors.primary}
          onPress={() => nextGuessHandler("greater")}
        />
      </Card>
    </View>
  );
};

export default GameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  buttonContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
  },
});
