import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, TouchableOpacity, ScrollView, StyleSheet, TextInput } from 'react-native';
import { styles } from '@/src/styles/globalStyles';
import colors from '@/src/styles/themes/colors';
import { useState } from 'react';

const WorkoutInput = () => {
  type SetField = 'reps' | 'weight';
  const [sets, setSets] = useState([{ id: 1, reps: "", weight: "", key:""}]); // Initial set

  // Function to handle input changes
  const handleInputChange = (text: string, index: number, field: string, key: string) => {
    const newSets = [...sets];
    newSets[index][field as SetField] = text.replace(/[^0-9]/g, ""); // Only allow numbers
    setSets(newSets);
  };

  // Function to add a new set
  const addSet = () => {
    setSets([...sets, { id: sets.length + 1, reps: "", weight: "", key: `${sets.length + 1}-${Date.now()}`}]);
  };

  // Function to remove a set
  const removeSet = (index: number) => {
    const newSets = sets.filter((_, i) => i !== index);
    setSets(newSets);
  };

  return (
    <View style = {localStyles.container}>
      <ScrollView>
        <Text style={styles.headerText}>Workout Tracker</Text>

        {sets.map((set, index) => (
          <View key={set.key} style={styles.container}>
            <Text style={styles.headerText}>Set {index + 1}</Text>

            {/* Reps Input */}
            <TextInput
              style={styles.input}
              placeholder="Reps"
              value={set.reps}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange(text, index, "reps", set.key)}
            />

            {/* Weight Input */}
            <TextInput
              style={styles.input}
              placeholder="Weight (lbs/kg)"
              value={set.weight}
              keyboardType="numeric"
              onChangeText={(text) => handleInputChange(text, index, "weight", set.key)}
            />

            {/* Remove Button (Only show if there's more than one set) */}
            {sets.length > 1 && (
              <TouchableOpacity style={styles.button} onPress={() => removeSet(index)}>
                <Text style={styles.buttonText}>Remove Set</Text>
              </TouchableOpacity>
            )}
          </View>
        ))}

        {/* Add Set Button */}
        <TouchableOpacity style={styles.button} onPress={addSet}>
          <Text style={styles.buttonText}>➕ Add Another Set</Text>
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default WorkoutInput;

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_COLOR,
    justifyContent: 'flex-start',
    alignItems: 'stretch',
    paddingBottom: '20%',
  },
  setContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
  subSetContainer: {
    flex: 1,
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 10,
  },
});