import { useEffect, useState } from "react"
import { ProductAssignment2 } from "./ProductAssignment2"

const cache = {}

export const AppAssignment2 = () => {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([])
    const [selectedCategory, setSelectedCategory] = useState("")

    useEffect(() => {
        // sort the fetched products in descending order
        fetch("https://fakestoreapi.com/products?sort=desc")
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
            })

        fetch("https://fakestoreapi.com/products/categories")
            .then((res) => res.json())
            .then((data) => {
                setCategories(data)
            })
    }, [])

    useEffect(() => {
        if (!selectedCategory) {
            return
        }

        if (cache[selectedCategory]) {
            setProducts(cache[selectedCategory])
            return
        }

        // Limit the selected results by categroy to 5
        fetch(
            `https://fakestoreapi.com/products/category/${selectedCategory}?limit=5`
        )
            .then((res) => res.json())
            .then((data) => {
                setProducts(data)
                cache[selectedCategory] = data
            })
    }, [selectedCategory])

    return (
        <div className="App">
            <label htmlFor="categories">Choose a category:</label>

            <select
                onChange={(e) => {
                    setSelectedCategory(e.target.value)
                }}
                value={selectedCategory}
                name="categories"
                id="categories"
            >
                <option value=""></option>
                {categories.map((category) => {
                    return (
                        <option key={category} value={category}>
                            {category}
                        </option>
                    )
                })}
            </select>

            <div className="ProductGrid">
                {products.map((product) => {
                    return <ProductAssignment2 key={product.id} {...product} />
                })}
            </div>
        </div>
    )
}
