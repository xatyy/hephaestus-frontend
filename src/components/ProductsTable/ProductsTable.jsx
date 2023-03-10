import React, { useState, useMemo } from 'react'
import { Link } from 'react-router-dom'
import { UserIcon } from '@heroicons/react/24/solid'
import { makeRequrest } from '../../makeRequest'
import { useEffect } from 'react'
import { makeRequrestAsUser } from '../../makeRequestAsUser'
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }


    

const ProductsTable = () => {

    let productData = {};
    let countData = {};
  

    const [items, setItems] = useState();
    const [view, setView] = useState(false)
    const [count, setCount] = useState(0);
    const [page, setPage] = useState(1);


  
    useEffect(() => {
        const order = async () => {
            productData = await  makeRequrest.get(`/products?populate=*&pagination[page]=${page}&pagination[pageSize]=10`)
           setItems(productData.data.data);
           setView(true);
           countData = await  makeRequrestAsUser.get(`/products/count`)
           setCount(countData.data)

        }
      order()
    }, [page])

    console.log(page);
    
    return(
        <div className="productsTable">
             <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <p className="mt-2 text-sm text-gray-700">
          </p>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
            <Link to="../../products/addProduct">
          <button
            disabled={false}
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-blue-700 hover:bg-blue-800 px-4 py-2 text-sm font-medium text-white shadow-sm sm:w-auto"
          >
            Adauga produs nou
          </button></Link>
          
        </div>
        
      </div>
      <div className="mt-1 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-1">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-lg">
              <table className="min-w-full divide-y divide-gray-300">

                <thead className="bg-gray-50">
                  <tr>
                    <th scope="col" className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
             
                    >
                    Produs
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        
                    >
                      Stoc
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
              
                    >
                      Pret
                    </th>
                    <th scope="col" className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
        
                    >
                        Categorie
                    </th>
                    <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-6">
                      <span className="sr-only">Vizualizeaza</span>
                    </th>
                  </tr>
                </thead>
                {view ? 
                <tbody className="divide-y divide-gray-200 bg-white">
                  {items?.map((item) => (
                    <tr key={item.id}>
                      <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm sm:pl-6">
                        <div className="flex items-center">
                          
                          <div className="ml-4">
                            <div className="font-medium text-gray-900">{item.attributes.title}</div>
                            <div className="font-medium text-xs text-gray-500">Cod Produs: {item.id}</div>
                          </div>
                        </div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <div className="text-gray-900">{item.attributes.stock}</div>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                        <span 
                        className={classNames(
                             "inline-flex rounded-full bg-blue-100 px-2 text-xs font-semibold leading-5 text-blue-800")}>
                          {item.attributes.price} RON
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">{item.attributes.categories.data[0].attributes.title}</td>
                      <td className="relative whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                        <Link to={"../../products/" + item.id} className="text-indigo-600 hover:text-indigo-900">
                          Vizualizeaza<span className="sr-only">, {item.attributes.title}</span>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
                : <p>LOADING</p>
                        }
                <tfoot className="bg-white px-4 py-3 flex-wrap-reverse items-center border-t  border-gray-200 sm:px-6">
        <tr>
            <td> <div className="hidden justify-end py-3  sm:block">
        <p className="text-sm px-2 text-gray-700">
          Se arata de la <span className="font-medium">{page * 10 - 9}</span> pana la <span className="font-medium">{page * 10 > count ? count : page * 10 }</span> din{' '}
          <span className="font-medium">{count}</span> rezultate
        </p>
      </div></td>
            <td></td>
            <td></td>
            <td></td>
            <td>
               
      <div className="flex-1 flex justify-end sm:justify-end">
        <button
              onClick={() => {
                if(page > 1){
                setPage(page - 1);
                }
               }}
          className="relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Inapoi
        </button>
        <button
           onClick={() => {
            if(page * 10 < count){
            setPage(page + 1);
            }
           }}
          className="ml-3 relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50"
        >
          Urmator
        </button>
      </div>
      </td>
      </tr>
                </tfoot>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
        </div>
    )
}

export default ProductsTable;