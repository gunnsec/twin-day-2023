import Head from 'next/head';
import {Inter} from 'next/font/google';
import {google} from 'googleapis';

// Components
import SectionHeader, {titleToId} from '@/components/SectionHeader';
import PictureBoxes from '@/components/PictureBoxes';

const inter = Inter({subsets: ['latin']});


export default function Home(props: {entries: Entry[]}) {
    return (
        <main className={`container py-24 ${inter.className}`}>
            <Head>
                <title>Twin Day Photos 2023</title>
                {/* TODO: description */}
            </Head>

            <section className="text-center mb-10">
                <h1 className="font-bold text-7xl text-center mb-4">Twin Day Photos</h1>
                <h2 className="font-bold text-4xl text-center mb-6">[ 2023 ]</h2>
                <p>
                    Recreate an old photo with your twin, sibling, or bestie and submit it to{' '}
                    <a href="https://tinyurl.com/gunntwinday23" target="_blank" rel="noopener noreferrer" className="text-grapefruit hover:underline font-mono">tinyurl.com/gunntwinday23</a>{' '}
                    to be featured on this page!
                </p>
            </section>

            <section className="border-t flex">
                {/* TODO: better responsivity */}
                <aside className="hidden lg:block pl-8 pr-10 py-8 sticky top-0 self-start w-[22rem] flex-none">
                    <h3 className="font-bold text-lg mb-2">Table of contents</h3>
                    <ul className="list-disc list-outside pl-6 flex flex-col gap-1">
                        {props.entries.map(({title}) => (
                            <li>
                                <a href={`#${titleToId(title)}`} className="hover:underline">{title}</a>
                            </li>
                        ))}
                    </ul>
                </aside>

                <div className="px-10 py-8 flex flex-col gap-10 lg:border-l">
                    {props.entries.map(({title, ...hrefs}) => (
                        <div>
                            <SectionHeader>{title}</SectionHeader>
                            <PictureBoxes {...hrefs} />
                        </div>
                    ))}
                </div>
            </section>
        </main>
    )
}

export async function getServerSideProps() {
    const auth = new google.auth.GoogleAuth({
        credentials: {
            client_email: process.env.CLIENT_EMAIL,
            private_key: process.env.PRIVATE_KEY!.replace(/\\n/g, '\n')
        },
        scopes: 'https://www.googleapis.com/auth/spreadsheets'
    });

    const sheets = google.sheets({ version: 'v4', auth });

    const res = await sheets.spreadsheets.values.get({
        auth, spreadsheetId: process.env.SPREADSHEET_ID,
        range: 'A2:J1000'
    });

    return {
        props: {
            entries: res.data.values!.map(([timestamp, email, name, grade, siblingName, siblingGrade, year, beforeHref, afterHref]) => {
                const title = `${name} & ${siblingName} (${year}, 2023)`;

                // https://support.google.com/docs/thread/174538943?hl=en&msgid=174635867
                const parsedBeforeHref = `https://drive.google.com/uc?export=view&id=${beforeHref.slice(33)}`;
                const parsedAfterHref = `https://drive.google.com/uc?export=view&id=${afterHref.slice(33)}`;

                return {title, beforeHref: parsedBeforeHref, afterHref: parsedAfterHref};
            }) satisfies Entry[]
        }
    }
}

type Entry = {title: string, beforeHref: string, afterHref: string};
