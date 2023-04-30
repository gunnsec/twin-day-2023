import {Inter} from 'next/font/google';
import SectionHeader, {nameToId} from '@/components/SectionHeader';
import PictureBoxes from '@/components/PictureBoxes';

const inter = Inter({subsets: ['latin']});


export default function Home() {
    return (
        <main className={`container py-24 ${inter.className}`}>
            <section className="text-center mb-10">
                <h1 className="font-bold text-7xl text-center mb-4">Twin Day Photos</h1>
                <h2 className="font-bold text-4xl text-center mb-6">[ 2023 ]</h2>
                <p>Submit photos [...].</p>
            </section>

            <section className="border-t flex">
                <aside className="pl-8 pr-10 py-8 sticky top-0 border-r w-[22rem] flex-none">
                    <h3 className="font-bold text-lg mb-2">Table of contents</h3>
                    <ul className="list-disc list-outside pl-6 flex flex-col gap-1">
                        {people.map(({name}) => (
                            <li>
                                <a href={`#${nameToId(name)}`} className="hover:underline">{name}</a>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="px-10 py-8 flex flex-col gap-10">
                    {people.map(({name, ...hrefs}) => (
                        <div>
                            <SectionHeader>{name}</SectionHeader>
                            <PictureBoxes {...hrefs} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

const people = [
    {name: 'Mylie Rodrigo & Jazmin Rodrigo (2023, 2023)', beforeHref: '/placeholders/1.jpg', afterHref: '/placeholders/2.jpg'},
    {name: 'Cooper & Prince D (2009, 2023)', beforeHref: '/placeholders/1.jpg', afterHref: '/placeholders/2.jpg'},
    {name: 'Stefan & Damon Salvatore (1864, 2008)', beforeHref: '/placeholders/3.jpg', afterHref: '/placeholders/4.jpg'}
]
