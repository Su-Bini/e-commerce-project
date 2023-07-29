declare module "react-horizontal-scrolling-menu" {
  import * as React from "react";

  interface MenuItemProps {
    children: React.ReactNode;
  }

  interface MenuProps {
    data: React.ReactNode;
    arrowLeft?: React.ReactNode;
    arrowRight?: React.ReactNode;
  }

  export const MenuItem: React.FC<MenuItemProps>;
  export const Menu: React.FC<MenuProps>;
}
