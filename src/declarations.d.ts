declare module "react-loader-spinner" {
  import React, { ComponentClass } from "react";

  interface LoaderProps {
    type?:
      | "Audio"
      | "Ball-Triangle"
      | "Bars"
      | "Circles"
      | "Grid"
      | "Hearts"
      | "Oval"
      | "Puff"
      | "Rings"
      | "TailSpin"
      | "ThreeDots";
    height?: number | string;
    width?: number | string;
    color?: string;
  }

  declare const Loader: React.ComponentClass<LoaderProps>
  export default Loader;
}
