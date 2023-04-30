import {MouseEventHandler, useState} from 'react';
import CenteredModal from '@/components/CenteredModal';


type PictureBoxesProps = {beforeHref: string, afterHref: string};
export default function PictureBoxes(props: PictureBoxesProps) {
    const [open, setOpen] = useState(false);
    const [beforeSelected, setBeforeSelected] = useState(true);

    return (
        <div className="flex gap-4">
            <ImageBox
                src={props.beforeHref}
                onClick={() => {
                    setOpen(true);
                    setBeforeSelected(true);
                }}
            />
            <ImageBox
                src={props.afterHref}
                onClick={() => {
                    setOpen(true);
                    setBeforeSelected(false);
                }}
            />

            <CenteredModal isOpen={open} setIsOpen={setOpen}>
                <img
                    src={beforeSelected ? props.beforeHref : props.afterHref}
                    className="mx-auto max-w-[90vw] max-h-[90vh]"
                />
            </CenteredModal>
        </div>
    )
}

function ImageBox(props: {src: string, onClick?: MouseEventHandler<HTMLImageElement>}) {
    return (
        <img
            src={props.src}
            onClick={props.onClick}
            className="w-1/2 object-cover rounded-lg border hover:border-gray-600 transition duration-200 cursor-pointer"
        />
    )
}
