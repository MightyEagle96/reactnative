import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, Image, Pressable } from "react-native";
import BackgroundImage from "./assets/background.jpg";
import ImageViewer from "./components/ImageViewer";
import ButtonComponent from "./components/ButtonComponent";
import * as ImagePicker from "expo-image-picker";
import React, { useState } from "react";
import backgroundImage from "./assets/background.jpg";
import IconButton from "./components/IconButton";
import CircleButton from "./components/CircleButton";
import EmojiPicker from "./components/EmojiPicker";

export default function App() {
  const [isModalVisible, setIsModalVisible] = useState(false);
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

  const onAddSticker = () => {
    setIsModalVisible(true);
  };
  const onModalClose = () => {
    setIsModalVisible(false);
  };

  const onSaveImageAsync = () => {};
  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <ImageViewer
          placeholderImage={backgroundImage}
          selectedImage={selectedImage}
        />
      </View>
      {showAppOptions ? (
        <View style={styles.optionsContainer}>
          <View style={styles.optionsRow}>
            <IconButton
              icon={"refresh"}
              label={"Reset"}
              onPress={() => setShowAppOptions(false)}
            />
            <CircleButton onPress={onAddSticker} />
            <IconButton
              icon={"save-alt"}
              label={"Save"}
              onPress={onSaveImageAsync}
            />
          </View>
        </View>
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

      <EmojiPicker
        isVisible={isModalVisible}
        onClose={onModalClose}
      ></EmojiPicker>
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

  optionsContainer: { position: "absolute", bottom: 80 },
  optionsRow: { alignItems: "center", flexDirection: "row" },
});
