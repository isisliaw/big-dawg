import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import { useState } from 'react';
import colors from '@/src/styles/themes/colors';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/app/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

const logo = require("@/assets/images/logo.png");

type NavigationProps = NativeStackNavigationProp<RootStackParamList>;

export default function TabLayout() {
  const [isModalVisible, setModalVisible] = useState(false);
  const navigation = useNavigation<NavigationProps>();

  const doPlusClick = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const navigateTo = (route: keyof RootStackParamList) => {
    navigation.navigate(route); // Navigate using the route parameter
    closeModal();
  };

  return (
      <>
        <Tabs
          screenOptions={{
            tabBarActiveTintColor: colors.ACTIVE_TAB_TINT,
            headerStyle: {
              backgroundColor: colors.HEADER_COLOR,
            },
            headerShadowVisible: false,
            header: ({ navigation, route, options }) => (
              <View style={styles.headerContainer}>
                <View style={styles.header}>
                  <View style={styles.headerContent}>
                    <Image source={logo} style={styles.logo} />
                    <Text style={styles.headerTitle}>BIG DAWG</Text>
                  </View>
                </View>
              </View>
            ),
            tabBarStyle: {
              backgroundColor: colors.TAB_TINT_COLOR,
              borderTopRightRadius: 20,
              borderTopLeftRadius: 20,
              overflow: "hidden",
              position: "absolute",
            },
            tabBarHideOnKeyboard: true,
          }}
        >
          <Tabs.Screen
            name="index"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "home-sharp" : "home-outline"} color={color} size={24} />
              ),
              title: "Home",
            }}
          />
          <Tabs.Screen
            name="search"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "search-sharp" : "search-outline"} color={color} size={24} />
              ),
              title: 'Search',
            }}
          />
          {/* Custom "+" Button */}
          <Tabs.Screen
            name="plus"
            options={{
              tabBarButton: () => (
                <Pressable style={styles.plusButton} onPress={doPlusClick}>
                  <Ionicons name="add-circle" size={50} color="#5f067d" />
                </Pressable>
              ),
              tabBarLabel: () => null,
            }}
          />
          <Tabs.Screen
            name="calendar"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "calendar-sharp" : "calendar-outline"} size={24} color={color} />
              ),
              title: 'Calendar',
            }}
          />
          <Tabs.Screen
            name="WorkoutPreset"
            options={{
              tabBarIcon: ({ color, focused }) => (
                <Ionicons name={focused ? "fitness-sharp" : "fitness-outline"} size={24} color={color} />
              ),
              title: 'Presets'
            }}
          />
          <Tabs.Screen
            name='add-exercise'
            options={{
              href: null,
            }}
          />
        </Tabs>
  
        {/* Dropdown Menu Modal */}
        <Modal visible={isModalVisible} transparent animationType="fade">
          <View style={styles.modalOverlay}>
            <View style={styles.modalContent}>
              {/* Dropdown Buttons */}
              <Pressable style={styles.modalButton} onPress={() => navigateTo('WorkoutPreset')}>
                <Text style={styles.modalButtonText}>+ Choose workout preset</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={() => console.log("New exercise")}>
                <Text style={styles.modalButtonText}>+ New exercise</Text>
              </Pressable>
              <Pressable style={styles.modalButton} onPress={() => console.log("New timer")}>
                <Text style={styles.modalButtonText}>+ New timer</Text>
              </Pressable>
  
              {/* Close Button */}
              <Pressable style={[styles.modalButton, styles.closeButton]} onPress={closeModal}>
                <Text style={[styles.modalButtonText, styles.closeButtonText]}>Close</Text>
              </Pressable>
            </View>
          </View>
          </Modal>
        </>
      );
  }

const styles = StyleSheet.create({
  headerContainer: {
    backgroundColor: "#1a002e",
  },
  header: {
    backgroundColor: "#e6d5ff",
    paddingTop: 60,
    paddingBottom: 15,
    borderBottomLeftRadius: 20,
    borderBottomRightRadius: 20,
  },
  headerContent: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 20,
    height: 50,
  },
  logo: {
    width: 45,
    height: 45,
    resizeMode: "contain",
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4a0072",
    marginLeft: 12,
  },
  plusButton: {
    position: "absolute",
    bottom: -10,
    alignSelf: "center",
    zIndex: 10,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    width: "80%",
    backgroundColor: "#e6d5ff",
    borderRadius: 15,
    paddingVertical: 20,
    alignItems: "center",
  },
  modalButton: {
    backgroundColor: "#5f067d",
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 10,
    marginVertical: 8,
    width: "90%",
    alignItems: "center",
  },
  modalButtonText: {
    color: "#ffffff",
    fontSize: 18,
    fontWeight: "bold",
  },
  closeButton: {
    backgroundColor: '#d3d3d3', // Light gray background color
    marginTop: 20,             // Add some space above the close button
  },
  closeButtonText:{
    opacity:1,                 // Set opacity to 1 to make the text fully visible
    color: '#333',           // Dark text color for better readability
  },
});
