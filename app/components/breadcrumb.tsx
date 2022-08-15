import type { ReactNode } from "react";
import type { NavLinkProps } from "@remix-run/react";
import { NavLink } from "@remix-run/react";
import cc from "classcat";

type BreadcrumbProps = {
  children: ReactNode;
  className?: string;
};

export function Breadcrumb({ children, className }: BreadcrumbProps) {
  return (
    <nav>
      <ul className={cc(["flex items-center", className])}>{children}</ul>
    </nav>
  );
}

export function BreadcrumbItem({
  children,
  className,
  to,
  ...props
}: NavLinkProps) {
  return (
    <li className="not-last-child:after:content-['>'] not-last-child:after:text-slate-400 not-last-child:after:px-2">
      <NavLink
        to={to}
        className={({ isActive }) =>
          cc([
            "text-sm text-slate-400",
            isActive && "text-slate-900 font-bold",
            className,
          ])
        }
        {...props}
      >
        <>{children}</>
      </NavLink>
    </li>
  );
}
