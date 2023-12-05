import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from "react";
import { View, StyleSheet } from "react-native";
import LoginForm from './components/LoginForm';
import HomeScreen from './screen/HomeScreen';
import Menu from './screen/Menu';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = (email, password) => {
    // Silakan gunakan API atau penyimpanan data yang aman untuk validasi login
    if (email === "admin@gmail.com" && password === "admin123") {
      setIsLoggedIn(true);
    }
  };

  return (
    <View style={styles.container}>
      {isLoggedIn ? <HomeScreen /> : <LoginForm onLogin={handleLogin} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});

export default App;
