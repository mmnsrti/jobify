// icon:home-dot | Tabler Icons https://tablericons.com/ | Csaba Kissi
import * as React from "react";
import Svg, { Path } from "react-native-svg";

function IconHomeDot(props) {
  return (
    <Svg
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      viewBox="0 0 24 24"
      height="1em"
      width="1em"
      {...props}
    >
      <Path stroke="none" d="M0 0h24v24H0z" />
      <Path d="M19 12h2l-9-9-9 9h2v7a2 2 0 002 2h5" />
      <Path d="M22 19 A3 3 0 0 1 19 22 A3 3 0 0 1 16 19 A3 3 0 0 1 22 19 z" />
      <Path d="M9 21v-6a2 2 0 012-2h2c.641 0 1.212.302 1.578.771" />
    </Svg>
  );
}

export default IconHomeDot;
