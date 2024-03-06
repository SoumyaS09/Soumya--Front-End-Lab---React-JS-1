import React  from 'react';
import { useEffect, useState } from "react"
import IDataList from "../model/IList"
import {getDataFromServer } from '../services/menu'
import ExpenseTracker from "./ExpenseTracker"

function ShowData () {

    const [items, setItems] = useState<IDataList[]>([])
    const [error, setError] = useState<Error | null>(null)
    const [sum, setSum] = useState<number | null>()
    const [vikrantspent, setVikrantspent] = useState<number>(0)
    const [girishspent, setGirishspent] = useState<number>(0)
    const [showform, setShowForm] = useState<boolean>(false)

    var vikrantspent1 : number = 0
    var girishspent1 : number = 0

    useEffect(()=>{
        const fetchMenu = async () => {
            try {
                const data = await getDataFromServer()
                setItems(data)
                setSum(data.reduce((result,v) =>  result = result + v.price , 0 ))
                Shares(data)
            }

            catch (error : any) {
                setError(error)
            }
        }
        fetchMenu()
        // eslint-disable-line react-hooks/exhaustive-deps
        // eslint-disable-next-line 
    },[showform])

    const Shares = (data :IDataList[]) =>{
    
        data.map(
            sams => (
                sams.payeeName === "Vikrant" ? (
                    vikrantspent1 = vikrantspent1 + sams.price
                ):
                (
                    girishspent1 = girishspent1 + sams.price
                )
            )
        )
        setVikrantspent(vikrantspent1)
        setGirishspent(girishspent1)
    }

    const success =() => {
        setShowForm(false)
    }
    const cancel = () => {
        setShowForm(false)
    }

    return (
        <>
            <header id="page-Header">Expense Tracker</header>
            <button id="Add-Button" onClick={() => setShowForm(true)}>Add</button>
            {
                showform && (
                    <div className="form">
                        <ExpenseTracker onTrue={success} onClose={cancel}/>
                    </div>
                ) 
            }
            <>
                <div className="use-inline date header-color">Date</div>
                <div className="use-inline header-color">Product Purchased</div>
                <div className="use-inline price header-color">Price</div>
                <div className="use-inline header-color" style={{width: 112}}>Payee</div>
            </>
            {
                items && (
                    items.map (
                        (user, idx) =>(
                            <div key={idx}>
                                <div className="use-inline date">{user.setDate}</div>
                                <div className="use-inline">{user.product}</div>
                                <div className="use-inline price">{user.price}</div>
                                <div className={`use-inline ${user.payeeName}`}>{user.payeeName}</div>
                            </div>
                        )
                    )
                )
            }
            <hr />
            
            <div className="use-inline ">Total: </div>
            <span className="use-inline total">{sum}</span> <br />
            <div className="use-inline ">Vikrant paid: </div>
            <span className="use-inline total Vikrant">{vikrantspent}</span> <br />
            <div className="use-inline ">Girish paid: </div>
            <span className="use-inline total Girish">{girishspent}</span> <br />
            <span className="use-inline payable">{vikrantspent>girishspent? "Pay Vikrant " : "Pay Girish"}</span>
            <span className="use-inline payable price"> {Math.abs((vikrantspent-girishspent)/2)}</span>
            
            {
               error && (
                    <>
                        {error?.message}
                    </>
                )
            }
        </>
    )
};
export default ShowData