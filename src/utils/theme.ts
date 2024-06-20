// 将十六进制颜色转换为RGB
export const hexToRgb = (str: string): [number, number, number] => {
  str = str.replace('#', '');
  const hexs = str.match(/../g)?.map((hex) => parseInt(hex, 16)) || [0, 0, 0];
  return [hexs[0], hexs[1], hexs[2]];
};

// 将RGB颜色转换为十六进制
export const rgbToHex = (r: number, g: number, b: number): string => {
  const hexs = [r, g, b].map((channel) =>
    channel.toString(16).padStart(2, '0'),
  );
  return `#${hexs.join('')}`;
};

// 变暗颜色 | color 颜色值字符串 | level 变暗的程度，限0-1之间
export const getDarkColor = (color: string, level: number): string => {
  const rgb = hexToRgb(color).map((channel) =>
    Math.floor(channel * (1 - level)),
  ) as [number, number, number];
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
};

// 变浅颜色 | color 颜色值字符串 | level 变浅的程度，限0-1之间
export const getLightColor = (color: string, level: number): string => {
  const rgb = hexToRgb(color).map((channel) =>
    Math.floor((255 - channel) * level + channel),
  ) as [number, number, number];
  return rgbToHex(rgb[0], rgb[1], rgb[2]);
};
