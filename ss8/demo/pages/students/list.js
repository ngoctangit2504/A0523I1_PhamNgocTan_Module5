export default function List({students}) {
    return (
        <>
            <h1>123</h1>
        </>
    )
}

export const getStaticProps = async () => {
//     Get Database
    return {
        props: {
            students: []
        }
    }
}