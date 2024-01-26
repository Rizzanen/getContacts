import { StatusBar } from "expo-status-bar";
import { FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import * as Contacts from "expo-contacts";
import { useState } from "react";

export default function App() {
  const [contacts, setContacts] = useState([]);

  const getContacts = async () => {
    const { status } = await Contacts.requestPermissionsAsync();
    if (status === "granted") {
      const { data } = await Contacts.getContactsAsync({
        fields: [Contacts.Fields.PhoneNumbers],
      });

      setContacts(data);
    }
  };

  return (
    <View style={styles.container}>
      <Pressable
        style={{
          backgroundColor: "blue",
          padding: 10,
          marginTop: 100,
        }}
        onPress={getContacts}
      >
        <Text style={{ color: "white" }}>Get Contacts</Text>
      </Pressable>

      <FlatList
        data={contacts}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <Text style>
            {item.firstName +
              " " +
              item.lastName +
              " puh: " +
              item.phoneNumbers[0].number}
          </Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
