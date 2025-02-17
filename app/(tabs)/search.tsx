import React, { useState } from 'react';
import { Text, View, TextInput, FlatList, StyleSheet, Pressable } from 'react-native';
import colors from '@/src/styles/themes/colors';
import { styles } from '@/src/styles/globalStyles';

export default function SearchScreen() {
    const [query, setQuery] = useState('');
    const [filteredExercises, setFilteredExercises] = useState<string[]>(exercises);
    const [filteredWorkouts, setFilteredWorkouts] = useState<string[]>(workouts);

  const handleSearch = (text: string) => {
    setQuery(text);
    const filteredExercises = exercises.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    const filteredWorkouts = workouts.filter(item =>
      item.toLowerCase().includes(text.toLowerCase())
    );
    setFilteredExercises(filteredExercises);
    setFilteredWorkouts(filteredWorkouts);
  };

  return (
    <View style={styles.container}>
      <Text style={localStyles.headerText}>Search for an exercise:</Text>
      
      <TextInput
        style={localStyles.input}
        placeholder="Search..."
        value={query}
        onChangeText={handleSearch}
      />
      
      <View style={styles.searchContainer}>
        {/* List of exercises */}
        <FlatList
            data={filteredExercises}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.searchItem}>{item}</Text>}
            contentContainerStyle={{ gap: 10 }}
            style={styles.flatList}
            ListHeaderComponent={<Text style={styles.text}>Exercises</Text>}
        />
        {/* List of workouts */}
        <FlatList
            data={filteredWorkouts}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => <Text style={styles.searchItem}>{item}</Text>}
            contentContainerStyle={{ gap: 10 }}
            style={styles.flatList}
            ListHeaderComponent={<Text style={styles.text}>Workouts</Text>}
        />
      </View>

      <View style={localStyles.addButtonContainer}>
        <Pressable 
        style={localStyles.addButton}
        onPress={() => alert('Event to add a new excercise')}>
            <Text style={localStyles.addButtonText}>Add a new exercise</Text>
        </Pressable>

        <Pressable 
        style={localStyles.addButton}
        onPress={() => alert('Event to add a new workout')}>
            <Text style={localStyles.addButtonText}>Add a new workout</Text>
        </Pressable>
      </View>
    </View>
  );
}

const exercises = ['Bench Press', 'Chest Press', 'Incline Bench', 'Bicep Curl', 'Ab Crunch', 'Squats', 'Leg Curl'];
const workouts = ['Push', 'Pull', 'Legs', 'Full Body', 'Upper Body', 'Lower Body', 'Core'];

const localStyles = StyleSheet.create({
  input: {
    height: 40,
    width: '96%',
    backgroundColor: colors.BUTTON_COLOR,
    borderWidth: 1,
    padding: 10,
    marginBottom: 20,
    color: colors.BUTTON_TEXT,
    borderRadius: 10,
  },
  headerText: {
    justifyContent: 'flex-start',
    alignSelf: 'flex-start',
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.WHITE,
    padding: 10,
    paddingLeft: 20,
  },
  addButtonContainer: {
    flex: 0.2,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    bottom: '14%',
  },
  addButton: {
    flex: 1,
    backgroundColor: colors.BUTTON_COLOR,
    padding: 10,
    borderRadius: 20,
    marginHorizontal: 5,
    justifyContent: 'center',
  },
  addButtonText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: colors.BUTTON_TEXT,
    textAlign: 'center',
  },
});