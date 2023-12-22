import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet, Text, View } from "react-native";
import React, {useEffect, useState} from "react";


const Item = ({name}) => (
  <View style={styles.item}>
    <Text style={styles.title}>{name}</Text>
  </View>
);

const HomeScreen = () => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  const getDatas = async () => {
    try {
      const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json');
      const json = await response.json();
      setData(json);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getDatas();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.container}/>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => <Item name={item.name} />}
          keyExtractor={item => item.id}
        />
      )}
    </SafeAreaView>
  );
}

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
container: {
  flex: 1,
  marginTop: StatusBar.currentHeight || 0,
},
item: {
  backgroundColor: '#6495ED',
  fontFamily: 'Poppins-Medium',
  padding: 20,
  marginVertical: 4,
  marginHorizontal: 16,
},
title: {
  fontSize: 32,
},
});

export default HomeScreen;