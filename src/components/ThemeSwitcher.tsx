/** @jsx jsx */
import React, { useMemo } from "react";
import { animated } from "react-spring";
import { Box, jsx, Styled, Text, useThemeUI } from "theme-ui";

const bounding = 24;
const defaultSize = bounding;
const center = bounding / 2;

const radius = 4;
const lineLength = 2;

const degToRad = (deg: number): number => deg * (Math.PI / 180);

const Line: React.FC<{ r: number; angle: number }> = ({ r, angle }) => {
  const rads = useMemo(() => degToRad(angle), [angle]);
  const x1 = useMemo(() => r * Math.cos(rads) + center, [r, rads]);
  const x2 = useMemo(() => (r + lineLength) * Math.cos(rads) + center, [
    r,
    rads,
  ]);

  const y1 = useMemo(() => r * Math.sin(rads) + center, [r, rads]);
  const y2 = useMemo(() => (r + lineLength) * Math.sin(rads) + center, [
    r,
    rads,
  ]);

  const {
    theme: {
      colors: { text },
    },
  } = useThemeUI();

  return (
    <line
      x1={x1}
      x2={x2}
      y1={y1}
      y2={y2}
      stroke={text}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  );
};

const numLines = 7;
export const ThemeSwitcher: React.FC<{
  size?: number;
}> = props => {
  const size = props.size || defaultSize;

  const lines = useMemo(
    () => Array.from({ length: numLines }, (_, i) => (360 / numLines) * i),
    [numLines],
  );

  const {
    theme: {
      colors: { text },
    },
  } = useThemeUI();

  return (
    <animated.svg
      sx={{ cursor: "pointer", border: "solid 1px grey" }}
      width={size}
      height={size}
      viewBox={`0 0 ${bounding} ${bounding}`}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <circle
        cx={center}
        cy={center}
        r={radius}
        stroke={text}
        strokeWidth={2}
      />

      {lines.map(angle => (
        <Line angle={angle} r={radius + 3} key={angle} />
      ))}
    </animated.svg>
  );
};
