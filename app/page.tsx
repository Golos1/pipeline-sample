'use client'
import React from "react";
import {useEffect, useState} from "react";

export default function Home() {
  type Product = {
    product: string;
    price: number;
    weight: number;
  }
  const [data, setData] = useState<Product[]>([]);
  const[minPrice, setMinPrice] = useState<number>(0);
  const [maxPrice, setMaxPrice] = useState<number>(Infinity);
  const [minWeight, setMinWeight] = useState<number>(0);
  const [maxWeight, setMaxWeight] = useState<number>(Infinity);
  const [beacon, setBeacon] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const sampleData = [
    {product: 'example1', price: 10, weight: 3},
    {product: 'example2', price: 8, weight: 5.6},
    {product: 'example3', price: 15, weight: 8.3},
    {product: 'example4', price: 23, weight: 7.1},
    {product: 'example5', price: 11, weight: 2.4},
    {product: 'example6', price: 4, weight: 11.5}
  ];
  const handleReload = () => {
    setLoading(true);
    setData([]);
    setTimeout(() => {loadData()},2000)
  }
  const loadData = () => {
    setLoading(false);
    const successful = Math.random() < 0.5
    if(successful) {
      setData(sampleData)
    }
    else{
      setData([]);
    }
    setError(successful? null : 'Data could not be loaded from API.');

  }

  useEffect(() => {
    const beaconInterval = setInterval(() => {
      setBeacon(b=>!b);
    },1000);
    setTimeout(loadData,2000);
    return ()=> {clearInterval(beaconInterval)};
  },[])

  return (
      <>
        <h1>Lifecycle Beacon: {beacon? "ON": "OFF"}</h1>
        <h3 className={"error-banner"}>{error}</h3>
        <h3 className={"status-banner"}>
          {loading? "Loading": "Done"}
          <button className={'reload-button'} onClick={handleReload}>Reload</button>
        </h3>
        <h5 data-testid="filterBar" className={"filter-bar"}>
          <label htmlFor={'minWeight'}>Minimum Weight</label>
          <input id={'minWeight'}
                 defaultValue={0} min={0} max={maxWeight} placeholder="Minimum Weight"
                 className={"filter-input"} type={"number"}
                 onChange={(event) => {
                   event.preventDefault();
                   setMinWeight(parseInt(event.target.value));
                 }}/>
          <label htmlFor={'maxWeight'}>Maximum Weight</label>
          <input id={"maxWeight"}
                 defaultValue={100} min={minWeight} placeholder={"Maximum Weight"}
                 className={"filter-input"} type={"number"}
                 onChange={(event) => {
                   event.preventDefault();
                   setMaxWeight(parseInt(event.target.value));
                 }}/>
          <label htmlFor={'minPrice'}>Minimum Price</label>
          <input id={"minPrice"}
                 defaultValue={0} min={0} max={maxPrice} placeholder={"Minimum Price"}
                 className={"filter-input"} type={"number"}
                 onChange={(event) => {
                   event.preventDefault();
                   setMinPrice(parseInt(event.target.value));
                 }}/>

          <label htmlFor={'maxPrice'}>Maximum Price</label>
          <input id={"maxPrice"}
                 min={minPrice} defaultValue={100} placeholder={"Maximum Price"}
                 className={"filter-input"} type={"number"}
                 onChange={(event) => {
                   event.preventDefault();
                   setMaxPrice(parseInt(event.target.value))
                 }}/>

        </h5>
        <ol data-testid="dataList" className="data-list">
          {data?.map((item: Product, index) => (
              item.weight > minWeight && item.price > minPrice && item.price < maxPrice && item.weight < maxWeight?
                  <li className={'product-row'} key={index}>
                    Product: {item.product}, Price: ${item.price}, Weight: ${item.weight}kg
                  </li> : null
          ))}
        </ol>
      </>
  )
}
