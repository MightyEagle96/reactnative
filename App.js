import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import BackgroundImage from "./assets/background.jpg";
import ImageViewer from "./components/ImageViewer";
import ButtonComponent from "./components/ButtonComponent";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import backgroundImage from "./assets/background.jpg";

export default function App() {
  const [selectedImage, setSelectedImage] = useState(null);
  const [showAppOptions, setShowAppOptions] = useState(false);

  const pickImageAsync = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setShowAppOptions(true);
      setSelectedImage(result.assets[0].uri);
      // console.log(result);
    } else {
      alert("No image selected");
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImage={backgroundImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View />
      ) : (
        <View style={styles.footerContainer}>
          <ButtonComponent
            theme={"primary"}
            label={"Choose Photo"}
            onPress={pickImageAsync}
          />
          <ButtonComponent
            label={"Use this photo"}
            onPress={() => setShowAppOptions(true)}
          />
        </View>
      )}

      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#25292e",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: { flex: 1, paddingTop: 58 },

  image: { width: 320, height: 440, borderRadius: 18 },

  footerContainer: { flex: 1 / 3, alignItems: "center" },
});
