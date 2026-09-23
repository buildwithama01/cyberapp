import React from "react";
import {
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

interface ConfirmLogoutProps {
  visible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmLogout = ({
  visible,
  onCancel,
  onConfirm,
}: ConfirmLogoutProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onCancel}
    >
      <View style={styles.overlay}>
        <Pressable style={styles.backdrop} onPress={onCancel} />
        <View style={styles.sheet}>
          <View style={styles.handle} />
          <View style={styles.header}>
            <Text style={styles.title}>Logout</Text>
          </View>
          <View style={styles.divider} />
          <Text style={styles.message}>Are you sure you want to log out?</Text>
          <View style={styles.actions}>
            <TouchableOpacity
              style={styles.cancelButton}
              onPress={onCancel}
              activeOpacity={0.8}
            >
              <Text style={styles.cancelText}>Cancel</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.confirmButton}
              onPress={onConfirm}
              activeOpacity={0.8}
            >
              <Text style={styles.confirmText}>Yes, Logout</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default ConfirmLogout;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: "flex-end",
  },
  backdrop: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(17, 24, 39, 0.68)",
  },
  sheet: {
    paddingHorizontal: 18,
    paddingTop: 8,
    paddingBottom: 28,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#FFFFFF",
  },
  handle: {
    alignSelf: "center",
    width: 32,
    height: 6,
    marginBottom: 18,
    borderRadius: 3,
    backgroundColor: "#D9D9D9",
  },
  header: {
    minHeight: 30,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    color: "#FF5A5F",
    fontFamily: "Urbanist-Bold",
    fontSize: 22,
  },
  message: {
    marginTop: 20,
    marginBottom: 20,
    color: "#4A4A4A",
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
    textAlign: "center",
  },
  divider: {
    height: 1,
    marginTop: 10,
    backgroundColor: "#EEEEEE",
  },
  actions: {
    flexDirection: "row",
    gap: 10,
  },
  cancelButton: {
    flex: 1,
    height: 49,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#EEF1FF",
  },
  confirmButton: {
    flex: 1,
    height: 49,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#0d3a4b",
    shadowColor: "#0d3a4b",
    shadowOffset: { width: 0, height: 7 },
    shadowOpacity: 0.12,
    shadowRadius: 18,
    elevation: 3,
  },
  cancelText: {
    color: "#0d3a4b",
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
  confirmText: {
    color: "#FFFFFF",
    fontFamily: "Urbanist-Bold",
    fontSize: 16,
  },
});
