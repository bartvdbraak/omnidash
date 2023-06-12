import { Particles } from "@/components/landing/particles";
import { SignIn } from "@clerk/nextjs/app-beta";

export default function Page() {
  return (
    <div className="flex items-center justify-center w-screen h-screen">
      <Particles className="absolute inset-0 -z-10 " />

      <SignIn
        appearance={{
          variables: {
            colorPrimary: "#161616",
            colorText: "#161616",
          },
        }}
      />
    </div>
  );
}
