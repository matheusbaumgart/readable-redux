import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Categories = ({ categories }) => (
    <ul className="category-list">
        {categories.map((category, i) =>
            <Link key={category.name} to={category.name}>
                <li key={i}>
                    <p>{category.name}</p>
                </li>
            </Link>
        )}
    </ul>
)

Categories.propTypes = {
    categories: PropTypes.array.isRequired
}

export default Categories
