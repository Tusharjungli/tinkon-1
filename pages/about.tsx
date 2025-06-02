import Image from "next/image";

export default function AboutPage() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-16">
      <div className="flex flex-col items-center">
        <Image
          src="/images/profile.jpg"
          alt="Tushar Panchal"
          width={120}
          height={120}
          className="rounded-full mb-4"
        />
        <h1 className="text-3xl font-bold mb-2">About Me</h1>
        <p className="text-gray-600 text-center mb-6">
          Hi, I&apos;m Tushar – an introvert, dog lover, and the mind behind <span className="font-bold">Tink On It</span>. 
          I write raw, real stories about life, dogs, maturity, tech, and introspection.
        </p>
        <p className="text-gray-600 text-center">
          This blog is my way of sharing my thoughts, personal stories, and lessons learned, hoping someone out there finds them relatable or helpful.
        </p>
      </div>
    </main>
  );
}
