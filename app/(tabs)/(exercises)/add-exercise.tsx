import { useRouter, useLocalSearchParams } from 'expo-router';
import { View, Text, Pressable, StyleSheet } from 'react-native';

export default function AddExerciseModal() {
  const router = useRouter();
  const { exerciseName } = useLocalSearchParams<{ exerciseName?: string }>();

  return (
    <View style={styles.modalContainer}>
      <Text style={styles.headerText}>Add Exercise</Text>
      <Text>Exercise: {exerciseName || "No exercise selected"}</Text>

      <Pressable style={styles.closeButton} onPress={() => router.replace('../search')}>
        <Text style={styles.buttonText}>Back to Search</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  modalContainer: { flex: 1, backgroundColor: "white", padding: 20 },
  headerText: { fontSize: 24, fontWeight: "bold" },
  closeButton: { marginTop: 20, padding: 10, backgroundColor: "gray", borderRadius: 5 },
  buttonText: { color: "white", textAlign: "center" }
});