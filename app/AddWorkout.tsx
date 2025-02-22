import React, { useState } from "react";
import {
  Text,
  View,
  TextInput,
  Pressable,
  StyleSheet,
  ScrollView,
} from "react-native";
import { useRouter } from "expo-router";
import colors from "@/src/styles/themes/colors";
import { styles } from "@/src/styles/globalStyles";

export default function AddWorkoutScreen() {
  const router = useRouter();
  const [workoutName, setWorkoutName] = useState("");
  const [selectedDays, setSelectedDays] = useState<string[]>([]);

  const daysOfWeek = ["S", "M", "T", "W", "Th", "F", "Sa"];

  const toggleDay = (day: string) => {
    setSelectedDays((prevDays) => {
      return prevDays.includes(day)
        ? prevDays.filter((d) => d !== day)
        : [...prevDays, day];
    });
  };

  return (
    <View style={localStyles.container}>
      <ScrollView contentContainerStyle={localStyles.scrollContainer}>
        {/* Header */}
        <Text style={localStyles.header}>Create a New Workout</Text>

        {/* Workout Name Input */}
        <TextInput
          style={localStyles.input}
          placeholder="Workout Name"
          placeholderTextColor={colors.BUTTON_TEXT}
          value={workoutName}
          onChangeText={setWorkoutName}
        />

        {/* Auto-repetition Days */}
        <Text style={localStyles.subHeader}>Auto-repetition:</Text>
        <View style={localStyles.daysContainer}>
          {daysOfWeek.map((day) => (
            <Pressable
              key={day}
              style={[
                localStyles.dayButton,
                selectedDays.includes(day) && localStyles.dayButtonSelected,
              ]}
              onPress={() => toggleDay(day)}
              hitSlop={20}
            >
              <Text style={localStyles.dayText}>{day}</Text>
            </Pressable>
          ))}
        </View>

        {/* Add Exercise Section */}
        <Text style={localStyles.subHeader}>Exercises:</Text>
        <Pressable
          style={localStyles.addExerciseButton}
          onPress={() => router.push("/search")}
        >
          <Text style={localStyles.addExerciseText}>+ Add Exercise</Text>
        </Pressable>
      </ScrollView>

      {/* Save Workout Button */}
      <View style={localStyles.saveButtonContainer}>
        <Pressable style={localStyles.saveButton}>
          <Text style={localStyles.saveButtonText}>Save Workout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_COLOR,
    padding: 20,
  },
  scrollContainer: {
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: 100,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    color: colors.WHITE,
    marginBottom: 20,
    marginTop: 20,
  },
  subHeader: {
    fontSize: 18,
    color: colors.WHITE,
    marginTop: 10,
    marginBottom: 5,
  },
  input: {
    width: "100%",
    backgroundColor: colors.BUTTON_COLOR,
    borderRadius: 10,
    padding: 10,
    color: colors.BUTTON_TEXT,
    marginBottom: 15,
  },
  daysContainer: {
    flexDirection: "row",
    justifyContent: "center",
    gap: 10,
    marginBottom: 20,
  },
  dayButton: {
    padding: 10,
    borderRadius: 8,
    backgroundColor: colors.BUTTON_COLOR,
  },
  dayButtonSelected: {
    backgroundColor: colors.BUTTON_TEXT,
  },
  dayText: {
    fontSize: 16,
    fontWeight: "bold",
    color: colors.BUTTON_TEXT,
  },
  addExerciseButton: {
    backgroundColor: colors.BUTTON_COLOR,
    padding: 10,
    borderRadius: 10,
    marginBottom: 20,
    width: "100%",
    alignItems: "center",
  },
  addExerciseText: {
    textAlign: "center",
    fontSize: 18,
    fontWeight: "bold",
    color: colors.BUTTON_TEXT,
  },
  saveButtonContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    padding: 10,
    backgroundColor: colors.BACKGROUND_COLOR,
  },
  saveButton: {
    backgroundColor: "#ff00ff",
    padding: 15,
    borderRadius: 10,
    alignItems: "center",
  },
  saveButtonText: {
    fontSize: 20,
    fontWeight: "bold",
    textAlign: "center",
    color: colors.WHITE,
  },
});
