import React, { useState } from "react";
import { StyleSheet, View, StatusBar } from "react-native";
import Header from "components/Header";
import StartGameScreen from "screens/StartGameScreen";
import GameScreen from "screens/GameScreen";
import GameOverScreen from "screens/GameOverScreen";
import * as Font from "expo-font";
import AppLoading from "expo-app-loading";

const fetchFonts = () => {
  return Font.loadAsync({
    "open-sans": require("assets/fonts/OpenSans-Regular.ttf"),
    "open-sans-bold": require("assets/fonts/OpenSans-Bold.ttf"),
  });
};

const App = () => {
  const [selectedNum, setSelectedNum] = useState<number | undefined>();
  const [numOfGuesses, setNumOfGuesses] = useState<number>(0);
  const [dataLoading, setDataLoaded] = useState<boolean>(false);

  if (!dataLoading) {
    return (
      <AppLoading
        startAsync={fetchFonts}
        onFinish={() => setDataLoaded(true)}
        onError={(error) => console.log(error)}
      />
    );
  }

  const startGameHandler = (userNum?: number) => {
    setSelectedNum(userNum);
    setNumOfGuesses(0);
  };

  const gameOverHandler = (numRounds: number) => {
    setNumOfGuesses(numRounds);
  };

  const newGameHandler = () => {
    setSelectedNum(undefined);
    setNumOfGuesses(0);
  };

  let content: JSX.Element = <StartGameScreen startGameHandler={startGameHandler} />;

  if (selectedNum && numOfGuesses <= 0) {
    content = <GameScreen userChoice={selectedNum} gameOverHandler={gameOverHandler} />;
  } else if (numOfGuesses > 0) {
    content = <GameOverScreen guesses={numOfGuesses} selectedNum={selectedNum} newGameHandler={newGameHandler} />;
  }

  return (
    <View style={styles.screen}>
      <StatusBar barStyle="light-content" backgroundColor="#b94366" />
      <Header title="Guess a Number" />
      {content}
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});
