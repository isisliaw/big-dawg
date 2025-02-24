import { Tabs } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import { View, Text, StyleSheet, Pressable, Modal } from "react-native";
import { Image } from "expo-image";
import { useState } from 'react';
import colors from '@/src/styles/themes/colors';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@/app/types';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { styles } from "@/src/styles/globalStyles";

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
                <Pressable style={localStyles.plusButton} onPress={doPlusClick}>
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
            name='(exercises)/new-exercise'
            options={{
              href: null,
            }}
          />
          <Tabs.Screen
            name='(exercises)/add-exercise'
            options={{
              href: null,
            }}
          />
        </Tabs>
  
        {/* Dropdown Menu Modal */}
        <Modal visible={isModalVisible} transparent animationType="fade">
          <View style={localStyles.modalOverlay}>
            <View style={localStyles.modalContent}>
              {/* Dropdown Buttons */}
              <Pressable style={localStyles.modalButton} onPress={() => navigateTo('WorkoutPreset')}>
                <Text style={localStyles.modalButtonText}>+ Choose workout preset</Text>
              </Pressable>
              <Pressable style={localStyles.modalButton} onPress={() => console.log("New exercise")}>
                <Text style={localStyles.modalButtonText}>+ New exercise</Text>
              </Pressable>
              <Pressable style={localStyles.modalButton} onPress={() => console.log("New timer")}>
                <Text style={localStyles.modalButtonText}>+ New timer</Text>
              </Pressable>
  
              {/* Close Button */}
              <Pressable style={[localStyles.modalButton, localStyles.closeButton]} onPress={closeModal}>
                <Text style={[localStyles.modalButtonText, localStyles.closeButtonText]}>Close</Text>
              </Pressable>
            </View>
          </View>
          </Modal>
        </>
      );
  }

const localStyles = StyleSheet.create({
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
