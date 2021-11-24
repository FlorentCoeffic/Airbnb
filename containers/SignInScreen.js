import React, { useState } from "react";
import { useNavigation } from "@react-navigation/core";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
// import axios from "axios";

import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  Image,
} from "react-native";
// import { useState } from "react/cjs/react.production.min";

export default function SignInScreen({ setToken }) {
  const navigation = useNavigation();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <KeyboardAwareScrollView>
      <View style={styles.test}>
        <View style={styles.presentation}>
          <Image
            style={styles.logo}
            source={require("../assets/logo-airbnb.png")}
          />
          <Text style={{ color: "grey", fontSize: 20 }}> Sign in</Text>
        </View>

        <View style={styles.background}>
          <TextInput
            onChangeText={(text) => {
              setEmail(text);
            }}
            style={styles.input}
            placeholder="email"
          />
          <TextInput
            style={styles.input}
            onChangeText={(text) => {
              setPassword(text);
            }}
            placeholder="password"
            secureTextEntry={true}
          />

          <View style={styles.links}>
            <TouchableOpacity
              style={styles.button}
              onPress={async () => {
                const userToken = "secret-token";
                setToken(userToken);
              }}
            >
              <Text style={{ color: "grey", fontSize: 16 }}>Sign in</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.navigate("SignUp");
              }}
            >
              <Text style={styles.signupLink}>No account ? Register</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      {/* <Text>{email}</Text>
      <Text>{password}</Text> */}
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 100,
    resizeMode: "contain",
    marginTop: 50,
  },

  presentation: {
    alignItems: "center",
    marginBottom: 80,
  },
  test: { backgroundColor: "white" },
  background: {
    margin: 20,
  },
  input: {
    borderStyle: "solid",
    borderBottomColor: "#ED8086",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 30,
  },

  links: { alignItems: "center" },
  button: {
    borderStyle: "solid",
    borderColor: "#ED646B",
    borderWidth: 3,
    borderRadius: 25,
    alignItems: "center",
    width: 180,
    padding: 10,
    marginTop: 50,
  },

  signupLink: {
    color: "grey",
    marginTop: 30,
    marginBottom: 50,
  },
});
