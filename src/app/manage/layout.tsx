import DarkModeToggle from "@/components/dark-mode-toggle";
import DropdownAvatar from "./dropdown-avatar";
import NavLinks from "./nav-links";
import MobileNavLinks from "./mobile-nav-links";
import { getServerSession } from "next-auth";
import { authOptions } from "../api/auth/auth.options";
import { redirect } from "next/navigation";
import { decodeToken } from "@/lib/utils";
import { Role } from "@/constants/type";

const Layout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  const session = await getServerSession(authOptions);

  const access_token = session?.access_token as string;

  const role = decodeToken(access_token)?.role;

  if (!session) {
    redirect("/login");
  }

  if(role === Role.Guest) {
    redirect("/");
  }

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <NavLinks />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <header className="sticky top-0 z-30 flex h-14 items-center gap-4 border-b bg-background px-4 sm:static sm:h-auto sm:border-0 sm:bg-transparent sm:px-6">
          <MobileNavLinks />
          <div className="relative ml-auto flex-1 md:grow-0">
            <div className="flex justify-end">
              <DarkModeToggle />
            </div>
          </div>
          <DropdownAvatar />
        </header>
        {children}
      </div>
    </div>
  );
};

export default Layout;
