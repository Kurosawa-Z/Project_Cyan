import Navbar from "@/components/Navbar"
import GalaxyBackground from "@/components/GalaxyBackground"

export default function Landing() {
  return (
    <>
    <Navbar />
    <main className="relative grid min-h-svh w-full place-items-center overflow-hidden px-5 py-8 font-sans">
      <GalaxyBackground />

      <div className="relative z-20 grid place-items-center gap-4">
        <img
          src="/logocyan.svg"
          alt="Cyan"
          className="h-40 w-auto drop-shadow-[0_0_28px_var(--primary)]"
          draggable = "false"
        />

        <h1 className="pointer-events-none m-0 grid place-items-center p-0">
          <span className="font-bold text-4xl text-foreground backdrop-blur-sm" draggable = "false">
            NIGHT SKY REIGNS
          </span>
          <span className="text-sm text-foreground backdrop-blur-sm mt-3" draggable = "false">
            Zyciann
          </span>
        </h1>
      </div>
    </main>
    </>
  )
}