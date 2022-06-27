import React, { createContext, useContext } from "react"; // createContext 함수 불러오기
import type { FC } from "react";

// context type
export type ToggleThemeContextType = {
  toggleTheme: () => void;
  children?: React.ReactNode;
};

// context default value
const defaultToggleThemeContext = {
  toggleTheme: () => {},
};

// createContext
const ToggleThemeContext = createContext<ToggleThemeContextType>(
  defaultToggleThemeContext
);

//-----------------------------------------

type ToggleThemeContextProps = ToggleThemeContextType;

// Provider에 값 저장하기 전에 한번거쳐서 가기 - 이름 간소화
export const ToggleThemeProvider: FC<ToggleThemeContextProps> = ({
  children,
  toggleTheme,
}) => {
  const value = { toggleTheme };
  return (
    <ToggleThemeContext.Provider value={value}>
      {children}
    </ToggleThemeContext.Provider>
  );
};

// 콘텍스트를 사용하는 함수까지 생성
export const useToggleTheme = () => {
  const { toggleTheme } = useContext(ToggleThemeContext);
  return toggleTheme;
};
