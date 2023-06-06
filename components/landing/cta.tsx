import { ArrowRight } from "lucide-react";
import Link from "next/link";

export const Cta: React.FC = () => {
  return (
    <section>
      <div className="max-w-6xl px-4 mx-auto sm:px-6">
        <div className="relative px-8 py-12 md:py-20 lg:py-32 rounded-[3rem] overflow-hidden">
          {/* Radial gradient */}
          <div
            className="absolute top-0 flex items-center justify-center w-1/3 pointer-events-none -translate-y-1/2 left-1/2 -translate-x-1/2 -z-10 aspect-square"
            aria-hidden="true"
          >
            <div className="absolute inset-0 translate-z-0 bg-primary-500 rounded-full blur-[120px] opacity-70" />
            <div className="absolute w-1/4 h-1/4 translate-z-0 bg-primary-400 rounded-full blur-[40px]" />
          </div>
          {/* Blurred shape */}
          <div
            className="absolute bottom-0 left-0 opacity-50 pointer-events-none translate-y-1/2 blur-2xl -z-10"
            aria-hidden="true"
          />
          {/* Content */}
          <div className="max-w-3xl mx-auto text-center">
            <div>
              <div className="inline-flex pb-3 font-medium text-transparent bg-clip-text bg-gradient-to-r from-primary-500 to-primary-200">
                The best way to run operations
              </div>
            </div>
            <h2 className="pb-4 text-4xl font-extrabold text-transparent  bg-clip-text bg-gradient-to-r from-zinc-200/60 via-zinc-200 to-zinc-200/60">
              Simplify your workflows
            </h2>
            <p className="mb-8 text-lg text-zinc-400">A consolidated ticket dashboard within 60 seconds.</p>
            <div>
              <Link
                className=" justify-center flex sm:inline-flex items-center whitespace-nowrap transition duration-150 ease-in-out font-medium rounded px-4 py-1.5  text-zinc-900 bg-gradient-to-r from-white/80 via-white to-white/80 hover:bg-white group"
                href="/"
              >
                Get Started{" "}
                <ArrowRight className="w-3 h-3 tracking-normal text-primary-500 group-hover:translate-x-0.5 transition-transform duration-150 ease-in-out ml-1" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
