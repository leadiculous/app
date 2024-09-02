"use client";

import { cva, type VariantProps } from "class-variance-authority";
import NextLink, { type LinkProps as NextLinkProps } from "next/link";
import { usePathname } from "next/navigation";

const linkVariants = cva(null, {
  variants: {
    style: {
      dashboard:
        "flex items-center px-3 py-2 transition-all hover:text-primary",
    },
    variant: {
      desktop: null,
      mobile: null,
    },
    state: {
      default: null,
      active: null,
    },
  },
  compoundVariants: [
    {
      style: "dashboard",
      state: "active",
      className: "bg-muted text-primary",
    },
    {
      style: "dashboard",
      state: "default",
      className: "text-muted-foreground",
    },
    {
      style: "dashboard",
      variant: "desktop",
      className: "gap-3 rounded-lg",
    },
    {
      style: "dashboard",
      variant: "mobile",
      className: "mx-[-0.65rem] gap-4 rounded-xl",
    },
  ],
  defaultVariants: {
    variant: "desktop",
    state: "default",
  },
});

type LinkVariantProps = VariantProps<typeof linkVariants>;

export type LinkProps<RouteType> = Omit<NextLinkProps<RouteType>, "style"> &
  LinkVariantProps &
  Required<Pick<LinkVariantProps, "style">>;

export function Link<RouteType>({
  href,
  style,
  variant,
  className,
  ...props
}: LinkProps<RouteType>) {
  const pathName = usePathname();
  const isActive = pathName === href;
  return (
    <NextLink
      {...props}
      href={href}
      className={linkVariants({
        state: isActive ? "active" : "default",
        style,
        variant,
        className,
      })}
    />
  );
}
