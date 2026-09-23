declare module "*.svg" {
  import React from "react";
  import { SvgProps } from "react-native-svg";

  const content: React.FC<SvgProps>;
  export default content;
}

declare module "expo-barcode-generator" {
  import React from "react";

  interface BarcodeOptions {
    format?: string;
    width?: number;
    height?: number;
    displayValue?: boolean;
    fontSize?: number;
    marginTop?: number;
    marginBottom?: number;
    marginLeft?: number;
    marginRight?: number;
  }

  interface BarcodeProps {
    value: string;
    options?: BarcodeOptions;
    rotation?: number;
  }

  export const Barcode: React.FC<BarcodeProps>;
}
