import React from "react";
import {
    Image,
    ImageSourcePropType,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    TouchableOpacity
} from "react-native";
import { SvgProps } from "react-native-svg";

interface SuccessModalButton {
  title: string;
  onPress: () => void;
}

interface SuccessModalProps {
  isVisible: boolean;
  title: string;
  message: string;
  primaryButton: SuccessModalButton;
  secondaryButton: SuccessModalButton;
  image?: ImageSourcePropType;
  svg?: React.ComponentType<SvgProps>;
  onClose?: () => void;
}

const SuccessModal = ({
  isVisible,
  title,
  message,
  primaryButton,
  secondaryButton,
  image,
  svg: SvgImage,
  onClose,
}: SuccessModalProps) => {
  return (
    <Modal
      animationType="fade"
      transparent
      visible={isVisible}
      onRequestClose={onClose}
    >
      <Pressable style={styles.backdrop} onPress={onClose}>
        <Pressable
          style={styles.modal}
          onPress={(event) => event.stopPropagation()}
        >
          {SvgImage ? (
            <SvgImage width={180} height={180} />
          ) : image ? (
            <Image source={image} style={styles.image} resizeMode="contain" />
          ) : null}

          <Text style={styles.title}>{title}</Text>
          <Text style={styles.message}>{message}</Text>

          <TouchableOpacity
            accessibilityRole="button"
            onPress={primaryButton.onPress}
            style={styles.primaryButton}
          >
            <Text style={styles.primaryButtonText}>{primaryButton.title}</Text>
          </TouchableOpacity>
          <TouchableOpacity
            accessibilityRole="button"
            onPress={secondaryButton.onPress}
            style={styles.secondaryButton}
          >
            <Text style={styles.secondaryButtonText}>
              {secondaryButton.title}
            </Text>
          </TouchableOpacity>
        </Pressable>
      </Pressable>
    </Modal>
  );
};

export default SuccessModal;

const styles = StyleSheet.create({
  backdrop: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(17, 24, 39, 0.7)",
    paddingHorizontal: 30,
  },
  modal: {
    width: "100%",
    maxWidth: 340,
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 18,
    paddingHorizontal: 23,
    paddingTop: 18,
    paddingBottom: 22,
  },
  image: {
    width: 180,
    height: 180,
  },
  title: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-Bold",
    fontSize: 18,
    textAlign: "center",
    marginTop: 4,
    marginBottom: 10,
  },
  message: {
    color: "#35343D",
    fontFamily: "Urbanist-Regular",
    fontSize: 13,
    lineHeight: 18,
    textAlign: "center",
    marginBottom: 20,
  },
  primaryButton: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#0D3A4B",
    borderRadius: 24,
    paddingVertical: 13,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 13,
  },
  secondaryButton: {
    width: "100%",
    alignItems: "center",
    backgroundColor: "#EEF1FF",
    borderRadius: 24,
    paddingVertical: 13,
    marginTop: 10,
  },
  secondaryButtonText: {
    color: "#0D3A4B",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 13,
  },
});
