import React, {createContext, useCallback, useState} from 'react';

export const colorContext = createContext<
  | {
      colorId: string;
      changeColor: (id: string) => void;
    }
  | undefined
>(undefined);

export const ColorProvider = ({
  children,
}: {
  children: React.ReactNode | React.ReactNode[];
}) => {
  const [colorId, setColorId] = useState('');
  const changeColor = useCallback((id: string) => {
    setColorId(id);
  }, []);
  return (
    <colorContext.Provider value={{colorId, changeColor}}>
      {children}
    </colorContext.Provider>
  );
};
