import "./globals.css";
import Providers from "./Providers";
import { ConfigProvider } from "antd";
import StyledComponentsRegistry from "@/lib/AntdRegistry";
import { PageTitleProvider } from "@/context/PageTitleContext";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body>
        <Providers>
          <StyledComponentsRegistry>
            <ConfigProvider
              theme={{
                token: {
                  colorPrimary: "#00b96b",
                  fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
                },
                components: {
                  Button: {
                    fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
                  },
                  Input: {
                    fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
                  },
                  Form: {
                    fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
                  },
                  Select: {
                    fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
                  },
                  Checkbox: {
                    fontFamily: "Poppins, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, 'Noto Sans', sans-serif",
                  },
                },
              }}
            >
              <PageTitleProvider>
                {children}
              </PageTitleProvider>
            </ConfigProvider>
          </StyledComponentsRegistry>
        </Providers>
      </body>
    </html>
  );
}
  