import { StyleSheet, View, Pressable, Text, Platform } from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { httpService } from "../httpService";

export default function ButtonComponent({ theme, label, onPress }) {
  const testServer = async () => {
    const { data, error } = await httpService(`version/${Platform.OS}`);

    if (data) {
      console.log(data);
    }
  };
  if (theme === "primary")
    return (
      <View
        style={{
          ...styles.buttonContainer,
          borderWidth: 4,
          borderColor: "#ffd33d",
          borderRadius: 18,
        }}
      >
        <Pressable
          style={[styles.button, { backgroundColor: "#fff" }]}
          onPress={onPress}
        >
          <FontAwesome
            name="picture-o"
            size={18}
            color="#25292e"
            style={styles.buttonIcon}
          />
          <Text style={{ ...styles.buttonLabel, color: "#25292e" }}>
            {label}
          </Text>
        </Pressable>
      </View>
    );
  return (
    <View style={styles.buttonContainer}>
      <Pressable style={styles.button} onPress={testServer}>
        <Text style={styles.buttonLabel}>{label}</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: 320,
    height: 70,
    marginHorizontal: 20,
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
  },
  button: {
    borderRadius: 10,
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  buttonIcon: {
    paddingRight: 8,
  },
  buttonLabel: {
    color: "#fff",
    fontSize: 16,
  },
});
