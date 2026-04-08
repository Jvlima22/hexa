import Link from "next/link";

import FooterMenu from "components/layout/footer-menu";
import LogoSquare from "components/logo-square";
import { getMenu } from "lib/store";
import { Suspense } from "react";

const { COMPANY_NAME, SITE_NAME } = process.env;

export default async function Footer() {
  const currentYear = new Date().getFullYear();
  const copyrightDate = 2023 + (currentYear > 2023 ? `-${currentYear}` : "");
  const skeleton = "w-full h-6 animate-pulse rounded-sm bg-brand-gold/20";
  const menu = await getMenu("next-js-frontend-footer-menu");
  const copyrightName = COMPANY_NAME || SITE_NAME || "";

  return (
    <footer className="relative bg-brand-secondary text-sm text-white w-full mt-10">
      {/* Ondas animadas — Simple CSS Waves */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          top: "-39px",
          left: 0,
          height: "40px",
          width: "100%",
          overflow: "hidden",
          lineHeight: 0,
          zIndex: 10,
        }}
      >
        <svg
          viewBox="0 24 150 28"
          preserveAspectRatio="none"
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            width: "100%",
            height: "100%",
          }}
        >
          <defs>
            <path
              id="gentle-wave"
              d="M-160 44c30 0 58-18 88-18s58 18 88 18 58-18 88-18 58 18 88 18v44h-352z"
            />
          </defs>
          <g>
            <use
              href="#gentle-wave"
              x="48"
              y="-5"
              fill="#003087"
              opacity="0.71"
              style={{
                animation:
                  "move-forever 13s cubic-bezier(.55,.5,.45,.5) infinite",
              }}
            />
            <use
              href="#gentle-wave"
              x="48"
              y="-1"
              fill="#FFD100"
              opacity="1"
              style={{
                animation:
                  "move-forever 10s cubic-bezier(.55,.5,.45,.5) infinite",
              }}
            />
            <use
              href="#gentle-wave"
              x="48"
              y="11"
              fill="#0D7D59"
              opacity="1"
              style={{
                animation:
                  "move-forever 7s cubic-bezier(.55,.5,.45,.5) infinite",
              }}
            />
          </g>
        </svg>
      </div>

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 py-12 text-sm md:flex-row md:gap-12 md:px-4 min-[1320px]:px-0">
        <div>
          <Link className="flex items-center gap-2 text-white md:pt-1" href="/">
            <LogoSquare size="sm" />
            <span className="uppercase">{SITE_NAME}</span>
          </Link>
        </div>
        <Suspense
          fallback={
            <div className="flex h-[188px] w-[200px] flex-col gap-2">
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
              <div className={skeleton} />
            </div>
          }
        >
          <FooterMenu menu={menu} />
        </Suspense>
      </div>
      <div className="border-t border-brand-gold/30 py-6 text-sm">
        <div className="mx-auto flex w-full max-w-7xl flex-col items-center gap-1 px-4 md:flex-row md:gap-0 md:px-4 min-[1320px]:px-0">
          <p>
            &copy; {copyrightDate} {copyrightName}
            {copyrightName.length && !copyrightName.endsWith(".")
              ? "."
              : ""}{" "}
            Todos os direitos reservados.
          </p>
          <p className="md:ml-auto">
            Desenvolvido por{" "}
            <a
              href="https://tglsolutions.com.br/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-white hover:text-brand-accent transition-colors"
            >
              TGL Solutions
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
