import "@/styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";

import React from "react";

import RecoilWrapper from "@/components/wrappers/RecoilWrapper";
import AppWrapper from "@/components/wrappers/AppWrapper";
import QueryWrapper from "@/components/wrappers/QueryWrapper";
import Head from "next/head";

const metadata = {
  title: "Employee Attendance",
  description:
    "Employee Attendance System Web Application which is contains the basic functionality in any project such as create, update, and delete records.",
};

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
//     <html lang="en">
//       <Head>
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//         <link rel="icon" href="/favicon.svg" />
//       </Head>
//       <body className={nunito.className}>
//         <RecoilWrapper>
//           <QueryWrapper>
//             <AppWrapper>{children}</AppWrapper>
//           </QueryWrapper>
//         </RecoilWrapper>
//       </body>
//     </html>
//   );
// }

// for page dir _app.jsx
export default function App({ Component, pageProps }) {
  return (
    <>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.svg" />
      </Head>
      <RecoilWrapper>
        <QueryWrapper>
          <AppWrapper>
            <Component {...pageProps} />
          </AppWrapper>
        </QueryWrapper>
      </RecoilWrapper>
    </>
  );
}
