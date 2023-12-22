import { Text, View } from "react-native";

const ItemDetailScreen = ({route}) => {
    const {itemId} = route.params

    return (
        <View>
            <Text>Detail Data Wilayah Provinsi Indonesia: {itemId}</Text>
        </View>
    )
}

export default ItemDetailScreen