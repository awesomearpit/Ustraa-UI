import React from 'react';
import './index.css';

const Categories = ({categoriesList,fetchProducts}) =>{
    return(
        <div className="row cont-row mb-2">
            {
                categoriesList.map(data=>{
                    return(
                        <div key={data.category_id} className="card bg-dark text-white cont_card" 
                            onClick={()=>fetchProducts(data.category_id)}>
                            <img src={data.category_image} className="card-img-top" alt={data.category_name}/>
                            <div className="card-img-overlay d-flex align-items-center justify-content-center">
                                <p className="card-text">{data.category_name}</p>
                            </div>
                        </div>
                    );
                })
            }
        </div>
    )
}

export default Categories;