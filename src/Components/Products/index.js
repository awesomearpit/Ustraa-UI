import React, { useState, useEffect } from 'react';
import './index.css';
import { Button, Popover, PopoverHeader, PopoverBody, ListGroup, ListGroupItem } from 'reactstrap';

const Products = ({productList,categoryName,categoriesList,changeCategFetchProd}) =>{
    const [viewAll, setViewAll] = useState(false);
    const [popoverOpen, setPopoverOpen] = useState(false);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const onChangeCateg = (data) => {
        toggle();
        changeCategFetchProd(data)
    }

    useEffect(() => {
        setViewAll(false);
    },[productList]);

    const prodState = viewAll?productList:productList.slice(0,3)
    return(
        <div>
            {prodState.map(data=>{
                return(
                    <div key={data.id} className="card flex-row flex-wrap mb-2">
                        <div className="card-header border-0">
                            <img src={data.image_urls.x120} alt={data.base_product_name}/>
                        </div>
                        <div className="card-block px-2">
                            <span className="card-title">
                                <span className="prod_name">{data.name}</span>
                                { data.rating && <>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;{data.rating}&#9733;</>}
                            </span>
                            <p className="card-text weight-para">({data.weight} {data.weight_unit})</p>
                            <p className="card-text font-weight-bold">&#x20b9; {data.final_price} 
                                &nbsp;&nbsp;&nbsp;<span className="card-text weight-para"><s>&#x20b9; {data.price}</s></span>
                            </p>
                            {data.is_in_stock ?
                                <button type="button" className="btn btn-success mb-2">ADD TO CART</button>:
                                <button type="button" className="btn btn-secondary mb-2" disabled>OUT OF STOCK</button>
                            }
                        </div>
                    </div>
                )
            })}
            <div className="row mb-2">
                <div className="col-md-6 col-sm-6">
                    <span>Category : {categoryName}</span>
                    <Button id="Popover" type="button" className="ml-4">
                        Change Category
                    </Button>
                    <Popover trigger="legacy" placement="bottom" isOpen={popoverOpen} target="Popover" toggle={toggle}>
                        <PopoverHeader>Select Category</PopoverHeader>
                        <PopoverBody>
                            <ListGroup>
                                {
                                    categoriesList && categoriesList.map(data=>{
                                        return (<ListGroupItem tag="button" action onClick={()=>onChangeCateg(data)}>
                                                 {data.category_name}
                                                </ListGroupItem>)
                                    })
                                }
                            </ListGroup>
                        </PopoverBody>
                    </Popover>
                </div>
                <div className="col-md-6 col-sm-6 viewChange text-right" onClick={()=>setViewAll(viewAll?false:true)}>
                   {viewAll?'[-] View Less':'[+] View More'}
                </div>
            </div>
        </div>
    )
}

export default Products;