import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable, StyleSheet, TextInput } from 'react-native';
import { styles } from '@/src/styles/globalStyles';
import colors from '@/src/styles/themes/colors';
import { useState } from 'react';

export default function AddExerciseModal() {
  const router = useRouter();
  const { exerciseName } = useLocalSearchParams<{ exerciseName?: string }>();
  const [repAmount, setReps] = useState('');
  const [weight, setWeight] = useState('');
  const sets = 1;

  const handleTextChange = (text: string, field: 'reps' | 'weight') => {
    const numericValue = text.replace(/[^0-9]/g, '');
  
    if (field === 'reps') {
      setReps(numericValue);
    } else if (field === 'weight') {
      setWeight(numericValue);
    }
  };

  return (
    <View style={localStyles.container}>
      <Text style={[styles.headerText, {}]}>Add Exercise: {exerciseName || "No exercise selected"}</Text>
      <Text style={styles.subHeaderText}>Set {sets}</Text>
        <View style={localStyles.setContainer}>
          <View style={localStyles.subSetContainer}>
          <Text style={styles.subHeaderText}>Reps</Text>
            <TextInput
                style={styles.input}
                placeholder="Reps"
                value={repAmount}
                onChangeText={(text) => handleTextChange(text, 'reps')}
                keyboardType='numeric'
            />
          </View>
          <View style={localStyles.subSetContainer}>
          <Text style={styles.subHeaderText}>Weight</Text>
            <TextInput
                style={styles.input}
                placeholder="Weight (lbs)"
                value={weight}
                onChangeText={(text) => handleTextChange(text, 'weight')}
                keyboardType='numeric'
            />
          </View>
        </View>
      <Pressable style={[styles.button, {width: '90%',}]} onPress={() => router.replace('../search')}>
        <Text style={styles.buttonText}>Back to Search</Text>
      </Pressable>
    </View>
  );
}

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.BACKGROUND_COLOR,
    paddingTop: 20,
    justifyContent: 'flex-start',
    alignItems: 'center',
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