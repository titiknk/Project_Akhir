import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";

const Menu = () => {
    return (
        <View style={Styles.container}>
            <Text>Menu</Text>
            <StatusBar style="auto"/>
        </View>
    );
}

export const Styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default Menu;