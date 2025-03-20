import Image from 'next/image';

export default function LogoItem({ name }: { name: string }) {
    return (
        <div
            className="flex flex-row items-center gap-4 text-[#DE3919] text-4xl"
            style={{ fontFamily: 'monospace' }}
        >
            <Image src="/six-logo.svg" alt="Logo" width={72} height={72} />
            <div>{name}</div>
        </div>
    );
}