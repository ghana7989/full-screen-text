export type ColorData = {bgColor: string; textColor: string; id: string}[];

export const getColorById = (id: string, data: ColorData) => {
  return data.find(item => item.id === id);
};

export const getDefaultColor = (data: ColorData) => {
  return data[0];
};
