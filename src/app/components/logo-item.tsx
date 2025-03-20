export default function LogoItem({ name }: { name: string }) {
    return (
        <div
            className="flex flex-row items-center gap-4 text-[#DE3919] text-4xl"
            style={{ fontFamily: 'monospace' }}
        >
            <img src="six-logo.svg" />
            <div>{name}</div>
        </div>
    );
}