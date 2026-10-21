import { NextResponse, type NextRequest } from "next/server";
import { isLocale, matchLocale } from "@/i18n/config";

const LOCALE_COOKIE = "NEXT_LOCALE";

/**
 * Every page lives under /en or /es. Requests without a locale are redirected:
 * first to the language the visitor picked before (cookie), otherwise to the
 * browser language, otherwise to English.
 */
export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const first = pathname.split("/")[1];
  if (isLocale(first)) return NextResponse.next();

  const saved = request.cookies.get(LOCALE_COOKIE)?.value;
  const locale = isLocale(saved) ? saved : matchLocale(request.headers.get("accept-language"));

  const url = request.nextUrl.clone();
  url.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(url);
}

export const config = {
  // Skip Next internals and every static file (assets, models, content, favicon…)
  matcher: ["/((?!_next|api|assets|models|content|.*\\..*).*)"],
};
