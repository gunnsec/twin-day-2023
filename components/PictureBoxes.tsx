type PictureBoxesProps = {beforeHref: string, afterHref: string};
export default function PictureBoxes(props: PictureBoxesProps) {
    return (
        <div className="flex gap-4">
            <ImageBox src={props.beforeHref} />
            <ImageBox src={props.afterHref} />
        </div>
    )
}

function ImageBox(props: {src: string}) {
    return (
        <img
            src={props.src}
            className="w-1/2 object-cover rounded-lg border hover:border-gray-600 transition duration-200"
        />
    )
}
