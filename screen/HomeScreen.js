import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet, Text, View } from "react-native";
import {useEffect, useState} from "react";

const Item = ({name, onPress}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
  <Text style={styles.title}>{name}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({navigation}) => {
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

  const openDetail = (id) => {
    navigation.navigate('ItemDetailScreen', { itemId: id})
  }

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <ActivityIndicator style={styles.container}/>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => <Item name={item.name} onPress={() => openDetail(item.id)}/>}
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