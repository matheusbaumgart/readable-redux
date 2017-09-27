import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const Categories = ({ categories }) => (
    <ul>
        {categories.map((category, i) =>
            <li key={i}>
                <Link key={category.name} to={category.name}>
                    {category.name}
                </Link>
            </li>
        )}
    </ul>
)

Categories.propTypes = {
    categories: PropTypes.array.isRequired
}

export default Categories
