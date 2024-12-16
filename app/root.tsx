import {
  data,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
  useLoaderData,
} from "@remix-run/react";
import type { LinksFunction, LoaderFunctionArgs } from "@remix-run/node";
import { NextUIProvider } from "@nextui-org/react";
import "./tailwind.css";
import { useEffect } from "react";
import { getToast } from "remix-toast";
import { toast as notify, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import toastStyles from "react-toastify/dist/ReactToastify.css?url";

export const links: LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
  { rel: "stylesheet", href: toastStyles },
];

export const loader = async ({ request }: LoaderFunctionArgs) => {
  // Extracts the toast from the request
  const { toast, headers } = await getToast(request);
  // Important to pass in the headers so the toast is cleared properly
  return data({ toast: toast }, { headers });
};

export function Layout({ children }: { children: React.ReactNode }) {
  const data = useLoaderData<typeof loader>();

  useEffect(() => {
    if (data?.toast) {
      // Call your toast function here
      notify(data.toast.message, { type: data.toast.type });
    }
  }, [data]);

  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
      </head>
      <body>
        <NextUIProvider>
          {/* <main className="dark text-foreground bg-background"> */}
          {/* Add the toast container */}
          <ToastContainer stacked />
          {children}
          <ScrollRestoration />
          <Scripts />
          {/* </main> */}
        </NextUIProvider>
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}
