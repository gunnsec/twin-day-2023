import {FiLink} from 'react-icons/fi';


export default function SectionHeader(props: {children: string}) {
    const id = nameToId(props.children);

    return (
        <div className="relative">
            <span id={id} className="absolute -top-16" />
            <a href={`#${id}`} className="group flex gap-2 mb-3 items-center hover:underline decoration-1 underline-offset-4 decoration-secondary dark:decoration-secondary-dark decoration-dotted">
                <h2 className="text-2xl font-bold">
                    {props.children}
                </h2>
                <FiLink className="hidden group-hover:block text-xl pb-0.5 mt-2 stroke-[1.5px]" />
            </a>
        </div>
    )
}

export function nameToId(name: string) {
    return name.toLowerCase().replaceAll(/\s+/g, '-');
}
