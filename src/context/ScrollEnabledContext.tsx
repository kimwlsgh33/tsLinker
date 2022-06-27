// ios에서 PanResponder 제스처 사용시, 스크롤을 안되게 만들기
import React, { createContext, useContext, useState } from "react";
import type { FC } from "react";

export type ScrollEnabledContextType = {
  scrollEnabled: boolean;
  setScrollEnabled: (enabled: boolean) => void;
};

const defaultScrollEnabledContext = {
  scrollEnabled: true,
  setScrollEnabled: (enable: boolean) => {},
};

const ScrollEnabledContext = createContext<ScrollEnabledContextType>(
  defaultScrollEnabledContext
);

type ScrollEnabledContextProps = { children?: React.ReactNode };

// Provider 내부에서 state를 만들고, 이를 Context로 만들어 자식컴포넌트에게 공유한다.
export const ScrollEnabledProvider: FC<ScrollEnabledContextProps> = ({
  children,
}) => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);
  const value = {
    scrollEnabled,
    setScrollEnabled,
  };
  return (
    <ScrollEnabledContext.Provider value={value}>
      {children}
    </ScrollEnabledContext.Provider>
  );
};

export const useScrollEnabled = (): [boolean, (enabled: boolean) => void] => {
  const { scrollEnabled, setScrollEnabled } = useContext(ScrollEnabledContext);
  return [scrollEnabled, setScrollEnabled];
};
