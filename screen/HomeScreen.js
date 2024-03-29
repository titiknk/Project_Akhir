import { StatusBar } from "expo-status-bar";
import { ActivityIndicator, FlatList, Pressable, SafeAreaView, ScrollView, TouchableOpacity, TextInput, Modal, StyleSheet, Text, View, Alert } from "react-native";
import {useEffect, useState} from "react";

const Item = ({name, onPress}) => (
  <TouchableOpacity style={styles.item} onPress={onPress}>
  <Text style={styles.title}>{name}</Text>
  </TouchableOpacity>
);

const HomeScreen = ({navigation}) => {
  const [isLoading, setLoading] = useState(true);
  const [data, setData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);

  const [inputId] = useState('');
  const [inputName, setInputName] = useState('');
  const [search, setSearch] = useState('');

  const getDatas = async (id = '') => {
    try {
      const idQuery = (id !='') ? `?id=${id}` : ''
      const response = await fetch(`https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json${idQuery}`);
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

  const openDetail = (id, name) => {
    setInputId(id)
    setInputName(name)
    setModalVisible(true)
  }

  const addData = () => {
    setModalVisible(true)
  }

  const saveData = async () => {
    if (inputId == '') {
    try{
      const payload = {
        name: inputName,
        data: {
          id: 1,
          name: Pasel,
        }
      }
      const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json', {
        headers:{
          'Content-Type': 'application/json'
        },
        method: 'POST',
        body: JSON.stringify(payload)
      });
      const json = await response.json();
      console.log(json);
    } catch (error){
      console.error(error);
    } finally {
      setModalVisible(false)
      getDatas()
    }
  } else {
    try {
      const payload = {
        name: inputName,
        data: {
          id: 1,
          name: pasel,
      }
      }
      const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json' + inputId, {
        headers: {
          'Content-Type': 'application/json'
        },
        method: 'PUT',
        body: JSON.stringify(payload)
      });
      const json = await response.json();
      console.log(json);
    } catch (error) {
      console.error(error);
    } finally {
      setModalVisible(false)
      getDatas()
    }
  }
}

const removeData = async () => {
  try {
    const response = await fetch('https://www.emsifa.com/api-wilayah-indonesia/api/provinces.json' + inputId, {
      headers: {
        'Content-Type': 'application/json'
      },
      method: 'DELETE',
    });
    const json = await response.json();
  } catch (error) {
    console.error(error);
  } finally {
    setModalVisible(false)
    getDatas()
  }
}

const closeModal = () => {
  setModalVisible(false);
}

  const searchData = async (input) => {
    setSearch(input)
    await getDatas(input)
  }

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity style={styles.item} onPress={addData}>
        <Text style={styles.title}>+ Tambah Data Provinsi</Text>
      </TouchableOpacity>

      <TextInput 
        style={styles.input}
        onChangeText={searchData}
        value={search}
        placeholder="Search..."/>

      {isLoading ? (
        <ActivityIndicator style={styles.container}/>
      ) : (
        <FlatList
          data={data}
          renderItem={({item}) => <Item name={item.name} onPress={() => openDetail(item.id, item.name)} />}
          keyExtractor={item => item.id}
        />
      )}

      <Modal
      animationType="slide"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        Alert.alert('Modal has been closed.');
        setModalVisible(!modalVisible);
      }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.modalText}>Tambah Data Baru Provinsi</Text>
            <TextInput 
            style={styles.input}
            onChangeText={setInputName}
            value={inputName}/>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => saveData()}>
              <Text style={styles.textStyle}>Save</Text>

            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => removeData()}>
              <Text style={styles.textStyle}>Hapus</Text>
            </Pressable>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => closeModal()}>
              <Text style={styles.textStyle}>Close</Text>
            </Pressable>

          </View>
        </View>
      </Modal>
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
  padding: 20,
  marginVertical: 4,
  marginHorizontal: 16,
},
title: {
  fontSize: 32,
},
centeredView:{
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
  marginTop: 22,
},
modalView: {
  margin: 20,
  backgroundColor: 'white',
  borderRadius: 20,
  padding: 35,
  alignItems: 'center',
  shadowColor: '#000',
  shadowOffset: {
    width: 0,
    height: 2,
  },
  shadowOpacity: 0.25,
  shadowRadius: 4,
  elevation: 5,
},
button: {
  borderRadius: 20,
  padding: 10,
  elevation: 2,
},
buttonOpen: {
  backgroundColor: '#F194FF',
},
buttonClose: {
  backgroundColor: '#228B22',
},
textStyle: {
  color: 'black',
  fontWeight: 'bold',
  textAlign: 'center',
  
},
modalText: {
  marginBottom: 15,
  textAlign: 'center',
},
input: {
  height: 40,
  margin: 12,
  borderWidth: 1,
  padding: 10,
},
});

export default HomeScreen;