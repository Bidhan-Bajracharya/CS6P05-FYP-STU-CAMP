import React from "react";
import { useSelector } from "react-redux";
import { ConfigProvider, theme } from "antd";

const SelectConfig = (props) => {
  const { isDark } = useSelector((store) => store.theme);

  return (
    <>
      <ConfigProvider
        theme={{
          token: {
            colorBgBase: isDark ? "#2B2B2B" : "",
            colorText: isDark ? "white" : "",
            colorBorder: "#FFA500",
            // colorPrimary: '#FFA500',
          },
          algorithm: isDark && theme.darkAlgorithm,
        }}
      >
        {props.children}
      </ConfigProvider>
    </>
  );
};

export default SelectConfig;
