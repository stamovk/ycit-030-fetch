export const ProductAssignment2 = (props) => {
    const { title, description, image, id, rating, price, category } = props

    return (
        <div className="Product">
            <h2>{title}</h2>
            <img src={image} />
        </div>
    )
}
