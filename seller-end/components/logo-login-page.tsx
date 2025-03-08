import Link from "next/link";

export function BigLogo() {
  return (
    <Link href="/" className="flex flex-col items-center gap-2">
      <div className="flex items-center gap-3">
        <img
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-KcMrADBa6dS8i9wxnbF5hlV5aTlsjh.png"
          alt="Kintsugi Logo"
          className="h-32 w-32"
        />
        <span className="text-4xl font-bold text-gray-900">Kintsugi</span>
      </div>
      <div className="flex items-center gap-1 text-lg">
        <span className="text-gray-500">powered by</span>
        <span className="bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text font-medium text-transparent">
          Gemini
        </span>
      </div>
    </Link>
  );
}
