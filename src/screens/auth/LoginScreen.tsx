"use client"

import { useState, useEffect } from "react"
import { View, Text, TextInput, TouchableOpacity, SafeAreaView, StyleSheet, Image, Dimensions, ScrollView, KeyboardAvoidingView, Platform } from "react-native"
import { Eye, EyeOff, ChevronLeft } from "lucide-react-native"
import type { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { LinearGradient } from "expo-linear-gradient"

type Props = {
  navigation: NativeStackNavigationProp<any>
}

export default function MobileLoginScreen({ navigation }: Props) {
  const [showPassword, setShowPassword] = useState(false)
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  })

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
        backgroundColor: "#F9FAFB",
      },
      headerShadowVisible: false,
    })
  }, [navigation])

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <ScrollView 
          contentContainerStyle={styles.content}
          showsVerticalScrollIndicator={false}
          bounces={false}
          keyboardShouldPersistTaps="handled"
        >
          <View style={styles.header}>
            <Text style={styles.welcomeText}>Welcome Back</Text>
            <Text style={styles.brandText}>to Africa Updates</Text>
            <Text style={styles.subtitleText}>Sign in to continue your journey</Text>
          </View>

          <TouchableOpacity style={styles.googleButton}>
            <Image
              source={{ uri: "https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" }}
              style={styles.googleIcon}
            />
            <Text style={styles.googleButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <View style={styles.dividerContainer}>
            <View style={styles.divider} />
            <Text style={styles.dividerText}>OR</Text>
            <View style={styles.divider} />
          </View>

          <View style={styles.formContainer}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <TextInput
              style={styles.input}
              placeholder="Enter your email"
              placeholderTextColor="#9CA3AF"
              value={credentials.email}
              onChangeText={(text) => setCredentials((prev) => ({ ...prev, email: text }))}
              keyboardType="email-address"
              autoCapitalize="none"
            />

            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.passwordContainer}>
              <TextInput
                style={styles.passwordInput}
                placeholder="Enter your password"
                placeholderTextColor="#9CA3AF"
                value={credentials.password}
                onChangeText={(text) => setCredentials((prev) => ({ ...prev, password: text }))}
                secureTextEntry={!showPassword}
              />
              <TouchableOpacity style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                {showPassword ? <EyeOff size={24} color="#4B5563" /> : <Eye size={24} color="#4B5563" />}
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.forgotPasswordContainer}>
            <Text style={styles.forgotPasswordText}>Forgot Password?</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.signInButtonContainer} onPress={() => console.log("Sign in")}>
            <LinearGradient
              colors={["#10B981", "#059669"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.signInButton}
            >
              <Text style={styles.signInButtonText}>Sign in</Text>
            </LinearGradient>
          </TouchableOpacity>

          <View style={styles.signUpContainer}>
            <Text style={styles.signUpText}>New to Africa Updates? </Text>
            <TouchableOpacity onPress={() => navigation.navigate("Signup")}>
              <Text style={styles.signUpLink}>Create Account</Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

const { width } = Dimensions.get("window")
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F9FAFB",
  },
  content: {
    flexGrow: 1,
    padding: 24,
  },
  header: {
    marginVertical: 32,
  },
  welcomeText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: "#111827",
  },
  brandText: {
    fontSize: 32,
    fontFamily: 'Poppins-Bold',
    color: "#10B981",
    marginBottom: 10,
  },
  subtitleText: {
    fontSize: 16,
    fontFamily: 'Poppins-Regular',
    color: "#6B7280",
    marginTop: 8,
  },
  googleButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "white",
    borderRadius: 16,
    padding: 16,
    marginBottom: 24,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  googleIcon: {
    width: 24,
    height: 24,
    marginRight: 10,
  },
  googleButtonText: {
    color: "#374151",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
  dividerContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 24,
  },
  divider: {
    flex: 1,
    height: 1,
    backgroundColor: "#E5E7EB",
  },
  dividerText: {
    paddingHorizontal: 16,
    color: "#9CA3AF",
    fontWeight: "500",
  },
  formContainer: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 16,
    fontFamily: 'Poppins-Medium',
    color: "#4B5563",
    marginBottom: 8,
    marginLeft: 4,
  },
  input: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#1F2937",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  passwordContainer: {
    position: "relative",
  },
  passwordInput: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 16,
    paddingRight: 50,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    color: "#1F2937",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 1,
    elevation: 1,
  },
  eyeIcon: {
    position: "absolute",
    right: 16,
    top: 16,
  },
  forgotPasswordContainer: {
    alignItems: "flex-end",
    marginBottom: 24,
  },
  forgotPasswordText: {
    color: "#10B981",
    fontFamily: 'Poppins-Medium',
  },
  signInButtonContainer: {
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 24,
    shadowColor: "#10B981",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  signInButton: {
    padding: 16,
    alignItems: "center",
  },
  signInButtonText: {
    color: "white",
    fontFamily: 'Poppins-Bold',
    fontSize: 18,
  },
  signUpContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  signUpText: {
    color: "#6B7280",
    fontFamily: 'Poppins-Regular',
    fontSize: 16,
  },
  signUpLink: {
    color: "#10B981",
    fontFamily: 'Poppins-SemiBold',
    fontSize: 16,
  },
})

