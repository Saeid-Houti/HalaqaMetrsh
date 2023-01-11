"use client";
import {
  createTheme,
  NextUIProvider,
  Text,
  Navbar,
  Avatar,
  Dropdown,
  Input,
  Link,
} from "@nextui-org/react";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import {
  useSession,
  signIn,
  signOut,
  SessionProvider,
  getSession,
} from "next-auth/react";

export default function Head() {
  const { data: session } = useSession();
  const router = useRouter();
  const [teacher, setTeacher] = useState("");
  const pathname = window.location.pathname;
  useEffect(() => {
    setTeacher(JSON.parse(localStorage.getItem("logged in user")));
  }, []);
  const user =
    typeof window !== "undefined"
      ? JSON.parse(localStorage.getItem("logged in user"))
      : null;

  const logOut = () => {
    Cookies.remove("loggedin");
    localStorage.clear();
    router?.push("/login");
    window.location.reload();
  };

  return (
    <div>
      <NextUIProvider>
        <>
          <Navbar isBordered variant="sticky">
            <Navbar.Brand css={{ mr: "$4" }}>
              <Link href="/halaqat" color="text">
                <Text
                  b
                  color="inherit"
                  style={{
                    fontSize: 50,
                    textAlign: "center",
                    paddingRight: 90,
                  }}
                  css={{ mr: "$11" }}
                  hideIn="xs"
                >
                  Halaqat
                </Text>
              </Link>
              <Navbar.Content hideIn="xs" variant="highlight">
                {user.isCoordinator && (
                  <Navbar.Link
                    style={
                      pathname == "/halaqat"
                        ? {
                            backgroundColor: "black",
                            color: "white",
                            borderRadius: 13,
                          }
                        : { textColor: "black" }
                    }
                    href="/halaqat"
                  >
                    Halaqats
                  </Navbar.Link>
                )}

                <Navbar.Link
                  style={
                    pathname.includes("/halaqat/tasks")
                      ? {
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: 13,
                        }
                      : { textColor: "black" }
                  }
                  href="/halaqat/tasks"
                >
                  Tasks
                </Navbar.Link>
                <Navbar.Link
                  style={
                    pathname.includes("/halaqat/announcements")
                      ? {
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: 13,
                        }
                      : {
                          backgroundColor: "white",
                          color: "black",
                          textColor: "black",
                        }
                  }
                  href="/halaqat/announcements"
                >
                  Announcements
                </Navbar.Link>
                <Navbar.Link
                  style={
                    pathname.includes("/halaqat/messages")
                      ? {
                          backgroundColor: "black",
                          color: "white",
                          borderRadius: 13,
                        }
                      : {
                          backgroundColor: "white",
                          color: "black",
                          textColor: "black",
                        }
                  }
                  href="/halaqat/messages"
                >
                  Messages
                </Navbar.Link>
              </Navbar.Content>
            </Navbar.Brand>
            <Navbar.Content
              css={{
                "@xsMax": {
                  w: "100%",
                  jc: "space-between",
                },
              }}
            >
              {/* <Navbar.Item
                css={{
                  "@xsMax": {
                    w: "100%",
                    jc: "center",
                  },
                }}
              >
                <Input
                  clearable
                  // contentLeft={
                  //   <SearchIcon fill="var(--nextui-colors-accents6)" size={16} />
                  // }
                  contentLeftStyling={false}
                  css={{
                    w: "100%",
                    "@xsMax": {
                      mw: "300px",
                    },
                    "& .nextui-input-content--left": {
                      h: "100%",
                      ml: "$4",
                      dflex: "center",
                    },
                  }}
                  placeholder="Search..."
                />
              </Navbar.Item> */}
              <Dropdown placement="bottom-right">
                <Navbar.Item>
                  <Dropdown.Trigger>
                    <Avatar
                      bordered
                      as="button"
                      src="https://freesvg.org/img/abstract-user-flat-4.png"
                    />
                  </Dropdown.Trigger>
                </Navbar.Item>
                <Dropdown.Menu
                  aria-label="User menu actions"
                  textColor="white"
                  onAction={(actionKey) => {
                    if (actionKey == "logout") {
                      logOut();
                      signOut();
                    }
                  }}
                >
                  <Dropdown.Item
                    key="profile"
                    style={{ backgroundColor: "black" }}
                    css={{ height: "$18" }}
                  >
                    <Text b color="inherit" css={{ d: "flex" }}>
                      Signed in as
                    </Text>
                    <Text b color="inherit" css={{ d: "flex" }}>
                      {session
                        ? session.user.name
                        : teacher.firstName + teacher.lastName}
                    </Text>
                  </Dropdown.Item>
                  <Dropdown.Item key="My Tasks" withDivider>
                    <Link href="/halaqat/tasks" color="text">
                      My Tasks
                    </Link>
                  </Dropdown.Item>

                  <Dropdown.Item key="logout" withDivider color="error">
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            </Navbar.Content>
          </Navbar>{" "}
        </>
      </NextUIProvider>
      {/* <title>Create Next App</title>
      <meta content="width=device-width, initial-scale=1" name="viewport" />
      <meta name="description" content="Generated by create next app" />
      <link rel="icon" href="/favicon.ico" /> */}
    </div>
  );
}
