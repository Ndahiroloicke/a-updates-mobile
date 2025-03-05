"use client"

import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Dimensions, Animated, ScrollView } from "react-native"
import { Eye, EyeOff, ChevronLeft } from "lucide-react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"

type Props = {
  navigation: NativeStackNavigationProp<any>
}

export default function MobileSignupScreen({ navigation }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  })
  const fadeAnim = new Animated.Value(0)

  useEffect(() => {
    navigation.setOptions({
      headerShown: true,
      headerLeft: () => (
        <TouchableOpacity 
          onPress={() => {
            navigation.navigate("Home");
          }} 
          style={{ marginLeft: 16 }}
        >
          <ChevronLeft size={24} color="#10B981" />
        </TouchableOpacity>
      ),
      headerTitle: "",
      headerStyle: {
        backgroundColor: "white",
      },
      headerShadowVisible: false,
    })

    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start()
  }, [navigation, fadeAnim])

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Animated.View style={[styles.content, { opacity: fadeAnim }]}>
          <View style={styles.header}>
            <Text style={styles.headerTitle}>Create Account</Text>
            <Text style={styles.headerSubtitle}>Join Africa Updates today</Text>
          </View>

          <View style={styles.formContainer}>
            <TextInput
              style={styles.input}
              placeholder="Username"
              value={formData.username}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, username: text }))}
              autoCapitalize="none"
            />

            <TextInput
              style={styles.input}
              placeholder="Email"
              value={formData.email}
              onChangeText={(text) => setFormData((prev) => ({ ...prev, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Password"
                value={formData.password}
                onChangeText={(text) => setFormData((prev) => ({ ...prev, password: text }))}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={24} color="#666666" /> : <Eye size={24} color="#666666" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.createAccountButtonContainer} onPress={() => console.log("Sign up")}>
            <LinearGradient
              colors={["#10B981", "#059669"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.createAccountButton}
            >
              <Text style={styles.createAccountButtonText}>Create Account</Text>
            </LinearGradient>
          </TouchableOpacity>

          <Text style={styles.termsText}>By signing up, you agree to our Terms of Service and Privacy Policy</Text>

          <View style={styles.loginContainer}>
            <Text style={styles.loginText}>Already have an account? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Login")}>
              <Text style={styles.loginLink}>Sign in</Text>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
  },
  content: {
    padding: 24,
    flexGrow: 1,
  },
  header: {
    marginVertical: 32,
  },
  headerTitle: {
    fontSize: 28,
    fontFamily: 'Poppins-Bold',
    color: "#111827",
  },
  headerSubtitle: {
    fontSize: 18,
    fontFamily: 'Poppins-Regular',
    color: "#6B7280",
    marginTop: 8,
  },
  formContainer: {
    marginBottom: 24,
  },
  input: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    fontSize: 16,
    color: "#1F2937",
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    backgroundColor: "#F9FAFB",
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: "#1F2937",
    paddingRight: 50,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  createAccountButtonContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginTop: 16,
    marginBottom: 24,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  createAccountButton: {
    padding: 16,
    alignItems: "center",
  },
  createAccountButtonText: {
    color: "white",
    fontFamily: 'Poppins-Bold',
    fontSize: 16,
  },
  termsText: {
    color: "#6B7280",
    textAlign: "center",
    fontSize: 14,
    lineHeight: 20,
    fontFamily: 'Poppins-Regular',
    marginBottom: 24,
  },
  loginContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  loginText: {
    color: "#6B7280",
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
  },
  loginLink: {
    color: "#10B981",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
})

