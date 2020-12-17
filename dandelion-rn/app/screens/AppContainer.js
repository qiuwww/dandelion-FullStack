import React, { Component } from "react";
import { View, Text, Button } from "react-native";
import {
  createBottomTabNavigator,
  createStackNavigator,
  createAppContainer
} from "react-navigation";
import PersonalScreen from "./personal/index";
import MovieListScreen from "./movie/list";

class DetailsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Text>Details!</Text>
      </View>
    );
  }
}

class HomeScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* other code from before here */}
        <Button
          title="Go to Settings"
          onPress={() => this.props.navigation.navigate("Settings")}
        />
        <Button
          title="Go to MovieListScreen"
          onPress={() => this.props.navigation.navigate("MovieList")}
        />
      </View>
    );
  }
}

class SettingsScreen extends React.Component {
  render() {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        {/* other code from before here */}
        <Button
          title="Go to Details"
          onPress={() => this.props.navigation.navigate("Details")}
        />
      </View>
    );
  }
}

const HomeStack = createStackNavigator({
  Home: HomeScreen,
  Details: DetailsScreen,
  MovieList: MovieListScreen
});

const SettingsStack = createStackNavigator({
  Settings: SettingsScreen,
  Details: DetailsScreen
});
const initialRouteName = "Home";

export default createAppContainer(
  createBottomTabNavigator(
    {
      Home: HomeStack,
      Settings: SettingsStack,
      Personal: PersonalScreen
    },
    {
      /* Other configuration remains unchanged */
      initialRouteName: initialRouteName
    }
  )
);
