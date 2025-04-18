import { RouterProvider } from "react-router-dom";
import { ConfigProvider } from "antd";
import { useGlobalStore } from "~/stores";
import router from "./router";
import dayjs from "dayjs";
import zhCN from "antd/locale/zh_CN";
import "dayjs/locale/zh-cn";

dayjs.locale("zh-cn");

const App = () => {
    const { primaryColor } = useGlobalStore();
    console.log("App::");
    return (
        <ConfigProvider
            locale={zhCN}
            theme={{
                token: {
                    colorPrimary: primaryColor,
                },
            }}
        >
            <RouterProvider router={router} />
        </ConfigProvider>
    );
};

export default App;
