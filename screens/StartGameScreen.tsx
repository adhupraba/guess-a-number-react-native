import React, { useState } from "react";
import { Alert, Button, Dimensions, Keyboard, StyleSheet, TouchableWithoutFeedback, View } from "react-native";
import Card from "components/Card";
import Input from "components/Input";
import NumberContainer from "components/NumberContainer";
import { colors } from "constants/colors";
import BodyText from "components/BodyText";
import TitleText from "components/TitleText";

interface IStartGameScreenProps {
  startGameHandler: (userNum?: number) => void;
}

const StartGameScreen: React.FC<IStartGameScreenProps> = ({ startGameHandler }) => {
  const [enteredNum, setEnteredNum] = useState<string>("");
  const [confirmed, setConfirmed] = useState<boolean>(false);
  const [selectedNum, setSelectedNum] = useState<number | undefined>();

  const numInputHandler = (value: string) => {
    // anything that is not a number is replaced with empty string character
    setEnteredNum(value.replace(/[^0-9]/g, ""));
  };

  const resetHandler = () => {
    setEnteredNum("");
    setConfirmed(false);
    Keyboard.dismiss();
  };

  const confirmHandler = () => {
    let chosenNum = parseInt(enteredNum);
    if (isNaN(chosenNum) || chosenNum <= 0 || chosenNum > 99) {
      Alert.alert("Invalid number", "Number has to be a number between 1 and 99.", [
        { text: "Okay", style: "destructive", onPress: resetHandler },
      ]);
      return;
    }

    setConfirmed(true);
    setSelectedNum(chosenNum);
    setEnteredNum("");
    Keyboard.dismiss();
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.screen}>
        <TitleText style={styles.title}>Start a new game!</TitleText>
        <Card style={styles.inputContainer}>
          <BodyText>Select a number</BodyText>
          <Input
            style={styles.input}
            blurOnSubmit
            autoCapitalize="none"
            autoCorrect={false}
            keyboardType="number-pad"
            maxLength={2}
            value={enteredNum}
            onChangeText={numInputHandler}
          />
          <View style={styles.buttonContainer}>
            <View style={styles.button}>
              <Button title="Reset" color={colors.secondary} onPress={resetHandler} />
            </View>
            <View style={styles.button}>
              <Button title="Confirm" color={colors.primary} onPress={confirmHandler} />
            </View>
          </View>
        </Card>
        {confirmed && (
          <Card style={styles.startGameContainer}>
            <BodyText style={{ color: "black" }}>Chosen Number</BodyText>
            <NumberContainer number={selectedNum} />
            <View style={{ width: "100%" }}>
              <Button title="Start Game" color={colors.primary} onPress={() => startGameHandler(selectedNum)} />
            </View>
          </Card>
        )}
      </View>
    </TouchableWithoutFeedback>
  );
};

export default StartGameScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    padding: 10,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    marginVertical: 10,
  },
  inputContainer: {
    width: "80%",
    maxWidth: "90%",
    minWidth: 300,
    alignItems: "center",
  },
  input: {
    width: "25%",
    textAlign: "center",
  },
  buttonContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 10,
  },
  button: {
    width: Dimensions.get("window").width / 4,
  },
  startGameContainer: {
    width: 300,
    maxWidth: "80%",
    alignItems: "center",
    marginTop: 40,
  },
});
