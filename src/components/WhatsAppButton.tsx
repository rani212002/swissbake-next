import Image from "next/image";

export function WhatsAppButton({ href }: { href: string }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat on WhatsApp"
      className="fixed bottom-5 right-5 z-30 transition-transform hover:scale-110"
    >
      <Image src="https://www.swissbake.in/Content/images/icons/wa.png" alt="" width={56} height={56} className="h-14 w-14" />
    </a>
  );
}
