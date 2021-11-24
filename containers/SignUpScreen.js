import React from "react";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";

export default function SignUpScreen({ setToken }) {
  return (
    <KeyboardAwareScrollView>
      <View style={styles.body}>
        <View style={styles.presentation}>
          <Image
            style={styles.logo}
            source={require("../assets/logo-airbnb.png")}
          />
          <Text style={{ color: "grey", fontSize: 20 }}> Sign up</Text>
        </View>

        <View style={styles.inputs}>
          <TextInput style={styles.input} placeholder="email" />
          <TextInput style={styles.input} placeholder="username" />
          <TextInput
            style={styles.textArea}
            placeholder="Describe yourself in a few words..."
          />

          <TextInput
            style={styles.input}
            placeholder="password"
            secureTextEntry={true}
          />
          <TextInput
            style={styles.input}
            placeholder="confirm password"
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
              <Text style={{ color: "grey", fontSize: 16 }}>Sign up</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={async () => {
                const userToken = "secret-token";
                setToken(userToken);
              }}
            >
              <Text style={styles.signupLink}>
                Aleady have an account? Sign in
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </KeyboardAwareScrollView>
  );
}

const styles = StyleSheet.create({
  logo: {
    height: 150,
    width: 100,
    resizeMode: "contain",
    marginTop: 30,
  },

  presentation: {
    alignItems: "center",
    marginBottom: 50,
  },
  body: { backgroundColor: "white" },

  inputs: { margin: 20 },

  input: {
    borderStyle: "solid",
    borderBottomColor: "#ED8086",
    borderBottomWidth: 1,
    paddingBottom: 10,
    marginBottom: 30,
  },

  textArea: {
    height: 100,
    borderColor: "#ED8086",
    borderStyle: "solid",
    borderWidth: 1,
    marginBottom: 30,
    padding: 10,
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
