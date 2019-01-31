import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'

function TextButton({ children, onPress, buttonStyle = {}, labelStyle = {}, disabled = false }) {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={[styles.button, buttonStyle]}
      disabled={disabled}
    >
      <Text style={[styles.label, labelStyle]}>{children}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    borderRadius: 4,
    paddingVertical: 15,
    paddingHorizontal: 10
  },
  label: {
    fontSize: 16
  }
})

export default TextButton
