import { View, Text, TouchableOpacity, FlatList } from "react-native";

import styles from "./tabs.style";
import { SIZES } from "../../../constants";

const TabButton = ({ name, activeTab, onHandleSearchTab }) => (
  <TouchableOpacity
   onPress={onHandleSearchTab}
   style={styles.btn(name, activeTab)}>
    <Text style={styles.btnText(name,activeTab)}>{name}</Text>
  </TouchableOpacity>
);
const Tabs = ({ tabs, activeTab, setActiveTab }) => {
  return (
    <View style={styles.container}>
      <FlatList
        data={tabs}
        keyExtractor={(item) => item}
        renderItem={({ item }) => (
          <TabButton
            name={item}
            activeTab={activeTab}
            onHandleSearchTab={() => {
              setActiveTab(item);
            }}
          />
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ columnGap: SIZES.small }}
      />
    </View>
  );
};

export default Tabs;
