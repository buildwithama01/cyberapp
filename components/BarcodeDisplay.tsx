/**
 * BarcodeDisplay.tsx
 *
 * A self-contained barcode renderer that uses the project's own
 * react-native-svg (v15.12.1) and jsbarcode — bypassing the SVG
 * version conflict bundled inside expo-barcode-generator.
 */
import JsBarcode from "jsbarcode";
import React, { useMemo } from "react";
import { View, Text, StyleSheet } from "react-native";
import Svg, { Rect, G } from "react-native-svg";

interface BarcodeSvgProps {
  value: string;
  /** Width of a single bar (default 2) */
  barWidth?: number;
  /** Height of the bar area in px (default 80) */
  height?: number;
  /** Whether to show the human-readable text below (default true) */
  displayValue?: boolean;
  /** Bar colour (default #000000) */
  lineColor?: string;
  /** Background colour (default #ffffff) */
  background?: string;
  /** Horizontal margin on each side (default 12) */
  margin?: number;
}

export const BarcodeDisplay: React.FC<BarcodeSvgProps> = ({
  value,
  barWidth = 2,
  height = 80,
  displayValue = true,
  lineColor = "#000000",
  background = "#ffffff",
  margin = 12,
}) => {
  // Run jsbarcode to get the binary encoding string
  const { binary, totalWidth } = useMemo(() => {
    const barcodeData: Record<string, any> = {};
    try {
      JsBarcode(barcodeData, value, {
        format: "CODE128",
        width: barWidth,
        height,
        displayValue: false, // we render text ourselves
      });
    } catch {
      return { binary: "", totalWidth: 0 };
    }
    const encoding = barcodeData.encodings?.[0];
    const binary: string = encoding?.data ?? "";
    const totalWidth = binary.length * barWidth;
    return { binary, totalWidth };
  }, [value, barWidth, height]);

  if (!binary) {
    return null;
  }

  const svgWidth = totalWidth + margin * 2;
  const svgHeight = height;

  // Build bar rectangles from the binary string (1 = dark bar, 0 = space)
  const bars: { x: number; w: number }[] = [];
  let i = 0;
  while (i < binary.length) {
    if (binary[i] === "1") {
      const start = i;
      while (i < binary.length && binary[i] === "1") i++;
      bars.push({ x: margin + start * barWidth, w: (i - start) * barWidth });
    } else {
      i++;
    }
  }

  return (
    <View style={[styles.wrapper, { backgroundColor: background }]}>
      <Svg width={svgWidth} height={svgHeight}>
        {/* White background rect */}
        <Rect
          x={0}
          y={0}
          width={svgWidth}
          height={svgHeight}
          fill={background}
        />
        <G>
          {bars.map((bar, idx) => (
            <Rect
              key={idx}
              x={bar.x}
              y={0}
              width={bar.w}
              height={svgHeight}
              fill={lineColor}
            />
          ))}
        </G>
      </Svg>
      {displayValue && (
        <Text style={[styles.valueText, { color: lineColor }]}>{value}</Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  wrapper: {
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 12,
  },
  valueText: {
    marginTop: 6,
    fontSize: 13,
    fontFamily: "Urbanist-SemiBold",
    letterSpacing: 2,
  },
});

export default BarcodeDisplay;
