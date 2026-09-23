import React, { useState } from "react";
import {
    DimensionValue,
    LayoutChangeEvent,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";

interface PriceRangeProps {
  min: number;
  max: number;
  onChange: (min: number, max: number) => void;
  onLayout?: (event: LayoutChangeEvent) => void;
}

const PriceRange = ({ min, max, onChange, onLayout }: PriceRangeProps) => {
  const [width, setWidth] = useState(0);
  const minPosition = `${min}%` as DimensionValue;
  const maxPosition = `${100 - max}%` as DimensionValue;

  return (
    <Pressable
      style={styles.container}
      onLayout={(event) => {
        setWidth(event.nativeEvent.layout.width);
        onLayout?.(event);
      }}
      onPress={(event) => {
        if (!width) return;
        const nextValue = Math.round(
          (event.nativeEvent.locationX / width) * 100,
        );
        if (Math.abs(nextValue - min) <= Math.abs(nextValue - max)) {
          onChange(Math.min(nextValue, max - 1), max);
        } else {
          onChange(min, Math.max(nextValue, min + 1));
        }
      }}
    >
      <View style={styles.track} />
      <View
        style={[
          styles.selectedTrack,
          { left: minPosition, right: maxPosition },
        ]}
      />
      <View style={[styles.handle, { left: minPosition }]}>
        <Text style={styles.value}>₦{min}</Text>
      </View>
      <View style={[styles.handle, { right: maxPosition }]}>
        <Text style={styles.value}>₦{max}</Text>
      </View>
    </Pressable>
  );
};

export default PriceRange;

const styles = StyleSheet.create({
  container: { height: 58, justifyContent: "center", marginHorizontal: 2 },
  track: {
    height: 5,
    borderRadius: 3,
    backgroundColor: "#E5E7EB",
  },
  selectedTrack: {
    position: "absolute",
    left: "0%",
    right: "0%",
    height: 5,
    borderRadius: 3,
    backgroundColor: "#0D3A4B",
  },
  handle: {
    position: "absolute",
    top: 20,
    width: 18,
    height: 18,
    borderRadius: 9,
    borderWidth: 4,
    borderColor: "#0D3A4B",
    backgroundColor: "#FFFFFF",
  },
  value: {
    position: "absolute",
    bottom: 17,
    left: -9,
    minWidth: 36,
    paddingVertical: 2,
    borderRadius: 4,
    backgroundColor: "#0D3A4B",
    color: "#FFFFFF",
    fontFamily: "Urbanist-SemiBold",
    fontSize: 11,
    textAlign: "center",
  },
});
