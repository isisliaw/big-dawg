import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import {
  BACKGROUND_COLOR,
  BUTTON_COLOR,
  BUTTON_TEXT,
} from "@/src/styles/themes/colors";

const WorkoutPreset = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [presets, setPresets] = useState([{ id: "1", name: "Arm Day 1" }]);

  const insets = useSafeAreaInsets();

  return (
    <View style={styles.container}>
      {/* Back Button */}
      <TouchableOpacity style={styles.backButton}>
        <Text style={styles.backButtonText}> &lt; Back </Text>
      </TouchableOpacity>

      {/* Title */}
      <Text style={styles.title}>Select a workout plan:</Text>

      {/* Search Bar & Filters */}
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search by name"
          placeholderTextColor="#aaa"
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <View style={styles.filters}>
          <Text style={styles.filter}>muscle</Text>
          <Text style={styles.filter}>equipment</Text>
          <TouchableOpacity>
            <Text style={styles.addFilter}> + </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Workout Preset List */}
      <FlatList
        data={presets}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.presetItem}>
            <Text style={styles.presetText}>{item.name}</Text>
          </TouchableOpacity>
        )}
      />

      {/* Create New Button */}
      <TouchableOpacity
        style={[styles.createButton, { bottom: insets.bottom + 60 }]}
      >
        <Text style={styles.createButtonText}>Create New Workout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: BACKGROUND_COLOR,
    padding: 20,
  },
  backButton: {
    marginTop: 8,
    paddingVertical: 6,
    paddingHorizontal: 12,
    backgroundColor: BUTTON_COLOR,
    borderRadius: 8,
    alignSelf: "flex-start",
  },
  backButtonText: {
    color: BUTTON_TEXT,
    fontSize: 14,
    fontWeight: "bold",
  },
  title: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
    marginTop: 15,
  },
  searchContainer: {
    marginTop: 12,
  },
  searchInput: {
    backgroundColor: "white",
    paddingVertical: 8,
    paddingHorizontal: 10,
    borderRadius: 8,
    fontSize: 13,
  },
  filters: {
    flexDirection: "row",
    marginTop: 10,
  },
  filter: {
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 6,
    marginRight: 6,
    color: BUTTON_TEXT,
    fontSize: 12,
    fontWeight: "bold",
  },
  addFilter: {
    color: "white",
    fontSize: 14,
    fontWeight: "bold",
  },
  presetItem: {
    marginTop: 10,
    backgroundColor: BUTTON_COLOR,
    padding: 12,
    borderRadius: 8,
    alignItems: "center",
  },
  presetText: {
    color: BUTTON_TEXT,
    fontSize: 13,
    fontStyle: "italic",
    fontWeight: "500",
  },
  createButton: {
    marginTop: 20,
    backgroundColor: BUTTON_COLOR,
    paddingVertical: 12,
    borderRadius: 10,
    alignItems: "center",
    position: "absolute",
    left: 20,
    right: 20,
  },
  createButtonText: {
    color: BUTTON_TEXT,
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default WorkoutPreset;
